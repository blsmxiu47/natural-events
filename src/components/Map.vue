<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    {{ markers }}
    <!-- <l-marker :lat-lng="markerLatLng">
        <l-icon>{{ markers }}</l-icon>
        <l-icon><LocationMarker /></l-icon>
    </l-marker> -->
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import LocationMarker from './LocationMarker.vue';
// import eventData from './Events.vue';

// data: updated coordinates from Events.vue

// const markers = Events.map(ev => { return <LocationMarker lat={ev.geometry.coordinates[1]} lng={ev.geometry.coordinates[0]}/> });

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [0, 0],
      // markerLatLng: [0, 0]
    }
  },
  computed: {
    markers () {
      return <LocationMarker lat={0} lng={0} />
      // return eventData.map(ev => { return <LocationMarker lat={ev.geometry.coordinates[1]} lng={ev.geometry.coordinates[0]}/> })
    } 
  }
}
</script>
