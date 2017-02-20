<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <h2>Map</h2>
    <!-- <cd-map v-if="sheets.Cole" :places="sheets.Cole.elements"></cd-map> -->
    <h2>List</h2>
    <cd-list
      v-if="sheets.Cole"
      :columns="sheets.Cole.columnNames"
      :rows="sheets.Cole.elements"
    ></cd-list>
  </div>
</template>

<script>
import Tabletop from "tabletop"
import config from "../config"
import CdMap from "./CdMap.vue"
import CdList from "./CdList.vue"

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
  components: { CdMap, CdList },
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
:root {
  --weight-light: 300;
  --weight-normal: 400;
  --weight-bold: 600;
  
  --box-shadow-z1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  --box-shadow-z2: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  --box-shadow-z3: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  --box-shadow-z4: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  --box-shadow-z5: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  
  font-family: 'Open Sans', sans-serif;
}
</style>
