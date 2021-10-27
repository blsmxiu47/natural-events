<template>
  <div>
    <!-- <ul v-for="e in eventData.events" v-bind:key="e.id">
      <li>{{ e.id }}</li>
      <p>{{ e.title }}</p>
    </ul> -->
    <!-- <table>
      <tr>
        <th>Event ID</th>
        <th>Event Title</th>
        <th>Event Date/Time</th>
        <th>Link</th>
        <th>Sources</th>
        <th>Source URL</th>
      </tr>  
    </table> -->
    <div>
      <v-data-table
        :headers="headers"
        :items="eventData"
        item-key="id"
        class="elevation-1"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsLog',
  // components: {
  // },
  data () {
    return {
      search: '',
      eventData: [],
    }
  },

  computed: {
    headers () {
      return [
        {text: 'Event ID', value: 'id'},
        {text: 'Event Name', value: 'title'},
        {text: 'Event Date/Time', value: 'date'},
        {text: 'Link', value: 'link'},
        {text: 'Sources', value: 'sources'},
      ]
    }
  },

  methods: {
    async getData() {
      try {
        this.eventData = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires")
          .then(response => response.json())
          .then(data => data.events);
        // let res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires").then(res => res.json().events);
        // this.eventData = res.json();
        // this.eventData = this.eventData.events;
        // ''.join([i.id for i in sources.length]) python ver.
        const events = this.eventData
        for (let i = 0; i < events.length; i++) {
          let e = events[i]
          let sources_array = []
          for (let j = 0; j < e.sources.length; j++) {
            sources_array.push(e.sources[j].id);
          }
          let dates_array = []
          for (let j = 0; j < e.geometry.length; j++) {
            dates_array.push(e.geometry[j].date);
          }

          events[i].sources = sources_array
          events[i].date = dates_array
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  created() {
    this.getData();
  },
};
</script>
