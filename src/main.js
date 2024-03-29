import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import EventCreator from "./components/EventCreator.vue";
import EventFetcher from "./components/EventFetcher.vue";
import EventTracker from "./components/EventTracker.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import { createPinia } from "pinia";
import Category from "./components/Category.vue";

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
    {
      path: "/eventtracker",
      component: EventTracker,
    },
  ],
});

const pinia = createPinia();
const app = createApp(App);

app.component("category-component", Category);

app
  .use(pinia)
  .use(router)
  .use(Vue3ColorPicker)
  .use(SimpleTypeahead)
  .mount("#app");
