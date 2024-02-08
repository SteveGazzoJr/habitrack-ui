<script>
import axios from "axios"

export default {
    name: 'EventCreator',
    data() {
      return {
        eventId: {},
        eventFetched: false
      };
    },
    methods: {
      async createEvent(title, color, tags) {
            try {
              const { data } = await axios.post(
                "http://localhost:8081/event/model",
                {
                  title: title,
                  colorValue: color,
                  tags: tags.split(','),
                  userId: 1
                }
              );
              this.eventId = data;
              this.eventFetched = true;
            } catch (error) {
              console.log(error);
            }
          },
        },
  }

</script>

<template>
<h2>Event Creator</h2>
      <form>
      <label for="date">Date</label>
      <br />
      <input class="date" type="date" v-model="date" id="date" name="date" value="2000-01-01" />
      <br />
      <label  for="title">Title</label>
      <br />
      <input class="text" id="title" name="title" v-model="title" />
      <br />
      <label for="color">Color</label>
      <br />
      <input class="text" id="color" name="color" v-model="color" />
      <br />
      <label for="tags">Tags (comma-separated)</label>
      <br />
      <input class="text" id="tags" name="tags" v-model="tags" />
      <br />
      <button type="submit" @click.prevent="createEvent(title, color, tags)">Submit</button>
      </form>
        <div v-if="eventFetched">
           <h5>{{eventId}}</h5>
        </div>
</template>
<style>
.date {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem
}
</style>