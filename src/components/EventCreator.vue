<script>
import { ref } from 'vue'

export default {
  name: 'EventCreator'
}

const date = ref('date')
const title = ref('title')
const color = ref('color')
const tags = ref('tags')


function submitForm() {
    console.log(date.value)
    console.log(title.value)
    console.log(color.value)
    console.log(tags.value)
}

</script>

<template>
      <form @submit.prevent='submitForm()'>
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
      <button>Submit</button>
      </for m>
</template>