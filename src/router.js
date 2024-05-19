import { createRouter, createWebHistory } from "vue-router";
import EventCreator from "./components/EventCreator.vue";
import EventFetcher from "./components/EventFetcher.vue";
import EventTracker from "./components/EventTracker.vue";
import Welcome from "./components/Welcome.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/eventcreator",
      component: EventCreator,
    },
    {
      path: "/eventfetcher",
      component: EventFetcher,
    },
    {
      path: "/eventtracker",
      component: EventTracker,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/",
      component: Welcome,
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});
