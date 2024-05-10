import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userName: useLocalStorage("userName", {}),
    userId: useLocalStorage("userId", {}),
    jwt: useLocalStorage("jwt", {}),
    email: useLocalStorage("email", {}),
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
    getEmail: (state) => {
      return state.email;
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
    setEmail(email) {
      this.email = email;
    },
  },
});
