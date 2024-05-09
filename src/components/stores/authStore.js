import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userName: useLocalStorage("userName", {}),
    userId: useLocalStorage("userId", {}),
    jwt: useLocalStorage("jwt", {}),
  }),
  getters: {
    getUserName: (state) => {
      return state.userName;
    },
    getJwt: (state) => {
      return state.jwt;
    },
    getuserId: (state) => {
      return state.userId;
    },
  },
  actions: {
    setUserName(userName) {
      this.userName = userName;
    },
    setUserId(userId) {
      this.userId = userId;
    },
    setJwt(jwt) {
      this.jwt = jwt;
    },
  },
});
