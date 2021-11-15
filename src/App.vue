<template>
  <v-app>
    <header>
      <div class="top-header">
        <a class="app-title" href="/"><h1>Natural Events</h1></a>
        <Menu @update-data="updateData" :categories="categories" :defaultDates="dates" />
      </div>
      <nav class="collapse">
        <ul class="navbar-nav" id="topNav">
          <li><a class="nav-link" href="https://github.com/blsmxiu47/natural-events">GitHub</a></li>
          <li><a class="nav-link" href="https://eonet.gsfc.nasa.gov/">EONET</a></li>
          <v-btn icon class="hamburger">
            <Icon icon="cil:hamburger-menu" @click="expandCollapse"/>
          </v-btn>
        </ul>
      </nav>
    </header>
    <Map v-if="!loading" :events="events" :categories="categories" :dates="dates" />
    <EventsLog v-if="!loading" :events="events" />
  </v-app>
</template>

<script>
import { Icon } from '@iconify/vue2';
import Menu from './components/Menu.vue'
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue';

export default {
  name: 'App',
  components: {
    Menu,
    Map,
    EventsLog,
    Icon,
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
      this.events = result;
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
    expandCollapse() {
      console.log('expandCollapse...');
      console.log(document);
      let topNav = document.getElementById("topNav");
      if (topNav.className === "navbar-nav") {
        topNav.className += " responsive";
      } else {
        topNav.className = "navbar-nav";
      }
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
