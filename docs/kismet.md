# Kismet 使用记录

最近, 在工作上遇到了使用 [kismet](https://www.kismetwireless.net/) 作为 web 服务器, 用以监听网络.

## Setup

使用 Rock Pi 4c plus 作为开发板, 部署 kismet 服务; 跟随文档介绍, 添加 `apt` 仓库并下载二进制文件.

使用 SUID 模式操作网卡, 避免 Root 用户启动导致的安全问题.
> 二进制文件下载好会自动配置 kismet 用户组, 但是需要手动加入用户, 第一次安装的时候在这里踩了坑.

在 `/etc/kismet/kismet.conf` 中添加 `Datasource`, 这里使用一个 USB 外接网卡 `wlan1` 作为数据源.
> 第一次安装好启动, 报错提示无法启动网卡的监听模式, 查了一下资料发现 Rock Pi 的板载网卡 `AzureWave awcm256sm` 不支持监听模式

## WIP
