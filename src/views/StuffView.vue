<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <div class="header">
    <p class="heading">Interesting Stuffs</p>
    <h1 style="text-align: center">Try find something you like ;)</h1>
    <p style="text-align: right">Btw I � Unicode</p>
  </div>
  <div class="content">
    <div class="content-item css">
      <h3>Cool Style Sheets</h3>
      <ul>
        <li>
          <a href="https://sakofchit.github.io/system.css">system.css</a>
          <p>
            I love this soooo much, that I decide use this decorate my blog.
          </p>
        </li>
        <li>
          <a href="https://github.com/jdan/98.css">98.css</a>
          <p>I would use this to make some dialog.</p>
        </li>
        <li>
          <a href="https://github.com/khang-nd/7.css">7.css</a>
          <p>Windows 7 style css, why there still have people using 7?</p>
        </li>
      </ul>
    </div>
    <div class="content-item etc">
      <h3>Something else</h3>
      <ul>
        <li>
          <a href="https://www.mindprod.com/jgloss/unmain.html">Unmaintainable code</a>
          <p>Feels like enterprise jvav guide.</p>
        </li>
        <li>
          <a href="https://testing.googleblog.com/2008/07/how-to-write-3v1l-untestable-code.html">Untestable code</a>
          <p>Who use unit test, aha?</p>
        </li>
        <li>
          <a href="https://alwaysjudgeabookbyitscover.com/">Always judge a book by it's cover</a>
          <p></p>
        </li>
        <img src="/images/stuffs/bookcover.jpg" style="max-width: 200px" />👈 Example
      </ul>
    </div>
    <div class="content-item rice">
      <h3>Rice</h3>
      <ul>
        <li>
          <details class="gnome">
            <summary>gnome</summary>
            <img src="/images/rices/gnome/rice.jpg" style="max-width: 90%" />

            <br />
            <img src="/images/rices/gnome/rice1.png" style="max-width: 90%" />
            <img src="/images/rices/gnome/rice2.png" style="max-width: 90%" />
            <img src="/images/rices/gnome/rice3.png" style="max-width: 90%" />
            <br />
            <button class="btn" onclick="document.documentElement.scrollTop = 0;document.body.scrollTop = 0;">
              Back to top
            </button>
          </details>
        </li>
      </ul>
      <ul>
        <li>
          <details class="win">
            <summary>windows 11</summary>
            <img src="/images/rices/windows/rice.png" style="max-width: 90%" />
            <br />
            <button class="btn" onclick="document.documentElement.scrollTop = 0;document.body.scrollTop = 0;">
              Back to top
            </button>
          </details>
        </li>
      </ul>
      <ul>
        <li>
          <details class="kde">
            <summary>KDE Plasma</summary>
            <img src="/images/rices/kde/rice.png" style="max-width: 90%" />
            <br /><img src="/images/rices/kde/rice1.png" style="max-width: 90%" />
            <br /><img src="/images/rices/kde/rice2.png" style="max-width: 90%" />
            <br />
            <button class="btn" onclick="document.documentElement.scrollTop = 0;document.body.scrollTop = 0;">
              Back to top
            </button>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
