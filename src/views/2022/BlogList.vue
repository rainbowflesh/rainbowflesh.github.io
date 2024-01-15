<template>
  <div>
    <details>
      <summary>2022</summary>
      <li>
        <nav>
          <RouterLink to="/2022/kismet">Kismet usage record</RouterLink>
        </nav>
      </li>
      <li>
        <nav>
          <RouterLink to="/2022/hadoop">Hadoop</RouterLink>
        </nav>
      </li>
      <li>
        <nav>
          <RouterLink to="/2022/hive">Hive</RouterLink>
        </nav>
      </li>
      <li>
        <nav>
          <RouterLink to="/2022/spark">Spark</RouterLink>
        </nav>
      </li>
      <li>
        <nav>
          <RouterLink to="/2022/kafka">Kafka</RouterLink>
        </nav>
      </li>
      <li>
        <nav>
          <RouterLink to="/2022/tello">Tello Hack</RouterLink>
        </nav>
      </li>
      <br />
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss"></style>
