<template>
  <div>
    <Map v-if="!loading" :events="events" />
    <EventsLog v-if="!loading" :events="events" />
    <DatePicker v-if="!loading" />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import EventsLog from './components/EventsLog.vue';
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: {
    Map,
    EventsLog,
    DatePicker,
  },
  data () {
    return {
      api_key: process.env.NASA_API_KEY,
      url_base: 'https://eonet.sci.gsfc.nasa.gov/api/v3/',
      status: 'open',
      category: 'wildfires',
      days: 20,
      events: [],
      loading: true,
    }
  },
  methods: {
    async getData() {
      try {
        console.log('getData try...')
        // this.eventData = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires")
        //   .then(response => response.json())
        //   .then(data => data.events);
        let res = await fetch(`${this.url_base}events?status=${this.status}&category=${this.category}&days=${this.days}&api_key=${this.api_key}`);
        console.log(res)
        const events = await res.json();
        // for (let i = 0; i < events.length; i++) {
        //   let e = events[i]
        //   let sources_array = []
        //   for (let j = 0; j < e.sources.length; j++) {
        //     sources_array.push(e.sources[j].id);
        //   }
        //   let dates_array = []
        //   for (let j = 0; j < e.geometry.length; j++) {
        //     dates_array.push(e.geometry[j].date);
        // }
        // events[i].sources = sources_array
        // events[i].date = dates_array
        // }
        console.log(typeof events);
        console.log(events.events);
        console.log(events.events[0].id)
        console.log(events.events[0].title)
        console.log(events.events[0].categories[0].title)
        console.log([events.events[0].geometry[0].coordinates[1], events.events[0].geometry[0].coordinates[0]])
        console.log("type events.events", typeof events.events)
        console.log("events.events", events.events)
        console.log("events.events constr: ", events.events.constructor)
        console.log("events.events 0: ", events.events[0])

        // this.events = events.events
        // console.log("type this.events", typeof this.events)
        // console.log("this.events", this.events)
        // console.log("this.events constr: ", this.events.constructor)
        // console.log("this.events 0: ", this.events[0])
        this.setResults(events.events)
        // console.log("events type: ", typeof this.events)
        // console.log("events: ", this.events)
        this.loading = false
      } catch (error) {
          console.log(error);
          // return []
      }
    },
    setResults (result) {
      console.log("type of result: ", typeof result)
      console.log(result.constructor === Array)
      this.events = result
    }
  },
  created () {
    this.getData()
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
