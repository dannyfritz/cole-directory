<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <!-- <section class="cd-map">
        <h2>Map</h2>
        <cd-map v-if="sheets.Cole" :places="sheets.Cole.elements"></cd-map>
      </section> -->
      <section class="cd-list">
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
  --color-faded: #F5F5F5;
  --color-less-faded: #E0E0E0;
  --color-less-dark: #757575;
  --color-dark: #212121;
  
  
  --weight-light: 300;
  --weight-normal: 400;
  --weight-bold: 600;
  
  --box-shadow-z1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  --box-shadow-z2: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  --box-shadow-z3: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  --box-shadow-z4: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  --box-shadow-z5: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

body {
  overflow-y: scroll;
}

input[type="checkbox"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 0.15rem solid var(--color-less-dark);
  border-radius: 0.15rem;
  cursor: pointer;
  height: 1rem;
  transition: background-color 0.2s ease;
  vertical-align: sub;
  width: 1rem;
}
input[type="checkbox"]:checked {
  background-color: var(--color-main);
  border: none;
}

header {
  position: fixed;
  left: 0;
  right: 0;
  height: 4rem;
  box-shadow: var(--box-shadow-z3);
  background-color: var(--color-main);
  color: var(--color-main-text);
  display: flex;
  align-items: center;
  padding-left: 2rem;
}
header h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.4rem;
  padding: 1rem 0;
}

main {
  padding-top: 5rem;
  padding-bottom: 4rem;
  background-color: hsl(0, 0%, 93%);
  min-height: 100vh;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty-state__text {
  font-size: 1.2rem;
  padding: 0.5rem 0;
}

.cd-map,
.cd-list {
  max-width: 800px;
  margin: auto;
}

.list {}
.list__item {}
  
.line {
  display: flex;
}
.line__anchor,
.line__anchor > h1 {
  flex: 1 1;
}

.heading {
  font-weight: var(--weight-bold);
  font-size: 1.2rem;
  line-height: 1.5em;
}
.heading--ellipsis {
  overflow-x: hidden;
  overflow-y: visible;
  white-space: nowrap;
  text-overflow: ellipsis;
}

button {
  background: none;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
}
.button {
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  color: var(--color-less-dark);
}
.button:hover {
  color: var(--color-dark);
}
.button--icon {
  font-size: 1.5rem;
}

.chip {
  margin: 0 0.2rem;
  font-size: 0.75rem;
  background-color: var(--color-less-faded);
  color: var(--color-dark);
  padding: 0.5rem 0.75rem;
  border-radius: 1.5rem;
}

.list--inline {}
.list__item--inline {
  display: inline-block;
}

.card {
  background-color: hsl(0, 0%, 100%);
  box-sizing: border-box;
  margin: 0.5rem;
  padding: 1.5rem 1rem;
  border-radius: 2px;
  box-shadow: var(--box-shadow-z1);
}
.card--list {
  margin: 0;
  padding: 1rem;
  border-radius: 0;
  border-bottom: 1px solid var(--color-faded);
  display: flex;
}
.card__icon {
  flex: 0 0 3.5rem;
  font-size: 1.5rem;
  color: var(--color-less-dark);
}
.card__icon i {
  vertical-align: middle;
}
.card__content {
  flex: 1;
  min-width: 0;
}
.card__details {
  padding-top: 0.5rem;
}
.card__action-area {
  padding: 0.5rem;
  padding-bottom: 0;
}
</style>
