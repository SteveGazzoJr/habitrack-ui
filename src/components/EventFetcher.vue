<template>
<div>
  <label for="eventId">Event ID:</label>
  <input id="eventId" name="eventId" v-model="eventId"/>
<br />
  <button @click.prevent="getEvent(eventId)">Submit</button>
  <br />
</div>
  <div v-if="event">
     <h5>{{event.title}}</h5>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventFetcher",
  data() {
    return {
      event: {},
    };
  },
  methods: {
    async getEvent(eventId) {
      const { data } = await axios.get("http://localhost:8081/event/model/" + eventId);
      this.event = data;
    },
  },
};
</script>