<template>
  <div class="menu">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="filter-button"
        icon
        v-bind="attrs"
        v-on="on"
        >
          <Icon class="filter-icon" icon="mdi:filter" />
        </v-btn>
      </template>
      <v-card>
        <h2>Filter Events</h2>
        <v-divider></v-divider>
        <v-row>
          <v-col
          col="12"
          md="6">
            <h3>Event Categories</h3>
            <v-list>
              <CategoryListItem @update-category="updateCategory" v-for="category in Object.keys(categories)" :key="category" :category="category" />
            </v-list>
          </v-col>
          <v-col
          col="12"
          md="6">
            <h3>Date Range</h3>
            <DatePicker @update-date-range="updateDateRange" :defaultDates="defaultDates" />
            <v-row>
              <v-card-actions class="center">
                <v-btn
                color="primary"
                text
                @click="updateData"
                >
                  Update Dates
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import DatePicker from './DatePicker.vue'
import CategoryListItem from './CategoryListItem.vue'

export default {
  name: 'FilterMenu',
  props: {
    categories: Object,
    defaultDates: Array
  },
  components: {
    DatePicker,
    CategoryListItem,
    Icon
  },
  data () {
    return {
      menu: false,
      dates: this.defaultDates
    }
  },
  methods: {
    updateDateRange (dates) {
      this.dates = dates
    },
    updateCategory (category, show) {
      this.$emit('update-category', category, show)
    },
    updateData () {
      this.$emit('update-data', this.dates)
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-button {
  background-color: none;
}

.filter-icon {
  font-size: 1.5rem;
  color: $theme-white;
}

.v-menu__content {
  top: 44px !important;
}

.menu {
  position: relative;
  z-index: 1000;
}
</style>
