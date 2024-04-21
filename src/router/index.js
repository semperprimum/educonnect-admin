import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import GroupsView from "@/views/GroupsView/GroupsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LogInView.vue"),
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("@/views/GroupsView/GroupsView.vue"),
    },
  ],
});

export default router;
