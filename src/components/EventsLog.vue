<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="events"
        item-key="id"
        class="elevation-1"
      >
      </v-data-table>
    </div>
</template>

<script>
export default {
  name: 'EventsLog',
  props: ['events'],
  data () {
    return {
      eventsData: [],
    }
  },
  methods: {
    setEvents (events) {
      console.log('setEvents...')
      this.eventsData = events
      for(let i = 0; i < events.length; i++) {
        if (events[i].categories.constructor === Array) {
          events[i].categories = events[i].categories.map(el => el.title).join()
        }
        if (events[i].sources.constructor === Array) {
          events[i].sources = events[i].sources.map(el => el.id).join();
        }
        events[i].dateTimes = events[i].geometry.map(el => el.date).join(' | ')
        events[i].geo = events[i].geometry.map(el => '[' + [el.coordinates[1], el.coordinates[0]].join() + ']').join(' | ');
      }
    }
  },
  computed: {
    headers () {
      return [
        {text: 'Event ID', value: 'id'},
        {text: 'Category', value: 'categories'},
        {text: 'Event Name', value: 'title'},
        {text: 'Event Date/Time', value: 'dateTimes'},
        {text: 'Event Coordinates', value: 'geo'},
        {text: 'Link', value: 'link'},
        {text: 'Sources', value: 'sources'},
      ]
    }
  },
  mounted () {
    console.log('mounted... setEvents...');
    this.setEvents(this.events);
  },
  updated () {
    console.log('updated... setEvents...');
    this.setEvents(this.events);
  }
}
</script>
