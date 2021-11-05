<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <!-- <Icon icon="gg:menu" class="menu-icon"> -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu as Popover
        </v-btn>
      </template>

      <v-card>
        <h1>Menu</h1>
        <v-divider></v-divider>

        <v-list>
          <CategoryListItem v-for="category in categories" :key="category" :category="category" />
        </v-list>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="menu = false"
          >
            Update
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'Menu',
  components: {
      Icon,
  },
  data () {
      return {
          menu: false,
          categories: 
          ['drought', 
          'dustHaze', 
          'earthquakes', 
          'floods', 
          'landslides', 
          'manmade', 
          'seaLakeIce', 
          'severeStorms', 
          'snow', 
          'tempExtremes', 
          'volcanoes', 
          'waterColor', 
          'wildfires'],
      }
  },
}
</script>
