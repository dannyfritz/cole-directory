<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tr v-for="row in rows">
      <td v-for="column in columns">
        {{ row[column] }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "cd-table",
  props: ["columns", "rows"],
  data () {
    return {}
  },
}
</script>

<style>
</style>
