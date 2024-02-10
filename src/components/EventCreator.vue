<script>
/* eslint-disable */
import axios from "axios";
import { ref } from "vue";
import { ColorInputWithoutInstance } from "tinycolor2";

export default {
  name: "EventCreator",
  data() {
    return {
      eventId: {},
      eventFetched: false,
      pureColor: ref < ColorInputWithoutInstance > "red",
      gradientColor: ref(
        "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
      ),
      colorEmpty: false,
    };
  },
  methods: {
    async createEvent(title, color, tags) {
      this.colorEmpty = false;
      if (color === false) {
        this.colorEmpty = true;
        return;
      }
      console.log("past guard clause");
      try {
        const { data } = await axios.post("http://localhost:8081/event/model", {
          title: title,
          colorValue: color,
          tags: tags.split(","),
          userId: 1,
        });
        this.eventId = data;
        this.eventFetched = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h2>Event Creator</h2>
    <form>
      <div v-if="colorEmpty">
        <h4>Please select a color</h4>
      </div>
      <span class="text"
        >Color:
        <color-picker
          class="text"
          id="color-picker"
          v-model:pureColor="pureColor"
          v-model:gradientColor="gradientColor"
          shape="square"
          format="rgb"
        />
      </span>
      <br />
      <label for="date">Date</label>
      <br />
      <input class="date" type="date" v-model="date" id="date" name="date" />
      <br />
      <label for="title">Title</label>
      <br />
      <input class="text" id="title" name="title" v-model="title" />
      <br />
      <label for="tags">Tags (comma-separated)</label>
      <br />
      <input class="text" id="tags" name="tags" v-model="tags" />
      <br />
      <button
        class="submit-button"
        type="submit"
        @click.prevent="createEvent(title, pureColor, tags)"
      >
        Submit
      </button>
    </form>
    <div v-if="eventFetched">
      <h5>{{ eventId }}</h5>
    </div>
  </div>
</template>
<style>
.date {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem;
}
</style>
