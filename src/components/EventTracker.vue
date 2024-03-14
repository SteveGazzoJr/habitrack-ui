<template>
  <div class="wrapper">
    <h2>Event Tracker</h2>
    <form>
      <div v-if="dateEmpty">
        <h4>Please select an event</h4>
      </div>
      <vue3-simple-typeahead
        id="typeahead_id"
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
      <input class="date" type="date" v-model="date" id="date" name="date" />
      <br />
      <label for="tags">Tags</label>
      <br />
      <input class="text" id="tags" name="tags" v-model="tags" />
      <button
        class="submit-button"
        type="submit"
        @click.prevent="createEvent()"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventTracker",
  data() {
    return {
      eventSearchResults: [],
      returnedEvent: {},
      date: {},
      tags: [],
      color: {},
      dateEmpty: false,
      eventModelEmpty: false,
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
      } catch (error) {
        console.log(error);
      }
    },
    async createEvent() {
      this.dateEmpty = false;
      this.eventModelEmpty = false;
      if (JSON.stringify(this.date) === "{}") {
        this.dateEmpty = true;
        return;
      }

      if (JSON.stringify(this.returnedEvent) === "{}") {
        this.eventModelEmpty = true;
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
        this.forgotDate = false;
        this.color = {};
        this.clearTypeahead();
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
