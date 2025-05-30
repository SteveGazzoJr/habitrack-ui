import { createApp } from "vue";
import App from "./App.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import { createPinia } from "pinia";
import CategoryComponent from "./components/CategoryComponent.vue";
import TagInput from "./components/TagInput.vue";
import RatingComponent from "./components/RatingComponent.vue";
import axios from "axios";
import { useAuthStore } from "./components/stores/authStore";
import { router } from "./router.js";

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    config.headers["Authorization"] = `Bearer ${authStore.getJwt}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    if (error.response.status === 401 || error.response.status === 403) {
      //TODO add conditional here to clear auth data and push to login on 403 only
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      authStore.logOut();
      router.push("/");
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
);

const pinia = createPinia();
const app = createApp(App);

app.component("category-component", CategoryComponent);
app.component("tag-input", TagInput);
app.component("rating-component", RatingComponent);

app
  .use(pinia)
  .use(router)
  .use(Vue3ColorPicker)
  .use(SimpleTypeahead)
  .mount("#app");
