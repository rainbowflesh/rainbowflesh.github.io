<script setup lang="ts"></script>
<template>
  <div class="r-sidebar window scale-down" style="width: 30rem; max-height: 15rem">
    <div class="title-bar">
      <button aria-label="Close" class="close"></button>
      <h1 class="title">Find</h1>
      <button aria-label="Resize" disabled class="hidden"></button>
    </div>
    <div class="separator"></div>
    <div class="modeless-dialog">
      <section class="field-row" style="justify-content: flex-start">
        <label for="text_find" class="modeless-text">Find:</label>
        <input id="text_find" type="text" style="width: 100%" placeholder="WIP..." />
      </section>
      <section class="field-row" style="justify-content: flex-end">
        <button class="btn">Cancel</button>
        <button class="btn" style="width: 95px" onclick="test">Find</button>
      </section>
      <div class="windows">
        <div class="title-bar"></div>
        <div>
          友链:
          <p class="font-effect-anaglyph">naidesu</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-effect-anaglyph {
  text-shadow: -0.1em 0 red, 0.1em 0 #0ff;
}
</style>
