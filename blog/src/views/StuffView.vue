<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <div class="header">
    <p class="heading">Interesting Stuffs</p>

    <h1 style="text-align: center">Try find something you like ;)</h1>
  </div>
  <div class="content">
    <div>
      <h3>Cool Style Sheets</h3>
      <ul>
        <li>
          <a href="https://sakofchit.github.io/system.css">system.css</a>
        </li>
        I love this soooo much, that I decide use this decorate my blog.
        <li>
          <a href="https://github.com/jdan/98.css">98.css</a>
        </li>
        I would use this to make some dialog.
        <li>
          <a href="https://github.com/khang-nd/7.css">7.css</a>
        </li>
        Windows 7 style css, why there still have people using 7?
        <li>
          <a href="https://www.mindprod.com/jgloss/unmain.html"
            >Unmaintainable code</a
          >
        </li>
        Feels like enterprise jvav guide.
        <li>
          <a
            href="https://testing.googleblog.com/2008/07/how-to-write-3v1l-untestable-code.html"
            >Untestable code</a
          >
        </li>
        Who use unit test, aha?
        <li>
          <a href="https://alwaysjudgeabookbyitscover.com/"
            >Always judge a book by it's cover</a
          >
        </li>
        Example 👉
        <img
          src="https://d33wubrfki0l68.cloudfront.net/8976291c46c8d8d8f4e07c437ec614a6947b6a5f/e6679/assets/07-talk-to-your-cat.jpg"
          height="200px"
        />
      </ul>
    </div>
    <div class="rainbow-text">
      <ul class="c-rainbow" style="z-index: 1">
        <li class="c-rainbow__layer c-rainbow__layer--white">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--orange">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--red">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--violet">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--blue">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--green">RAINBOW</li>
        <li class="c-rainbow__layer c-rainbow__layer--yellow">RAINBOW</li>
      </ul>
    </div>
  </div>
</template>

<style></style>

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
  list-style: none;
  padding: 0;
  margin: 0;
  &__layer {
    --text-color: var(--color-foreground);
    counter-increment: rainbow;

    font-size: 1rem;
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
