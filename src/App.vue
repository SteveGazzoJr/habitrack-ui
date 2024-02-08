<template>
<div class="routerLink">
<a href @click="goToEventCreator()">Event Creator</a>
<br><br>
<a href @click="goToEventFetcher()">Event Fetcher</a>
</div>
<router-view />
</template>

<script>

export default {
  name: 'App',
  components: {

  },
   methods:{
   goToEventCreator(){
        this.$router.push('/eventcreator');
    },
  goToEventFetcher(){
        this.$router.push('/eventfetcher');
    }
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
  margin-top: 10px;
}

.text {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 1rem
}

.routerLink {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-left: -80%;
  padding: 40px;
  font-size: 25px;
}
</style>
