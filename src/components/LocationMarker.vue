<template>
  <div class="location-marker">
      <Icon icon="el:fire" class="location-icon" />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'LocationMarker',
  components: {
    Icon,
  },
  data () {
    return {
    };
  }
}
</script>
