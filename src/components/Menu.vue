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
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="wildfires"
                color="green"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Wildfires</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="hurricanes"
                color="green"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Hurricanes</v-list-item-title>
          </v-list-item>
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
          wildfires: false,
          hurricanes: false
      }
  }
}
</script>
