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
      component: () => import("../views/2022/blog_kismet.vue"),
    },
    {
      path: "/2022/hadoop",
      name: "hadoop",
      component: () => import("../views/2022/blog_hadoop.vue"),
    },
    {
      path: "/2022/hive",
      name: "hive",
      component: () => import("../views/2022/blog_hive.vue"),
    },
    {
      path: "/2022/spark",
      name: "spark",
      component: () => import("../views/2022/blog_spark.vue"),
    },
    {
      path: "/2022/tello",
      name: "tello",
      component: () => import("../views/2022/blog_tello.vue"),
    },
  ],
});

export default router;
