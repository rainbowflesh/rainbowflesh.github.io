<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
</script>

<template>
  <div class="container">
    <div class="container">
      <div class="sidebar window">
        <div class="title-bar">
          <button aria-label="Close" class="close"></button>
          <h1 class="title">A Title Bar</h1>
          <button aria-label="Resize" disabled class="hidden"></button>
        </div>
      </div>
      <div class="standard-dialog center scale-down" style="width: 30rem">
        <h1 class="dialog-text">
          The Macintosh Finder, Version 1.0 (18 Jan 84)
        </h1>
        <p class="dialog-text">&copy; 1984 Apple Computer</p>
      </div>
    </div>
  </div>
  <div class="sample">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>

    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
