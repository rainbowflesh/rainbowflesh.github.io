<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <title>Kismet Usage</title>
  <div class="container">
    <div class="content">
      <h1 id="kismet-%E4%BD%BF%E7%94%A8%E8%AE%B0%E5%BD%95">Kismet 使用记录</h1>
      <p>
        最近, 在工作上遇到了使用
        <a href="https://www.kismetwireless.net/">kismet</a> 作为 web 服务器,
        用以监听网络.
      </p>
      <h2 id="setup">Setup</h2>
      <p>
        使用 Rock Pi 4c plus 作为开发板, 部署 kismet 服务; 跟随文档介绍, 添加
        <code>apt</code> 仓库并下载二进制文件.
      </p>
      <p>使用 SUID 模式操作网卡, 避免 Root 用户启动导致的安全问题.</p>
      <blockquote>
        <p>
          二进制文件下载好会自动配置 kismet 用户组, 但是需要手动加入用户,
          第一次安装的时候在这里踩了坑.
        </p>
      </blockquote>
      <p>
        在 <code>/etc/kismet/kismet.conf</code> 中添加 <code>Datasource</code>,
        这里使用一个 USB 外接网卡 <code>wlan1</code> 作为数据源.
      </p>
      <blockquote>
        <p>
          第一次安装好启动, 报错提示无法启动网卡的监听模式, 查了一下资料发现
          Rock Pi 的板载网卡 <code>AzureWave awcm256sm</code> 不支持监听模式
        </p>
      </blockquote>
      <h2 id="wip">WIP</h2>
    </div>
  </div>
</template>

<style></style>
