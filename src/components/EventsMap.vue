<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <template v-for="marker in markers">
      <component :is="marker" :key="marker.id"></component>
    </template>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import LocationMarker from './LocationMarker.vue'
import Vue from 'vue'

export default {
  name: 'EventsMap',
  props: ['filteredEvents'],
  watch: {
    filteredEvents () {
      this.setCoordinates(this.filteredEvents)
    }
  },
  components: {
    LMap,
    LTileLayer,
    LocationMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [0, 0],
      markers: []
    }
  },
  methods: {
    setCoordinates (filteredEvents) {
      const markers = []
      for (const ev of filteredEvents) {
        const instance = Vue.component('IconRender', {
          render () {
            return <LocationMarker context={ev} />
          }
        })
        markers.push(instance)
      }
      this.markers = markers
    }
  },
  mounted () {
    this.setCoordinates(this.filteredEvents)
  }
}
</script>
