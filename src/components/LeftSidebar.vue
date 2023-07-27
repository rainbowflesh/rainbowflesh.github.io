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
            <details>
              <summary>2022</summary>
              <li>
                <nav>
                  <RouterLink to="/2022/kismet">Kismet usage record</RouterLink>
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
                  <RouterLink to="/2022/kafka">Kafka</RouterLink>
                </nav>
              </li>
              <li>
                <nav>
                  <RouterLink to="/2022/tello">Tello Hack</RouterLink>
                </nav>
              </li>
              <br />
            </details>
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
            <li>
              <nav>
                <RouterLink to="/2023/pyDbus">Python & Dbus</RouterLink>
              </nav>
            </li>
            <li>
              <nav>
                <RouterLink to="/2023/starfieldVisual">Starfield Visual</RouterLink>
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
