<script>
import axios from "axios";
import { ref } from "vue";
import { useDataStore } from "./stores/dataStore";

export default {
  name: "EventCreator",
  data() {
    return {
      dataStore: useDataStore(),
      eventSearchResults: [],
      eventId: {},
      eventFetched: false,
      pureColor: "",
      gradientColor: ref(
        "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
      ),
      colorEmpty: false,
      titleEmpty: false,
      returnedEvent: {},
      categories: [],
      title: "",
    };
  },
  methods: {
    async createEvent(title, color) {
      this.colorEmpty = false;
      if (color === "") {
        this.colorEmpty = true;
        return;
      }
      if (title === "") {
        this.titleEmpty = true;
        return;
      }
      try {
        const { data } = await axios.post("http://localhost:8081/event/model", {
          title: title,
          colorValue: color,
          userId: 1,
          categories: this.dataStore.getTags,
        });
        this.eventId = data.id;
        this.eventFetched = true;
        this.dataStore.setTags([]);
        this.title = "";
        this.color = "";
        this.colorEmpty = false;
        this.titleEmpty = false;
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
      <div v-if="titleEmpty">
        <h4>Please enter a title</h4>
      </div>
      <label for="title">Title</label>
      <br />
      <input class="text title" id="title" name="title" v-model="title" />
      <br />
      <label for="categories">Categories</label>
      <br />
      <tag-input @keydown.enter.prevent class="tag-input" />
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
