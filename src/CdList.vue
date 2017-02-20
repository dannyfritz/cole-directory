<template>
  <div>
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
          <h2 class="card__subheading">Address</h2>
          <p class="card__text">{{place.address}}</p>
          <p class="card__text">{{place.address2}}</p>
        </div>
        <div v-if="place.phone">
          <h2 class="card__subheading">Phone</h2>
          <p class="card__text">{{place.phone}}</p>
        </div>
        <div v-if="place.website || place.facebook">
          <h2 class="card__subheading">Links</h2>
          <ul class="list--inline">
            <li v-if="place.website">
              <a class="card__link" :href="place.website">website</a>
            </li>
            <li v-if="place.facebook">
              <a class="card__link" :href="place.facebook">facebook</a>
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
}
</script>

<style>
.type-filter-form {
  display: flex;
  flex-wrap: wrap;
}
.type-filter-form__item {
  flex: 0 0 20%;
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

.card {
  box-sizing: border-box;
  margin: 1em;
  padding: 2em 1em;
  border-radius: 2px;
  box-shadow: var(--box-shadow-z1);
}
.card__heading {
  margin: 0.5em 0;
  font-weight: var(--weight-bold);
  font-size: 1.2em;
}
.card__heading:first-child {
  margin-top: 0;
}
.card__subheading {
  margin: 0.5em 0;
  font-size: 1.2em;
  font-weight: var(--weight-light);
}
.card__text {
  margin: 0;
}
.card__link {
  display: inline-block;
  text-decoration: none;
  font-weight: var(--weight-bold);
  color: hsl(30, 100%, 70%);
  padding: 0.2em 1em;
  text-transform: uppercase;
}
.card__link:first-child {
  padding-left: 0;
}
</style>
