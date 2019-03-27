const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup hanblebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Paulo Rigter"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Paulo Rigter"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Section",
        body: "This pages has usefull information", 
        question: "Tell us what subject you need help.",
        name: "Paulo Rigter"

    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "please provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })


        })

    })


    console.log(req.query)
    // res.send({
    //     forecast: "Sunny",
    //     location: "Paço de Arcos",
    //     address: req.query.address
    // })
})

app.get("/products", (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: "please provide a search value"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error-doc", {
        title: "404",
        name: "Paulo Rigter",
        errorMessage: "Help article not found"
    })
})
 

app.get("*", (req, res) => { // Express special character "*" - Means everything is a match - so for our 404 page, this route need to be in last, after all our existing routes
    res.render("error-page", {
        title: "404",
        name: "Paulo Rigter",
        errorMessage: "Page not found."
    })
})



app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})
