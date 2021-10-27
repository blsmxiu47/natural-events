<template>
  <div>
    <Map/>
    <EventsLog />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue'
// import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    Map,
    EventsLog,
  },
}

//   data () {
//     return {
//       eventData: [],
//     }
//   },

//   methods: {
//     async getData() {
//       try {
//         let res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires");
//         this.eventData = await res.json();
//         console.log(typeof res)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   },

//   created() {
//     this.getData();
//   },
// };


// export default {
//   name: 'App',
//   components: {
//     Map
//   }
// }
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
