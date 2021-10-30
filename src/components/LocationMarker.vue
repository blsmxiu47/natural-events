<template>
  <l-marker :lat-lng="markerCoordinates">
      <l-icon>
        <div class="location-marker">
          <Icon icon="el:fire" class="location-icon" />
        </div>
      </l-icon>
  </l-marker>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { LMarker, LIcon } from 'vue2-leaflet';

export default {
  name: 'LocationMarker',
  // data () {
  //   return {
  //     markerCoordinates: [],
  //   }
  // },
  props: {
    latlng: [], 
    // lat: Number,
    // lng: Number,
  },
  components: {
    Icon,
    LMarker,
    LIcon,
  },
  // methods: {
  //   setMarkerCoordinates (latlng) {
  //     this.markerCoordinates = latlng
  //   }
  // },
  computed: {
      markerCoordinates () {
        return this.latlng
      }
  },
  // mounted () {
  //   this.setMarkerCoordinates(this.latlng)
  // }
}
</script>
