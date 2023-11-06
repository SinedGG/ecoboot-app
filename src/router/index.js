import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("@/views/ReportPick.vue"),
  },
  {
    path: "/power-bi",
    name: "reports-bi",
    component: () => import("@/views/PowerBi.vue"),
  },
  {
    path: "/report-viewer/:data*",
    name: "report-viewer",
    component: () => import("@/views/ReportView.vue"),
  },
  {
    path: "/charts",
    name: "charts",
    component: () => import("@/views/ChartPick.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
