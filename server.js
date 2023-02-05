const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs"); // we need to use .ejs files
app.use(express.static("public")); // all static files are in a public folder
app.use(bodyParser.urlencoded({ extended: true })); // we use this meddleware to access info in the body of a form; extender true is crucial for working

const API_KEY = `${process.env.API_KEY}`;
console.log(API_KEY);

app.get("/", (req, res) => {
	res.render("index", { weather: null, error: null });
});

app.post("/", function (req, res) {
	let city = req.body.city; // city in a body of our form (input name=city)

	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

	request(url, function (err, response, body) {
		console.log(body);
		if (err) {
			res.render("index", {
				weather: null,
				error: "Error, please try again",
			});
		} else {
			let weather = JSON.parse(body);

			if (weather.main == undefined) {
				res.render("index", {
					weather: null,
					error: "error, please try again",
				});
			} else {
				let place = `${weather.name}, ${weather.sys.country}`;
				weatherTimezone = `${new Date(
					weather.dt * 1000 - weather.timezone * 1000
				)}`;
				let weatherTemperature = `${weather.main.temp}`;
				let weatherPressure = `${weather.main.pressure}`;
				let weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
				let weatherDescription = `${weather.weather[0].description}`;
				let humidity = `${weather.main.humidity}`;
				let clouds = `${weather.clouds.all}`;
				let visibility = `${weather.visibility}`;
				let main = `${weather.weather[0].name}`;

				res.render("index", {
					weather: weather,
					place: place,
					temp: weatherTemperature,
					pressure: weatherPressure,
					icon: weatherIcon,
					description: weatherDescription,
					timezone: weatherTimezone,
					humidity: humidity,
					clouds: clouds,
					visibility: visibility,
					main: main,
					error: null,
				});
			}
		}
	});
});

app.listen(5000);
