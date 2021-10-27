<template>
  <div>
    <ul v-for="e in eventData.events" v-bind:key="e.id">
      <li>{{ e.id }}</li>
      <p>{{ e.title }}</p>
    </ul>
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
  </div>
</template>

<script>
export default {
  name: 'EventsLog',
  // components: {
  // },
  data () {
    return {
      eventData: [],
    }
  },

  methods: {
    async getData() {
      try {
        let res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires");
        this.eventData = await res.json();
        console.log(res)
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
