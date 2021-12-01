<template>
  <v-app>
    <header>
      <div class="top-header">
        <FilterMenu @update-category="updateCategory" @update-data="updateData" :categories="categories" :defaultDates="dates" />
        <a class="app-title" href="/"><h1>Natural Events</h1></a>
        <AppInfo />
      </div>
    </header>
    <EventsMap v-if="!loading" :filteredEvents="filteredEvents" />
    <EventsLog v-if="!loading" :filteredEvents="filteredEvents" />
  </v-app>
</template>

<script>
import FilterMenu from './components/FilterMenu.vue'
import AppInfo from './components/AppInfo.vue'
import EventsMap from './components/EventsMap.vue'
import EventsLog from './components/EventsLog.vue'
import eventsTransform from './utils/EventsTransform.js'
import eventsFilter from './utils/EventsFilter.js'

export default {
  name: 'App',
  components: {
    FilterMenu,
    AppInfo,
    EventsMap,
    EventsLog
  },
  data () {
    return {
      api_key: process.env.VUE_APP_NASA_API_KEY,
      url_base: 'https://eonet.gsfc.nasa.gov/api/v3/',
      status: 'open',
      categories: { seaLakeIce: true, wildfires: true, severeStorms: true, volcanoes: true },
      dates: ['2021-01-01', this.getToday()],
      days: null,
      events: [],
      loading: true
    }
  },
  computed: {
    filteredEvents () {
      return eventsFilter(this.events, this.categories, this.dates)
    }
  },
  methods: {
    async getData (start, end) {
      const categoriesString = Object.keys(this.categories).join(',')
      try {
        const res = await fetch(`${this.url_base}events?status=${this.status}&category=${categoriesString}&days=${this.days}&start=${start}&end=${end}&api_key=${this.api_key}`)
        const events = await res.json()

        this.setResults(events.events)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
    setResults (result) {
      this.events = eventsTransform(result)
    },
    getToday () {
      const today = new Date().toISOString().slice(0, 10)
      return today
    },
    getStartDate (daysPrior) {
      const start = new Date()
      start.setDate(start.getDate() - daysPrior)
      return start.toISOString().slice(0, 10)
    },
    updateCategory (category, show) {
      this.categories[category] = show
    },
    updateData (dates) {
      this.dates = dates
    }
  },
  created () {
    this.getData(this.dates[0], this.dates[1])
  }
}
</script>

<style lang="scss">
@import "./index.css";
@import './scss/variables';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.top-header {
  display: flex;
  padding: .5rem 1rem;
  background-color: $theme-dark-blue;
  line-height: 1;
}

.app-title {
  text-decoration: none;
  margin: auto;
  h1 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: $theme-white;
  }
}
</style>
