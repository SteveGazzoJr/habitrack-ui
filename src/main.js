import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import EventCreator from "./components/EventCreator.vue";
import EventFetcher from "./components/EventFetcher.vue";
import EventTracker from "./components/EventTracker.vue";
import Welcome from "./components/Welcome.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import { createPinia } from "pinia";
import Category from "./components/Category.vue";
import TagInput from "./components/TagInput.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";

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

const pinia = createPinia();
const app = createApp(App);

app.component("category-component", Category);
app.component("tag-input", TagInput);

app
  .use(pinia)
  .use(router)
  .use(Vue3ColorPicker)
  .use(SimpleTypeahead)
  .mount("#app");
