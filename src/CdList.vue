<template>
  <section class="cd-list">
    <h2>Types</h2>
    <form class="type-filter-form">
      <span v-for="type in allTypes" class="type-filter-form__item">
        <input type="checkbox" :id="type" v-model="selectedTypes" :value="type">
        <label :for="type">{{type}}</label>
      </span>
    </form>
    <h2>{{filteredRows.length}} Place<span v-if="filteredRows.length !== 1">s</span> Found</h2>
    <div v-if="filteredRows.length === 0" class="empty-state card">
      <i class="empty-state__icon fa fa-building fa-3x"></i>
      <p class="empty-state__text">No businesses found</p>
      <p class="empty-state__text">Try selecting less filters</p>
    </div>
    <ul class="list">
      <li v-for="place in filteredRows" :key="place.name">
        <md-list-item :title="place.name">
          <i slot="icon" class="fa fa-building"></i>
          <div slot="details" class="line">
            <ul class="list--inline line__anchor">
              <li class="list__item--inline" v-if="place.website">
                <a class="button button--icon" :href="place.website">
                  <i class="fa fa-external-link" aria-hidden="true"></i>
                </a>
              </li>
              <li class="list__item--inline" v-if="place.facebook">
                <a class="button button--icon" :href="place.facebook">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li class="list__item--inline" v-if="place.address">
                <a class="button button--icon" :href="`http://maps.google.com/?q=${place.address}+${place.address2}`">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                </a>
              </li>
              <li class="list__item--inline" v-if="place.phone">
                <a class="button button--icon" :href="`tel:${place.phone}`">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <ul class="list--inline">
              <li class="list__item--inline" v-for="type in types(place.type)">
                <div class="chip">{{type}}</div>
              </li>
            </ul>
          </div>
        </md-list-item>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "cd-list",
  components: {},
  props: ["columns", "rows"],
  data () {
    return {
      selectedTypes: [],
    }
  },
  computed: {
    allTypes () {
      const types = new Set()
      return Array.from(this.rows
        .map((row) => row.type)
        .filter((types) => types)
        .reduce((types, placeTypes) => {
          placeTypes
            .split(";")
            .map((type) => type.trim())
            .forEach((type) => types.add(type))
          return types
        }, types))
        .sort()
    },
    filteredRows () {
      if (this.selectedTypes.length === 0) {
        return this.rows
          .slice()
          .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
      }
      return this.rows
        .filter((row) =>
          this.selectedTypes
            .every((type) => this.types(row.type).includes(type))
        )
        .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    },
  },
  methods: {
    types (typeString) {
      return typeString.split(";").filter((v) => v).map((t) => t.trim())
    },
  },
  filters: {},
}
</script>

<style scoped>
.type-filter-form {
  display: flex;
  flex-wrap: wrap;
}
.type-filter-form__item {
  flex: 0 0 200px;
  overflow: hidden;
}
</style>
