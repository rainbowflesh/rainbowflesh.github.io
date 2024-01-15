import{B as s}from"./BackToTopButton-WVtpoU2M.js";import{d as a,o as l,c as n,b as p,F as t,e}from"./index-uTKRgJj0.js";const c=e(`<title>Blog Hve</title><div class="container"><div class="content"><h1 id="hive-%E6%95%B0%E4%BB%93">HIVE 数仓</h1><p>目录</p><ol><li><a href="#hive-%E6%95%B0%E4%BB%93">HIVE 数仓</a><ol><li><a href="#hive">HIVE</a><ol><li><a href="#%E5%86%85%E9%83%A8%E8%A1%A8%E5%92%8C%E5%A4%96%E9%83%A8%E8%A1%A8%E7%9A%84%E5%8C%BA%E5%88%AB">内部表和外部表的区别</a></li><li><a href="#%E5%88%86%E5%8C%BA%E5%92%8C%E5%88%86%E6%A1%B6%E7%9A%84%E5%8C%BA%E5%88%AB">分区和分桶的区别</a><ol><li><a href="#%E5%88%86%E5%8C%BA">分区</a></li><li><a href="#%E5%88%86%E6%A1%B6">分桶</a><ol><li><a href="#%E4%B8%8A%E4%BC%A0%E5%88%B0%E5%88%86%E5%8C%BA%E7%9B%AE%E5%BD%95-%E4%BB%A4%E5%88%86%E5%8C%BA%E8%A1%A8%E5%92%8C%E6%95%B0%E6%8D%AE%E5%85%B3%E8%81%94">上传到分区目录, 令分区表和数据关联</a></li></ol></li></ol></li><li><a href="#ordersortdistributecluster-by-%E7%9A%84%E5%8C%BA%E5%88%AB">order/sort/distribute/cluster by 的区别</a></li><li><a href="#hive-%E7%9A%84%E6%95%B0%E6%8D%AE%E5%80%BE%E6%96%9C">HIVE 的数据倾斜</a><ol><li><a href="#%E9%92%88%E5%AF%B9%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9%E8%AE%BE%E7%BD%AE%E5%90%88%E7%90%86%E7%9A%84-map-%E6%95%B0%E9%87%8F">针对数据内容设置合理的 Map 数量</a></li><li><a href="#%E5%B0%8F%E6%96%87%E4%BB%B6%E5%90%88%E5%B9%B6">小文件合并</a></li><li><a href="#%E5%A4%8D%E6%9D%82%E6%96%87%E4%BB%B6%E5%A2%9E%E5%8A%A0-map-%E6%95%B0">复杂文件增加 Map 数</a></li><li><a href="#%E5%90%88%E7%90%86%E8%AE%BE%E7%BD%AE-reduce-%E6%95%B0">合理设置 Reduce 数</a></li></ol></li><li><a href="#hive-%E7%9A%84-udf-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0">HIVE 的 UDF 怎么实现</a></li><li><a href="#hive-%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81">HIVE 的工作流</a></li><li><a href="#hive-%E5%88%86%E5%8C%BA%E6%98%AF%E5%90%A6%E8%B6%8A%E5%A4%9A%E8%B6%8A%E5%A5%BD">HIVE 分区是否越多越好</a></li><li><a href="#hive-%E8%B0%83%E4%BC%98">HIVE 调优</a><ol><li><a href="#hive-sitexml">hive-site.xml</a></li><li><a href="#hive-cli-%E8%B0%83%E6%95%B4">HIVE CLI 调整</a></li></ol></li><li><a href="#hive-%E5%8E%8B%E7%BC%A9">HIVE 压缩</a><ol><li><a href="#hive-%E6%95%B0%E6%8D%AE%E5%8E%8B%E7%BC%A9">HIVE 数据压缩</a><ol><li><a href="#%E5%8E%8B%E7%BC%A9%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0">压缩配置参数</a></li></ol></li><li><a href="#hive-%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9">HIVE 文件压缩</a></li></ol></li></ol></li></ol></li></ol><h2 id="hive">HIVE</h2><p>HIVE 是基于 Hadoop 的一个数据仓库工具, 可以将结构化的数据文件映射为一张数据库表, 并提供类 SQL 查询功能.</p><h3 id="%E5%86%85%E9%83%A8%E8%A1%A8%E5%92%8C%E5%A4%96%E9%83%A8%E8%A1%A8%E7%9A%84%E5%8C%BA%E5%88%AB"> 内部表和外部表的区别 </h3><ul><li>内部表是 HIVE 管理的, 外部表是 HDFS 管理的.</li><li>创建表时: 内部表会将数据移动到数仓指向的路径; 外表仅记录所在的路径, 不对数据位置做改变.</li><li> 删除表时: 内部表会删除元数据与储存数据; 删除外部表只会删除元数据. 这样外部表相对安全, 组织和数据共享也更灵活. </li></ul><blockquote><p>通常情况下使用外部表保证数据安全, 中间表, 结果表则使用内部表 (管理表).</p></blockquote><h3 id="%E5%88%86%E5%8C%BA%E5%92%8C%E5%88%86%E6%A1%B6%E7%9A%84%E5%8C%BA%E5%88%AB">分区和分桶的区别</h3><h4 id="%E5%88%86%E5%8C%BA">分区</h4><p> 指按照数据表的某列或某几列进行分区, 区域从形式上可以理解为文件目录, 若大量的数据保存在一个目录下, 查询的时候会很慢而且占用大量资源. </p><p> 这个时候就可以按照数据中具有特征和共同性的字段作为分区字段, 不同特征存在不同分区, 这时查询只需要按照字段名就能在特定分区下查询. </p><blockquote><p>简单理解分区就是 HDFS 上分目录, 分桶就是分成单独文件.</p></blockquote><h4 id="%E5%88%86%E6%A1%B6">分桶</h4><p>分桶则是对分区更细粒度的划分.</p><p> 分桶将整个数据内容安装某列属性值的哈希值进行分区. 按照某一属性分为 N 个桶, 就是对该属性值的哈希值对 N 取模, 按照结果对数据分桶. </p><h5 id="%E4%B8%8A%E4%BC%A0%E5%88%B0%E5%88%86%E5%8C%BA%E7%9B%AE%E5%BD%95-%E4%BB%A4%E5%88%86%E5%8C%BA%E8%A1%A8%E5%92%8C%E6%95%B0%E6%8D%AE%E5%85%B3%E8%81%94"> 上传到分区目录, 令分区表和数据关联 </h5><ul><li>上传数据后修复表:</li></ul><pre class="hljs"><code><div>dfs -mkdir -p path
dfs -put path
msck repair table table_name
</div></code></pre><ul><li>上传数据后添加分区</li></ul><pre class="hljs"><code><div>dfs -mkdir -p path
dfs -put path
alter table table_name add partition (partition_colN=partition_valueN);
</div></code></pre><blockquote><p>直接将新的分区文件上传到 HDFS, HIVE 没有对应元数据所以无法查询到.</p></blockquote><h3 id="ordersortdistributecluster-by-%E7%9A%84%E5%8C%BA%E5%88%AB">order/sort/distribute/cluster by 的区别</h3><ul><li>order by 会对所给的全部数据进行全局排序, 不管数据量, 只启动一个 Reducer 来处理.</li><li> sort by 会根据数据量的大小启动数个 Reducer 来处理, 并且进入 Reducer 前为每个 Reducer 产生一个排序文件. <ul><li> sort by 不是全局排序, 其在数据进入 reducer 前完成排序; 如果进行排序, 并且设置 <code>mapred.reduce.tasks&gt;1</code>, 则只保证每个 Reducer 的输出有序, 不保证全局有序. </li><li>sort by 不受 <code>hive.mapred.mode</code> 是否为 strict, nostrict 的影响.</li><li>sort by 的数据只能保证在同一个 Reduce 中的数据可以按指定字段排序.</li><li> 使用 sort by 可以指定执行的 Reduce 个数 <code>set mapred.reduce.task s= N</code>; 对输出的数据执行归并排序, 可以得到全部结果. <blockquote><p> 注意: 可以用 Limit 子句减少数据量. 使用 Limit N 后, 传输到 Reduce 端 (单机) 的数据记录减少到 $N\\times{MapNumber}$ . 否则由于数据过大可能出不了结果. </p></blockquote></li></ul></li><li>distribute by 控制 Map 结果的分发, 将相同字段的 Map 输出分发到一个 Reducer 上处理.</li><li> cluster by 是前两者的结合版, 当 distribute by 和 sort by 后面所跟的列名相同时, 就等同于直接使用 cluster by 该列名, 但是 cluster by 指定的列, 最终的排序结果是降序排列, 且无法指定 asc / desc. </li></ul><h3 id="hive-%E7%9A%84%E6%95%B0%E6%8D%AE%E5%80%BE%E6%96%9C">HIVE 的数据倾斜</h3><blockquote><p>通过 YARN 监控平台的 Task 的运行状态, 超时和失败的都可能是发生数据倾斜的地方.</p></blockquote><p> 数据倾斜的根源是 Key 分布不均匀, 不让数据分区, 直接在 map 端搞定, 或者在分区时清洗集中无效的 Key, 或打乱 Key 使其进入到不同的 Reduce 中. </p><h4 id="%E9%92%88%E5%AF%B9%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9%E8%AE%BE%E7%BD%AE%E5%90%88%E7%90%86%E7%9A%84-map-%E6%95%B0%E9%87%8F"> 针对数据内容设置合理的 Map 数量 </h4><p>主要的决定因素有: input 的文件总个数, input 的文件大小, 集群设置的文件块大小.</p><p>通常情况下, 作业会通过 input 的目录产生一个或者多个 map 任务.</p><blockquote><p>map 数越多越好?</p></blockquote><p> 不. 如果一个任务有很多小文件 (远远小于块大小 128m), 则每个小文件也会被当做一个块, 用一个 map 任务来完成, 而一个 map 任务启动和初始化的时间远远大于逻辑处理的时间, 就会造成很大的资源浪费. 而且, 同时可执行的 map 数是受限的. </p><blockquote><p>保证每个 map 都是 128 mb?</p></blockquote><p> 不. 比如有一个 127m 的文件, 正常会用一个 map 去完成, 但这个文件只有一个或者两个小字段, 却有大量记录, 如果 map 处理的逻辑比较复杂, 用一个 map 任务去做, 肯定也比较耗时. </p><h4 id="%E5%B0%8F%E6%96%87%E4%BB%B6%E5%90%88%E5%B9%B6">小文件合并</h4><p>在 Map 前合并小文件. 例如合并小于 iAmSize 的文件:</p><pre class="hljs"><code><div><span class="hljs-keyword">set</span> mapred.max.split.size = iAmSize;
<span class="hljs-keyword">set</span> mapred.min.split.size.per.node = iAmSize;
<span class="hljs-keyword">set</span> mapred.min.split.size.per.rack = iAmSize;
<span class="hljs-keyword">set</span> hive.input.format = org.apache.hadoop.hive.ql.io.CombineHiveInputFormat;
</div></code></pre><h4 id="%E5%A4%8D%E6%9D%82%E6%96%87%E4%BB%B6%E5%A2%9E%E5%8A%A0-map-%E6%95%B0">复杂文件增加 Map 数</h4><p> 当 Input 的文件都很大, 任务逻辑复杂, Map 执行非常慢的时候, 可以考虑增加 Map 数, 来使得每个 Map 处理的数据量减少, 从而提高任务的执行效率. </p><blockquote><p> 根据 <code>computeSliteSize(Math.max(minSize,Math.min(maxSize,blocksize)))</code> 公式调整 maxSize 最大值. 让 maxSize 最大值低于 blocksize 就可以增加 map 的个数 </p></blockquote><pre class="hljs"><code><div><span class="hljs-comment">-- 默认值为 1 --</span>
<span class="hljs-keyword">set</span> mapreduce.input.fileinputformat.split.minsize = <span class="hljs-number">1</span>

<span class="hljs-comment">-- 默认值 Long.MAXValue, 默认情况下, 切片大小 = blocksize --</span>
<span class="hljs-keyword">set</span> mapreduce.input.fileinputformat.split.maxsize = Long.MAXValue

<span class="hljs-comment">-- 切片最大值, 参数如果比 blocksize 小, 则会让切片变小, 且等于配置的参数值. --</span>
<span class="hljs-keyword">set</span> <span class="hljs-keyword">maxsize</span>:
<span class="hljs-comment">-- 切片最小值, 参数调的比 blockSize 大, 则让切片变得比 blocksize 大. --</span>
<span class="hljs-keyword">set</span> minsize:
<span class="hljs-comment">-- 设置 maxsize 大小为 N mb, 即单个 fileSplit 的大小为 N mb. --</span>
<span class="hljs-keyword">set</span> mapreduce.input.fileinputformat.split.maxsize = N*<span class="hljs-number">1024</span>*<span class="hljs-number">1024</span>;
</div></code></pre><h4 id="%E5%90%88%E7%90%86%E8%AE%BE%E7%BD%AE-reduce-%E6%95%B0">合理设置 Reduce 数</h4><p> 设置每一个 job 中 reduce 个数 <code>set mapreduce.job.reduces = N;</code>. </p><h3 id="hive-%E7%9A%84-udf-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0">HIVE 的 UDF 怎么实现</h3><p>UDF 是 Hive 提供的自定义函数工具.</p><h3 id="hive-%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81">HIVE 的工作流</h3><ol><li>查询: HIVE 接口, 命令行或 Web UI 发送查询驱动程序.</li><li>get Plan: 驱动程序查询编译器.</li><li>语法分析.</li><li>语义分析.</li><li>逻辑计划产生.</li><li>逻辑计划优化.</li><li>物理计划生成.</li><li>物理计划优化.</li><li>物理计划执行.</li><li>返回查询结果.</li></ol><h3 id="hive-%E5%88%86%E5%8C%BA%E6%98%AF%E5%90%A6%E8%B6%8A%E5%A4%9A%E8%B6%8A%E5%A5%BD">HIVE 分区是否越多越好</h3><ul><li><p> HIVE 如果拥有过多的分区, 由于底层储存是在 HDFS 上的, HDFS 只存储大文件, 过多的分区会加重 NameNode 的负担. </p></li><li><p> HIVE 会转化为 MapReduce, 再转化为多个 Task, 每个 Task 都是一个 JVM 实例, JVM 的开启与销毁会降低系统运行效率. </p></li></ul><blockquote><p>合理的分区不应该有过多的分区和文件目录, 并且每个目录下的文件应该足够大.</p></blockquote><h3 id="hive-%E8%B0%83%E4%BC%98">HIVE 调优</h3><blockquote><p>不根据业务内容的调优都是整蛊.</p></blockquote><h4 id="hive-sitexml">hive-site.xml</h4><pre class="hljs"><code><div>
<span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 合并 block 减少 Task 数量 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>ngmr.partition.automerge<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 将 n 个 block 排给单个线程处理 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>ngmr.partition.mergesize.mb<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>n<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 小文件合并 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.merge.sparkfiles<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.map.agg<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 使用向量化查询 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.vectorized.execution.enabled<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- cbo 优化 HIVE 查询 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.cbo.enable<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.stats.fetch.column.stats<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.stats.fetch.partition.stats<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.compute.query.using.stats<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 数据压缩 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.exec.compress.intermediate<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.exec.compress.output<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 简单 SQL 不使用 Spark --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.fetch.Task.conversion<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>more<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!--
    有数据倾斜的时候进行负载均衡;
    group by 操作是否允许数据倾斜, 默认是false, 当设置为true时, 执行计划会生成两个 Map / Reduce 作业, 第一个 MapReduce 会将 Map 的结果随机分发到 Reduce 中, 达到负载均衡的目的来解决数据倾斜.
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.groupby.skewindata<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 列裁剪, 默认为 true, 在做查询时只读取用到的列. --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>hive.optimize.cp<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- JVM 重用 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.job.jvm.numTasks<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>n<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>\${n} Tasks to run per JVM. -1 for unlimited.<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
</div></code></pre><h4 id="hive-cli-%E8%B0%83%E6%95%B4">HIVE CLI 调整</h4><pre class="hljs"><code><div>// 合并 Block 减少 Task 数量
set ngmr.partition.automerge = true;
// JVM 重用
set mapreduce.job.jvm.numTasks=n;
// 将 n 个 Block 排给单个线程处理
set ngmr.partition.mergesize.mb = n;
// 小文件合并
set hive.merge.sparkfiles = true;
set hive.map.agg = true;
// 使用向量化查询
set hive.vectorized.execution.enabled = true;
// cbo 优化 HIVE 查询
set hive.cbo.enable = true;
set hive.stats.fetch.column.stats = true;
set hive.stats.fetch.partition.stats = true;
set hive.compute.query.using.stats = true;
// 数据压缩
set hive.exec.compress.intermediate = true;
set hive.exec.compress.output = true;
// 有数据倾斜的时候进行负载均衡; group by 操作是否允许数据倾斜, 默认是false, 当设置为true时, 执行计划会生成两个 Map / Reduce 作业, 第一个 MapReduce 会将 Map 的结果随机分发到 Reduce 中, 达到负载均衡的目的来解决数据倾斜.
set hive.groupby.skewindata =  true;
// 列裁剪, 默认为 true, 在做查询时只读取用到的列.
set hive.optimize.cp = true;
</div></code></pre><h3 id="hive-%E5%8E%8B%E7%BC%A9">HIVE 压缩</h3><h4 id="hive-%E6%95%B0%E6%8D%AE%E5%8E%8B%E7%BC%A9">HIVE 数据压缩</h4><ul><li><p>空间优先 bzip2</p></li><li><p>速度优先 snappy</p></li></ul><h5 id="%E5%8E%8B%E7%BC%A9%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0">压缩配置参数</h5><p>要在 Hadoop 中使用压缩, 在 mapred-site.xml 中配置如下:</p><pre class="hljs"><code><div>
<span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- something else... --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.map.output.compress<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Compress when Mapper output, true for enable.<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.map.output.compress.codec<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>org.apache.hadoop.io.compress.\${iAmCodecName}<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Codec with LZO, LZ4, snappy.<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.output.fileoutputformat.compress<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Compress when Reducer output, true for enable.<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.output.fileoutputformat.compress.codec<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>org.apache.hadoop.io.compress.\${iAmCodecName}<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Codec with LZO, LZ4, snappy.<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>mapreduce.output.fileoutputformat.compress.type<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>RECORD<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Compress logger<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
</div></code></pre><p>在 core-site.xml 中配置如下:</p><pre class="hljs"><code><div>
<span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>io.compression.codecs<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;value&gt;org.apache.hadoop.io.compress.DefaultCodec&lt;/value&gt; --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;value&gt;org.apache.hadoop.io.compress.GzipCodec&lt;/value&gt; --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;value&gt;org.apache.hadoop.io.compress.BZip2Codec&lt;/value&gt; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span>org.apache.hadoop.io.compress.Lz4Codec<span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>输入压缩阶段; Hadoop 使用文件扩展名判断是否支持某种编解码器<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">property</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
</div></code></pre><h4 id="hive-%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9">HIVE 文件压缩</h4><p> HIVE 支持的存储数的格式主要有 TEXTFILE (行式存储), SEQUENCEFILE (行式存储), ORC (列式存储), PARQUET (列式存储). </p><ul><li><p>TEXTFILE 格式:</p><ul><li> 默认格式, 数据不做压缩, 磁盘空间开销大, 数据解析开销大. 若使用 Bzip2 等压缩, HIVE 不会对数据进行切分, 从而无法进行并行操作. </li></ul></li><li><a href="https://cwiki.apache.org/confluence/display/hive/languagemanual+orc">Optimized Row Columnar 格式</a><ul><li><p> HIVE 0.11 引入的储存格式, ORC 文件由数个 Stripe 组成, Stripe 实际相当于 RowGroup 概念, 大小由 4mb 到 250mb 不等, 这样做可以提升顺序读的性能. </p></li><li><p> 一个 ORC 文件可以分为若干个 Stripe, 每个 Stripe 由 Index Data, Row Data, Stripe Footer 三个部分组成, 其中 </p><ul><li> indexData: 某些列的索引数据; 一个轻量级的 index, 默认是每隔 1 万行做一个索引. 这里做的索引只是记录某行的各字段在 Row Data 中的 offset. </li><li> rowData: 真正的数据存储; 存的是具体的数据, 先取部分行, 对其按列进行储存, 并编码各列, 分成多个 Stream 来储存, </li><li>StripFooter: Stripe 的元数据信息.</li></ul></li><li><p> 每个文件都有一个 File Footer, 负责存储 Stripe 的行数, Column 的数据类型信息等; 每个文件尾部有一个 PostScript, 负责记录整个文件的压缩类型和 FileFooter 的长度信息. 在读取文件时采用从后向前的顺序: 首先寻址到文件尾部读取 PostScript, 解析出 FileFooter 的长度, 再读取 FileFooter, 并解析读取 Stripe 信息. </p></li></ul></li><li><ul><li> PARQUET 是面向分析性业务的列式存储格式, 文件以二进制形式储存, 其中包含文件数据和元数据, 所以此格式是自解析的. </li><li> 通常情况下, 储存 PARQUET 数据都会按照 Block 的大小设置<em>行组</em>的大小, 配合 Mapper 处理任务的最小单位 (1 Block) 优化任务执行并行量. </li></ul></li></ul><blockquote><p>存储文件的查询速度总结: ORC &gt; TextFile &gt; Parquet</p></blockquote></div></div>`,2),g=a({__name:"hive",setup(h){return(i,o)=>(l(),n(t,null,[c,p(s)],64))}});export{g as default};
