<template>
  <div class="wrapper">
    <h2>Register</h2>
    <br />
    <form>
      <label for="email">Email</label>
      <br />
      <input class="text" id="email" name="email" v-model="email" />
      <label for="phone">Phone</label>
      <br />
      <input class="text" id="phone" name="phone" v-model="phone" />
      <br />
      <label for="contactPreference">Contact preference</label>
      <br />
      <select
        class="text"
        name="contactPreference"
        id="contactPreference"
        v-model="contactPreference"
      >
        <option selected value="EMAIL">Email</option>
        <option value="SMS">SMS</option>
      </select>
    </form>
    <br />
    <button
      class="submit-button"
      @click.prevent="submitUser(email, phone, contactPreference)"
    >
      Submit
    </button>
    <br />
  </div>
</template>
<script>
import axios from "axios";
import { useAuthStore } from "./stores/authStore";

export default {
  name: "EventFetcher",
  data() {
    return {
      authStore: useAuthStore(),
      contactPreference: "EMAIL",
    };
  },
  methods: {
    async submitUser(email, phone, contactPreference) {
      await axios.post("http://localhost:8081/user", {
        email: email,
        phone: phone,
        preference: contactPreference,
      });
    },
  },
};
</script>
