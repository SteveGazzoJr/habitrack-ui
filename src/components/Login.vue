<template>
  <div class="wrapper">
    <h2>Login</h2>
    <br />
    <form>
      <label for="email">Email</label>
      <br />
      <div v-if="isBadEmail">
        <h5>Please enter a valid email address</h5>
      </div>
      <div v-if="authStore.getEmail">
        {{ authStore.getEmail }}
        <br />
        <a href @click="authStore.clear()">Log in as someone else</a>
      </div>
      <div v-else>
        <input
          type="email"
          class="text"
          id="email"
          name="email"
          v-model="email"
        />
      </div>
      <br />
      <div v-if="isValidContactMethod"></div>
      <div v-else>
        <h5>Please select a contact method</h5>
      </div>
      <p>Receive login code via:</p>
      <input
        type="radio"
        id="sms"
        value="SMS"
        v-model="picked"
        name="contact_method"
      />
      <label for="sms">SMS</label>

      <input
        type="radio"
        id="email"
        value="EMAIL"
        v-model="picked"
        name="contact_method"
      />
      <label for="email">Email</label>
      <br />
    </form>
    <button
      v-if="!isCodeSent"
      name="sendCode"
      class="submit-button"
      @click.prevent="initiateLogin(email, picked)"
    >
      Submit
    </button>
    <div v-if="isCodeSent">
      <form>
        <label for="code">Code</label>
        <br />
        <div v-if="isInvalidCode">
          <h5>Please enter the code that was sent to you</h5>
        </div>
        <input type="code" class="text" id="code" name="code" v-model="code" />
        <br />
        <br />
      </form>
      <button
        class="submit-button"
        name="submitCode"
        @click.prevent="submitCode(code)"
      >
        Submit
      </button>
    </div>
  </div>
</template>
//figure out how to use email from authStore as default value
<script>
//make a separate form for savedEmail and newEmail - try to compose where
//possible
import axios from "axios";
import { useAuthStore } from "./stores/authStore";

export default {
  name: "LoginVue",
  data() {
    return {
      authStore: useAuthStore(),
      contactPreference: "EMAIL",
      isBadEmail: false,
      isValidContactMethod: true,
      isCodeSent: false,
      isInvalidCode: false,
      email: "",
    };
  },
  methods: {
    validateEmail(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    async initiateLogin(email, picked) {
      if (email === "") {
        email = this.authStore.getEmail;
      }
      this.isBadEmail = false;
      this.isValidContactMethod = true;

      this.isBadEmail = !this.validateEmail(email);
      this.isValidContactMethod = picked === "EMAIL" || picked === "SMS";

      if (this.isBadEmail || !this.isValidContactMethod) {
        return;
      }

      const { data } = await axios.post(
        "http://localhost:8081/verificationCode/send",
        {
          email: email,
          preference: picked,
        }
      );
      this.authStore.setUserId(data.id);
      this.authStore.setUserName(data.displayName);
      this.authStore.setEmail(data.email);
      this.isCodeSent = true;
    },
    async submitCode(code) {
      if (code.length != 4) {
        this.isInvalidCode = true;
        return;
      }

      try {
        const { headers, data } = await axios.post(
          "http://localhost:8081/verificationCode/verify",
          {
            userId: this.authStore.getuserId,
            code: code,
          }
        );

        this.authStore.setJwt(headers.get("x-token"));
        this.authStore.setUserId(data.id);
        this.authStore.setUserName(data.displayName);
        this.authStore.setEmail(data.email);
        this.isCodeSent = false;
        this.isInvalidCode = false;
        this.$router.push("/eventtracker");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
