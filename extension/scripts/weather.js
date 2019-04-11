class Weather {
	constructor() {
		this.weather = {
			current: "",
			forecast: "",
			image: "",
		};
		this.getCurrentWeather();
		this.getForecast();
		this.currentWeatherNode = document.getElementById("current");
		this.firstWeatherNode = document.getElementById("0");
		this.secondWeatherNode = document.getElementById("1");
		this.thirdWeatherNode = document.getElementById("2");
		this.fourthWeatherNode = document.getElementById("3");
		this.forecastNodes = [this.firstWeatherNode, this.secondWeatherNode, this.thirdWeatherNode, this.fourthWeatherNode];
	}

	getCurrentWeather() {
		axios.get(constants.API_BASE_PATH + constants.WEATHER_ROUTE).then(result => {
			this.weather.current = result.data.data;
		})
	}

	getForecast() {
		axios.get(constants.API_BASE_PATH + constants.FORECAST_ROUTE).then(result => {
			this.weather.forecast = result.data.data;
		})
	}

	getImage() {
		return axios.get(constants.API_BASE_PATH + constants.IMAGE_ROUTE).then(result => {
			return result.data.data;
		})
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

		condition.innerHTML = this.weather.current.condition;
		temp.innerHTML = this.weather.current.temp + '\u00B0';
		day.innerHTML = moment().format("dd");
	}

	setForecast() {
		const date = moment();
		for (let i = 0; i < this.forecastNodes.length; ++i) {
			const cur = date.clone().add(i + 1, "days");
			const condition = this.forecastNodes[i].querySelector(".condition");
			const temp = this.forecastNodes[i].querySelector(".temperature");
			const day = this.forecastNodes[i].querySelector(".weekday");

			condition.innerHTML = this.weather.forecast[i].condition;
			temp.innerHTML = this.weather.forecast[i].temperature + '\u00B0';
			day.innerHTML = cur.format("dd");
		}
	}

	setImage() {
		//TODO see if the background div can have opacity now, otherwise the image has to sit in it
		this.getImage().then((url) => {
			this.weather.image = url;
			const bg = document.getElementById("background");
			bg.style.backgroundImage =  `url('${this.weather.image}')`;
		});
	}
}
