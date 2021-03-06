const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const userInput = process.argv[2];

const app = express();

// Needed for Heroku
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Conny Martinsson"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Conny Martinsson"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is a help message",
        title: "Help",
        name: "Conny Martinsson"
    });
});

app.get("/weather", function(req, res){
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get("/help/*", function(req, res){
    res.render("404", {
        title: "Error 404",
        message: "Help article not found.",
        name: "Conny Martinsson"
    });
});

// This needs to be here, to not match too early
app.get("*", function(req, res){
    res.render("404", {
        title: "Error 404",
        message: "Page not found.",
        name: "Conny Martinsson"
    });
});

app.listen(port, function(){
    console.log('Server is up on port ' + port);
});