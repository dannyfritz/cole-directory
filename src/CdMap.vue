<template>
  <div class="map">
    {{ locations }}
    <div class="map__gmap" ref="map"></div>
  </div>
</template>

<script>
import { getGoogleMaps } from "./googleMaps"
import { mapGetters, mapActions  } from "vuex"

export default {
  name: "cd-map",
  props: [],
  data () {
    return {
      map: null,
      markers: [],
    }
  },
  computed: {
    ...mapGetters({
      places: "placesFilteredByType",
      locations: "getLocations",
    }),
    placeMarkers () {
      return this.places.map((place) => {
        return place.location
      })
    }
  },
  methods: {},
  watch: {},
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
