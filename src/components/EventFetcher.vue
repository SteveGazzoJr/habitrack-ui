<template>
  <div class="wrapper">
    <h2>Event Fetcher</h2>
    <div>
      <input
        class="text"
        id="event-id"
        name="eventId"
        v-model="eventId"
        placeholder="Event ID"
      />
      <br />
      <button class="submit-button" @click.prevent="getEvent(eventId)">
        Submit
      </button>
      <br />
    </div>
    <div v-if="event">
      <h5>{{ event.title }}</h5>
      <div>Count: {{ this.counterStore.count }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCounterStore } from "./stores/counterStore";

export default {
  name: "EventFetcher",
  data() {
    return {
      counterStore: useCounterStore(),
      event: {},
    };
  },
  methods: {
    async getEvent(eventId) {
      this.counterStore.increment();
      const { data } = await axios.get(
        "http://localhost:8081/event/model/" + eventId
      );
      this.event = data;
    },
  },
};
</script>
