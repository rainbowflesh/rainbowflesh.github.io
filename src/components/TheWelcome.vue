<script setup lang="ts">
import RainbowText from "./RainbowText.vue";
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="heading">RAINBOW`s Blog</div>
      <p class="desc" style="text-align: center; font-family: Geneva_9; font-size: 2em">
        A blog designed with
        <a href="https://sakofchit.github.io/system.css">system.css</a> for retro
        <span role="img" class="apple" aria-label="Apple"></span>-looking style.
      </p>
    </div>
    <div class="content">
      <div class="text">
        <h1>Greeting!</h1>
        <blockquote style="text-align: center">
          Quidquid latine dictum sit, altum sonatur.
          <footer>— I forgot where i find this quote but I use it, R. flesh</footer>
        </blockquote>
      </div>
      <div class="content" style="padding-left: 20px">
        <span style="">Welcome to my blog</span>
        <p>I create this blog for record my technic working life,</p>
        <p>And sharding interesting stuff for ya.</p>
      </div>
      <p
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-end;
          align-items: flex-end;
          align-content: flex-end;
          margin-top: 5rem;
        "
      >
        <a href="https://github.com/rainbowflesh/rainbowflesh.github.io"> Blog repo </a>
      </p>
      <RainbowText />
    </div>
    <a
      class="icp"
      href="https://icp.gov.moe/?keyword=20230429"
      target="_blank"
      style="justify-content: center; display: flex; align-items: center"
      >萌ICP备20230429号</a
    >
  </div>
</template>
