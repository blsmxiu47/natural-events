<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <!-- <LocationMarker :latlng="latlng" /> -->
    <template v-for="marker in markers">
      <component :is="marker" :key="marker.id"></component>
    </template>
    <!-- <component :is="MarkerComponent" v-bind:latlng="[10, 30]" /> -->
    <!-- <div v-for="marker in markers" :key="marker.id">
    {{ marker }}
    </div> -->
    <!-- <l-marker :lat-lng="markerLatLng">
        <l-icon>{{ markers }}</l-icon>
        <l-icon><LocationMarker /></l-icon>
    </l-marker> -->
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import LocationMarker from './LocationMarker.vue';
import Vue from 'vue';
// import eventData from './Events.vue';

// data: updated coordinates from Events.vue

// const markers = Events.map(ev => { return <LocationMarker lat={ev.geometry.coordinates[1]} lng={ev.geometry.coordinates[0]}/> });

export default {
  name: 'Map',
  props: ['events'],
  components: {
    LMap,
    LTileLayer,
    LocationMarker,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [0, 0],
      latlng: [0, 0],
      markers: [],
    }
  },
  computed: {
    MarkerComponent (category) {
      if (category === "wildfires") {
        return LocationMarker; // these will eventually be components specific to each natural event we're interested in
      } else if (category === "hurricane") {
        return LocationMarker;
      } else {
        return LocationMarker;
      }
    }
  },
  methods: {
    setCoordinates (events) {
      console.log("setCoordinates...")
      console.log("events type: ", typeof events)
      console.log("events: ", events)
      console.log("events length: ", events.length)
      console.log("events 0: ", events[0])
      // const markers = []
      // for (let i = 0; i < events.length; i++) {
      //   console.log("i", events[i])
      //   console.log(events[i].categories)
      //   if (events[i].categories[0].id === "wildfires") {
      //     console.log("1")
      //     markers.push(<LocationMarker lat={events[i].geometry[0].coordinates[1]} lng={events[i].geometry[0].coordinates[1]} />)
      //   }
      // }
      // console.log("markers: ", markers)
      // const LocationMarkerClass = Vue.extend(LocationMarker)
      // const instance = new LocationMarkerClass()
      // instance._props = {lat: -10, lng:10}
      // console.log(instance)
      // const myicon = instance.$mount('#myicon')
      // myicon._props = {lat: -10, lng:10}
      // console.log("mi", myicon)
      // const myiconhtml = myicon.$el.innerHTML
      // console.log("miih", myiconhtml)
      // return string.replace('icon', myiconhtml)

      const ComponentClass = Vue.extend(LocationMarker)
      console.log(ComponentClass)
      // instance.$mount() // pass nothing
      // this.$refs.container.appendChild(instance.$el)

      const markers = events.map(el => {
        // console.log(el.categories)
        if (el.categories[0].id === "wildfires") {
          // return [el.geometry[0].coordinates[1], el.geometry[0].coordinates[0]]
          // let instance = new ComponentClass({
          //   propsData: { latlng: [el.geometry[0].coordinates[1], el.geometry[0].coordinates[0]] },
          //   render () {
          //     return <LocationMarker latlng={[el.geometry[0].coordinates[1], el.geometry[0].coordinates[1]]} />
          //   }
          // })
          let instance = Vue.component('iconrender', {
            data () {
              return {
                latlng: [el.geometry[0].coordinates[1], el.geometry[0].coordinates[0]]
              }
            },
            render () {
              return <LocationMarker latlng={[el.geometry[0].coordinates[1], el.geometry[0].coordinates[0]]} />
            }
          })
          console.log(instance)
          return instance
          // return <LocationMarker lat={el.geometry[0].coordinates[1]} lng={el.geometry[0].coordinates[1]} /> // this isn't allowed in Vue :/, returns undefined
          // const elem = document.createElement("LocationMarker")
          // elem.setAttribute("lat", el.geometry[0].coordinates[1])
          // elem.setAttribute("lng", el.geometry[0].coordinates[1])
          // return elem
          // return 1
        }
      })
      console.log("markers: ", markers)
      this.markers = markers
      console.log("markers: ", markers)
    },
    // setCategory (event) {

    // }

  },
  mounted () {
    this.setCoordinates(this.events)
  },

  // computed: {
  //   markers () {
  //     return <LocationMarker lat={0} lng={0} />
  //     // return eventData.map(ev => { return <LocationMarker lat={ev.geometry.coordinates[1]} lng={ev.geometry.coordinates[0]}/> })
  //   } 
  // }
}
</script>
