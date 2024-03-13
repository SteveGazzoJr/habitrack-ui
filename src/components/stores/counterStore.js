import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    count: useLocalStorage("count", 0),
  }),
  actions: {
    increment() {
      console.log("increment");
      this.count++;
    },
    decrement() {
      console.log("decrement");
      this.count--;
    },
  },
});
