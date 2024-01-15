<script setup lang="ts"></script>

<template>
  <div class="l-sidebar window">
    <div class="title-bar">
      <button aria-label="Close" class="close"></button>
      <h1 class="title">Index</h1>
      <button aria-label="Resize" class="resize"></button>
    </div>
    <div class="details-bar">
      <span>Have a</span>
      <span>nice day :)</span>
    </div>
    <div class="window-pane" style="padding: 1rem; font-size: 1rem">
      <ul>
        <li>
          <nav>
            <RouterLink to="/">Intro</RouterLink>
          </nav>
        </li>
        <li>
          Blogs
          <ul>
            <BlogList2022></BlogList2022>
            <BlogList2023></BlogList2023>
            <li>
              <nav>
                <RouterLink to="/2024/hAPpYneWyEAr"> hAPpYneWyEAr </RouterLink>
              </nav>
            </li>
          </ul>
        </li>
        <li>
          <nav>
            <RouterLink to="/stuff">面白いもの</RouterLink>
          </nav>
        </li>
        <li>
          <nav>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BlogList2023 from "../views/2023/BlogList.vue";
import BlogList2022 from "../views/2022/BlogList.vue";
export default {
  components: {
    BlogList2023: BlogList2023,
    BlogList2022: BlogList2022,
  },
};
</script>
