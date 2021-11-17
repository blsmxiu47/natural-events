<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="eventsData"
        item-key="id"
        class="elevation-1"
      >
      </v-data-table>
    </div>
</template>

<script>
export default {
  name: 'EventsLog',
  props: ['filteredEvents'],
  computed: {
    eventsData () {
      console.log('setEvents...', this.filteredEvents);
      console.log(this.filteredEvents[0])
      return this.filteredEvents.map(ev => {
        return {
          eventId: ev[0],
          category: ev[1],
          title: ev[2],
          dateTime: ev[4],
          geo: ev[3],
          source: ev[8],
          url: ev[9],
          magnitude: [ev[6], ev[5]].join(''),
        }
      })
    },
    headers () {
      return [
        {text: 'Geo ID', value: 'id'},
        {text: 'Event ID', value: 'eventId'},
        {text: 'Category', value: 'category'},
        {text: 'Event Name', value: 'title'},
        {text: 'Event Date/Time', value: 'dateTime'},
        {text: 'Event Coordinates', value: 'geo'},
        {text: 'Source', value: 'source'},
        {text: 'Link', value: 'url'},
      ]
    }
  },
}
</script>
