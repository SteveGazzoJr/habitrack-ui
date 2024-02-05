<script>
import { ref } from 'vue'

const date = ref('date')
const title = ref('title')
const color = ref('color')
const tags = ref('tags')


export default {
  name: 'EventCreator',
  methods: {
              submitForm() {
              const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({date: "2004-10-21", eventInstanceId: "eventFromForm"})
                            };
                  fetch('http://localhost:8081/event', requestOptions)
                      .then(response => response.json())
                  console.log(date.value)
                  console.log(title.value)
                  console.log(color.value)
                  console.log(tags.value)
              }
          }
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
      <button type="submit" @click.prevent="submitForm">Submit</button>
      </form>
</template>