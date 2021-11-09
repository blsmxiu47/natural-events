<template>
  <div class="menu">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Filter Events
        </v-btn>
      </template>
      <v-card>
        <h1>Parameters</h1>
        <v-divider></v-divider>
        <v-row>
            <v-col
            cols="6"
            sm="6">
            <v-list>
                <v-list-item>
                    test item 1
                </v-list-item>
                <CategoryListItem v-for="category in categories" :key="category" :category="category" />
            </v-list>
            </v-col>
            <v-col
            cols="6"
            sm="6">
            <DatePicker />
            </v-col>
        </v-row>
        <v-row>
            <v-card-actions class="center-all">
                <!-- <v-spacer></v-spacer> -->
                <v-btn
                text
                @click="menu = false"
                >
                Cancel
                </v-btn>
                <v-btn
                color="primary"
                text
                @click="updateData"
                >
                Update
                </v-btn>
            </v-card-actions>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// import { Icon } from '@iconify/vue2';
import DatePicker from './DatePicker.vue'
import CategoryListItem from './CategoryListItem.vue'

export default {
  name: 'Menu',
  components: {
      DatePicker,
      CategoryListItem,
  },
  data () {
      return {
          menu: false,
        //   updated: false,
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
  methods: {
      updateData () {
        console.log('updating data...');
        this.$root.$emit('updateData');
        this.menu = false;
      }
  }
}
</script>
