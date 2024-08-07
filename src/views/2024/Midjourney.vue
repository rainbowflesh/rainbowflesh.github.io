<script setup lang="ts"></script>
<template>
  <title>Blog template</title>
  <div class="container">
    <div class="content">
      <h1>This is an blog page</h1>
      MidjourneyMidjourneyMidjourneyMidjourneyMidjourneyMidjourneyMidjourney
      <input type="range" value="0" min="0" max="120" step="0.001" id="timeInp" />
      <div id="text-grid"></div>
    </div>
  </div>
</template>

<style></style>
<script setup>
import { drawText } from "../../components/Midjourney.js";
drawText();
</script>
