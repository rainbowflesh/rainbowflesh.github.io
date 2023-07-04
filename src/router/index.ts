import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stuff",
      name: "stuff",
      component: () => import("../views/StuffView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/2022/kismet",
      name: "kismet",
      component: () => import("../views/2022/kismet.vue"),
    },
    {
      path: "/2022/hadoop",
      name: "hadoop",
      component: () => import("../views/2022/hadoop.vue"),
    },
    {
      path: "/2022/hive",
      name: "hive",
      component: () => import("../views/2022/hive.vue"),
    },
    {
      path: "/2022/spark",
      name: "spark",
      component: () => import("../views/2022/spark.vue"),
    },
    {
      path: "/2022/tello",
      name: "tello",
      component: () => import("../views/2022/tello.vue"),
    },
    {
      path: "/2023/marp",
      name: "marp",
      component: () => import("../views/2023/marpdown.vue"),
    },
    {
      path: "/2023/z13",
      name: "z13锐评",
      component: () => import("../views/2023/z13.vue"),
    },
    {
      path: "/2023/droneSim",
      name: "无人机仿真",
      component: () => import("../views/2023/droneSim.vue"),
    },
    {
      path: "/2023/pyDbus",
      name: "pythonDbus",
      component: () => import("../views/2023/pyDbus.vue"),
    },
    {
      path: "/2023/starfieldVisual",
      name: "starfieldVisual",
      component: () => import("../views/2023/starfieldVisual.vue"),
    },
  ],
});

export default router;
