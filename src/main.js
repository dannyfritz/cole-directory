import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import MdListItem from "./MdListItem.vue"
import CdSpinner from "./CdSpinner.vue"

Vue.component("md-list-item", MdListItem)
Vue.component("cd-spinner", CdSpinner)

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
})
