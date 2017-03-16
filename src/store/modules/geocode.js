import geocode from "../../api/geocode"
import * as types from "../mutation-types"
import _ from "lodash/fp"

const state = {
  responses: {},
}

const getters = {
  geocode: (state) => (address) => state.responses[address]
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}