<template>
  <label for="eventId">Event ID:</label>
  <input id="eventId" name="eventId" v-model="eventId"/>
<br />
  <button @click.prevent="submitForm(eventId)">Submit</button>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'EventFetcher',
    methods: {
                submitForm(eventId) {
                console.log("eventIdValue")
                console.log(eventId)
                const url = 'http://localhost:8081/event/' + eventId
                console.log("url")
                console.log(url)
                const requestOptions = {
                                  method: 'GET',
                                  headers: { 'Content-Type': 'application/json' }

                              };
                    fetch(url, requestOptions)
                        .then(response => response.json())
                }
            },
      setup() {
        const eventId = ref('')

        // expose to template and other options API hooks
        return {
          eventId
        }
      }
  }
</script>