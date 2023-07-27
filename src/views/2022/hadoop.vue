<script setup lang="ts">
import BackToTopButton from "../../components/BackToTopButton.vue";
</script>
<template>
  <title>Hadoop 面经</title>

  <h1 id="hadoop-%E5%85%A8%E5%AE%B6%E6%A1%B6">Hadoop 全家桶</h1>
  <p>目录</p>
  <ol>
    <li>
      <a href="#hadoop-%E5%85%A8%E5%AE%B6%E6%A1%B6">Hadoop 全家桶</a>
      <ol>
        <li>
          <a href="#hadoop">Hadoop</a>
          <ol>
            <li>
              <a href="#hadoop-%E5%B8%B8%E8%A7%81%E8%BE%93%E5%85%A5%E6%A0%BC%E5%BC%8F">Hadoop 常见输入格式</a>
            </li>
            <li>
              <a
                href="#%E6%90%AD%E5%BB%BA-hadoop-%E9%9B%86%E7%BE%A4%E7%9A%84%E4%B8%BB%E8%A6%81%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6"
                >搭建 Hadoop 集群的主要配置文件</a
              >
            </li>
            <li>
              <a
                href="#%E6%AD%A3%E5%B8%B8%E7%9A%84-hadoop-%E9%9B%86%E7%BE%A4%E8%BF%9B%E7%A8%8B%E4%B8%8E%E4%BD%9C%E7%94%A8"
                >正常的 Hadoop 集群进程与作用</a
              >
            </li>
            <li>
              <a href="#secondarynode-%E7%9A%84%E5%85%B7%E4%BD%93%E4%BD%9C%E7%94%A8">SecondaryNode 的具体作用</a>
            </li>
            <li>
              <a href="#namenode-%E5%87%BA%E7%8E%B0%E6%95%85%E9%9A%9C%E5%A6%82%E4%BD%95%E6%81%A2%E5%A4%8D"
                >NameNode 出现故障如何恢复</a
              >
            </li>
            <li>
              <a href="#hadoop-%E7%9A%84-rack-awareness-%E6%98%AF%E4%BB%80%E4%B9%88">Hadoop 的 Rack Awareness 是什么</a>
            </li>
            <li>
              <a href="#hadoop-%E5%A4%A7%E7%89%88%E6%9C%AC%E5%8C%BA%E5%88%AB">Hadoop 大版本区别</a>
              <ol>
                <li><a href="#1x">1.x</a></li>
                <li><a href="#2x">2.x</a></li>
                <li><a href="#3x">3.x</a></li>
              </ol>
            </li>
            <li>
              <a href="#hadoop-%E9%AB%98%E5%8F%AF%E7%94%A8">Hadoop 高可用</a>
            </li>
            <li>
              <a href="#hadoop-%E9%85%8D%E7%BD%AE%E8%B0%83%E4%BC%98">Hadoop 配置调优</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#hdfs">HDFS</a>
          <ol>
            <li>
              <a href="#hdfs-%E6%96%87%E4%BB%B6%E7%9A%84%E4%B8%80%E4%BA%9B%E6%A6%82%E5%BF%B5">HDFS 文件的一些概念</a>
            </li>
            <li>
              <a href="#hdfs-%E7%9A%84-block">HDFS 的 Block</a>
              <ol>
                <li>
                  <a
                    href="#block-%E5%92%8C%E8%BE%93%E5%85%A5%E5%88%86%E5%89%B2%E7%9B%B4%E6%8E%A5%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB"
                    >Block 和输入分割直接有什么区别</a
                  >
                </li>
                <li>
                  <a href="#hdfs-%E7%9A%84-block-%E6%80%8E%E4%B9%88%E8%B0%83%E6%95%B4%E5%A4%A7%E5%B0%8F"
                    >HDFS 的 Block 怎么调整大小</a
                  >
                </li>
              </ol>
            </li>
            <li>
              <a
                href="#hdfs-%E5%AF%B9%E5%8D%95%E7%8B%AC%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E8%B0%83%E6%95%B4-block-%E5%A4%A7%E5%B0%8F"
                >HDFS 对单独一个文件调整 Block 大小</a
              >
            </li>
            <li>
              <a href="#block-%E5%89%AF%E6%9C%AC%E6%94%BE%E7%BD%AE%E7%AD%96%E7%95%A5">Block 副本放置策略</a>
              <ol>
                <li>
                  <a href="#1x-%E7%89%88%E6%9C%AC%E7%9A%84-hdfs">1.x 版本的 HDFS</a>
                </li>
                <li>
                  <a href="#2x-%E7%89%88%E6%9C%AC%E7%9A%84-hdfs">2.x 版本的 HDFS</a>
                </li>
              </ol>
            </li>
            <li><a href="#hdfs-%E5%86%99%E8%BF%87%E7%A8%8B">HDFS 写过程</a></li>
            <li><a href="#hdfs-%E8%AF%BB%E8%BF%87%E7%A8%8B">HDFS 读过程</a></li>
            <li>
              <a
                href="#%E5%BE%80-hdfs-%E9%87%8C-put-%E6%96%87%E4%BB%B6%E6%97%B6-hdfs-%E9%83%BD%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88"
                >往 HDFS 里 put 文件时 HDFS 都做了什么</a
              >
            </li>
          </ol>
        </li>
        <li>
          <a href="#mapreduce">MapReduce</a>
          <ol>
            <li>
              <a href="#mapreduce-%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E6%B5%81%E7%A8%8B"
                >MapReduce 的工作原理与流程</a
              >
            </li>
            <li>
              <a href="#map-%E7%9A%84%E8%BF%90%E8%A1%8C%E6%AD%A5%E9%AA%A4">Map 的运行步骤</a>
            </li>
            <li>
              <a href="#mapreduce-%E7%9A%84%E6%95%B0%E6%8D%AE%E5%80%BE%E6%96%9C">MapReduce 的数据倾斜</a>
            </li>
            <li>
              <a href="#mapper-combiner-%E5%90%8E%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88"
                >Mapper Combiner 后会发生什么</a
              >
            </li>
            <li>
              <a
                href="#map-%E8%BE%93%E5%87%BA%E7%9A%84%E6%95%B0%E6%8D%AE%E8%B6%85%E5%87%BA%E5%B0%8F%E6%96%87%E4%BB%B6%E5%86%85%E5%AD%98%E5%90%8E%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88"
                >Map 输出的数据超出小文件内存后会发生什么</a
              >
            </li>
            <li>
              <a href="#map-%E5%88%B0-reduce-%E9%BB%98%E8%AE%A4%E7%9A%84%E5%88%86%E5%8C%BA%E6%9C%BA%E5%88%B6"
                >Map 到 Reduce 默认的分区机制</a
              >
            </li>
            <li><a href="#split-%E6%9C%BA%E5%88%B6">Split 机制</a></li>
            <li>
              <a href="#%E4%B8%BA%E4%BB%80%E4%B9%88-split-%E4%B8%8D%E4%B8%8E-block-%E5%AF%B9%E5%BA%94"
                >为什么 Split 不与 Block 对应</a
              >
            </li>
            <li>
              <a href="#shuffle-%E5%8E%9F%E7%90%86%E4%B8%8E%E4%BC%98%E5%8C%96">Shuffle 原理与优化</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#yarn">YARN</a>
          <ol>
            <li><a href="#yarn-%E7%9A%84%E4%BC%98%E5%8A%BF">YARN 的优势</a></li>
            <li>
              <a href="#mapreduce-on-yarn-%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B">MapReduce on YARN 工作流程</a>
            </li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
  <h2 id="hadoop">Hadoop</h2>
  <h3 id="hadoop-%E5%B8%B8%E8%A7%81%E8%BE%93%E5%85%A5%E6%A0%BC%E5%BC%8F">Hadoop 常见输入格式</h3>
  <ul>
    <li>文本输入: 默认输入格式.</li>
    <li>序列文件输入: 要读取序列文件中的文件, 需要使用序列文件输入格式.</li>
    <li>KV 输入: 用于纯文本的输入.</li>
  </ul>
  <h3 id="%E6%90%AD%E5%BB%BA-hadoop-%E9%9B%86%E7%BE%A4%E7%9A%84%E4%B8%BB%E8%A6%81%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">
    搭建 Hadoop 集群的主要配置文件
  </h3>
  <ul>
    <li>
      core-site.xml
      <ul>
        <li>用于定义集群全局参数, 如 HDFS URL, Hadoop 临时目录等.</li>
      </ul>
    </li>
    <li>
      hdfs-site.xml
      <ul>
        <li>用于定义 HDFS 参数, 如节点名称, 数据节点的存放位置, 文件副本数, 文件读取权限等.</li>
      </ul>
    </li>
    <li>
      mapred-site.xml
      <ul>
        <li>
          用于定义 MapReduce 参数, 包括 JobHistory Server 和应用程序参数两部分, 如 Reduce 任务的默认个数,
          任务能够使用的内存大小等.
        </li>
      </ul>
    </li>
    <li>
      YARN-site.xml
      <ul>
        <li>集群资源管理器的配置, 例如 ReSourceManager, NodeManager, Web 监控程序的端口.</li>
      </ul>
    </li>
  </ul>
  <h3 id="%E6%AD%A3%E5%B8%B8%E7%9A%84-hadoop-%E9%9B%86%E7%BE%A4%E8%BF%9B%E7%A8%8B%E4%B8%8E%E4%BD%9C%E7%94%A8">
    正常的 Hadoop 集群进程与作用
  </h3>
  <ul>
    <li>
      NameNode
      <ul>
        <li>主节点, 负责维护整个 HDFS 文件系统的目录树, 以及每个文件所对应的 Block 块信息 (元数据).</li>
      </ul>
    </li>
    <li>
      DataNode
      <ul>
        <li>从节点, 负责存储具体的文件数据, 并且每个 Block 可以在多个 DataNode 上存储多个副本.</li>
      </ul>
    </li>
    <li>
      Secondary NameNode
      <ul>
        <li>
          相当于一个备用的 NameNode, 当 NameNode 下线之后, 可以将 Secondary NameNode 的数据备份到 NameNode 上面,
          但不能备份完整数据
        </li>
        <li>主要负责镜像备份, 日志与镜像定期合并.</li>
      </ul>
    </li>
  </ul>
  <h3 id="secondarynode-%E7%9A%84%E5%85%B7%E4%BD%93%E4%BD%9C%E7%94%A8">SecondaryNode 的具体作用</h3>
  <p>Secondary NameNode 会经常向 NameNode 发送请求,是否满足 check.</p>
  <p>当条件满足时, Secondary NameNode 将进行 CheckPoint .</p>
  <p>
    这时 NameNode 滚动当前正在写的 Edits, 将刚刚滚动掉的和之前 Edits 文件进行合并. Secondary NameNode 下载 Edits 文件,
    然后将 Edits 文件和自身保存的 fsimage 文件在内存中进行合并, 然后写入磁盘并上传新的 fsimage 到 nameNode, 这时
    NameNode 将旧的 fsimage 用新的替换掉.
  </p>
  <blockquote>
    <p><code>hdfs haadmin -getServiceState namenode_name</code> 查看状态.</p>
  </blockquote>
  <h3 id="namenode-%E5%87%BA%E7%8E%B0%E6%95%85%E9%9A%9C%E5%A6%82%E4%BD%95%E6%81%A2%E5%A4%8D">
    NameNode 出现故障如何恢复
  </h3>
  <ol>
    <li>使用文件系统元数据副本 FsImage 启动新的 NameNode.</li>
    <li>配置新的数据节点和 Client 使其确认新启动的 NameNode 节点名称.</li>
    <li>
      一旦新的 NameNode 完成加载最后一个从 DataNode 接收到足够阻止报告的 CheckPoint FsImage, 它将开始为 Client 提供服务.
    </li>
  </ol>
  <h3 id="hadoop-%E7%9A%84-rack-awareness-%E6%98%AF%E4%BB%80%E4%B9%88">Hadoop 的 Rack Awareness 是什么</h3>
  <p>应用于 NameNode 的算法, 用于确定如何放置块与其副本.</p>
  <p>定义: 在同一机架内的 DataNode 之间将网络流量最小化, 比如 AB 副本在同一机架, C 在另一个.</p>
  <h3 id="hadoop-%E5%A4%A7%E7%89%88%E6%9C%AC%E5%8C%BA%E5%88%AB">Hadoop 大版本区别</h3>
  <h4 id="1x">1.x</h4>
  <p>由 HDFS 与 MapReduce 组成.</p>
  <ul>
    <li>HDFS 作为文件系统.</li>
    <li>MapReduce 负责计算和资源调度工作.</li>
    <li>由主节点 Jobtrack 和子节点 Tasktrack 组成.</li>
    <li>Tasktrack 负责执行任务, 任务由 MapTask 和 ReduceTask 完成.</li>
  </ul>
  <h4 id="2x">2.x</h4>
  <p>由 HDFS, YARN, MapReduce 与其他程序组成.</p>
  <ul>
    <li>
      <p>将资源调度工作剥离出, 做成了独立的框架 YARN.</p>
    </li>
    <li>
      <p>
        出现了双 NameNode 结构, 允许一个 StandbyNameNode (SecondaryNameNode) 负责热备, 通过 Quorum Journal Manager
        实现数据同步.
      </p>
    </li>
  </ul>
  <h4 id="3x">3.x</h4>
  <p>随着 2.x 使 Hadoop 能够承载更大的集群, 而文件系统的数据冗余也徒增, 3.x 主要负责改善可用性与资源利用率.</p>
  <ul>
    <li>HDFS 引入了纠删码功能.</li>
    <li>可以有更多的 StandbyNameNode 了.</li>
    <li>隔离 Client, 引入 Router 与 State Store 组成的拦截转发层对 Client 进行交互.</li>
  </ul>
  <h3 id="hadoop-%E9%AB%98%E5%8F%AF%E7%94%A8">Hadoop 高可用</h3>
  <blockquote>
    <p>我备份了元数据, 当整个集群崩溃, 只剩下几个 datanode 的时候, 是否可以恢复?</p>
  </blockquote>
  <h3 id="hadoop-%E9%85%8D%E7%BD%AE%E8%B0%83%E4%BC%98">Hadoop 配置调优</h3>
  <ul>
    <li>MapReduce 计算是磁盘 I/O 行为, 所以调整预读缓冲区大小 (core-site.xml &gt; buffer.size).</li>
    <li>调整 Block 的大小 (hdfs-site.xml &gt; dfs.Block.size).</li>
  </ul>
  <h2 id="hdfs">HDFS</h2>
  <h3 id="hdfs-%E6%96%87%E4%BB%B6%E7%9A%84%E4%B8%80%E4%BA%9B%E6%A6%82%E5%BF%B5">HDFS 文件的一些概念</h3>
  <ul>
    <li>
      <p>
        元信息: 是数据文件的 Block 大小, 文件副本存储位置, 副本数量, Block 数量, 主要体现在 Edits 文件和 Fsimage 文件.
      </p>
    </li>
    <li>
      <p>副本数: HDFS 中同一个文件在多个节点中所存储的总数量, 也是实现持久化和保证安全性的关键.</p>
    </li>
    <li>
      <p>文件目录树: HDFS 提供了一个可以维护的文件目录, 该文件目录下存储着有关所有 HDFS 的文件.</p>
    </li>
    <li>
      <p>Block 数据节点信息: 如 a 文件在 01 和 02 节点中存储, 该信息称为数据节点信息.</p>
    </li>
    <li>
      <p>Edits: 记录 Client 执行创建,移动,修改文件的信息, 同时体现了 HDFS 的最新的状态 (二进制文件).</p>
      <ul>
        <li>
          它分布在磁盘上的多个文件, 名称由前缀 Edits 及后缀组成.后缀值是该文件包含的事务
          ID,同一时刻只有一个文件处于可读写状态.为避免数据丢失,事务完成后 client 端在执行成功前,文件会进行更新和同步,当
          NN 向多个目录写数据时,只有在所有操作更新并同步到每个副本之后执行才成功.
        </li>
      </ul>
    </li>
    <li>
      <p>Fsimage: 记录的是数据块的位置信息, 数据块的冗余信息 (二进制文件).</p>
      <ul>
        <li>
          由于 Edits 文件记录了最新状态信息, 并且随着操作越多, Edits 文件就会越大, 把 Edits 文件中最新的信息写到 fsimage
          文件中就解决了 Edits 文件数量多不方便管理的情况. 没有体现 HDFS 的最新状态.
        </li>
      </ul>
    </li>
    <li>
      <p>每个 fsimage 文件都是文件系统元数据的一个完整的永久性的检查点.</p>
    </li>
  </ul>
  <h3 id="hdfs-%E7%9A%84-block">HDFS 的 Block</h3>
  <p>默认保存 3 分, 每份 128 mb.</p>
  <blockquote>
    <p>1.x 使用 64 mb 作为 Block 大小.</p>
  </blockquote>
  <h4
    id="block-%E5%92%8C%E8%BE%93%E5%85%A5%E5%88%86%E5%89%B2%E7%9B%B4%E6%8E%A5%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB"
  >
    Block 和输入分割直接有什么区别
  </h4>
  <p>HDFS 将输入数据物理上划分为 Block; 输入拆分是映射器对数据的逻辑划分, 用于映射操作.</p>
  <h4 id="hdfs-%E7%9A%84-block-%E6%80%8E%E4%B9%88%E8%B0%83%E6%95%B4%E5%A4%A7%E5%B0%8F">HDFS 的 Block 怎么调整大小</h4>
  <p>在配置文件 hdfs-site.xml 中加入, 所有的 DataNode 都要加.</p>
  <pre class="hljs"><code><div>
<span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>dfs.Block.size<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>size=mb*1024*1024<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>调整大小<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
</div></code></pre>
  <blockquote>
    <p>对现有的 Block 不起作用, 若要改动可以用 DistCp (distributed copy) 工具.</p>
  </blockquote>
  <h3
    id="hdfs-%E5%AF%B9%E5%8D%95%E7%8B%AC%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E8%B0%83%E6%95%B4-block-%E5%A4%A7%E5%B0%8F"
  >
    HDFS 对单独一个文件调整 Block 大小
  </h3>
  <pre class="hljs"><code><div>hdfs dfs -Ddfs.Blocksize=size=mb*1024*1024 -put FILE_DIR HDFS_DIR
</div></code></pre>
  <h3 id="block-%E5%89%AF%E6%9C%AC%E6%94%BE%E7%BD%AE%E7%AD%96%E7%95%A5">Block 副本放置策略</h3>
  <h4 id="1x-%E7%89%88%E6%9C%AC%E7%9A%84-hdfs">1.x 版本的 HDFS</h4>
  <ol>
    <li>副本 1 放置在上传文件的 DataNode 中; 集群外提交则挑选一台磁盘和 CPU 占用率低的节点.</li>
    <li>副本 2 放置在与副本 1 不同机架的集群上.</li>
    <li>副本 3 和副本 1 放同一机架上.</li>
    <li>更多的副本随机放置.</li>
  </ol>
  <h4 id="2x-%E7%89%88%E6%9C%AC%E7%9A%84-hdfs">2.x 版本的 HDFS</h4>
  <ol>
    <li>副本 1 与 1.x 版本类似.</li>
    <li>同上.</li>
    <li>放在副本 2 所在的机架上.</li>
    <li>同上.</li>
  </ol>
  <h3 id="hdfs-%E5%86%99%E8%BF%87%E7%A8%8B">HDFS 写过程</h3>
  <ol>
    <li>Client 对 NameNode 发起上传请求, NameNode 检查文件和目录是否存在, 返回是否可以上传.</li>
    <li>NameNode 查询从节点后返回 Client 请求的第一个 Block 的目标 DataNode.</li>
    <li>
      Client 若请求 NameNode 使用就近原则, 则向最近的 DataNode 上传数据, DataNode 与其他节点建立 Pipeline 并逐级调用.
    </li>
    <li>Client 上传第一个 Block 到 DataNode, DataNode 以 Package 为单位向其他节点传输 Package 并创建应答队列与等待.</li>
    <li>
      当第一个 Block 传输完成后, Client 再次请求 NameNode 上传第二个 Block. 此时的 Client 传输和 Block 的汇报是并行的.
    </li>
  </ol>
  <h3 id="hdfs-%E8%AF%BB%E8%BF%87%E7%A8%8B">HDFS 读过程</h3>
  <ol>
    <li>Client 创建一个对象与 NameNode 进行 RPC 通信, 收到 NameNode 对象后, 请求获取文件的元数据.</li>
    <li>NameNode 校验后返回元数据.</li>
    <li>Client 拿到元数据后读取 DataNode 中的 Block, 并合并 Block 成单文件然后返回.</li>
  </ol>
  <h3 id="%E5%BE%80-hdfs-%E9%87%8C-put-%E6%96%87%E4%BB%B6%E6%97%B6-hdfs-%E9%83%BD%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88">
    往 HDFS 里 put 文件时 HDFS 都做了什么
  </h3>
  <h2 id="mapreduce">MapReduce</h2>
  <h3 id="mapreduce-%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E6%B5%81%E7%A8%8B">
    MapReduce 的工作原理与流程
  </h3>
  <p>原理:</p>
  <ol>
    <li>
      <p>
        MapReduce 将得到的 Split 分配对应的 Task, 每个任务处理相对应的 Split, 以 Line 方式读取单行数据, 数据依次读到
        <code>mapreduce.Task.io.sort.mb</code> 的环形缓冲区.
      </p>
    </li>
    <li>
      <p>
        读取过程中一旦达到阈值
        <code>mapreduce.map.sort.spill.percent</code> 则进行溢写操作, Spiller 线程溢写到磁盘
        <code>mapreduce.cluster.local.dir</code> 目录中, 期间进行 K/V 分区, 分区数由 Reduce 数决定, 默认使用
        HashPartitioner.
      </p>
    </li>
    <li>
      <p>
        再将分区中数据按照 Key 分组和排序, 默认是字典和升序. 如果设置了 setCombinerClass 则会对每个分区中的数据进行
        Combiner 操作.
        <code>output.compress</code> 还会压缩溢写的数据.
      </p>
    </li>
    <li>
      <p>之后 Merge 根据分区规则, 将数据归并到一个文件里等待 Reduce PULL 到一个节点上, .</p>
    </li>
    <li>
      <p>
        NodeManager 将启动一个 <code>mapreduce_Shuffle</code> 服务将数据以 HTTP 的方式 PULL 到一个节点上, 到 Reduce 上.
        Reduce 处理达到阈值或 Map 输出达到阈值便 Merge ( 同一分区的一组数据会先进行归并), Sort (将归并好的数据进行排序),
        group (判断迭代器中的元素是否可以迭代), 处理完成后 MapReduce 将同一分区内的数据写入 HDFS.
      </p>
    </li>
  </ol>
  <blockquote>
    <p>
      其中 Reduce 的 Merge 达到阈值会触发, Sort 则是维持 Map 阶段的排序, Group 设置
      <code>setGroupingComparatorClass</code> 后才会触发.
    </p>
  </blockquote>
  <p>流程:</p>
  <ol>
    <li>Client 启动一个 Job, 向 JobTracker 请求一个 JobID.</li>
    <li>
      Client 将所需数据上传给 HDFS, 包括 MapReduce 打包的 jar 文件, 配置文件, 以及计算所需的输入划分信息; 这些文件储存在
      JobTracker 的 JobID 目录中, jar 会创建多个副本, 输入划分信息对应着 JobTracker 应启动多少个 Map 任务.
    </li>
    <li>JobTracker 将资源放入作业队列中, 调度器调度后根据输入划分信息划分 Map 任务并分发给 TaskTracker 执行.</li>
    <li>TaskTracker 心跳访问 JobTracker, 访问内容包含 Map 任务进度.</li>
    <li>最后一个任务完成后, JobTracker 设置这个任务为成功, 并返回给 Client, Client 再通知给操作者.</li>
  </ol>
  <h3 id="map-%E7%9A%84%E8%BF%90%E8%A1%8C%E6%AD%A5%E9%AA%A4">Map 的运行步骤</h3>
  <ol>
    <li>Mapper 根据文件分区.</li>
    <li>Sort 将 Mapper 产生的结果按照 Key 进行排列.</li>
    <li>Combiner 将 Key 相同的记录合并.</li>
    <li>Partition 把数据均衡的分发给 Reducer.</li>
    <li>Shuffle 将 Mapper 的结果传输给 Reduce, 也是数据倾斜会出现的步骤.</li>
  </ol>
  <h3 id="mapreduce-%E7%9A%84%E6%95%B0%E6%8D%AE%E5%80%BE%E6%96%9C">MapReduce 的数据倾斜</h3>
  <blockquote>
    <p>
      数据倾斜发生在 Reduce 端. Mapper 处理完数据传给 Reduce, 此时 Reduce 会因为大量的 Key 导致执行时间过长引起堵塞.
    </p>
  </blockquote>
  <p>优化数据倾斜:</p>
  <p>
    对数据进行清洗与治理. 可以在 Mapper 期间将大量相同的 Key 打散, 比如添加 N 以内的随机数前缀; 可以对数据较多的 Key
    进行子扩展, 先进行局部操作, 再去除随机数后 Combiner, 避免在 Shuffle 时出现数据倾斜.
  </p>
  <h3 id="mapper-combiner-%E5%90%8E%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88">Mapper Combiner 后会发生什么</h3>
  <p>运行速度会提升, Mapper 到 Reduce 的数据量也会变少, 因为 Combiner 把相同的 Key 合并了.</p>
  <h3
    id="map-%E8%BE%93%E5%87%BA%E7%9A%84%E6%95%B0%E6%8D%AE%E8%B6%85%E5%87%BA%E5%B0%8F%E6%96%87%E4%BB%B6%E5%86%85%E5%AD%98%E5%90%8E%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88"
  >
    Map 输出的数据超出小文件内存后会发生什么
  </h3>
  <p>数据会写入到磁盘中. Map, Reduce 是 I/O 操作.</p>
  <h3 id="map-%E5%88%B0-reduce-%E9%BB%98%E8%AE%A4%E7%9A%84%E5%88%86%E5%8C%BA%E6%9C%BA%E5%88%B6">
    Map 到 Reduce 默认的分区机制
  </h3>
  <p>对 Map 中的 Key 取哈希值, 对 Reduce 的个数取模.</p>
  <h3 id="split-%E6%9C%BA%E5%88%B6">Split 机制</h3>
  <p>
    Spilt 是 MapReduce 中 Map 之前的概念. Split 切片大小默认为 Block 的 1.1 倍, 在
    <code>FileInputFormat</code> 中计算切片大小的逻辑:
  </p>
  <pre
    class="hljs"
  ><code><div><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> String SPLIT_MAXSIZE=<span class="hljs-string">"mapreduce.input.fileinputformat.split.maxsize"</span>;
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> String SPLIT_MINSIZE=<span class="hljs-string">"mapreduce.input.fileinputformat.split.minsize"</span>;
<span class="hljs-function"><span class="hljs-keyword">protected</span> <span class="hljs-keyword">long</span> <span class="hljs-title">computeSplitSize</span><span class="hljs-params">(<span class="hljs-keyword">long</span> BlockSize,<span class="hljs-keyword">long</span> minSize,<span class="hljs-keyword">long</span> maxSize)</span></span>{
        <span class="hljs-keyword">return</span> Math.max(minSize,Math.min(maxSize,BlockSize));
        }
</div></code></pre>
  <h3 id="%E4%B8%BA%E4%BB%80%E4%B9%88-split-%E4%B8%8D%E4%B8%8E-block-%E5%AF%B9%E5%BA%94">
    为什么 Split 不与 Block 对应
  </h3>
  <p>大量小文件场景下 Map 进程造成的资源严重浪费.</p>
  <h3 id="shuffle-%E5%8E%9F%E7%90%86%E4%B8%8E%E4%BC%98%E5%8C%96">Shuffle 原理与优化</h3>
  <h2 id="yarn">YARN</h2>
  <h3 id="yarn-%E7%9A%84%E4%BC%98%E5%8A%BF">YARN 的优势</h3>
  <p>
    YARN 集群以主从架构组织, 主节点 ReSourceManage 负责资源调度分配, NodeMange 负责计算节点管理,
    资源监控和启动应用所需的 Combiner. YARN 一般和 MapReduce 结合, 主要对 MapReduce 中的资源计算进行维护.
  </p>
  <h3 id="mapreduce-on-yarn-%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B">MapReduce on YARN 工作流程</h3>
  <ol>
    <li>向 Client 提交 MapReduce Job.</li>
    <li>YARN 的 ReSourceManager 进行资源分配.</li>
    <li>NodeManager 加载并监控 Containers.</li>
    <li>
      通过 ApplicationMaster 与 ReSourceManager 进行资源的申请和状态交互, 由 NodeManagers 进行 MapReduce 运行时 Job
      的管理.
    </li>
    <li>通过 HDFS 进行 Job 配置文件, Jar 包的节点分发.</li>
  </ol>
  <BackToTopButton />
</template>
