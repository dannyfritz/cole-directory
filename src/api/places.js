import axios from "axios"
import { serverUrl } from "../../config"

export default {
  getAll () {
    return axios(`${serverUrl}/api/sheets/Places`)
        .then((response) => response.data)
  }
}