<template>
  <!-- <div> -->
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
  <!-- </div> -->
</template>

<script>
import getData from './Events.vue'

// data: eupdated ventData (from events.vue)

export default {
  name: 'EventsLog',
  data () {
    return {
      eventData: getData(),
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
}
</script>
