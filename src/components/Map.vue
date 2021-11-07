<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <template v-for="marker in markers">
      <component :is="marker" :key="marker.id"></component>
    </template>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import LocationMarker from './LocationMarker.vue';
import Vue from 'vue';

export default {
  name: 'Map',
  props: ['events'],
  components: {
    LMap,
    LTileLayer,
    LocationMarker,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [0, 0],
      latlng: [0, 0],
      markers: [],
    }
  },
  computed: {
    MarkerComponent (category) {
      if (category === "wildfires") {
        return LocationMarker;
      } else if (category === "hurricane") {
        return LocationMarker;
      } else {
        return LocationMarker;
      }
    }
  },
  methods: {
    setCoordinates (events) {
      console.log("setCoordinates...")
      const markers = events.map(el => {
        if (el.categories[0].id === "wildfires") {
          let instance = Vue.component('iconrender', {
            render () {
              let latlng = [el.geometry[0].coordinates[1], el.geometry[0].coordinates[0]]
              let context = [el.id, "wildfires", el.title, el.geometry[0].date]
              return <LocationMarker latlng={latlng} context={context} />
            }
          })
          return instance
        } else if (el.categories[0].id === "seaLakeIce") {
          for (let i = 0; i < el.geometry.length; i++) {
            let instance = Vue.component('iconrender', {
              render () {
                let latlng = [el.geometry[i].coordinates[1], el.geometry[i].coordinates[0]]
                let context = [el.id, "seaLakeIce", el.title, el.geometry[i].date]
                return <LocationMarker latlng={latlng} context={context} />
              }
            })
            return instance
          }
        }
      })
      console.log("markers: ", markers)
      this.markers = markers
    },
  },
  mounted () {
    this.setCoordinates(this.events)
  }, 
}
</script>
