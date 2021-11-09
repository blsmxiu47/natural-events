<template>
  <v-row>
    <v-col
    cols="12"
    lg="6">
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
    lg="6">
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
    name: 'DatePicker',
    data () {
      return {
          dates: [this.getStartDate(28), this.getToday()],
          days: 28,
        }
    },
    // provide () {
    //   return {
    //     dates: this.dateRange,
    //   };
    // },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
      // dateRange () {
      //   return this.dates;
      // },
    },
    methods: {
      getToday () {
        const current = new Date();
        const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        return today;
      },
      getStartDate (days) {
        let start = new Date();
        start.setDate(start.getDate() - days);
        return `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
      },
      updateDateRange () {
        this.$emit('update-date-range', this.dates);
        console.log('emitting updateDateRange...', this.dates);
      },
    },
    updated () {
      this.updateDateRange();
      console.log("DatePicker updated...");
    }
  }
</script>

<style scoped>

</style>