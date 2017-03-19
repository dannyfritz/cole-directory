<template>
  <div class="map">
    <div class="map__gmap" ref="map"></div>
  </div>
</template>

<script>
import { getGoogleMaps } from "./googleMaps"
import { mapGetters, mapActions  } from "vuex"
import _ from "lodash/fp"

export default {
  name: "cd-map",
  props: [],
  data () {
    return {
      map: null,
      points: [],
    }
  },
  computed: {
    ...mapGetters({
      places: "getPlacesWithLocations"
    })
  },
  methods: {
    closeInfoWindows () {
      this.points.forEach((point) => point.infoWindow.close())
    },
    clearPoints () {
      this.closeInfoWindows()
      this.points.forEach((point) => point.marker.setMap(null))
    },
  },
  watch: {
    places: _.throttle(
      500,
      function () {
        getGoogleMaps
          .then((maps) => {
            this.clearPoints()
            const Marker = maps.Marker
            const InfoWindow = maps.InfoWindow
            this.points = this.places.map((place) => {
              const infoWindow = new InfoWindow({
                content: `
                  ${place.info.name}
                `
              })
              const marker = new Marker({
                position: place.location,
                map: this.map,
                title: place.info.name
              })
              marker.addListener('click', () => {
                this.closeInfoWindows()
                infoWindow.open(this.map, marker)
              })
              return { marker, infoWindow }
            })
          })
          .catch((reason) => {
            console.error(reason)
          })
      }
    )
  },
  mounted () {
    getGoogleMaps
      .then((maps) => {
        const cole = {lat: 39.767068, lng: -104.966063}
        this.map = new maps.Map(this.$refs.map, {
          zoom: 15,
          center: cole,
        })
      })
      .catch((reason) => {
        console.error(reason)
      })
  },
}
</script>

<style scoped>
.map {
  position: relative;
  overflow: hidden;
  box-shadow: var(--box-shadow-z1);
  transition: box-shadow 0.3s ease;
}
.map:hover {
  box-shadow: var(--box-shadow-z2);
}
.map__gmap {
  height: 30rem;
  max-height: calc(100vh - 4rem);
}

</style>
