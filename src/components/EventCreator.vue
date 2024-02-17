<script>
/* eslint-disable */
import axios from "axios";
import { ref } from "vue";
import { ColorInputWithoutInstance } from "tinycolor2";

export default {
  name: "EventCreator",
  data() {
    return {
      eventSearchResults: [],
      eventId: {},
      eventFetched: false,
      pureColor: ref < ColorInputWithoutInstance > "red",
      gradientColor: ref(
        "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
      ),
      colorEmpty: false,
      returnedEvent: {},
      isFetchedEvent: false,
    };
  },
  methods: {
    async createEvent(title, color, tags) {
      this.colorEmpty = false;
      this.isFetchedEvent = false;
      if (color === false) {
        this.colorEmpty = true;
        return;
      }
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

    async searchEvents(event) {
      console.log(event.input);
      try {
        const { data } = await axios.get(
          "http://localhost:8081/event/models?title=" + event.input
        );
        console.log(data);
        this.eventSearchResults = data;
      } catch (error) {
        console.log(error);
      }
    },

    async getEvent(item) {
      try {
        const { data } = await axios.get(
          "http://localhost:8081/event/model/" + item.id
        );
        console.log(data);
        this.pureColor = data.colorValue;
        this.title = data.title;
        this.tags = data.tags;
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
      <vue3-simple-typeahead
        id="typeahead_id"
        class="text"
        placeholder="Start writing..."
        :items="eventSearchResults"
        :minInputLength="2"
        :itemProjection="
          (item) => {
            return item.title;
          }
        "
        :disabled="isFetchedEvent"
        @selectItem="getEvent"
        @onInput="searchEvents"
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
      >
      </vue3-simple-typeahead>
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
          :disabled="isFetchedEvent"
        />
      </span>
      <br />
      <label for="date">Date</label>
      <br />
      <input
        class="date"
        type="date"
        v-model="date"
        id="date"
        name="date"
        :disabled="isFetchedEvent"
      />
      <br />
      <label for="title">Title</label>
      <br />
      <input
        class="text"
        id="title"
        name="title"
        v-model="title"
        :disabled="isFetchedEvent"
      />
      <br />
      <label for="tags">Tags</label>
      <br />
      <input
        class="text"
        id="tags"
        name="tags"
        v-model="tags"
        :disabled="isFetchedEvent"
      />
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
