import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import GroupsView from "@/views/GroupsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: GroupsView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogInView.vue"),
    },
  ],
});

export default router;
