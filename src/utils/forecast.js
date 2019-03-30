
const request = require("request")


// const url = "https://api.darksky.net/forecast/3fefe343ae09fb40d9988bfd3e752733/37.8267,-122.4233?units=si&lang=pt"

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!")
//     } else if (response.body.error) {
//         console.log("Unable to find location")
//     } else {
//         console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability +"% chance of rain.")
//     }

    
// })




const forecast = (lat, lon, callback) => {
    const url = "https://api.darksky.net/forecast/3fefe343ae09fb40d9988bfd3e752733/"+ lat + "," + lon +"?units=si&lang=pt"

    request({url, json: true}, (error, { body }) => { // note tanto o object url e body estão na syntax desctruturing object (url: url com têm msm nome, passa a url -- e body é uma propriedade do objecto "response")
        if(error) {
            callback("Unable to connect to weather service!", undefined)
        } else if(body.error) {
            callback("Unable do find location", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degress out. There is a " + body.currently.precipProbability + "% chance of rain." + "\n" + "Temperatura máxima de hoje é de: " + body.daily.data[0].temperatureHigh + " degrees." + "E a Temperatura mínima é de: " + body.daily.data[0].temperatureLow + " degrees.")
        }
    })

}


module.exports = forecast

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

/// Calling the function:
// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })