<template>
  <div class="wrapper">
    <h2>Register</h2>
    <br />
    <form>
      <label for="displayName">Display Name</label>
      <br />
      <div v-if="isEmptyDisplayName">
        <h5>Please enter a display name</h5>
      </div>
      <input
        class="text"
        id="displayName"
        name="displayName"
        v-model="displayName"
      />
      <label for="email">Email</label>
      <br />
      <div v-if="isBadEmail">
        <h5>Please enter a valid email address</h5>
      </div>
      <input
        type="email"
        class="text"
        id="email"
        name="email"
        v-model="email"
      />
      <label>Phone (digits only)</label>
      <br />
      <div v-if="isBadPhone">
        <h5>Please enter a valid phone number</h5>
      </div>
      <input
        type="tel"
        class="shortText"
        id="phone"
        name="phone"
        v-model="phone"
      />
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
      @click.prevent="submitUser(displayName, email, phone, contactPreference)"
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
      isBadEmail: false,
      isBadPhone: false,
      isEmptyDisplayName: false,
    };
  },
  methods: {
    validateEmail(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    validatePhone(phone) {
      return phone.match(
        /^(1\s|1|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/
      );
    },
    async submitUser(displayName, email, phone, contactPreference) {
      this.isBadEmail = false;
      this.isBadPhone = false;
      this.isEmptyDisplayName = false;

      this.isBadEmail = !this.validateEmail(email);
      this.isBadPhone = !this.validatePhone(phone);
      this.isEmptyDisplayName = displayName.trim().length === 0;

      if (this.isBadEmail || this.isBadPhone || this.isEmptyDisplayName) {
        return;
      }

      await axios.post("http://localhost:8081/user", {
        displayName: displayName,
        email: email,
        phone: phone,
        preference: contactPreference,
      });
    },
  },
};
</script>
