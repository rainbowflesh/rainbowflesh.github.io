<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <title>Starfield Visual</title>
  <div class="container">
    <div class="content">
      <h1>没看过原作的 Starfield 同人 OOC 视觉图</h1>
      <h4>标签: 同人 OOC, 屎掘图, 抽象, 抽象艺术, 抽象, (CC 4.0)©</h4>
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
      <p>上面👆那两个其实是 CSS 渲染的.</p>
      <p>下面👇是正经图片.</p>
      <div class="preview">
        <img class="preview" src="/images/blogs/starfield/4k-web.png" />
        <br />
        <br />
        <img class="preview" src="/images/blogs/starfield/4k-web-logo.png" />
        <br />
        <br />
        <img class="preview right" src="/images/blogs/starfield/4k-web-logo-dark.png" />
        <br />
        <br />
        <img class="preview" src="/images/blogs/starfield/4k-web-icon.png" />
        <br />
        <br />
        <img class="preview" src="/images/blogs/starfield/4k-web-icon-dark.png" />
        <br />
        <br />
        <img class="preview" src="/images/blogs/starfield/2k-web.png" />
        <br />
        <br />
        <img class="preview" src="/images/blogs/starfield/2k-web-light.png" />
        <br />
        <br />
      </div>
      <div class="work">
        <ul role="menu-bar">
          <li role="menu-item" tabindex="0" aria-haspopup="false">
            <a
              target="_blank"
              href="https://raw.githubusercontent.com/rainbowflesh/rainbowflesh.github.io/main/public/images/blogs/starfield/work.psd"
              download="work.psd"
              >Download 原始檔案</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.right {
  margin-right: 0;
  margin-left: auto;
}
.preview {
  width: 480px;
}
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
