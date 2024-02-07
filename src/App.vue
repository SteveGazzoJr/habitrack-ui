<template>
  <h1>Save Event</h1>
  <EventCreator />
  <br />
  <h1>Fetch Event</h1>
  <EventFetcher />
</template>

<script>
import EventCreator from './components/EventCreator.vue'
import EventFetcher from './components/EventFetcher.vue'

export default {
  name: 'App',
  components: {
    EventCreator,
    EventFetcher
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.text {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem
}
</style>
