import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/users/Auth.vue";
import BookPage from "../views/books/Home.vue"

const routes = [
  {
    path: "/",
    name: "HomePage",
    meta: { layout: "main" },
    component: Home,
  },
  {
    path: "/auth",
    name: "AuthPage",
    meta: { layout: "default" },
    component: Auth,
  },
  {
    path: "/book/:id",
    name: "BookPage",
    meta: { layout: "main" },
    props: true,
    component: BookPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
