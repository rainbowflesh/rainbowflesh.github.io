<script setup lang="ts">
import BackToTopButton from "../../components/BackToTopButton.vue";
</script>
<template>
  <title>Blog Spark</title>
  <div class="container">
    <div class="content">
      <h1 id="%E8%AE%A1%E7%AE%97%E6%A1%86%E6%9E%B6-spark">计算框架 Spark</h1>
      <p>目录</p>
      <ol>
        <li>
          <a href="#%E8%AE%A1%E7%AE%97%E6%A1%86%E6%9E%B6-spark">计算框架 Spark</a>
          <ol>
            <li>
              <a href="#spark">Spark</a>
              <ol>
                <li>
                  <a href="#spark-%E4%B8%AD-job-stage-task-%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88"
                    >Spark 中 job, stage, Task 分别是什么</a
                  >
                </li>
                <li>
                  <a href="#%E4%BB%80%E4%B9%88%E6%98%AF-rdd">什么是 RDD</a>
                  <ol>
                    <li>
                      <a href="#reducebykey-%E5%92%8C-groupbykey-%E7%9A%84%E5%8C%BA%E5%88%AB"
                        >reduceByKey 和 groupByKey 的区别</a
                      >
                    </li>
                    <li>
                      <a href="#rdd-%E7%9A%84%E5%88%9B%E5%BB%BA%E6%96%B9%E5%BC%8F">RDD 的创建方式</a>
                    </li>
                    <li>
                      <a href="#rdd-%E7%9A%84%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB">RDD 的依赖关系</a>
                    </li>
                    <li>
                      <a
                        href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%92%E5%88%86%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB"
                        >为什么要划分依赖关系</a
                      >
                    </li>
                    <li>
                      <a href="#rdd-%E7%9A%84%E7%BC%93%E5%AD%98%E6%8C%81%E4%B9%85%E5%8C%96%E6%9C%BA%E5%88%B6"
                        >RDD 的缓存持久化机制</a
                      >
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#spark-%E8%B0%83%E4%BC%98">Spark 调优</a>
                  <ol>
                    <li>
                      <a
                        href="#%E4%BF%AE%E6%94%B9%E5%BA%8F%E5%88%97%E5%8C%96%E6%9C%BA%E5%88%B6%E5%8E%8B%E7%BC%A9%E6%95%B0%E6%8D%AE%E9%87%8F"
                        >修改序列化机制压缩数据量</a
                      >
                    </li>
                    <li>
                      <a
                        href="#%E6%A0%B9%E6%8D%AE%E4%BD%9C%E4%B8%9A%E7%8E%AF%E5%A2%83-%E6%8F%90%E4%BA%A4%E4%BB%BB%E5%8A%A1%E6%97%B6%E8%B0%83%E6%95%B4-spark-submitsh-%E5%8F%82%E6%95%B0"
                        >根据作业环境, 提交任务时调整 spark-submit.sh 参数</a
                      >
                    </li>
                    <li>
                      <a href="#%E6%8F%90%E9%AB%98%E5%B9%B6%E8%A1%8C%E5%BA%A6">提高并行度</a>
                    </li>
                    <li>
                      <a href="#rdd-%E7%9A%84%E9%87%8D%E7%94%A8%E5%92%8C%E6%8C%81%E4%B9%85%E5%8C%96"
                        >RDD 的重用和持久化</a
                      >
                    </li>
                    <li>
                      <a
                        href="#%E9%80%82%E5%BD%93%E5%B9%BF%E6%92%AD%E5%A4%9A%E6%AC%A1%E4%BD%BF%E7%94%A8%E7%9A%84%E5%8F%98%E9%87%8F"
                        >适当广播多次使用的变量</a
                      >
                    </li>
                    <li>
                      <a
                        href="#%E9%81%BF%E5%85%8D%E4%BA%A7%E7%94%9F-shuffle-%E5%8F%AF%E4%BB%A5%E5%87%8F%E5%B0%91%E7%BD%91%E7%BB%9C-io-%E5%92%8C%E5%88%86%E5%8C%BA%E9%97%B4%E4%BC%A0%E8%BE%93%E6%B6%88%E8%80%97"
                        >避免产生 Shuffle 可以减少网络 IO 和分区间传输消耗</a
                      >
                    </li>
                    <li>
                      <a href="#%E4%BD%BF%E7%94%A8-map-side-%E9%A2%84%E5%85%88%E8%81%9A%E5%90%88-shuffle"
                        >使用 map-side 预先聚合 Shuffle</a
                      >
                    </li>
                    <li>
                      <a href="#%E4%BD%BF%E7%94%A8%E9%AB%98%E6%80%A7%E8%83%BD%E7%AE%97%E5%AD%90">使用高性能算子</a>
                    </li>
                  </ol>
                </li>
                <li>
                  <a
                    href="#sparkstreaming-%E5%9C%A8%E6%B6%88%E8%B4%B9-kafka-%E6%97%B6%E4%B8%8B%E7%BA%BF-%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E9%87%8D%E5%90%AF%E5%90%8E%E7%BB%A7%E7%BB%AD%E6%B6%88%E8%B4%B9"
                    >SparkStreaming 在消费 Kafka 时下线, 如何保证重启后继续消费</a
                  >
                </li>
                <li>
                  <a href="#spark-%E7%B4%AF%E5%8A%A0%E5%99%A8">Spark 累加器</a>
                </li>
                <li>
                  <a href="#spark-%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%9C%BA%E5%88%B6">Spark 的工作机制</a>
                </li>
                <li>
                  <a href="#spark-%E6%A8%A1%E5%9D%97%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B">Spark 模块都有哪些</a>
                </li>
                <li>
                  <a href="#dstream-%E5%92%8C-dstreamgraph-%E7%9A%84%E5%8C%BA%E5%88%AB"
                    >DStream 和 DStreamGraph 的区别</a
                  >
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
      <h2 id="spark">Spark</h2>
      <ul>
        <li>Spark 是基于内存计算, MapReduce 基于磁盘运算, 所以速度更快.</li>
        <li>Spark 拥有高效的调度算法, 基于 DAG 形成一系列有向无环图.</li>
        <li>Spark 通过 RDD 算子来运算, 具有转换与动作两种操作, 可以把运算结果缓存在内存, 再计算出来.</li>
        <li>Spark 还拥有容错机制 Linage 算子, 可以把失败的任务重新执行.</li>
      </ul>
      <h3 id="spark-%E4%B8%AD-job-stage-task-%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88">
        Spark 中 job, stage, Task 分别是什么
      </h3>
      <ul>
        <li>
          job 是提交给 Spark 的任务, 会被拆分为多组 Task, 每一次数据的 Shuffle 都会产生一个 stage; 每次 action
          都会产生一个 job.
        </li>
        <li>
          stage 是 job 执行需要的阶段. 划分 stage 使每一个 stage 只有窄依赖, 可以实现流计算, 同时每一个 Task
          对应一个分区, 增加了 Task 的并行运行量.
        </li>
        <li>
          Task 是 stage 的任务执行单元, 通常和 RDD 的 Partition 数量相同, 只是处理一个 Partition 上的数据; 每个 Task
          都是一个 JVM 实例, JVM 的开启与销毁会降低系统运行效率; Task 是任务的最小单位, 最终运行在 Executor 中.
        </li>
      </ul>
      <h3 id="%E4%BB%80%E4%B9%88%E6%98%AF-rdd">什么是 RDD</h3>
      <p>
        RDD 就是弹性分布式数据集 Resilient Distributed Datasets, Spark 的数据抽象概念, 是一种不可变分布式对象集合; 每个
        RDD 都被分为多个分区, 运行在集群不同节点上, 拥有多种不同的 RDD 算子.
      </p>
      <ul>
        <li>
          <p>
            transformation 中有 map().filter(), flatMap(), groupByKey(), reduceByKey(), sortByKey(), join(), cogroup(),
            distinct(), sample(), union(), intersection(), cartesian(), pipe() 等.
          </p>
        </li>
        <li>
          <p>
            action 中有 mapPartitions(), foreach(), collect(), count(), take(), top(), takeOrdered(), saveAsTextFile(),
            saveAsObjectFile(), persist(), unpersist(), checkpoint(), checkpointFile(), checkpointRDD(),
            getCheckpointFile() 等.
          </p>
        </li>
      </ul>
      <h4 id="reducebykey-%E5%92%8C-groupbykey-%E7%9A%84%E5%8C%BA%E5%88%AB">reduceByKey 和 groupByKey 的区别</h4>
      <ul>
        <li>
          reduceByKey 会在结果处发送至 Reducer 前, 对每个 Mapper 在本地进行 Merge; 类似于 MapReduce 中的 Combiner,
          这样做使 Map 端进行一次 Reduce 后数据量会大幅度减小, 从而降低传输量, 保证 Reduce 能够更快的进行结果计算.
        </li>
        <li>
          groupByKey 会对每一个 RDD 中的 value 值进行聚合形成序列 Iterator, 此操作发生在 Reduce 上,
          所以会传输所有的数据, 因而造成资源浪费, 同时数据流很大的时候还会造成内存溢出 OutOfMemoryError.
        </li>
      </ul>
      <h4 id="rdd-%E7%9A%84%E5%88%9B%E5%BB%BA%E6%96%B9%E5%BC%8F">RDD 的创建方式</h4>
      <p>使用 <code>makeRDD</code> 通过集合创建, 由本地核数决定分区数量.</p>
      <p>使用外部数据源 HDFS 的时候, 由 Block 数量决定分区数, 最低是两个.</p>
      <p>由另一个 RDD 得出的结果创建, 即转换时创建, 会根据父 RDD 的 reduceTask 数量决定分区.</p>
      <h4 id="rdd-%E7%9A%84%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB">RDD 的依赖关系</h4>
      <ol>
        <li>宽依赖: 多个子 RDD 的分区依赖同一个父 RDD 的 Partition.</li>
        <li>窄依赖: 父 RDD 的 Partition 至多被子 RDD 的一个 Partition 使用.</li>
      </ol>
      <h4 id="%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%92%E5%88%86%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB">
        为什么要划分依赖关系
      </h4>
      <p>有效区分算子间的关系, 有利于 DAG 图形生和运行时依赖监察;</p>
      <p>如果将依赖关系混淆, 将会导致运行效率的分配不均.</p>
      <h4 id="rdd-%E7%9A%84%E7%BC%93%E5%AD%98%E6%8C%81%E4%B9%85%E5%8C%96%E6%9C%BA%E5%88%B6">RDD 的缓存持久化机制</h4>
      <p>主要通过 cache, persist, checkpoints 实现.</p>
      <ol>
        <li>
          cache 与 persist:
          <ul>
            <li>cache 默认将数据存储在内存中, 靠 persist 实现,</li>
            <li>
              persist 定义了多种数据储存策略, 如磁盘内存多副本. 数据存储在内存中会产生内存溢出, 断点失效等问题,
              不能保证数据准确和安全.
            </li>
            <li>不改变 RDD 的依赖关系, 程序执行完成后回收缓存.</li>
            <li>触发 cache 和 persist 需要通过 action.</li>
            <li>不会开启其他 job, 一个 action 一个 job 原则.</li>
          </ul>
        </li>
        <li>
          checkpoints:
          <ul>
            <li>将数据存储在 HDFS 上实现持久化.</li>
            <li>触发 checkpoints 需要通过 action, 会开启新的 job.</li>
            <li>会改变 RDD 依赖关系, 数据丢失后无法通过依赖关系恢复数据; 程序执行结束后不会回收.</li>
          </ul>
        </li>
      </ol>
      <h3 id="spark-%E8%B0%83%E4%BC%98">Spark 调优</h3>
      <h4
        id="%E4%BF%AE%E6%94%B9%E5%BA%8F%E5%88%97%E5%8C%96%E6%9C%BA%E5%88%B6%E5%8E%8B%E7%BC%A9%E6%95%B0%E6%8D%AE%E9%87%8F"
      >
        修改序列化机制压缩数据量
      </h4>
      <p>通过 Kryo 调整序列化性能.</p>
      <ul>
        <li>
          <code>conf.set(&quot;spark.serializer&quot;,&quot;org.apache.spark.serializer.KryoSerializer &quot;)</code>
        </li>
      </ul>
      <h4
        id="%E6%A0%B9%E6%8D%AE%E4%BD%9C%E4%B8%9A%E7%8E%AF%E5%A2%83-%E6%8F%90%E4%BA%A4%E4%BB%BB%E5%8A%A1%E6%97%B6%E8%B0%83%E6%95%B4-spark-submitsh-%E5%8F%82%E6%95%B0"
      >
        根据作业环境, 提交任务时调整 spark-submit.sh 参数
      </h4>
      <pre class="hljs"><code><div><span class="hljs-meta">#</span><span class="bash"> 配置 Executor 数量</span>
 --num-Executors 3
<span class="hljs-meta">#</span><span class="bash"> 配置 driver 内存, 单位 gb</span>
 --driver-memory ng
<span class="hljs-meta">#</span><span class="bash"> 配置 Executor 的内存大小, 单位 gb</span>
 --Executor-memory n
<span class="hljs-meta">#</span><span class="bash"> 配置 Executor cpu 核心使用个数, 单位 个</span>
 --Executor-cores n
</div></code></pre>
      <h4 id="%E6%8F%90%E9%AB%98%E5%B9%B6%E8%A1%8C%E5%BA%A6">提高并行度</h4>
      <ul>
        <li>
          设置 Task 数量: <code>spark.default.parallelism</code>, 设置后会在 Shuffle 过程中应用; 可以通过构造 SparkConf
          对象时设置
          <code>new SparkConf().set(&quot;spark.default.parallelism&quot;,&quot;500&quot;)</code>
        </li>
        <li>
          设置 RDD 的 Partition 数量, 使用
          <code>rdd.repartition</code> 重新分区, 会生成新的 RDD 并使分区变大, 同时 Task 也会变多.
        </li>
        <li>设置参数 <code>sql.Shuffle.partitions = n</code>, 适当增大 n 的值.</li>
      </ul>
      <h4 id="rdd-%E7%9A%84%E9%87%8D%E7%94%A8%E5%92%8C%E6%8C%81%E4%B9%85%E5%8C%96">RDD 的重用和持久化</h4>
      <ul>
        <li>适当的重用和持久化 RDD 有利于减少代码重复和重读, 通常是 ca`che 和 persist 方式持久化.</li>
        <li>
          持久化过程中适当的使用序列化可以减少数据的大小, 从而降低内存和 cpu 占用率, 减少网络 IO 消耗和磁盘占用;
          序列化后读取数据需要反序列化, 多了一次处理.
        </li>
        <li>序列化造成了内存溢出, 就要考虑写入磁盘了.</li>
        <li>为了保持数据的可靠, 可以使用双副本机制持久化.</li>
      </ul>
      <blockquote>
        <p>
          一个副本时服务宕机了就得重新计算, 持久化每个数据单元, 并多做冗余互备来容错. 适合大内存场景.
          <code>StorageLevel.MEMORY_ONLY_2</code>.
        </p>
      </blockquote>
      <h4 id="%E9%80%82%E5%BD%93%E5%B9%BF%E6%92%AD%E5%A4%9A%E6%AC%A1%E4%BD%BF%E7%94%A8%E7%9A%84%E5%8F%98%E9%87%8F">
        适当广播多次使用的变量
      </h4>
      <ul>
        <li>
          假设一个 job 需要 50 个 Executor, 100 个 Task, 共享 1mb 数据.
          <ul>
            <li>在不使用广播变量的情况下 100 个 Task 就要创建 100 个共享数据副本.</li>
            <li>
              使用广播变量后, 50 个 Executor 创建 50 个数据副本, 并且从就近节点的 BlockManager 上 PULL 到一个节点上,
              广播变量还可以减少网络 IO.
            </li>
          </ul>
        </li>
      </ul>
      <blockquote>
        <p>通过 sparkContext 的 broadcast 方法把数据转换成广播变量:</p>
      </blockquote>
      <pre
        class="hljs"
      ><code><div>val broadcastArray:Broadcast[Array[Int]]=sc.broadcast(Array(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>))
        sc.broadcast(Array(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>))
</div></code></pre>
      <blockquote>
        <p>
          Executor 的 BlockManager 就可以拉取该广播变量的副本获取具体的数据, 获取广播变量中的值可以通过调用其 value
          方法:
        </p>
      </blockquote>
      <pre class="hljs"><code><div>val array:Array[Int]=broadcastArray.value
</div></code></pre>
      <blockquote>
        <p>注意:</p>
        <ol>
          <li>RDD 没法广播, 但是 RDD 结果可以广播.</li>
          <li>Spark 中因为算子的真正逻辑是发送给 Executor 运行的, Executor 需要引用外部变量时, 可以使用广播变量.</li>
          <li>广播变量只能在 Driver 上定义和修改变量值.</li>
          <li>
            若 Executor 调用了 Driver 的变量, 不使用广播时有几个 Task 就要创建几个 Driver 的变量副本.
            用了广播后只创建一个副本.
          </li>
        </ol>
      </blockquote>
      <h4
        id="%E9%81%BF%E5%85%8D%E4%BA%A7%E7%94%9F-shuffle-%E5%8F%AF%E4%BB%A5%E5%87%8F%E5%B0%91%E7%BD%91%E7%BB%9C-io-%E5%92%8C%E5%88%86%E5%8C%BA%E9%97%B4%E4%BC%A0%E8%BE%93%E6%B6%88%E8%80%97"
      >
        避免产生 Shuffle 可以减少网络 IO 和分区间传输消耗
      </h4>
      <pre class="hljs"><code><div><span class="hljs-comment">// join 会产生 Shuffle</span>
<span class="hljs-comment">// 两个 RDD 相同的 key 需要通过网络 PULL 到一个节点上, 由一个 Task 执行 join</span>
<span class="hljs-comment">// val rdd3 = rdd1.join(rdd2)</span>
<span class="hljs-comment">// 广播变量和 Map 搭配的 join 操作不会产生 Shuffle</span>
val rdd2Data=rdd2.collect()
        val rdd2DataBroadcast=sc.broadcast(rdd2Data)
<span class="hljs-comment">// 每个 Executor 的内存都会缓存一份 rdd2 的全量数据</span>
<span class="hljs-comment">// 需要结合实际硬件性能考虑广播</span>
<span class="hljs-comment">// 在 rdd1.map() 中, 可以从 rdd2DataBroadcast 中获取 rdd2 的所有数据</span>
<span class="hljs-comment">// 若遍历结果表示 rdd2 中某条数据的 key 与 rdd1 的当前数据 key 相同, 就可以 join</span>
<span class="hljs-comment">// 再根据业务将 rdd1 与 rdd2 可连接的数据拼接成 String 或 Tuple</span>
        val rdd3=rdd1.map(rdd2DataBroadcast)

</div></code></pre>
      <h4 id="%E4%BD%BF%E7%94%A8-map-side-%E9%A2%84%E5%85%88%E8%81%9A%E5%90%88-shuffle">
        使用 map-side 预先聚合 Shuffle
      </h4>
      <ul>
        <li>
          一定要使用 Shuffle 的场景下, 无法使用 map 类算子替代, 则尽量使用 map-side 预聚合算子, 即在各节点对相同的 key
          聚合, 类似 MapReduce 的 Combiner. 聚合后 PULL 数据就能节省磁盘和网络 IO 开销.
        </li>
        <li>
          若条件允许, 使用 <code>reduceByKey()</code> 或者 <code>aggregateByKey()</code> 来替代
          <code>groupByKey()</code>, 前者可以使用自定义函数聚合 key, 后者的会使全量的数据在节点间分发, 性能相对较差.
        </li>
      </ul>
      <h4 id="%E4%BD%BF%E7%94%A8%E9%AB%98%E6%80%A7%E8%83%BD%E7%AE%97%E5%AD%90">使用高性能算子</h4>
      <ol>
        <li>
          使用 <code>mapPartitions()</code> 替代 <code>map()</code>
          <ul>
            <li>
              <code>mapPartitions()</code> 类的算子每次调用会处理 Partition 中所有的数据, 相比单条处理效率高些,
              但会占用大量内存.
            </li>
          </ul>
        </li>
        <li>
          使用 <code>foreachPartition()</code> 替代 <code>foreach()</code>
          <ul>
            <li>原理同上.</li>
          </ul>
        </li>
        <li>
          使用 <code>Filter()</code> 之后进行 <code>coalesce()</code>
          <ul>
            <li>对一个 RDD 过滤掉较多数据后可以手动减少多余的 Partition 数量.</li>
          </ul>
        </li>
        <li>
          使用 <code>repartitionAndSortWithinPartitions()</code> 替代 <code>repartition()</code> 与
          <code>sort()</code> 类操作
          <ul>
            <li>
              Spark 官方推荐在
              <code>repartition()</code> 后的排序场景下使用这个名字很长的算子, 该算子可以并行执行重新分区的 shuffle
              和排序.
            </li>
          </ul>
        </li>
        <li>
          使用 <code>fastutil()</code> 优化数据格式
          <ul>
            <li>
              fastutil 是 java 标准集合框架的扩展库, 提供了特殊的 map, set, list, queue; fastutil 能减少内存开销.
              除了一些使用外部变量的场景外, 对付某种较大集合时也可以用 fastutil 改写外部变量.
            </li>
          </ul>
        </li>
      </ol>
      <blockquote>
        <p>fastutil 需要用 maven 手动引入依赖.</p>
      </blockquote>
      <h3
        id="sparkstreaming-%E5%9C%A8%E6%B6%88%E8%B4%B9-kafka-%E6%97%B6%E4%B8%8B%E7%BA%BF-%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E9%87%8D%E5%90%AF%E5%90%8E%E7%BB%A7%E7%BB%AD%E6%B6%88%E8%B4%B9"
      >
        SparkStreaming 在消费 Kafka 时下线, 如何保证重启后继续消费
      </h3>
      <ul>
        <li>
          利用 checkPoint 机制, 每次 SparkSteaming 消费 Kafka 后将 Kafka Offsets 更新到 checkPoint, 重启后读取
          checkPoint 就能继续.
        </li>
        <li>
          在 SparkStreaming 中启用预写日志, 同步保存所有收到的 Kafka 数据到 HDFS 中, 故障后方便恢复到上次未知,
          代价是储存空间占用.
        </li>
      </ul>
      <h3 id="spark-%E7%B4%AF%E5%8A%A0%E5%99%A8">Spark 累加器</h3>
      <p>累加器相当于统筹大变量, 常用于计数统计工作. 累加器通常被视为 RDD 的 map().filter() 操作的副产物.</p>
      <h3 id="spark-%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%9C%BA%E5%88%B6">Spark 的工作机制</h3>
      <ol>
        <li>Client 提交 job 后, Driver 运行 main 方法并创建 SparkContext</li>
        <li>执行 RDD 算子后形成 DAG 图, 再移交给 DAGScheduler 处理.</li>
        <li>DAGScheduler 按照 RDD 的依赖关系划分 stage, 输入 Task, Scheduler 去划分 Task, .</li>
        <li>
          set 分发到各个节点的 Executor, 并以多线程的方式执行 Task, 一个线程一个 Task, 任务结束后根据类型返回结果.
        </li>
      </ol>
      <h3 id="spark-%E6%A8%A1%E5%9D%97%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B">Spark 模块都有哪些</h3>
      <h3 id="dstream-%E5%92%8C-dstreamgraph-%E7%9A%84%E5%8C%BA%E5%88%AB">DStream 和 DStreamGraph 的区别</h3>
    </div>
  </div>
  <BackToTopButton />
</template>

<style></style>
