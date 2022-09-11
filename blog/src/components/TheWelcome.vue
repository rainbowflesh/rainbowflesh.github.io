<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="header">
      <p class="heading center" style="font-size: 3rem; text-align: center">
        Rainbow's Blog
      </p>
      <p
        class="desc center"
        style="text-align: center; font-family: Geneva_9; font-size: 2em"
      >
        A blog designed with
        <a href="https://sakofchit.github.io/system.css">system.css</a> for
        retro <span role="img" class="apple" aria-label="Apple"></span>-looking
        style.
      </p>
    </div>
    <div class="content">
      <h1>Greeting!</h1>
      <div style="padding-left: 20px">
        <blockquote class="center">
          Quidquid latine dictum sit, altum sonatur.
          <footer>
            — I forgot where i find this quote but i use it,R. flesh
          </footer>
        </blockquote>
      </div>
      <span>Welcome to my blog</span>
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
  text-align: center;
}
blockquote footer {
  margin: 12px 0 0 12px;
  font-size: 11px;
}
</style>
