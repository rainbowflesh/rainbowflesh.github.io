<script setup lang="ts">
import { RouterView } from "vue-router";
import LeftSidebar from "./components/LeftSidebar.vue";
import RightSidebar from "./components/RightSidebar.vue";
import "@/assets/blog.css";
</script>
<script lang="ts">
export default {
  mounted() {
    console.log("Wanna try something big? y/n");
    console.log("%c >> n", "color:red");
  },
};
</script>
<template>
  <div class="layout">
    <LeftSidebar />
    <div class="standard-dialog content">
      <RouterView />
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: space-between;
  min-height: 80vh;
}
.col-main {
  flex: 1;
}
.col-complementary {
  flex: 1;
}
.l-sidebar {
  min-width: 210px;
  margin-top: 18px;
  height: 100%;
}
.standard-dialog {
  margin-top: 18px;
  min-width: 60%;
}
.r-sidebar {
  min-width: 180px;
  margin-top: 18px;
}
.font-effect-anaglyph {
  text-shadow: -0.1em 0 red, 0.1em 0 #0ff;
}
</style>
./components/LeftSidebar.tsx
