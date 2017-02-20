<template>
  <div class="map" ref="map"></div>
</template>

<script>
import { getGoogleMaps } from "./googleMaps"

export default {
  name: "cd-map",
  props: ["places"],
  data () {
    return {
      map: null,
      geocoder: null,
      markers: [],
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
        this.geocode = new maps.Geocoder().geocode
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
      Promise.all(
        this.places
          .filter((place) => place.address)
          .map(this.convertPlaceToMarker)
      )
        .then((markers) => {
          this.markers = markers
        })
    },
    convertPlaceToMarker (place) {
      return getGoogleMaps
        .then((maps) =>
          new Promise((resolve, reject) => {
            this.geocode({
              address: place.address,
            }, (results, status) => {
              if (status !== maps.GeocoderStatus.OK) {
                reject(status)
                return
              }
              if (results.length >= 1) {
                resolve(results[0].geometry.location)
                return
              }
              reject("No Geocoder results")
            })
          }
        )
        .then((location) => {
          const marker = new maps.Marker({
            position: location,
            map: this.map,
          })
          this.markers.push(marker)
        })
        .catch((reason) => {
          console.error(`Could not get location for ${place.name}.`)
        })
      )
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
  height: 50vh;
  width: 100vw;
}
</style>
