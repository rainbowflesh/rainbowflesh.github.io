<script setup lang="ts"></script>
<template>
  <title>Python Dbus usage</title>
  <div class="container">
    <div class="content">
      <h1 id="let-python-use-dbus">Let python use Dbus</h1>
      <blockquote>
        <p>上接 tello_hack.md</p>
      </blockquote>
      <p>
        无人机破解完成后, 需要让地面站连接上无人机, 考虑到地面站运行的 ubuntu 系统自带 network-manager 这么一个软件,
        用进程间通信的方式去控制 wifi 创建, 连接和断开再好不过了;
      </p>
      <p>
        选择 <a href="https://dbus.freedesktop.org/doc/dbus-tutorial.html">D-bus</a> 作为 ipc 系统,
        开发起来还是蛮简单的, 就是维护火葬场.
      </p>
      <p><code>D-bus</code> 用起来甚至有点像操作 json, 比如获得一个 dbus API 是这样子的:</p>
      <pre class="hljs"><code><div><span class="hljs-comment"># get api obj eg:</span>
dbus.SystemBus().get_object(
            <span class="hljs-string">"org.freedesktop.NetworkManager"</span>,
            <span class="hljs-string">"/org/freedesktop/NetworkManager/Settings"</span>
            )
</div></code></pre>
      <p>
        这个玩意儿理解起来就是, 从 <code>dbus</code> 路径 <code>org.freedesktop.NetworkManager</code> 下获得
        <code>/org/freedesktop/NetworkManager/Settings</code> 对象, 😑没错这是个对象, 包含了各种接下来所需的方法的对象;
        至于这个对象的定义, 还要从<a
          href="https://people.freedesktop.org/~lkundrak/nm-docs/gdbus-org.freedesktop.NetworkManager.Settings.html"
          >文档</a
        >里看起;
      </p>
      <p>😂 作为一个掉包侠, 习惯直接看源码猜用法, 但这次老老实实上网找文档才看明白怎么用.</p>
      <p>ps: 用 <code>D-Feet</code> 这个软件可以直接调试 dbus, 好用的很, 用起来跟上面一样照着文档写参数 🥲.</p>
      <h2 id="example">Example</h2>
      <p>
        基本上是从<a href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/vpn.py"
          >这里</a
        >和<a href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-connection.py"
          >这里</a
        >抄过来改吧改吧做出来的东西.
      </p>
      <pre class="hljs"><code><div><span class="hljs-keyword">import</span> logging
<span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">import</span> dbus


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ConnectionConfig</span><span class="hljs-params">()</span>:</span>
    CONNECT_PROFILE_NAME = <span class="hljs-string">"tmp_connection"</span>
    CONNECTOR_INTERFACE = <span class="hljs-string">"wlp1s0"</span>


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DbusManager</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(self)</span>:</span>
        self.connectivity_states = {
            <span class="hljs-number">0</span>: <span class="hljs-string">"Unknown"</span>,
            <span class="hljs-number">1</span>: <span class="hljs-string">"Activating"</span>,
            <span class="hljs-number">2</span>: <span class="hljs-string">"Activated"</span>,
            <span class="hljs-number">3</span>: <span class="hljs-string">"Deactivating"</span>,
            <span class="hljs-number">4</span>: <span class="hljs-string">"Deactivated"</span>,
        }
        self._interface = ConnectionConfig.CONNECTOR_INTERFACE

        <span class="hljs-comment"># 迫于不知道 python 是怎么垃圾回收的, 在嵌入式系统里跑长期任务软件,</span>
        <span class="hljs-comment"># 选择只实例化一个 `dbus.SystemBus()`, 免得搞太多对象给 oom 了.</span>
        self._bus = dbus.SystemBus()
        self._connection_proxy = self._bus.get_object(
            <span class="hljs-string">"org.freedesktop.NetworkManager"</span>,
            <span class="hljs-string">"/org/freedesktop/NetworkManager/Settings"</span>
        )
        self._device_proxy = self._bus.get_object(
            <span class="hljs-string">"org.freedesktop.NetworkManager"</span>,
            <span class="hljs-string">"/org/freedesktop/NetworkManager"</span>
        )
        self._connection_manager = dbus.Interface(
            self._connection_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager"</span>)
        self._device_manager = dbus.Interface(
            self._device_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager"</span>)
        self._connection_settings = dbus.Interface(
            self._connection_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager.Settings"</span>)
        self._dbus_iface = dbus.Interface(
            self._connection_proxy, dbus_interface=<span class="hljs-string">"org.freedesktop.NetworkManager.Settings"</span>
        )
        self._device_path = self.get_device_path()
        <span class="hljs-comment"># 😎 上面这一大串以及接下来的一大串都严格按照</span>
        <span class="hljs-comment"># https://coderlmn.github.io/frontEndCourse/unmaintainable.html</span>
        <span class="hljs-comment"># 和</span>
        <span class="hljs-comment"># https://testing.googleblog.com/2008/07/how-to-write-3v1l-untestable-code.html</span>
        <span class="hljs-comment"># 编写.</span>
        <span class="hljs-comment"># 不要喊我来维护, 一次性的程序绝对没有更新迭代. (逃</span>

    <span class="hljs-comment"># true = activated</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_connection_statue</span><span class="hljs-params">(self)</span>:</span>
        manager_prop_iface = dbus.Interface(
            self._device_proxy, <span class="hljs-string">"org.freedesktop.DBus.Properties"</span>)
        activated_connections = manager_prop_iface.Get(
            <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, <span class="hljs-string">"ActiveConnections"</span>)
        <span class="hljs-comment"># 没看懂? 这些其实全都是从对象里取对象, Get("对象A", "对象A的balabala方法")</span>
        <span class="hljs-comment"># 至于为啥都是字符串, 小编也不知道.</span>

        <span class="hljs-keyword">for</span> a <span class="hljs-keyword">in</span> activated_connections:
            ac_proxy = self._bus.get_object(
                <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, a)
            prop_iface = dbus.Interface(
                ac_proxy, <span class="hljs-string">"org.freedesktop.DBus.Properties"</span>)
            state = prop_iface.Get(
                <span class="hljs-string">"org.freedesktop.NetworkManager.Connection.Active"</span>, <span class="hljs-string">"State"</span>)
            con_path = prop_iface.Get(
                <span class="hljs-string">"org.freedesktop.NetworkManager.Connection.Active"</span>, <span class="hljs-string">"Connection"</span>
            )
            con_proxy = self._bus.get_object(
                <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, con_path)
            settings_connection = dbus.Interface(
                con_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager.Settings.Connection"</span>
            )
            connection = settings_connection.GetSettings()
            <span class="hljs-comment"># 其实这个状态码有 ao 多, 更复杂的业务可以直接把状态返回出去在外部处理,</span>
            <span class="hljs-comment"># 这样更加符合单一职责规范, 但我就不😾</span>
            <span class="hljs-keyword">if</span> (connection[<span class="hljs-string">"connection"</span>][<span class="hljs-string">"id"</span>] == ConnectionConfig.CONNECT_PROFILE_NAME <span class="hljs-keyword">and</span> state == <span class="hljs-number">2</span>):
                <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">create_connection</span><span class="hljs-params">(self, ssid: str)</span>:</span>
        <span class="hljs-comment"># 完整的配置项可以在这里找到:</span>
        <span class="hljs-comment"># https://networkmanager.dev/docs/api/latest/ref-settings.html</span>
        connection_meta = dbus.Dictionary(
            {<span class="hljs-string">"type"</span>: <span class="hljs-string">"802-11-wireless"</span>,
                <span class="hljs-string">"uuid"</span>: str(uuid.uuid4()), <span class="hljs-string">"id"</span>: ConnectionConfig.CONNECT_PROFILE_NAME, <span class="hljs-string">"interface-name"</span>: self._interface}
        )
        wifi_meta = dbus.Dictionary(
            {<span class="hljs-string">"ssid"</span>: dbus.ByteArray(ssid.encode(<span class="hljs-string">"utf-8"</span>)),
             <span class="hljs-string">"mode"</span>: <span class="hljs-string">"infrastructure"</span>}
        )
        ipv4_meta = dbus.Dictionary({<span class="hljs-string">"method"</span>: <span class="hljs-string">"auto"</span>})
        ipv6_meta = dbus.Dictionary({<span class="hljs-string">"method"</span>: <span class="hljs-string">"ignore"</span>})
        connection_profile = dbus.Dictionary(
            {
                <span class="hljs-string">"connection"</span>: connection_meta,
                <span class="hljs-string">"802-11-wireless"</span>: wifi_meta,
                <span class="hljs-string">"ipv4"</span>: ipv4_meta,
                <span class="hljs-string">"ipv6"</span>: ipv6_meta,
            }
        )
        profile_path = (
            self._connection_settings.AddConnectionUnsaved(connection_profile))

        <span class="hljs-comment"># 连接一个 wifi 只需要这样, 然后这样, 这样完了就连上辣.</span>
        self.activate_connection(profile_path)

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">activate_connection</span><span class="hljs-params">(self, profile_path)</span>:</span>
        <span class="hljs-keyword">try</span>:
            self._device_manager.ActivateConnection(
                profile_path,
                self._device_path,
                <span class="hljs-string">"/"</span>)
        <span class="hljs-keyword">except</span>:
            <span class="hljs-comment"># 有错误处理, 但不完全处理.jpg</span>
            logging.error(<span class="hljs-string">"Failed to connect wifi, possible already connected"</span>)

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">disconnect</span><span class="hljs-params">(self)</span>:</span>
        device_proxy = self._bus.get_object(
            <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, self._device_path)
        dev_iface = dbus.Interface(
            device_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager.Device"</span>)
        dev_iface.Disconnect()
        <span class="hljs-comment"># 这个写法不存在 `断开一个不存在的连接配置`, 不用处理错误.</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">remove_connection</span><span class="hljs-params">(self)</span>:</span>
        connection_paths = self._connection_settings.ListConnections()
        <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> connection_paths:
            con_proxy = self._bus.get_object(
                <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, path)
            settings_connection = dbus.Interface(
                con_proxy, <span class="hljs-string">"org.freedesktop.NetworkManager.Settings.Connection"</span>)
            connection = settings_connection.GetSettings()
            <span class="hljs-keyword">if</span> (connection[<span class="hljs-string">"connection"</span>][<span class="hljs-string">"id"</span>] == ConnectionConfig.CONNECT_PROFILE_NAME):
                settings_connection.Delete()
            <span class="hljs-comment"># 如果这个方法被异步的东西同时调用了两次, 会有一次是尝试删除虚空配置, 然后报错.</span>
            <span class="hljs-comment"># <span class="hljs-doctag">TODO:</span> 错误处理</span>
            <span class="hljs-comment"># <span class="hljs-doctag">FIXME:</span> 关我屁事, 😸实践证明不存在这种情况啦.</span>

    <span class="hljs-comment"># 这个方法用来获得网卡在 dbus 里作为对象时候的对象.</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_device_path</span><span class="hljs-params">(self)</span>:</span>
        devices = self._device_manager.GetDevices()
        <span class="hljs-keyword">for</span> device_path <span class="hljs-keyword">in</span> devices:
            device_proxy = self._bus.get_object(
                <span class="hljs-string">"org.freedesktop.NetworkManager"</span>, device_path)
            prop_iface = dbus.Interface(
                device_proxy, <span class="hljs-string">"org.freedesktop.DBus.Properties"</span>)
            iface = prop_iface.Get(
                <span class="hljs-string">"org.freedesktop.NetworkManager.Device"</span>, <span class="hljs-string">"Interface"</span>)
            <span class="hljs-keyword">if</span> (iface == self._interface):
                <span class="hljs-keyword">return</span> device_path

</div></code></pre>
      <h2 id="%E5%8F%82%E8%80%83">参考</h2>
      <p><a href="https://people.freedesktop.org/~lkundrak/nm-docs/spec.html">NetworkManager D-Bus API Reference</a></p>
      <p>
        <a href="https://github.com/NetworkManager/NetworkManager/tree/main/examples/python/dbus"
          >NetworkManager Python Dbus Example</a
        >
      </p>
      <h2 id="%E5%90%8E%E8%AE%B0">后记</h2>
      <p>剧终.</p>
    </div>
  </div>
</template>

<style></style>
