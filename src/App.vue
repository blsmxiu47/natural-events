<template>
  <v-app>
    <Menu @update-data="updateData" :categories="categories" />
    <Map v-if="!loading" :events="events" :categories="categories"/>
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
      api_key: process.env.VUE_APP_NASA_API_KEY,
      url_base: 'https://eonet.sci.gsfc.nasa.gov/api/v3/',
      status: 'open',
      categories: {'seaLakeIce': true, 'wildfires': true, 'severeStorms': true, 'volcanoes': true},
      days: null,
      events: [],
      loading: true,
    }
  },
  methods: {
    async getData(start, end) {
      // if (Array.isArray(this.categories)) {
      //   this.categories = this.categories.join(',');
      // }
      const categoriesString = Object.keys(this.categories).join(',');
      try {
        console.log('getData try...');
        // this.eventData = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires")
        //   .then(response => response.json())
        //   .then(data => data.events);
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
      this.events = result;
    },
    getToday () {
      let today = new Date().toISOString().slice(0, 10)
      // const current = new Date();
      // const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      return today;
    },
    getStartDate (daysPrior) {
      let start = new Date();
      start.setDate(start.getDate() - daysPrior);
      return start.toISOString().slice(0, 10);
      // return `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
    },
    updateData (dates) {
      console.log('App updateData...', dates);
      this.getData(dates[0], dates[1]);
    },
  },
  created () {
    this.getData(this.getStartDate(28), this.getToday());
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
