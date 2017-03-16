import places from "../../api/places"
import * as types from "../mutation-types"
import _ from "lodash/fp"

const state = {
  status: null,
  response: null,
  selectedTypes: [],
}

const sortPlaces = (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1

const typeParser = (typeString) => typeString.split(";").filter((v) => v).map((t) => t.trim())

const getters = {
  placesAll: (state) => {
    if (state.status !== "success")
      return []
    return state.response.elements
  },
  placesFilteredByType: (state, getters) => {
    const places = getters.placesAll
    const selectedTypes = getters.selectedTypes
    if (state.selectedTypes.length === 0) {
      return _.clone(places)
        .sort(sortPlaces)
    }
    return places
      .filter((row) =>
        selectedTypes
          .every((type) => typeParser(row.type).includes(type))
      )
      .sort(sortPlaces)
  },
  placesColumns: (state) => {
    if (state.status !== "success")
      return []
    return state.response.columnNames
  },
  placesStatus: (state) => state.status,
  placesTypes: (state, getters) => {
    console.log(getters)
    const types = new Set()
    return Array.from(getters.placesAll
        .map((element) => element.type)
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
  selectedTypes: (state) => state.selectedTypes,
}

const actions = {
  getAllPlaces ({ commit }) {
    commit(types.RECEIVE_PLACES_REQUEST)
    places.getAll()
      .then((response) => commit(types.RECEIVE_PLACES_SUCCESS, { response }))
      .catch(() => commit(types.RECEIVE_PLACES_FAILURE))
  },
  toggleSelectedType ({ commit }, type) {
    commit(types.TOGGLE_PLACE_TYPE_SELECTION, { type })
  },
}

const mutations = {
  [types.RECEIVE_PLACES_REQUEST] (state) {
    state.response = null
    state.status = "requested"
  },
  [types.RECEIVE_PLACES_SUCCESS] (state, { response }) {
    state.response = response
    state.status = "success"
  },
  [types.RECEIVE_PLACES_FAILURE] (state) {
    state.status = "failed"
  },
  [types.TOGGLE_PLACE_TYPE_SELECTION] (state, { type }) {
    if (!_.includes(type, state.selectedTypes)) {
      state.selectedTypes.push(type)
    } else {
      state.selectedTypes = _.reject(_.eq(type), state.selectedTypes)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}