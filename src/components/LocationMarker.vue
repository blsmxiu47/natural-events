<template>
  <l-marker :lat-lng="context[3]">
      <l-icon>
        <Icon v-if="context[1] === 'wildfires'" icon="el:fire" class="location-icon wildfire-icon" />
        <Icon v-else-if="context[1] === 'seaLakeIce'" icon="flat-ui:mountain" class="location-icon" :style="iconOpacity" />
        <Icon v-else-if="context[1] === 'severeStorms'" icon="mi:storm" class="location-icon storm-icon" :style="iconOpacity" />
        <!-- <Icon v-else-if="context[1] === 'snow'" icon="bi:cloud-snow" class="location-icon" :style="iconOpacity" /> -->
        <Icon v-else-if="context[1] === 'volcanoes'" icon="maki:volcano" class="location-icon" :style="iconOpacity" />
        <Icon v-else icon="bi:exclamation-circle" class="location-icon" :style="iconOpacity" />
      </l-icon>
      <l-tooltip class="tooltip" :options="{}" >
          <h2>Event Details</h2>
          <ul>
            <li><strong>Event ID:</strong><br> {{ context[0] }}</li>
            <li><strong>Event Category:</strong><br> {{ context[1] }}</li>
            <li><strong>Event Title:</strong><br> {{ context[2] }}</li>
            <li><strong>Event Coordinates:</strong><br> {{ context[3] }}</li>
            <li><strong>Event Registered Date:</strong><br> {{ context[4] }}</li>
            <li v-if="hasMagnitude(context[1])"><strong>Event Magnitude:</strong><br> {{ context[6] }} {{ context[5] }} </li>
            <!-- <li v-if="context[1] != 'wildfires'"><strong>opacity:</strong><br> {{ context[7] }} </li> -->
          </ul>
      </l-tooltip>
  </l-marker>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { LMarker, LIcon, LTooltip } from 'vue2-leaflet';

export default {
  name: 'LocationMarker',
  props: {
    context: [],
  },
  components: {
    Icon,
    LMarker,
    LIcon,
    LTooltip,
  },
  computed: {
    iconOpacity () {
      return {
        '--icon-opacity': this.context[7],
      }
    }
  },
  methods: {
    hasMagnitude (category) {
      return ['seaLakeIce', 'severeStorms'].includes(category)
    }
  }
}
</script>

<style lang="scss" scoped>
.location-icon {
  opacity: var(--icon-opacity);
}

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
  list-style: none;
  text-align: left;
  padding: 5px 0;
}

.tooltip li {
  padding: 2px 0;
}

.location-icon {
  position: relative;
  font-size: 1.3rem;
}

.storm-icon {
  color: orange;
}

.volcano-icon {
  color: indigo;
}

.wildfire-icon {
  color: red;
}

.location-icon:hover {
  color: #000;
}
</style>