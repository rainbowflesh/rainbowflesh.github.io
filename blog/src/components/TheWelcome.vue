<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="header">
      <div class="heading">
        <ul class="c-rainbow" style="z-index: 1">
          <li class="c-rainbow__layer c-rainbow__layer--white">
            RAINBOW`s Blog
          </li>
          <li class="c-rainbow__layer c-rainbow__layer--orange">
            RAINBOW`s Blog
          </li>
          <li class="c-rainbow__layer c-rainbow__layer--red">RAINBOW`s Blog</li>
          <li class="c-rainbow__layer c-rainbow__layer--violet">
            RAINBOW`s Blog
          </li>
          <li class="c-rainbow__layer c-rainbow__layer--blue">
            RAINBOW`s Blog
          </li>
          <li class="c-rainbow__layer c-rainbow__layer--green">
            RAINBOW`s Blog
          </li>
          <li class="c-rainbow__layer c-rainbow__layer--yellow">
            RAINBOW`s Blog
          </li>
        </ul>
      </div>
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
<style lang="scss">
$root: ".c-rainbow";

:root {
  --color-background: #31037d;
  --axis-x: 1px;
  --axis-y: 0.5rem;
  --delay: 10;

  --color-black: #000;
  --color-white: #fff;
  --color-orange: #d49c3d;
  --color-red: #d14b3d;
  --color-violet: #cf52eb;
  --color-blue: #44a3f7;
  --color-green: #5acb3c;
  --color-yellow: #debf40;

  --color-foreground: var(--color-white);
  --font-name: Righteous;
}

#{$root} {
  counter-reset: rainbow;
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;

  padding: 0;
  margin: 0;
  top: 0.4rem;
  text-align: center;
  margin: 0 auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &__layer {
    --text-color: var(--color-foreground);
    counter-increment: rainbow;

    font-size: 3rem;
    color: var(--text-color);

    text-shadow: -1px -1px 0 var(--color-black), 1px -1px 0 var(--color-black),
      -1px 1px 0 var(--color-black), 1px 1px 0 var(--color-black),
      4px 4px 0 rgba(0, 0, 0, 0.2);

    animation: rainbow 1.5s ease-in-out infinite;

    @for $i from 1 through 7 {
      &:nth-child(#{$i}) {
        animation-delay: calc(#{$i} / var(--delay) * 1s);
        left: calc(var(--axis-x) * #{$i});
        z-index: -#{$i * 10};
      }
    }

    &:not(:first-child) {
      position: absolute;
      top: 0;
    }

    &--white {
      --text-color: var(--color-white);
    }
    &--orange {
      --text-color: var(--color-orange);
    }
    &--red {
      --text-color: var(--color-red);
    }
    &--violet {
      --text-color: var(--color-violet);
    }
    &--blue {
      --text-color: var(--color-blue);
    }
    &--green {
      --text-color: var(--color-green);
    }
    &--yellow {
      --text-color: var(--color-yellow);
    }
  }
}

@keyframes rainbow {
  0%,
  100% {
    transform: translatey(var(--axis-y));
  }
  50% {
    transform: translatey(calc(var(--axis-y) * -1));
  }
}
</style>
