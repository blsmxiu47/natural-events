<template>
  <!-- <range-date-picker v-model="dates" language="en" /> -->
  <v-row>
    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <v-date-picker
        v-model="dates"
        range
        color=rgba(0,200,200,1)
        first-day-of-week=1
        width=100%
      ></v-date-picker>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="dateRangeText"
        label="Date range"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
      model: {{ dates }}
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
          dates: [this.getStartDate(20), this.getToday()],
          days: 20,
        }
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    methods: {
      getToday () {
        const current = new Date();
        const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        return today;
      },
      getStartDate (days) {
        var start = new Date();
        start.setDate(start.getDate() - days);
        return `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
      },
    },
  }
</script>

<style scoped>

</style>