<template>
  <v-app>
    <header>
      <div class="top-header">
        <Menu @update-data="updateData" :categories="categories" :defaultDates="dates" />
        <a class="app-title" href="/"><h1>Natural Events</h1></a>
        <Info />
      </div>
    </header>
    <Map v-if="!loading" :filteredEvents="filteredEvents" />
    <EventsLog v-if="!loading" :filteredEvents="filteredEvents" />
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
import Info from './components/Info.vue'
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue';
import eventsTransform from './utils/EventsTransform.js';
import eventsFilter from './utils/EventsFilter.js';

export default {
  name: 'App',
  components: {
    Menu,
    Info,
    Map,
    EventsLog,
  },
  data () {
    return {
      api_key: process.env.VUE_APP_NASA_API_KEY,
      url_base: 'https://eonet.gsfc.nasa.gov/api/v3/',
      status: 'open',
      categories: {'seaLakeIce': true, 'wildfires': true, 'severeStorms': true, 'volcanoes': true},
      dates: ['2021-01-01', this.getToday()],
      days: null,
      events: [],
      loading: true,
    }
  },
  computed: {
    filteredEvents () {
      return eventsFilter(this.events, this.categories, this.dates);
    },
  },
  methods: {
    async getData(start, end) {
      const categoriesString = Object.keys(this.categories).join(',');
      try {
        console.log('getData try...');
        let res = await fetch(`${this.url_base}events?status=${this.status}&category=${categoriesString}&days=${this.days}&start=${start}&end=${end}&api_key=${this.api_key}`);
        console.log("response:", res);
        const events = await res.json();

        this.setResults(events.events);
        this.loading = false;

      } catch (error) {
          console.log(error);
      }
    },
    setResults (result) {
      this.events = eventsTransform(result);
    },
    getToday () {
      let today = new Date().toISOString().slice(0, 10)
      return today;
    },
    getStartDate (daysPrior) {
      let start = new Date();
      start.setDate(start.getDate() - daysPrior);
      return start.toISOString().slice(0, 10);
    },
    updateData (dates) {
      console.log('App updateData...', dates);
      this.dates = dates;
    },
  },
  created () {
    this.getData(this.dates[0], this.dates[1]);
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
}
</style>
