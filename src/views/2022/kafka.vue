<script setup lang="ts">
import BackToTopButton from "../../components/BackToTopButton.vue";
</script>
<template>
  <title>Blog Kafka</title>
  <div class="container">
    <div class="content">
      <h1 id="%E5%88%86%E5%B8%83%E5%BC%8F%E4%B8%AD%E9%97%B4%E4%BB%B6-kafka">分布式中间件 Kafka</h1>
      <p>目录</p>
      <ol>
        <li>
          <a href="#%E5%88%86%E5%B8%83%E5%BC%8F%E4%B8%AD%E9%97%B4%E4%BB%B6-kafka">分布式中间件 Kafka</a>
          <ol>
            <li>
              <a href="#kafka">Kafka</a>
              <ol>
                <li>
                  <a href="#%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5">相关概念</a>
                  <ol>
                    <li><a href="#isr-ar-hw-leo">ISR, AR, HW, LEO</a></li>
                    <li>
                      <a
                        href="#kafka-%E6%8B%A6%E6%88%AA%E5%99%A8-%E5%BA%8F%E5%88%97%E5%8C%96%E5%99%A8-%E5%88%86%E5%8C%BA%E5%99%A8"
                        >Kafka 拦截器, 序列化器, 分区器</a
                      >
                    </li>
                    <li>
                      <a href="#kafka-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E9%83%BD%E6%98%AF%E4%BB%80%E4%B9%88"
                        >kafka 数据格式都是什么</a
                      >
                    </li>
                    <li>
                      <a href="#kafka-%E7%9A%84-broker-partition-segment-%E9%83%BD%E6%98%AF%E5%95%A5"
                        >kafka 的 <code>Broker, partition, segment</code> 都是啥</a
                      >
                    </li>
                    <li>
                      <a
                        href="#kafka-%E4%B8%80%E6%9D%A1-message-%E4%B8%AD%E5%8C%85%E5%90%AB%E5%93%AA%E4%BA%9B%E4%BF%A1%E6%81%AF"
                        >kafka 一条 Message 中包含哪些信息</a
                      >
                    </li>
                  </ol>
                </li>
                <li>
                  <a
                    href="#kafka-%E6%95%B0%E6%8D%AE%E7%A7%AF%E5%8E%8B-%E6%B6%88%E8%B4%B9%E8%83%BD%E5%8A%9B%E4%B8%8D%E8%B6%B3%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86"
                    >Kafka 数据积压, 消费能力不足怎么处理</a
                  >
                </li>
                <li>
                  <a href="#kafka-%E5%88%86%E5%8C%BA">Kafka 分区</a>
                  <ol>
                    <li>
                      <a href="#%E5%88%86%E5%8C%BA%E7%9A%84%E5%A2%9E%E5%88%A0">分区的增删</a>
                    </li>
                    <li>
                      <a href="#kafka-%E8%87%AA%E5%B8%A6%E7%9A%84-topic">Kafka 自带的 Topic</a>
                    </li>
                    <li>
                      <a href="#%E5%88%86%E5%8C%BA%E7%9A%84%E5%88%86%E9%85%8D%E7%9A%84%E6%A6%82%E5%BF%B5"
                        >分区的分配的概念</a
                      >
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#kafka-%E6%80%8E%E4%B9%88%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%A4%87%E4%BB%BD"
                    >Kafka 怎么进行数据备份</a
                  >
                </li>
                <li>
                  <a
                    href="#consumer-%E5%9C%A8-leader-%E8%BF%98%E6%98%AF-follower-%E4%B8%AD%E6%8B%BF%E5%8E%BB%E6%95%B0%E6%8D%AE"
                    >Consumer 在 Leader 还是 Follower 中拿去数据</a
                  >
                </li>
                <li>
                  <a href="#kafka-%E6%95%B0%E6%8D%AE%E4%B8%80%E8%87%B4%E6%80%A7-isr-%E6%9C%BA%E5%88%B6"
                    >Kafka 数据一致性 ISR 机制</a
                  >
                </li>
                <li>
                  <a href="#kafka-%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E4%B8%8D%E9%87%8D%E5%A4%8D"
                    >Kafka 数据不丢失不重复</a
                  >
                  <ol>
                    <li>
                      <a href="#%E4%B8%8D%E9%87%8D%E5%A4%8D%E5%8E%9F%E7%90%86">不重复原理</a>
                    </li>
                    <li>
                      <a href="#kafka-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%B9%82%E7%AD%89%E6%80%A7"
                        >Kafka 如何实现幂等性</a
                      >
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#kafka-%E9%87%8D%E5%A4%8D%E6%B6%88%E8%B4%B9%E4%B8%8E%E6%BC%8F%E6%B6%88%E8%B4%B9"
                    >Kafka 重复消费与漏消费</a
                  >
                  <ol>
                    <li>
                      <a href="#%E9%87%8D%E5%A4%8D%E6%B6%88%E8%B4%B9">重复消费</a>
                    </li>
                    <li><a href="#%E6%BC%8F%E6%B6%88%E8%B4%B9">漏消费</a></li>
                  </ol>
                </li>
                <li>
                  <a href="#kafka-%E6%95%B0%E6%8D%AE%E9%A1%BA%E5%BA%8F%E4%B8%8E%E6%B6%88%E6%81%AF%E9%A1%BA%E5%BA%8F"
                    >Kafka 数据顺序与消息顺序</a
                  >
                  <ol>
                    <li>
                      <a href="#%E8%A7%A3%E5%86%B3%E6%95%B0%E6%8D%AE%E9%A1%BA%E5%BA%8F">解决数据顺序</a>
                    </li>
                    <li>
                      <a href="#kafka-%E4%BD%93%E7%8E%B0%E6%B6%88%E6%81%AF%E6%9C%89%E5%BA%8F%E6%80%A7"
                        >Kafka 体现消息有序性</a
                      >
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#kafka-%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%9F%E5%BA%A6%E5%BF%AB">Kafka 为什么速度快</a>
                </li>
                <li>
                  <a href="#kafka-%E5%A6%82%E4%BD%95%E6%B8%85%E7%90%86%E8%BF%87%E6%9C%9F%E6%95%B0%E6%8D%AE"
                    >Kafka 如何清理过期数据</a
                  >
                </li>
                <li>
                  <a href="#kafka-%E8%93%84%E6%B0%B4%E6%B1%A0%E6%9C%BA%E5%88%B6">Kafka 蓄水池机制</a>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
      <h2 id="kafka">Kafka</h2>
      <h3 id="%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5">相关概念</h3>
      <h4 id="isr-ar-hw-leo">ISR, AR, HW, LEO</h4>
      <ul>
        <li>ISR: 与 leader 保持同步的 follower 集合叫做 in-sync-replicas.</li>
        <li>AR: 可用的 replica 集合叫做 available replicas.</li>
        <li>HW: 消息的最大序号叫做 high watermark.</li>
        <li>LEO: 消息的最后序号叫做 last enqueued offset.</li>
      </ul>
      <h4 id="kafka-%E6%8B%A6%E6%88%AA%E5%99%A8-%E5%BA%8F%E5%88%97%E5%8C%96%E5%99%A8-%E5%88%86%E5%8C%BA%E5%99%A8">
        Kafka 拦截器, 序列化器, 分区器
      </h4>
      <ul>
        <li>
          拦截器分为两种: 生产拦截器和消费拦截器. 生产拦截器可以在消息发送前做预处理工作; 支持配置多个拦截器形成拦截链.
        </li>
        <li>
          生产者需要将消息对象进行序列化成字节码才能通过网络传输给 Kafka 服务端, 且消费者需要反序列化, 序列化器也要一致.
        </li>
        <li>
          如果消息 ProducerRecord 中指定了 partition 字段, 那么就不需要分区器来处理, 因为 partition
          代表的就是所要发往的分区号; 如果没有指定, 则需要分区器进行分配.
        </li>
      </ul>
      <h4 id="kafka-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E9%83%BD%E6%98%AF%E4%BB%80%E4%B9%88">
        kafka 数据格式都是什么
      </h4>
      <p>Topic 主题, 然后主题进行分区, Topic 分为 Partition, Partition 包含 Message.</p>
      <h4 id="kafka-%E7%9A%84-broker-partition-segment-%E9%83%BD%E6%98%AF%E5%95%A5">
        kafka 的 <code>Broker, partition, segment</code> 都是啥
      </h4>
      <p>
        一个 Kafka 服务器也称为 Broker, 它接受生产者发送的消息并存入磁盘; Broker 同时服务消费者拉取分区消息的请求,
        返回目前已经提交的消息.
      </p>
      <p>每一个 Partition 最终对应一个目录, 里面存储所有的消息和索引文件.</p>
      <p>
        Segment File 又由 index file 和 data file 组成, 他们总是成对出现, 后缀 &quot;.index&quot; 和 &quot;.log&quot;
        分表表示 Segment 索引文件和数据文件.
      </p>
      <h4 id="kafka-%E4%B8%80%E6%9D%A1-message-%E4%B8%AD%E5%8C%85%E5%90%AB%E5%93%AA%E4%BA%9B%E4%BF%A1%E6%81%AF">
        kafka 一条 Message 中包含哪些信息
      </h4>
      <p>包含 Header 和 Body.</p>
      <p>一个 Kafka Message 由一个固定长度的消息头 Header 和一个变长 Body 的消息体组成.</p>
      <p>Header 由一个字节的 magic (文件格式信息) 和四个字节的 CRC32 校验码 (判断 Body 是否正常) 组成.</p>
      <p>当 magic 为 1 时, 会在两者中添加一个字节的数据 attributes, 用于保存文件相关的信息, 比如是否压缩.</p>
      <p>magic 为 0 时, 则 Body 直接由 N 个字节构成一个具体键值对形式的消息.</p>
      <h3
        id="kafka-%E6%95%B0%E6%8D%AE%E7%A7%AF%E5%8E%8B-%E6%B6%88%E8%B4%B9%E8%83%BD%E5%8A%9B%E4%B8%8D%E8%B6%B3%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86"
      >
        Kafka 数据积压, 消费能力不足怎么处理
      </h3>
      <ul>
        <li>Kafka 可以同步增加 Topic 的分区量和消费者数量, 消费者数 = 分区数.</li>
        <li>下游应用消费能力不足时, 可以提高每批次 PULL 的数量, 供不应求策略.</li>
      </ul>
      <h3 id="kafka-%E5%88%86%E5%8C%BA">Kafka 分区</h3>
      <h4 id="%E5%88%86%E5%8C%BA%E7%9A%84%E5%A2%9E%E5%88%A0">分区的增删</h4>
      <ul>
        <li>增加: $KAFKA_HOME/bin/kafka-topics.sh --etc --alter --topic topic-config --partitions 数量</li>
        <li>减少: 木里 desu; 被删除的分区数据难以处理.</li>
      </ul>
      <h4 id="kafka-%E8%87%AA%E5%B8%A6%E7%9A%84-topic">Kafka 自带的 Topic</h4>
      <p>__consumer_offsets, 用来保护消费者的 offset.</p>
      <h4 id="%E5%88%86%E5%8C%BA%E7%9A%84%E5%88%86%E9%85%8D%E7%9A%84%E6%A6%82%E5%BF%B5">分区的分配的概念</h4>
      <p>一个 topic 多个分区, 一个消费者组含有多个消费者, 故需要将分区分配个消费者 (round robin, range).</p>
      <h3 id="kafka-%E6%80%8E%E4%B9%88%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%A4%87%E4%BB%BD">
        Kafka 怎么进行数据备份
      </h3>
      <p>备份是 0.8 版本后的功能.</p>
      <p>一个备份数量为 n 的集群允许 n-1 个节点失效.</p>
      <p>有一个节点作为 Leader 节点, 负责保存其他备份节点的列表, 并维持备份间状态同步.</p>
      <h3 id="consumer-%E5%9C%A8-leader-%E8%BF%98%E6%98%AF-follower-%E4%B8%AD%E6%8B%BF%E5%8E%BB%E6%95%B0%E6%8D%AE">
        Consumer 在 Leader 还是 Follower 中拿去数据
      </h3>
      <p>读写操作都来自 Leader, Follower 只负责数据备份和心跳检测 Leader 存活状态, 并及时顶替.</p>
      <h3 id="kafka-%E6%95%B0%E6%8D%AE%E4%B8%80%E8%87%B4%E6%80%A7-isr-%E6%9C%BA%E5%88%B6">Kafka 数据一致性 ISR 机制</h3>
      <p>数据可靠主要是依赖于 Broker 中的 in-sync Replica 副本同步队列机制, 主要逻辑是制造冗余, 数据互备.</p>
      <ol>
        <li>Leader 会维护一个与其保持同步的 Replica 集合, 然后保证这组集合至少有一个存活, 并且消息 Commit 成功.</li>
        <li>
          Partition Leader 保持同步的 Partition Follower 集合, 当 ISR 中的 Partition Follower 完成数据的同步之后给
          Leader 发送 ack.
        </li>
        <li>
          如果 Partition Follower 长时间 (Replica.lag.time.max.ms) 未向 Leader 同步数据, 则该 Partition Follower
          将被踢出 ISR.
        </li>
        <li>Partition Leader 发生故障之后, 就会从 ISR 中选举新的 Partition Leader.</li>
        <li>当 ISR 中所有 Replica 都向 Leader 发送 ACK 时, Leader 执行 Commit.</li>
      </ol>
      <h3 id="kafka-%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E4%B8%8D%E9%87%8D%E5%A4%8D">
        Kafka 数据不丢失不重复
      </h3>
      <p>tldr:</p>
      <ul>
        <li>Consumer: 业务逻辑成功处理后手动提交 offset.</li>
        <li>保证不重复消费: 使用主键或唯一索引的方式避免重复数据.</li>
        <li>业务逻辑处理: 选择主键或唯一索引存储在 K/V 数据库里.</li>
      </ul>
      <h4 id="%E4%B8%8D%E9%87%8D%E5%A4%8D%E5%8E%9F%E7%90%86">不重复原理</h4>
      <p>首先, Kafka 并不能完全的保证消息不重复.</p>
      <p>0.11 版本前, Kafka 有两次消息传递: Producer 发送信息给 Kafka, Consumer 接受来自 Kafka 的信息.</p>
      <p>两次传递都会影响最终结果, 且两次传递都是精确一次, 最终结果才是精确一次</p>
      <ul>
        <li>
          Producer 传递消息的实现中指定了三个 ACK 值, 分别为
          <ol>
            <li>-1 / ALL: Leader Broker 会等待消息写入且 ISR 同步后相应, 这种利用 ISR 实现可靠, 但吞吐量低.</li>
            <li>0: Producer 不理会 Broker 的处理结果, 也不处理回调, 此时只保证高吞吐.</li>
            <li>
              1: 即 Kafka 默认的 ACK 相应码, Leader Broker 写入数据便相应, 不等待 ISR 同步, 只要 Leader Broker
              在线就不会丢失数据.
            </li>
          </ol>
        </li>
      </ul>
      <blockquote>
        <p>默认的 Producer 级别是 at least once.</p>
      </blockquote>
      <ul>
        <li>
          Consumer 消息传递靠 Offset 保证. Consumer 实现中可以指定 Offset 行为, 即 <code>enable.auto.commit</code>,
          实现效果也是 at least once.
        </li>
      </ul>
      <h4 id="kafka-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%B9%82%E7%AD%89%E6%80%A7">Kafka 如何实现幂等性</h4>
      <p>0.11 版本后, Kafka 推出来 Idempotent Producer, 完成了幂等性和事务的支持.</p>
      <p>
        在这个机制中, Producer 会发送多次同样的消息, 而 Broker 只会写入一次消息, Broker 执行了消息编号去重.
        幂等保证了单一分区无重复消息.
      </p>
      <blockquote>
        <p>在 Producer 里设置 <code>true=enable.idempotent</code></p>
      </blockquote>
      <p>
        多分区时, 为了保证同步写入的一致性, 引入事务理念, 要么全部写入, 要么全部回滚. 事务保证了多分区写入消息的完整性.
      </p>
      <blockquote>
        <p>在 Producer 里设置 <code>String something = transactional.id</code></p>
      </blockquote>
      <p>
        此时的 Consumer 端没有 Kafka 自带的策略去支持 exactly once 消息模式, 所以需要手搓一个逻辑, 比如自己管理 offset
        的提交.
      </p>
      <h3 id="kafka-%E9%87%8D%E5%A4%8D%E6%B6%88%E8%B4%B9%E4%B8%8E%E6%BC%8F%E6%B6%88%E8%B4%B9">
        Kafka 重复消费与漏消费
      </h3>
      <h4 id="%E9%87%8D%E5%A4%8D%E6%B6%88%E8%B4%B9">重复消费</h4>
      <p>Consumer 消费后没有 commit offset.</p>
      <p>通常由程序突然下线, 消费耗时长, 自动提交 offset 失败.</p>
      <h4 id="%E6%BC%8F%E6%B6%88%E8%B4%B9">漏消费</h4>
      <p>先提交 offset 后 consume, 有可能造成数据的重复.</p>
      <h3 id="kafka-%E6%95%B0%E6%8D%AE%E9%A1%BA%E5%BA%8F%E4%B8%8E%E6%B6%88%E6%81%AF%E9%A1%BA%E5%BA%8F">
        Kafka 数据顺序与消息顺序
      </h3>
      <h4 id="%E8%A7%A3%E5%86%B3%E6%95%B0%E6%8D%AE%E9%A1%BA%E5%BA%8F">解决数据顺序</h4>
      <ul>
        <li>相同订单的数据发送到同一分区.</li>
        <li>
          采用 Kafka 的 Partitioner 分区策略:
          <ol>
            <li>指定数据目标的发送分区.</li>
            <li>根据数据的 key 获取 hashCode 进行分区.</li>
            <li>轮询分区.</li>
            <li>手动指定分区.</li>
          </ol>
        </li>
        <li>Flume 整合 Kafka 顺序性.</li>
      </ul>
      <h4 id="kafka-%E4%BD%93%E7%8E%B0%E6%B6%88%E6%81%AF%E6%9C%89%E5%BA%8F%E6%80%A7">Kafka 体现消息有序性</h4>
      <p>每个分区内的每条消息都有 offset, 只能保证分区内有序.</p>
      <p>为了保证整个 topic 有序, 需要调整 partition 为 1.</p>
      <h3 id="kafka-%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%9F%E5%BA%A6%E5%BF%AB">Kafka 为什么速度快</h3>
      <ul>
        <li>
          页缓存技术
          <ul>
            <li>Kafka 在操作数据的时候会写入内存, 由操作系统决定何时把内存的数据写入磁盘.</li>
          </ul>
        </li>
        <li>磁盘顺写, 即写入文件末尾保证写入速度.</li>
        <li>
          Kafka 为了解决在应用内数据的通讯损耗, 引入了零拷贝技术, 即读操作的数据进入缓存后发送给网卡,
          同时拷贝描述符而非数据给 Socket 缓存.
        </li>
      </ul>
      <h3 id="kafka-%E5%A6%82%E4%BD%95%E6%B8%85%E7%90%86%E8%BF%87%E6%9C%9F%E6%95%B0%E6%8D%AE">
        Kafka 如何清理过期数据
      </h3>
      <p>
        Kafka 的日志保存在 /kafka-logs 文件夹中, 默认七天清理, 当日志满足删除条件时, 会被标注为 &quot;delete&quot;,
        此时文件只是无法被索引, 文件本身不会被删除. 当超过
        <code>log.segment.delete.delay.ms</code> 时间后, 文件会被文件系统删除.
      </p>
      <h3 id="kafka-%E8%93%84%E6%B0%B4%E6%B1%A0%E6%9C%BA%E5%88%B6">Kafka 蓄水池机制</h3>
    </div>
  </div>
  <BackToTopButton />
</template>

<style></style>
