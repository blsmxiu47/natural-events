<script>

const data = { eventData: [] }

export default {
  name: 'Events',
  data: data,
  methods: {
    async getData () {
      try {
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&days=20&category=wildfires')
        this.eventData = await res.json()
        this.eventData = this.eventData.events
        const events = this.eventData
        for (let i = 0; i < events.length; i++) {
          const e = events[i]
          const sourcesArray = []
          for (let j = 0; j < e.sources.length; j++) {
            sourcesArray.push(e.sources[j].id)
          }
          const datesArray = []
          for (let j = 0; j < e.geometry.length; j++) {
            datesArray.push(e.geometry[j].date)
          }
          events[i].sources = sourcesArray
          events[i].date = datesArray
        }
        return events
      } catch (error) {
        console.log(error)
        return []
      }
    }
  }
}
</script>
