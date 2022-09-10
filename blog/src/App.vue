<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="Layout">
      <div class="sidebar window">
        <div class="title-bar">
          <button aria-label="Close" class="close"></button>
          <h1 class="title">Index</h1>
          <button aria-label="Resize" class="resize"></button>
        </div>
        <div class="details-bar">
          <span>some</span>
          <span>more</span>
          <span>details</span>
        </div>

        <div class="window-pane">
          <ul>
            <li>
              <nav>
                <RouterLink to="/">Intro</RouterLink>
              </nav>
            </li>
            <li>
              <nav>
                <RouterLink to="/about">About</RouterLink>
              </nav>
            </li>
            <li>
              Blogs
              <ul>
                2022

                <li>
                  <nav>
                    <RouterLink to="/2022/0910">09102022</RouterLink>
                  </nav>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="standard-dialog">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
