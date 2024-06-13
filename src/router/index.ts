import { createRouter, createWebHistory } from "vue-router";

const checkPrivileges = (p: string) => {
  const privileges: string[] =
    JSON.parse(localStorage.getItem("privileges")) || [];
  if (privileges.includes("SuperAdmin")) return true;
  return privileges.includes(p);
};

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
      path: "/schedule",
      name: "schedule",
      component: () => import("@/views/ScheduleView/ScheduleView.vue"),
    },
    {
      path: "/schedule/:id",
      name: "scheduleInfo",
      component: () =>
        import("@/views/ScheduleGroupView/ScheduleGroupView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UsersView/UsersView.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("@/views/CalendarView/CalendarView.vue"),
    },
    {
      path: "/substitutions",
      name: "substitutions",
      component: () =>
        import("@/views/SubstitutionsView/SubstitutionsView.vue"),
    },
    {
      path: "/notfound",
      name: "notfound",
      component: () => import("@/views/404View.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/notfound",
    },
  ],
});

router.beforeEach(async (to, _) => {
  if (!localStorage.getItem("auth-token") && to.name !== "login") {
    return { name: "login" };
  }

  if (localStorage.getItem("auth-token") && to.name === "login") {
    return { name: "home" };
  }

  if (
    (to.name === "group" || to.name === "groupInfo") &&
    !checkPrivileges("GroupManager")
  )
    return { name: "notfound" };

  if (
    (to.name === "schedule" || to.name === "scheduleInfo") &&
    !checkPrivileges("ScheduleCoordinator")
  )
    return { name: "notfound" };

  if (to.name === "users" && !checkPrivileges("SuperAdmin"))
    return { name: "notfound" };

  if (to.name === "substitutions" && !checkPrivileges("Operator"))
    return { name: "notfound" };
});

export default router;
