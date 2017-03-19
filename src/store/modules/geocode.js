import geocode from "../../api/geocode"
import * as types from "../mutation-types"
import _ from "lodash/fp"

const state = {
  responses: {},
}

const getters = {
  getLocations: (state) => state.responses,
  getLocation: (state) => (address) => state.responses[address]
}

const actions = {
  geocodeAddress ({ commit }, address) {
    return geocode.get(address)
      .then((location) => commit(types.GEOCODE_ADDRESS, { address, location }))
  },
  geocodePlaces ({ dispatch, getters }, address) {
    return getters.placesAll.map((place) => dispatch("geocodeAddress", place.address))
  },
}

const mutations = {
  [types.GEOCODE_ADDRESS] (state, { address, location }) {
    state.responses[address] = location
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}