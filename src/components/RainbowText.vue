<script setup lang="ts"></script>

<template>
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
</template>
<style lang="scss">
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

$root: ".c-rainbow";

:root {
  --color-background: #31037d;
  --axis-x: -4px;
  --axis-y: 0.5rem;
  --delay: 7;

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

    text-shadow: -1px -1px 0 var(--color-black), 1px -1px 0 var(--color-black), -1px 1px 0 var(--color-black),
      1px 1px 0 var(--color-black), 4px 4px 0 rgba(0, 0, 0, 0.2);

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
