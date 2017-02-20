<template>
  <div class="cd-list">
    <h2>Types</h2>
    <form class="type-filter-form">
      <span v-for="type in types" class="type-filter-form__item">
        <input type="checkbox" :id="type" v-model="selectedTypes" :value="type">
        <label :for="type">{{type}}</label>
      </span>
    </form>
    <section class="place-list">
      <div v-for="place in filteredRows" class="place-list__item card">
        <h1 class="card__heading">{{place.name}}</h1>
        <div v-if="place.address">
          <p class="card__text">
            {{place.address}}
          </p>
        </div>
        <div v-if="place.phone">
          <p class="card__text">
            {{place.phone | phone}}
          </p>
        </div>
        <div class="card__action-area" v-if="place.website || place.facebook">
          <ul class="list--inline">
            <li v-if="place.website">
              <a class="button card__link" :href="place.website">Website</a>
            </li>
            <li v-if="place.facebook">
              <a class="button card__link" :href="place.facebook">Facebook</a>
            </li>
            <li v-if="place.address">
              <a class="button card__link" :href="`http://maps.google.com/?q=${place.address}+${place.address2}`">
                Map
              </a>
            </li>
            <li v-if="place.phone">
              <a class="button card__link" :href="`tel:${place.phone}`">Call</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "cd-list",
  props: ["columns", "rows"],
  data () {
    return {
      selectedTypes: []
    }
  },
  computed: {
    types () {
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
            .every((type) => row.type.includes(type))
        )
        .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    },
  },
  filters: {
    phone (string) {
      const numbers = string.replace(/[^\d]/g, "").split("").map((s) => parseInt(s))
      const first = numbers.slice(0, 3).join("")
      const second = numbers.slice(3, 6).join("")
      const third = numbers.slice(-4).join("")
      return `(${first}) ${second}-${third}`
    }
  },
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

.place-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.place-list__item {
  flex: 0 0 20em;
  /*align-self: baseline;*/
}

.list--inline li {
  display: inline-block;
}

</style>
