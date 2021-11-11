<template>
  <v-list-item>
    <v-list-item-action>
      <v-switch
      v-model="showCategory"
      color="green"
      ></v-switch>
    </v-list-item-action>
    <v-list-item-title>{{ category }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'CategoryListItem',
  props: {
    category: String,
  },
  data () {
    return {
      showCategory: true,
    }
  },
  methods: {
    updateCategory () {
      this.$emit('update-category', this.category, this.showCategory);
      console.log('emitting updateCategory...', this.category, this.showCategory);
    },
  },
  updated () {
    this.updateCategory();
    console.log("Category switch updated...");
  }
}
</script>
