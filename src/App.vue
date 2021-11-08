<template>
  <v-app>
    <Menu />
    <Map v-if="!loading" :events="events" />
    <EventsLog v-if="!loading" :events="events" />
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue';

export default {
  name: 'App',
  components: {
    Menu,
    Map,
    EventsLog,
  },
  data () {
    return {
      api_key: process.env.NASA_API_KEY,
      url_base: 'https://eonet.sci.gsfc.nasa.gov/api/v3/',
      status: 'open',
      categories: ['seaLakeIce', 'wildfires','severeStorms'],
      days: null,
      start: '2021-10-01',
      end: '2021-10-31',
      events: [],
      loading: true,
    }
  },
  methods: {
    async getData() {
      this.categories = this.categories.join(',');
      try {
        console.log('getData try...');
        // this.eventData = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires")
        //   .then(response => response.json())
        //   .then(data => data.events);
        let res = await fetch(`${this.url_base}events?status=${this.status}&category=${this.categories}&days=${this.days}&api_key=${this.api_key}`);
        console.log("response:", res);
        const events = await res.json();

        this.setResults(events.events);
        this.loading = false;

      } catch (error) {
          console.log(error);
      }
    },
    setResults (result) {
      this.events = result
    },
  },
  created () {
    this.getData();
  },
  mounted () {
    this.$root.$on('updateData', () => {
      this.getData();
    })
  }
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
