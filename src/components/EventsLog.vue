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
      // console.log(events)
      for(let i = 0; i < events.length; i++) {
        // console.log('loop events, ', i)
        // console.log('categories: ', events[i].categories)
        // console.log('categories type: ', typeof events[i].categories)
        if (events[i].categories.constructor === Array) {
          events[i].categories = events[i].categories.map(el => el.title).join()
        }

        // console.log("sources type: ", typeof events[i].sources)
        // console.log("sources: ", events[i].sources)
        if (events[i].sources.constructor === Array) {
          events[i].sources = events[i].sources.map(el => el.id).join();
        }

        events[i].dateTimes = events[i].geometry.map(el => el.date).join(' | ')
        // console.log(events[i].dateTimes)

        events[i].geo = events[i].geometry.map(el => '[' + [el.coordinates[1], el.coordinates[0]].join() + ']').join(' | ');
        // console.log(events[i].geo)
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
    this.setEvents(this.events)
  }
}
</script>
