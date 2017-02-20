<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <section class="map">
        <h2>Map</h2>
        <!-- <cd-map v-if="sheets.Cole" :places="sheets.Cole.elements"></cd-map> -->
      </section>
      <section class="list">
        <h2>List</h2>
        <cd-list
          v-if="sheets.Cole"
          :columns="sheets.Cole.columnNames"
          :rows="sheets.Cole.elements"
        ></cd-list>
      </section>
    </main>
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
* {
  box-sizing: border-box;;
}

:root {
  --color-main: #EF6C00;
  --color-main-text: white;
  --color-body-text: black;
  --color-accent: #1E88E5;
  
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
header {
  position: fixed;
  left: 0;
  right: 0;
  height: 4em;
  box-shadow: var(--box-shadow-z3);
  background-color: var(--color-main);
  color: var(--color-main-text);
  display: flex;
  align-items: center;
  padding-left: 2em;
}
header h1 {
  font-size: 2em;
}
main {
  padding: 2em;
  padding-top: 6em;
  background-color: hsl(0, 0%, 93%);
  min-height: 100vh;
}

.map,
.list {
  max-width: 800px;
  margin: auto;
}

.card {
  background-color: hsl(0, 0%, 100%);
  box-sizing: border-box;
  margin: 0.5em;
  padding: 1.5em 1em;
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
  padding: 0.25em 0;
  margin: 0;
}
.card__action-area {
  padding: 0.5em;
  padding-bottom: 0;
}
.card__link {
  display: inline-block;
  text-decoration: none;
  font-weight: var(--weight-bold);
  color: var(--color-accent);
  padding: 0.2em 1em;
  text-transform: uppercase;
}
.card__link:first-child {
  padding-left: 0;
}
</style>
