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
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/2022/0910",
      name: "09102022",
      component: () => import("../views/2022/blog_0910.vue"),
    },
    {
      path: "/2022/hadoop",
      name: "hadoop",
      component: () => import("../views/2022/blog_hadoop.vue"),
    },
  ],
});

export default router;
