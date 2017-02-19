import config from "../config"

export const getGoogleMaps =
  new Promise((resolve, reject) => {
    if (global.google && global.google.maps) {
      console.log(global.google)
      resolve(global.google.maps)
      return
    }
    global.mapReady = function () {
      resolve(global.google.maps)
    }
    const gMapScript = document.createElement("script")
    gMapScript.setAttribute(
      "src",
      `https://maps.googleapis.com/maps/api/js?key=${config.gMapKey}&callback=mapReady`
    )
    document.head.appendChild(gMapScript)
    gMapScript.addEventListener("error", reject)
  }
)

