import axios from "axios"
import { serverUrl } from "../../config"

export default {
  get (address) {
    return axios(`${serverUrl}/api/geocode?address=${address}`)
      .then((response) => response.data)
      .then((data) => data.results[0].geometry.location)
      .catch((error) => console.error(error))
  }
}