<template>
  <v-row>
    <v-date-picker
      class="center"
      v-model="dates"
      range
      color=rgba(100,100,100,.5)
      first-day-of-week=1
      width=290px
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-date-picker>
    <v-text-field
      class="center"
      v-model="dateRangeText"
      label="Date range"
      prepend-icon="mdi-calendar"
      readonly
    ></v-text-field>
  </v-row>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    defaultDates: Array
  },
  data () {
    return {
      dates: this.defaultDates
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    updateDateRange () {
      this.$emit('update-date-range', this.dates)
    }
  },
  updated () {
    this.updateDateRange()
  }
}
</script>
