const request = require("request")

 

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1IjoicmlndGVyIiwiYSI6ImNqcjZuNWc0dTBwN2M0M21zNzJtamFhNmgifQ.ILO7YYQerQXh4-S7oO28mQ&limit=1"

    request({url, json: true}, (error, { body }) => { // ver nota destructuring em forecast.js
         if(error){
            callback("Unable to connect to the location services", undefined)
         } else if(body.features.length === 0) {
            callback("Unable to find location. Please try again with different search", undefined)
         } else {
             callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
             })
         }
    })

}


module.exports = geocode