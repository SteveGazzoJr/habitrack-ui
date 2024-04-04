<script>
import axios from "axios";
import { ref } from "vue";
import { ColorInputWithoutInstance } from "tinycolor2";
import { useDataStore } from "./stores/dataStore";

export default {
  name: "EventCreator",
  data() {
    return {
      dataStore: useDataStore(),
      eventSearchResults: [],
      eventId: {},
      eventFetched: false,
      pureColor: ref < ColorInputWithoutInstance > "red",
      gradientColor: ref(
        "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
      ),
      colorEmpty: false,
      returnedEvent: {},
      categories: [],
    };
  },
  methods: {
    async createEvent(title, color) {
      this.colorEmpty = false;
      if (color === false) {
        this.colorEmpty = true;
        return;
      }
      try {
        const { data } = await axios.post("http://localhost:8081/event/model", {
          title: title,
          colorValue: color,
          userId: 1,
          categories: this.dataStore.getTags,
        });
        this.eventId = data;
        this.eventFetched = true;
        this.dataStore.setTags([]);
        this.title = "";
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
      <br />
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
      <br />
      <label for="title">Title</label>
      <br />
      <input class="text" id="title" name="title" v-model="title" />
      <br />
      <label for="categories">Categories</label>
      <br />
      <tag-input @keydown.enter.prevent />
      <button
        class="submit-button"
        type="submit"
        @click.prevent="createEvent(title, pureColor)"
      >
        Submit
      </button>
    </form>
  </div>
</template>
