<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
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
              <details>
                <summary>2022</summary>
                <li>
                  <nav>
                    <RouterLink to="/2022/kismet"
                      >Kismet usage record</RouterLink
                    >
                  </nav>
                </li>
                <li>
                  <nav>
                    <RouterLink to="/2022/hadoop">Hadoop</RouterLink>
                  </nav>
                </li>
                <li>
                  <nav>
                    <RouterLink to="/2022/hive">Hive</RouterLink>
                  </nav>
                </li>
                <li>
                  <nav>
                    <RouterLink to="/2022/spark">Spark</RouterLink>
                  </nav>
                </li>
                <li>
                  <nav>
                    <RouterLink to="/2022/tello">Tello Hack</RouterLink>
                  </nav>
                </li>
              </details>
              <br />
              2023
              <li>
                <nav>
                  <RouterLink to="/2023/marp">Marp</RouterLink>
                </nav>
              </li>
              <li>
                <nav>
                  <RouterLink to="/2023/z13">Rog Flow z13 2023</RouterLink>
                </nav>
              </li>
              <li>
                <nav>
                  <RouterLink to="/2023/droneSim">无人机集群仿真</RouterLink>
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
    <div class="standard-dialog content">
      <RouterView />
    </div>
    <div
      class="r-sidebar window scale-down"
      style="width: 30rem; max-height: 15rem"
    >
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">Find</h1>
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
            placeholder="WIP..."
          />
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
  min-height: 40rem;
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

.font-effect-anaglyph {
  text-shadow: -0.1em 0 red, 0.1em 0 #0ff;
}
</style>
