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
    <a href @click="goToRegister()">Register</a>
    <br /><br />
    <a href @click="goToLogin()">Login</a>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    goToEventCreator() {
      this.$router.push("/eventcreator");
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goToEventFetcher() {
      this.$router.push("/eventfetcher");
    },
    goToEventTracker() {
      this.$router.push("/eventtracker");
    },
    goToLogin() {
      this.$router.push("/login");
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
