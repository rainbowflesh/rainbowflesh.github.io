<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
function something() {
  console.log("Wanna try something big?");
}
something;
</script>

<template>
  <!-- <div class="container"> -->
  <div class="layout">
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

      <div class="window-pane" style="padding: 1rem">
        <ul>
          <li>
            <nav>
              <RouterLink to="/">Intro</RouterLink>
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
          <li>
            <nav>
              <RouterLink to="/about">About</RouterLink>
            </nav>
          </li>
        </ul>
      </div>
    </div>
    <div class="standard-dialog content">
      <RouterView />
    </div>
    <div class="r-sidebar window scale-down" style="width: 30rem">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">Find blog</h1>
        <button aria-label="Resize" disabled class="hidden"></button>
      </div>
      <div class="separator"></div>

      <div class="modeless-dialog">
        <section class="field-row" style="justify-content: flex-start">
          <label for="text_find" class="modeless-text">Find:</label>
          <input
            id="text_find"
            type="text"
            style="width: 100%"
            placeholder="something..."
          />
        </section>
        <section class="field-row" style="justify-content: flex-end">
          <button class="btn">Cancel</button>
          <button class="btn" style="width: 95px" onclick="test">Find</button>
        </section>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: space-between;
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
}
.standard-dialog {
  margin-top: 18px;
  min-width: 60%;
}

.r-sidebar {
  min-width: 200px;
  margin-top: 18px;
}
</style>
