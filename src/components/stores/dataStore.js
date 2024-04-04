import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    tags: useLocalStorage("tags", [[]]),
  }),
  getters: {
    getTags: (state) => {
      return state.tags;
    },
  },
  actions: {
    setTags(tags) {
      console.log(tags);
      this.tags = tags;
    },
  },
});
