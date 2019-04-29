class Weather {
	constructor() {
		this.weather = {
			current: "",
			forecast: "",
			image: "",
			city: "",
			country: "",
		};
		this.labels = {
			Clear: "images/98px/sun.png",
			Clouds: "images/98px/cloud.png",
			Thunderstorm: "images/98px/thunder.png",
			Drizzle: "images/98px/rain.png",
			Rain: "images/98px/rain.png",
			Snow: "images/98px/snow.png",
			Overcast: "images/98px/overcast.png"
		};
		this.getCurrentWeather();
		this.getForecast();
		this.currentWeatherNode = document.getElementById("current");
		this.firstWeatherNode = document.getElementById("0");
		this.secondWeatherNode = document.getElementById("1");
		this.thirdWeatherNode = document.getElementById("2");
		this.fourthWeatherNode = document.getElementById("3");
		this.forecastNodes = [this.firstWeatherNode, this.secondWeatherNode, this.thirdWeatherNode, this.fourthWeatherNode];

		port = chrome.runtime.connect(constants.EXTENSION_ID, {name: "settings"});
		port.postMessage({message: "settings"});
		port.onMessage.addListener((response) => {
			if (response.message === "settings") {
				this.weather.city = response.data.city;
				this.weather.country = response.data.country;
				this.getCurrentWeather();
				this.getForecast();
			}
		});
	}

	getCurrentWeather() {
		axios.get(constants.API_BASE_PATH + constants.WEATHER_ROUTE, {
			params: {
				city: this.weather.city,
				country: this.weather.country,
			}
		}).then(result => {
			this.weather.current = result.data.data;
		});
	}

	getForecast() {
		axios.get(constants.API_BASE_PATH + constants.FORECAST_ROUTE,{
			params: {
				city: this.weather.city,
				country: this.weather.country,
			}
		}).then(result => {
			this.weather.forecast = result.data.data;
		});
	}

	getImage() {
		return axios.get(constants.API_BASE_PATH + constants.IMAGE_ROUTE).then(result => {
			return result.data.data;
		});
	}

	setWeatherInfo() {
		this.setCurrentWeather();
		this.setForecast();
		this.setImage()
	}

	setCurrentWeather() {
		const condition = this.currentWeatherNode.querySelector(".condition");
		const temp = this.currentWeatherNode.querySelector(".temperature");
		const day = this.currentWeatherNode.querySelector(".weekday");
		const image = document.getElementById("current-image");

		condition.innerHTML = this.weather.current.condition;
		temp.innerHTML = this.weather.current.temp + '\u00B0';
		day.innerHTML = moment().format("dd");
		image.src = this.labels[this.weather.current.condition] || this.labels.Overcast;
	}

	setForecast() {
		const date = moment();
		for (let i = 0; i < this.forecastNodes.length; ++i) {
			const cur = date.clone().add(i + 1, "days");
			const condition = this.forecastNodes[i].querySelector(".condition");
			const temp = this.forecastNodes[i].querySelector(".temperature");
			const day = this.forecastNodes[i].querySelector(".weekday");
			const image = document.getElementById(i + "-image");

			condition.innerHTML = this.weather.forecast[i].condition;
			temp.innerHTML = this.weather.forecast[i].temperature + '\u00B0';
			day.innerHTML = cur.format("dd");
			image.src = this.labels[this.weather.forecast[i].condition] || this.labels.Overcast;
		}
	}

	setImage() {
		this.getImage().then((url) => {
			this.weather.image = url;
			const bg = document.getElementById("background");
			bg.style.backgroundImage = `url('${this.weather.image}')`;
		});
	}
}
