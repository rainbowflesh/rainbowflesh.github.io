<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <title>Starfield Visual</title>
  <div class="container">
    <div class="content">
      <h1>没看过原作的 Starfield Visual 同人 OOC</h1>
      <div class="dark">
        <div class="banner color-palette"></div>
        <div class="wallpaper-dark">
          <div class="ion-background"></div>
          <img class="logo-light" src="/images/blogs/starfield/logo.svg" alt="logo" />
        </div>
        <div class="banner color-palette"></div>
      </div>
      <br />
      <div class="light">
        <div class="banner color-palette"></div>
        <div class="wallpaper-light">
          <div class="ion-background"></div>
          <img class="logo" src="/images/blogs/starfield/logo.svg" alt="logo" />
        </div>
        <div class="banner color-palette"></div>
      </div>
    </div>
  </div>
</template>

<style>
.color-palette {
  --number-of-stripes: 4;
  --stripe-height: 12px;
  background-image: linear-gradient(
    rgb(200, 35, 55) 0%,
    rgb(200, 35, 55) 25%,
    rgb(224, 98, 54) 25%,
    rgb(224, 98, 54) 50%,
    rgb(215, 171, 97) 50%,
    rgb(215, 171, 97) 75%,
    rgb(47, 76, 121) 75%,
    rgb(47, 76, 121) 100%
  );
  height: calc(var(--stripe-height) * var(--number-of-stripes));
}
.wallpaper-dark {
  background-image: url("/images/blogs/starfield/gravity_waves.jpg");
  background-size: 100%;
}
.wallpaper-light {
  background-image: url("/images/blogs/starfield/gravity_waves_white.jpg");
  background-size: 100%;
}
.ion-background {
  background-image: url("/images/blogs/starfield/ION_paper_800px.png");
  overflow-x: clip;
  background-color: rgb(245, 247, 247);
  background-repeat: repeat;
}
.logo-light {
  -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
  filter: invert(100%);
}
</style>
