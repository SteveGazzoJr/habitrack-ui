<script>
import axios from "axios"

export default {
  name: 'EventCreator',
    data() {
      return {
        eventId: {}
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
            } catch (error) {
              console.log(error);
            }
          },
        },
  }

</script>

<template>
      <form>
      <label for="date">date:</label>
      <input type="date" v-model="date" id="date" name="date" value="2000-01-01" />
        <br />
      <label for="title">title:</label>
      <input id="title" name="title" v-model="title" />
        <br />
      <label for="color">color:</label>
      <input id="color" name="color" v-model="color" />
        <br />
      <label for="tags">tags:</label>
      <input id="tags" name="tags" v-model="tags" />
        <br />
      <button type="submit" @click.prevent="createEvent(title, color, tags)">Submit</button>
      </form>
        <div v-if="eventId">
           <h5>{{eventId}}</h5>
        </div>
</template>