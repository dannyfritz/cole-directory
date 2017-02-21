import Vue from "vue"
import App from "./App.vue"
import MdListItem from "./MdListItem.vue"

Vue.component("md-list-item", MdListItem)

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: (h) => h(App),
})
