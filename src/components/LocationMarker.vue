<template>
  <l-marker :lat-lng="markerCoordinates">
      <l-icon>
        <Icon icon="el:fire" class="location-icon" />
      </l-icon>
      <l-tooltip class="tooltip" :options="{}" >
        <!-- <Tooltip :context="context" /> -->
          <h2>Event Details</h2>
          <ul>
            <li><strong>Event ID:</strong><br> {{ context[0] }}</li>
            <li><strong>Event Title:</strong><br> {{ context[2] }}</li>
            <li><strong>Event Registered Date:</strong><br> {{ context[3] }}</li>
          </ul>
      </l-tooltip>
  </l-marker>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { LMarker, LIcon, LTooltip } from 'vue2-leaflet';
// import Tooltip from './Tooltip.vue';

export default {
  name: 'LocationMarker',
  // data () {
  //   return {
  //     hover: false,
  //   }
  // },
  // data () {
  //   return {
  //     markerCoordinates: [],
  //   }
  // },
  props: {
    latlng: [], 
    context: [],
    // lat: Number,
    // lng: Number,
  },
  components: {
    Icon,
    LMarker,
    LIcon,
    LTooltip,
    // Tooltip
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

<style scoped>
.tooltip { 
  position: relative;
  display: inline-block;
  color: rgb(100, 40, 40);
  width: 100%;
  height: auto;
  padding: 5px 25px;
  border-radius: 10px;
}

.tooltip ul {
  padding: 5px 0;
}

.tooltip li {
  padding: 2px 0;
}
</style>