import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userName: useLocalStorage("userName", "Steve"),
    jwt: useLocalStorage("jwt", "testJwt"),
  }),
  getters: {
    getUserName: (state) => {
      return state.userName;
    },
    getJwt: (state) => {
      return state.jwt;
    },
  },
});
