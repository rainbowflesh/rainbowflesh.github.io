# Let python use Dbus
> 上接 tello_hack.md.

无人机破解完成后, 需要让地面站连接上无人机, 考虑到地面站运行的 ubuntu 系统自带 network-manager 这么一个软件, 用进程间通信的方式去控制 wifi 创建, 连接和断开再好不过了;

选择 [D-bus](https://dbus.freedesktop.org/doc/dbus-tutorial.html) 作为 ipc 系统, 开发起来还是蛮简单的, 就是维护火葬场.

`D-bus` 用起来甚至有点像操作 json, 比如获得一个 dbus API 是这样子的:
```python
# get api obj eg:
dbus.SystemBus().get_object(
            "org.freedesktop.NetworkManager",
            "/org/freedesktop/NetworkManager/Settings"
            )
```

这个玩意儿理解起来就是, 从 `dbus` 路径 `org.freedesktop.NetworkManager` 下获得 `/org/freedesktop/NetworkManager/Settings` 对象, 😑没错这是个对象, 包含了各种接下来所需的方法的对象; 至于这个对象的定义, 还要从[文档](https://people.freedesktop.org/~lkundrak/nm-docs/gdbus-org.freedesktop.NetworkManager.Settings.html)里看起;

😂 作为一个掉包侠, 习惯直接看源码猜用法, 但这次老老实实上网找文档才看明白怎么用.

ps: 用 `D-Feet` 这个软件可以直接调试 dbus, 好用的很, 用起来跟上面一样照着文档写参数 🥲.

## Example

基本上是从[这里](https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/vpn.py)和[这里](https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-connection.py)抄过来改吧改吧做出来的东西.

```python
import logging
import uuid
import dbus


class ConnectionConfig():
    CONNECT_PROFILE_NAME = "tmp_connection"
    CONNECTOR_INTERFACE = "wlp1s0"


class DbusManager:
    def __init__(self):
        self.connectivity_states = {
            0: "Unknown",
            1: "Activating",
            2: "Activated",
            3: "Deactivating",
            4: "Deactivated",
        }
        self._interface = ConnectionConfig.CONNECTOR_INTERFACE

        # 迫于不知道 python 是怎么垃圾回收的, 在嵌入式系统里跑长期任务软件,
        # 选择只实例化一个 `dbus.SystemBus()`, 免得搞太多对象给 oom 了.
        self._bus = dbus.SystemBus()
        self._connection_proxy = self._bus.get_object(
            "org.freedesktop.NetworkManager",
            "/org/freedesktop/NetworkManager/Settings"
        )
        self._device_proxy = self._bus.get_object(
            "org.freedesktop.NetworkManager",
            "/org/freedesktop/NetworkManager"
        )
        self._connection_manager = dbus.Interface(
            self._connection_proxy, "org.freedesktop.NetworkManager")
        self._device_manager = dbus.Interface(
            self._device_proxy, "org.freedesktop.NetworkManager")
        self._connection_settings = dbus.Interface(
            self._connection_proxy, "org.freedesktop.NetworkManager.Settings")
        self._dbus_iface = dbus.Interface(
            self._connection_proxy, dbus_interface="org.freedesktop.NetworkManager.Settings"
        )
        self._device_path = self.get_device_path()
        # 😎 上面这一大串以及接下来的一大串都严格按照
        # https://coderlmn.github.io/frontEndCourse/unmaintainable.html
        # 和
        # https://testing.googleblog.com/2008/07/how-to-write-3v1l-untestable-code.html
        # 编写.
        # 不要喊我来维护, 一次性的程序绝对没有更新迭代. (逃

    # true = activated
    def get_connection_statue(self):
        manager_prop_iface = dbus.Interface(
            self._device_proxy, "org.freedesktop.DBus.Properties")
        activated_connections = manager_prop_iface.Get(
            "org.freedesktop.NetworkManager", "ActiveConnections")
        # 没看懂? 这些其实全都是从对象里取对象, Get("对象A", "对象A的balabala方法")
        # 至于为啥都是字符串, 小编也不知道.

        for a in activated_connections:
            ac_proxy = self._bus.get_object(
                "org.freedesktop.NetworkManager", a)
            prop_iface = dbus.Interface(
                ac_proxy, "org.freedesktop.DBus.Properties")
            state = prop_iface.Get(
                "org.freedesktop.NetworkManager.Connection.Active", "State")
            con_path = prop_iface.Get(
                "org.freedesktop.NetworkManager.Connection.Active", "Connection"
            )
            con_proxy = self._bus.get_object(
                "org.freedesktop.NetworkManager", con_path)
            settings_connection = dbus.Interface(
                con_proxy, "org.freedesktop.NetworkManager.Settings.Connection"
            )
            connection = settings_connection.GetSettings()
            # 其实这个状态码有 ao 多, 更复杂的业务可以直接把状态返回出去在外部处理,
            # 这样更加符合单一职责规范, 但我就不😾
            if (connection["connection"]["id"] == ConnectionConfig.CONNECT_PROFILE_NAME and state == 2):
                return True

    def create_connection(self, ssid: str):
        # 完整的配置项可以在这里找到:
        # https://networkmanager.dev/docs/api/latest/ref-settings.html
        connection_meta = dbus.Dictionary(
            {"type": "802-11-wireless",
                "uuid": str(uuid.uuid4()), "id": ConnectionConfig.CONNECT_PROFILE_NAME, "interface-name": self._interface}
        )
        wifi_meta = dbus.Dictionary(
            {"ssid": dbus.ByteArray(ssid.encode("utf-8")),
             "mode": "infrastructure"}
        )
        ipv4_meta = dbus.Dictionary({"method": "auto"})
        ipv6_meta = dbus.Dictionary({"method": "ignore"})
        connection_profile = dbus.Dictionary(
            {
                "connection": connection_meta,
                "802-11-wireless": wifi_meta,
                "ipv4": ipv4_meta,
                "ipv6": ipv6_meta,
            }
        )
        profile_path = (
            self._connection_settings.AddConnectionUnsaved(connection_profile))

        # 连接一个 wifi 只需要这样, 然后这样, 这样完了就连上辣.
        self.activate_connection(profile_path)

    def activate_connection(self, profile_path):
        try:
            self._device_manager.ActivateConnection(
                profile_path,
                self._device_path,
                "/")
        except:
            # 有错误处理, 但不完全处理.jpg
            logging.error("Failed to connect wifi, possible already connected")

    def disconnect(self):
        device_proxy = self._bus.get_object(
            "org.freedesktop.NetworkManager", self._device_path)
        dev_iface = dbus.Interface(
            device_proxy, "org.freedesktop.NetworkManager.Device")
        dev_iface.Disconnect()
        # 这个写法不存在 `断开一个不存在的连接配置`, 不用处理错误.

    def remove_connection(self):
        connection_paths = self._connection_settings.ListConnections()
        for path in connection_paths:
            con_proxy = self._bus.get_object(
                "org.freedesktop.NetworkManager", path)
            settings_connection = dbus.Interface(
                con_proxy, "org.freedesktop.NetworkManager.Settings.Connection")
            connection = settings_connection.GetSettings()
            if (connection["connection"]["id"] == ConnectionConfig.CONNECT_PROFILE_NAME):
                settings_connection.Delete()
            # 如果这个方法被异步的东西同时调用了两次, 会有一次是尝试删除虚空配置, 然后报错.
            # TODO: 错误处理
            # FIXME: 关我屁事, 😸实践证明不存在这种情况啦.

    # 这个方法用来获得网卡在 dbus 里作为对象时候的对象.
    def get_device_path(self):
        devices = self._device_manager.GetDevices()
        for device_path in devices:
            device_proxy = self._bus.get_object(
                "org.freedesktop.NetworkManager", device_path)
            prop_iface = dbus.Interface(
                device_proxy, "org.freedesktop.DBus.Properties")
            iface = prop_iface.Get(
                "org.freedesktop.NetworkManager.Device", "Interface")
            if (iface == self._interface):
                return device_path

```

## 参考
[NetworkManager D-Bus API Reference](https://people.freedesktop.org/~lkundrak/nm-docs/spec.html)

[NetworkManager Python Dbus Example](https://github.com/NetworkManager/NetworkManager/tree/main/examples/python/dbus)

## 后记

剧终.