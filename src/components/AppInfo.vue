<template>
  <div>
    <v-btn icon class="info-button" @click.stop="drawer = !drawer">
      <Icon class="info-icon" icon="feather:info" />
    </v-btn>
    <v-navigation-drawer
    class="info-nav"
    v-model="drawer"
    absolute
    temporary
    right
    height=auto>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :href="item.href">
          <v-list-item-icon>
            <Icon :icon="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'

export default {
  name: 'AppInfo',
  components: {
    Icon
  },
  data () {
    return {
      drawer: false,
      items: [
        { title: 'GitHub', icon: 'akar-icons:github-fill', href: 'https://github.com/blsmxiu47/natural-events' },
        { title: 'EONET', icon: 'akar-icons:globe', href: 'https://eonet.gsfc.nasa.gov/' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.info-nav {
  z-index: 1000;
}

.info-button {
  margin: 0;
}

.info-icon {
  color: $theme-white;
  font-size: 1.5rem;
}
</style>
