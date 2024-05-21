<template>
  <div class="routerLink">
    <a href @click="goHome()">Home</a>
    <br /><br />
    <a href @click="goToEventCreator()">Event Creator</a>
    <br /><br />
    <a href @click="goToEventFetcher()">Event Fetcher</a>
    <br /><br />
    <a href @click="goToEventTracker()">Event Tracker</a>
    <br /><br />
    <div v-if="authStore.isLoggedIn">
      <a href @click="authStore.logOut()">Log out</a>
    </div>
    <div v-else>
      <a href @click="goHome()">Log In</a>
    </div>
  </div>
  <br />
  <br />
  <router-view />
</template>
//figure out how to make logout div invisible if token not set
<script>
import { useAuthStore } from "./components/stores/authStore";
export default {
  name: "App",
  components: {},
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    goToEventCreator() {
      this.$router.push("/eventcreator");
    },
    goToEventFetcher() {
      this.$router.push("/eventfetcher");
    },
    goToEventTracker() {
      this.$router.push("/eventtracker");
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.text {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem;
  margin-bottom: 10px;
}

.shortText {
  width: 10;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem;
  margin-bottom: 10px;
}

.routerLink {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-left: -80%;
  padding: 40px;
  font-size: 25px;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 40%;
}

.submit-button {
  margin-top: 10px;
}
</style>
