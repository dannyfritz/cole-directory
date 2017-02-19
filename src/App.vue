<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <cd-map v-if="sheets.Cole" :places="sheets.Cole.elements"></cd-map>
    <cd-table v-if="sheets.Cole"
      :columns="sheets.Cole.columnNames"
      :rows="sheets.Cole.elements"
    ></cd-table>
  </div>
</template>

<script>
import Tabletop from "tabletop"
import config from "../config"
import CdMap from "./CdMap.vue"
import CdTable from "./CdTable.vue"

const getData = () =>
  new Promise(
    (resolve, reject) =>
      Tabletop.init({
        key: config.spreadsheet,
        prettyColumnNames: false,
        callback: resolve,
      })
  )

export default {
  name: "app",
  components: { CdMap, CdTable },
  data () {
    getData()
      .then((data) => { this.sheets = data })
    return {
      title: config.name,
      sheets: [],
    }
  },
}
</script>

<style>
</style>
