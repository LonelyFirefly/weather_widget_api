const weatherBlock = document.querySelector(".weather");

async function loadWeather() {
	weatherBlock.innerHTML = `
		<div>
			<img class="weather__loading" src="../img/Full-snake.gif" alt="loading..." />
		</div>`;

	const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Tbilisi&appid=258e0ef736b82923c0cbbeeff17eaf75`;
	const response = await fetch(server, {
		method: "GET",
	});
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult);
	} else {
		weatherBlock.innerHTML = responseResult.message;
	}
}

function getWeather(data) {
	console.log(data);

	const location = data.name;
	const temp = Math.round(data.main.temp);
	const feelsLike = Math.round(data.main.feels_like);
	const weatherStatus = data.weather[0].main;
	const weatherIcon = data.weather[0].icon;
	console.log(location);
	console.log(temp);
	console.log(feelsLike);
	console.log(weatherStatus);
	console.log(weatherIcon);

	const template = `
				<div class="weather__header">
					<div class="weather__main">
						<div class="weather__city">${location}</div>
						<div class="weather__status">${weatherStatus}</div>
					</div>
					<div class="weather__temperature">${temp}</div>
					<div class="weather__feels-like">Feels like: ${feelsLike}</div>
				</div>
				<div class="weather__icon">
						<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
				</div>`;

	weatherBlock.innerHTML = template;
}

if (weatherBlock) {
	loadWeather();
}
