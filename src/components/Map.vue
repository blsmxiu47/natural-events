<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng">
        <l-icon><LocationMarker /></l-icon>
    </l-marker>
  </l-map>
</template>

<script>
// import L from 'leaflet';
import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';
// import LocationMarker from './LocationMarker';
import LocationMarker from './LocationMarker.vue';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LocationMarker,
    LIcon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [0, 0],
      markerLatLng: [0, 0]
    };
  }
}
</script>
