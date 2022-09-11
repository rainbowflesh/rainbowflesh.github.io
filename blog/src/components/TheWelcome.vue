<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="header">
      <p class="heading">Rainbow's Blog</p>
      <p
        class="desc"
        style="text-align: center; font-family: Geneva_9; font-size: 2em"
      >
        A blog designed with
        <a href="https://sakofchit.github.io/system.css">system.css</a> for
        retro <span role="img" class="apple" aria-label="Apple"></span>-looking
        style.
      </p>
    </div>
    <div class="content">
      <div class="text">
        <h1>Greeting!</h1>
        <blockquote style="text-align: center">
          Quidquid latine dictum sit, altum sonatur.
          <footer>
            — I forgot where i find this quote but I use it, R. flesh
          </footer>
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
        <a href="https://github.com/rainbowflesh/rainbowflesh.github.io">
          Blog repo
        </a>
      </p>
    </div>
  </div>
</template>
<style>
blockquote {
  margin: 0 0 20px;
  padding: 20px;
  width: 80%;
  font-size: 14px;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
blockquote footer {
  margin: 12px 0 0 12px;
  font-size: 11px;
}
</style>
