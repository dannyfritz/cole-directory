<template>
  <div class="map">
    <div class="map__gmap" ref="map"></div>
    <cd-spinner :show="loading"></cd-spinner>
  </div>
</template>

<script>
import { serverUrl } from "../config"
import { getGoogleMaps } from "./googleMaps"
import axios from "axios"

export default {
  name: "cd-map",
  props: ["places"],
  data () {
    return {
      map: null,
      geocoder: null,
      markers: [],
      loading: true,
    }
  },
  mounted () {
    getGoogleMaps
      .then((maps) => {
        const cole = {lat: 39.767068, lng: -104.966063}
        this.map = new maps.Map(this.$refs.map, {
          zoom: 15,
          center: cole,
        })
        this.geocode = (address) =>
          axios(`${serverUrl}/api/geocode?address=${address}`)
            .then((response) => response.data)
            .then((data) => data.results[0].geometry.location)
            .catch((error) => console.error(error))
        this.convertPlacesToMarkers()
      })
      .catch((reason) => {
        console.error(reason)
      })
  },
  methods: {
    clearMarkers () {
      this.markers.forEach((marker) => marker.setMap(null))
    },
    convertPlacesToMarkers (places) {
      this.clearMarkers()
      this.loading = true
      Promise.all(
        this.places
          .filter((place) => place.address)
          .map(this.convertPlaceToMarker)
      )
        .then((markers) => {
          this.markers = markers
          this.loading = false
        })
    },
    convertPlaceToMarker (place) {
      return this.geocode(place.address)
          .then((location) => {
            return getGoogleMaps
              .then((maps) => {
                const marker = new maps.Marker({
                  position: location,
                  map: this.map,
                })
                this.markers.push(marker)
              })
          })
          .catch((reason) => {
            console.error(`Could not get location for ${place.name}.`)
          })
    },
  },
  watch: {
    places () {
      console.log("hello")
      this.convertPlacesToMarkers()
    },
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
