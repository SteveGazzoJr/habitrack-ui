import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import EventCreator from "./components/EventCreator.vue";
import EventFetcher from "./components/EventFetcher.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const router = createRouter({
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
  ],
});

const app = createApp(App);
app.use(router).use(Vue3ColorPicker).mount("#app");
