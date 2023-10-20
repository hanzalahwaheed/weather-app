// get all the npm modules
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //to parse HTML
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); //sending the HTML to server
});
app.use(express.static("public")); //sending css and other static files to server
app.post("/", function (req, res) {
    const API_key = "324f26ed4d69138b0b77b4cb590ec664";
    var cityName = req.body.cityName; // get cityName from HTML input
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=324f26ed4d69138b0b77b4cb590ec664";

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const location = weatherData.name;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write('<br><br><br><br><br><br><br><br><br><br><br><br><br><br>');
            res.write('<img style="display: block; margin: 0 auto;" src="' + imgURL + '">');
            res.write('<h1 style="margin: auto; text-align: center;">The temperature in ' + location + ' is ' + temperature + ' degree Celcius.</h1>');
            res.write('<h3 style="margin: auto; text-align: center;">The weather is ' + description + ".</h3>");
            res.write('<br>');
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server running on port 3000.");
});