<template>
  <div>
    <h2>Columns</h2>
    <form>
      <span v-for="column in columns">
        <input type="checkbox" :id="column" v-model="selectedColumns" :value="column">
        <label :for="column">{{column}}</label>
      </span>
    </form>
    <h2>Types</h2>
    <form>
      <span v-for="type in types">
        <input type="checkbox" :id="type" v-model="selectedTypes" :value="type">
        <label :for="type">{{type}}</label>
      </span>
    </form>
    <table>
      <thead>
        <tr>
          <th v-for="column in selectedColumns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tr v-for="row in filteredRows">
        <td v-for="column in selectedColumns">
          {{ row[column] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "cd-table",
  props: ["columns", "rows"],
  data () {
    return {
      selectedTypes: [],
      selectedColumns: ["name", "address", "website"],
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
      }
      return this.rows
        .filter((row) =>
          this.selectedTypes
            .some((type) => row.type.includes(type)))
    },
  },
}
</script>

<style>
</style>
