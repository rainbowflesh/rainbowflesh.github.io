# Kismet 使用记录

最近, 在工作上遇到了使用 [kismet](https://www.kismetwireless.net/) 作为 web 服务器, 用以监听网络, 或者拓展 kismet 自带的 webUI.

## Setup

使用 Rock Pi 4c plus 作为开发板, 部署 kismet 服务; 跟随文档介绍, 添加 `apt` 仓库并下载二进制文件.

使用 SUID 模式操作网卡, 避免 Root 用户启动导致的安全问题.

> 二进制文件下载好会自动配置 kismet 用户组, 但是需要手动加入用户, 第一次安装的时候在这里踩了坑.

在 `/etc/kismet/kismet.conf` 中添加 `Datasource`, 或者我更喜欢使用命令 `kismet -c Datasource` 来启动.

第一次安装好启动, 报错提示无法启动网卡的监听模式, 查了一下资料发现 Rock Pi 的板载网卡 AzureWave aw-cm256sm 不支持监听模式; 随即找了个 RT 3070 USB 网卡, 印象里这是个免驱动, 或者说 Linux 自带驱动的网卡, 插板子上并没有起作用; 研究一通板载系统 `Rock Pi 4 Ubuntu Server 20.4 Focal`, 发现驱动是有的, 但是默认没有启用; 移植了一个驱动后, 还要编译一个启用的内核给板子用 😓, 但是又没找到这货的源码, 随便下了个 Ubuntu 20.04 凑合调了调就烧系统进去了; 然后, 然后! 随便找的这个系统又多了点东西, 但又少了点东西, 从二进制源下载安装 kismet 后, 竟然多了个 TUI, 又报错没有 `WireShark`, 也没法连到本地服务器 ( ﾟ ∀。).

折腾板子一星期, 自暴自弃后把网卡插开发机上跑 kismet, 实际体验流畅, 抓了一下 kismet RESTFul Api 的请求响应数据, mock 出来给前端用了 😋.

然而前端也是我在做, 之后让其他组员琢磨驱动去吧 ( ﾟ ∀。)

## WIP
