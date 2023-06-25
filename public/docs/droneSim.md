# 集群验证

最近研究无人机集群仿真, 用 Pixhawk 2.4.8 做硬件在环, QGC 地面站与 AirSim 模拟器.

## 装环境

我们选择在 Windows 平台搭建环境, 主要图 gv100 显卡的驱动稳定性和 UE4 的软件稳定性.

Follow the [introduce](https://microsoft.github.io/AirSim/px4_setup/).

### 软件在环

先尝试在 wsl 里跑 PX4 跑通再说硬件;

1. 注册 epic 账号下载 UE4;
2. 编译个 [AirSim 插件](https://microsoft.github.io/AirSim/build_windows); 完事后拖进 ue4 用.
3. 下载 [QGC](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html)
4. 装个[普洱 TS](https://github.com/Tencent/puerts), 用 cpp 写 ue 开发不如写 web 简单.
5. 装个[vitruvio](https://github.com/Esri/vitruvio/blob/main/doc/installation.md) 自动生成城市模型, 迫于百京不让航拍扫模只能用次下下策.
6. 装 wsl, 最开始测 SIL 的时候 px4 还只能跑在 wsl1 里, 现在好像能在 wsl2 里运行了, 不过这里还是继续用 1.
7. 在 wsl 里装 px4,

### 硬件在环

迫于贫穷, 只能用停产的 pixhawk 2.4.8 平台, 出于一些奇妙深刻的原因, 还不能用 px4 飞控, 被迫下载 [fmt](https://github.com/Firmament-Autopilot/FMT-Firmware) 飞控, 这下完全国产自主研发了.

###### <del>ps: 为什么这个飞控的名字叫做格式化</del>

---

下载固件其实是很简单的, 只需要将飞控硬件用 usb 连接到电脑, 打开 QGC 菜单选择载具配置, 里面有可视化界面和自动脚本去完成下载.

但是 fmt 有一些 bug, 不知道是飞控硬件摔了, 还是太过古老的设备不支持, gps 模块, 高度计都是出错的, 似乎只有水平仪**能够**工作 (放在水平面上是歪的).

## 起飞

飞控炸了, qgc 里没办法校准传感器, airsim 里没法和 qgc 通讯.
![飞不起来](/public/images/blogsfeibuqilai.jpeg)

## TODO

下周继续搞这个
