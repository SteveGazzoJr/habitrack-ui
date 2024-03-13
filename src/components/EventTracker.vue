<template>
  <div class="wrapper">
    <h2>Event Tracker</h2>
    <form>
      <vue3-simple-typeahead
        id="typeahead_id"
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
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
      >
      </vue3-simple-typeahead>
      <br />
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
      colorEmpty: false,
      returnedEvent: {},
      date: {},
      tags: [],
      color: {},
    };
  },
  methods: {
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
        console.log(this.returnedEvent);
        this.color = this.returnedEvent.colorValue;
      } catch (error) {
        console.log(error);
      }
    },
    async createEvent() {
      try {
        await axios.post("http://localhost:8081/event", {
          title: this.returnedEvent.title,
          date: this.date,
          eventModelId: this.returnedEvent.id,
          userId: 1,
          tags: this.tags.split(","),
        });
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
