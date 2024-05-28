import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView/HomeView.vue"),
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
    {
      path: "/groups/:id",
      name: "groupInfo",
      component: () => import("@/views/GroupInfoView/GroupInfoView.vue"),
    },
    {
      path: "/timetable",
      name: "timetable",
      component: () => import("@/views/TimeTableView/TimeTableView.vue"),
    },
    {
      path: "/timetable/:id",
      component: () =>
        import("@/views/TimeTableGroupView/TimeTableGroupView.vue"),
    },
    {
      path: "/users",
      component: () => import("@/views/UsersView/UsersView.vue"),
    },
    {
      path: "/calendar",
      component: () => import("@/views/CalendarView/CalendarView.vue"),
    },
    {
      path: "/substitutions",
      component: () => import("@/views/SubstitutionsView/SubstitutionsView.vue")
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/login",
    },
  ],
});

export default router;