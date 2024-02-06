<template>
<div>
  <label for="eventId">Event ID:</label>
  <input id="eventId" name="eventId" v-model="eventId"/>
<br />
  <button @click.prevent="submitForm(eventId)">Submit</button>
  <br />
</div>
  <div>
     <h5>{{event}}</h5>
  </div>
</template>

<script>
import { ref } from 'vue'
let event
export default {
  name: 'EventFetcher',
    methods: {

                submitForm(eventId) {
                const url = 'http://localhost:8081/event/' + eventId
                fetch(url)
                    .then(
                    function(response) {
                        if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                        }

                        // Examine the text in the response
                        response.json().then(function(data) {
                        console.log(data)
                        event = data
                        console.log(event)
                        });
                    }
                    )
                    .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    });
                }
            },
      setup() {
          const eventId = ref(null)
          return {
            eventId
          }
        }
  }
</script>