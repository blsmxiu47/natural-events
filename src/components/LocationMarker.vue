<template>
  <l-marker :lat-lng="markerLatLng">
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
  props: {
    lat: Number, 
    lng: Number
  },
  components: {
    Icon,
    LMarker,
    LIcon,
  },
  // data () {
  //   return {
  //     markerLatLng: [lat, lng]
  //   }
  // }
}
</script>
