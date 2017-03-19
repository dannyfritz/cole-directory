export const getPlacesWithLocations = (state, getters) => {
  return getters.placesFilteredByType.map((place) => ({
      info: place,
      location: getters.getLocation(`${place.address} ${place.address2}`),
    }))
    .filter((place) => place.location)
}