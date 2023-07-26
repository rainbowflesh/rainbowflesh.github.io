<script setup lang="ts"></script>
<template>
  <title>Drone sim</title>
  <div class="container">
    <div class="content">
      <h1 id="%E9%9B%86%E7%BE%A4%E9%AA%8C%E8%AF%81">集群验证</h1>
      <p>最近研究无人机集群仿真, 用 Pixhawk 2.4.8 做硬件在环, QGC 地面站与 AirSim 模拟器.</p>
      <h2 id="%E8%A3%85%E7%8E%AF%E5%A2%83">装环境</h2>
      <p>我们选择在 Windows 平台搭建环境, 主要图 gv100 显卡的驱动稳定性和 UE4 的软件稳定性.</p>
      <p>
        Follow the
        <a href="https://microsoft.github.io/AirSim/px4_setup/">introduce</a>.
      </p>
      <h3 id="%E8%BD%AF%E4%BB%B6%E5%9C%A8%E7%8E%AF">软件在环</h3>
      <p>先尝试在 wsl 里跑 PX4 跑通再说硬件;</p>
      <ol>
        <li>注册 epic 账号下载 UE4;</li>
        <li>
          编译个
          <a href="https://microsoft.github.io/AirSim/build_windows">AirSim 插件</a>; 完事后拖进 ue4 用.
        </li>
        <li>
          下载
          <a href="https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html">QGC</a>
        </li>
        <li>装个<a href="https://github.com/Tencent/puerts">普洱 TS</a>, 用 cpp 写 ue 开发不如写 web 简单.</li>
        <li>
          装个<a href="https://github.com/Esri/vitruvio/blob/main/doc/installation.md">vitruvio</a>
          自动生成城市模型, 迫于百京不让航拍扫模只能用次下下策.
        </li>
        <li>装 wsl, 最开始测 SIL 的时候 px4 还只能跑在 wsl1 里, 现在好像能在 wsl2 里运行了, 不过这里还是继续用 1.</li>
        <li>在 wsl 里装 px4,</li>
      </ol>
      <h3 id="%E7%A1%AC%E4%BB%B6%E5%9C%A8%E7%8E%AF">硬件在环</h3>
      <p>
        迫于贫穷, 只能用停产的 pixhawk 2.4.8 平台, 出于一些奇妙深刻的原因, 还不能用 px4 飞控, 被迫下载
        <a href="https://github.com/Firmament-Autopilot/FMT-Firmware">fmt</a>
        飞控, 这下完全国产自主研发了.
      </p>
      <h6
        id="delps-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%99%E4%B8%AA%E9%A3%9E%E6%8E%A7%E7%9A%84%E5%90%8D%E5%AD%97%E5%8F%AB%E5%81%9A%E6%A0%BC%E5%BC%8F%E5%8C%96del"
      >
        <del>ps: 为什么这个飞控的名字叫做格式化</del>
      </h6>
      <hr />
      <p>
        下载固件其实是很简单的, 只需要将飞控硬件用 usb 连接到电脑, 打开 QGC 菜单选择载具配置,
        里面有可视化界面和自动脚本去完成下载.
      </p>
      <p>
        但是 fmt 有一些 bug, 不知道是飞控硬件摔了, 还是太过古老的设备不支持, gps 模块, 高度计都是出错的,
        似乎只有水平仪<strong>能够</strong>工作 (放在水平面上是歪的).
      </p>
      <h2 id="%E8%B5%B7%E9%A3%9E">起飞</h2>
      <p>
        飞控炸了, qgc 里没办法校准传感器, airsim 里没法和 qgc 通讯.
        <img src="/images/blogs/feibuqilai.jpg" alt="飞不起来" />
      </p>
      <h2 id="todo">TODO</h2>
      <p>下周继续搞这个</p>
    </div>
  </div>
</template>

<style></style>
