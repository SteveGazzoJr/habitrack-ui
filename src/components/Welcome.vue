<script>
export default {
  name: "WelcomeComponent",
  data() {
    return {};
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h1>I DON'T KNOW YOU</h1>
    <h4>that's my purse</h4>
    <a href @click="goToRegister()">Register</a>
    <br /><br />
    <a href @click="goToLogin()">Login</a>
  </div>
</template>

<style></style>
