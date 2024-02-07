<template>
<div>
  <input class="text" id="eventId" name="eventId" v-model="eventId" placeholder = "Event ID"/>
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