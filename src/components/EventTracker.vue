<template>
  <div class="wrapper">
    <h2>Event Tracker</h2>
    <form>
      <vue3-simple-typeahead
        id="typeahead"
        ref="typeahead"
        class="text typeahead colorbox"
        placeholder="Enter event title to retrieve"
        :items="eventSearchResults"
        :minInputLength="2"
        :itemProjection="
          (item) => {
            return item.title;
          }
        "
        @selectItem="getEvent"
        @onInput="searchEvents"
      >
      </vue3-simple-typeahead>
      <br />
      <div v-if="eventModelRetrieved">
        <span
          v-for="category in this.returnedEvent.categories"
          v-bind:key="category"
        >
          <category-component :category="category" />
        </span>
        <div v-if="dateEmpty">
          <h4>Please select a date</h4>
        </div>
        <label for="date">Date</label>
        <br />
        <input
          class="date text"
          type="date"
          v-model="date"
          id="date"
          name="date"
        />
        <br />
        <label for="tags">Tags</label>
        <br />
        <tag-input @keydown.enter.prevent />
        <button
          class="submit-button"
          type="submit"
          @click.prevent="createEvent()"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useDataStore } from "./stores/dataStore";

export default {
  name: "EventTracker",
  data() {
    return {
      dataStore: useDataStore(),
      eventSearchResults: [],
      returnedEvent: {},
      date: {},
      tags: [],
      color: {},
      dateEmpty: false,
      eventModelRetrieved: false,
    };
  },
  methods: {
    clearTypeahead() {
      this.$refs.typeahead.clearInput();
    },
    async searchEvents(event) {
      console.log(event.input);
      try {
        const { data } = await axios.get(
          "http://localhost:8081/event/models?title=" + event.input
        );
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
        this.returnedEvent = data;
        console.log(this.returnedEvent.categories);
        this.color = this.returnedEvent.colorValue;
        this.eventModelRetrieved = true;
      } catch (error) {
        console.log(error);
      }
    },
    async createEvent() {
      this.dateEmpty = false;
      if (JSON.stringify(this.date) === "{}") {
        this.dateEmpty = true;
        return;
      }

      if (JSON.stringify(this.returnedEvent) === "{}") {
        return;
      }

      let effectiveTags = [];
      if (this.tags != "") {
        effectiveTags = this.tags.split(",");
      }

      try {
        await axios.post("http://localhost:8081/event", {
          title: this.returnedEvent.title,
          date: this.date,
          eventModelId: this.returnedEvent.id,
          userId: 1,
          tags: effectiveTags,
        });
        this.tags = [];
        this.returnedEvent = [];
        this.color = {};
        this.clearTypeahead();
        this.date = {};
        this.eventModelRetrieved = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.colorbox {
  background-color: v-bind("color");
}
</style>
