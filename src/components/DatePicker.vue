<template>
  <v-row>
    <v-col
    cols="12"
    lg="6">
      <v-date-picker
        v-model="dates"
        range
        color=rgba(100,100,100,.5)
        first-day-of-week=1
        width=290px
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
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
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      defaultDates: Array,
    },
    data () {
      return {
          dates: this.defaultDates,
          // days: 28,
        }
    },
    computed: {
    //   dates: {
    //     get: function () {
    //       return this.dates
    //     },
    //     set: function (dates) {
    //       this.dates = dates
    //     }
    //   },
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    methods: {
      // getToday () {
      //   const current = new Date();
      //   const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      //   return today;
      // },
      // getStartDate (days) {
      //   let start = new Date();
      //   start.setDate(start.getDate() - days);
      //   return `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
      // },
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
