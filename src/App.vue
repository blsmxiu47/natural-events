<template>
  <div>
    <Map />
    <EventsLog />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue'

export default {
  name: 'App',
  components: {
    Map,
    EventsLog,
  },
}
</script>

<style>
@import "./index.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
