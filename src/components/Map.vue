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
      console.log("setCoordinates...");
      // how not to do this I hope(?) dbl for-loop ver...
      let markers = [];
      for (const ev of events) {
        let numGeos = ev.geometry.length;
        for (const geo of ev.geometry) {
          const geoData = [
            ev.id, 
            ev.categories[0].id, 
            ev.title,
            geo.coordinates.reverse(), 
            geo.date, 
            geo.magnitudeUnit, 
            geo.magnitudeValue, 
            (ev.geometry.indexOf(geo)+1) / numGeos,
            ];
          let instance = Vue.component('iconrender', {
            render () {
              return <LocationMarker context={geoData} />
            }
          })
          markers.push(instance);
        }
      }
      // console.log(geometries.slice(0,10))
      // const markers = events.map(el => {
      //     for (let i = 0; i < el.geometry.length; i++) {
      //       let instance = Vue.component('iconrender', {
      //         render () {
      //           let latlng = [el.geometry[i].coordinates[1], el.geometry[i].coordinates[0]]
      //           let context = [el.id, "seaLakeIce", el.title, el.geometry[i].date]
      //           return <LocationMarker latlng={latlng} context={context} />
      //         }
      //       })
      //       return instance
      //     }
      //   }
      this.markers = markers
    },
  },
  mounted () {
    console.log('mounted... setCoordinates...');
    this.setCoordinates(this.events);
  }, 
  // updated () {
  //   console.log('updated... setCoordinates...');
  //   this.setCoordinates(this.events);
  // }
}
</script>
