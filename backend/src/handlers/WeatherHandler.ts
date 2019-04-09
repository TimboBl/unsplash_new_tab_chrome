import { Request, Response } from "express";
import axios from "axios";
import {
	OPEN_WEATHER_MAP_CURRENT_PATH,
	OPEN_WEATHER_MAP_FORECAST_PATH,
	OPEN_WEATHER_MAP_TOKEN,
	OPEN_WEATHERMAP_API_PATH
} from "../config/constants";

export const WeatherHandler = () => {
	const getCurrentWeather = (req: Request, res: Response) => {
		console.log("Request for current Weather");
		axios.get(OPEN_WEATHERMAP_API_PATH + OPEN_WEATHER_MAP_CURRENT_PATH, {
			params: {
				q: "Hamburg, de",
				mode: "json",
				APPID: OPEN_WEATHER_MAP_TOKEN,
				units: "metric",
				cnt: 4,
			}
		}).then((data) => {
			const ret: any = {};
			ret.condition = data.data.weather[0].main;
			ret.temp = Math.round(data.data.main.temp);
			res.status(200).send({message: "Success", data: ret});
		}).catch((err: Error) => {
			console.error("There was an error when requesting the current weather information", err);
			res.status(500).send({message: "Internal Server Error"});
		});
	};

	const getForecast = (req: Request, res: Response) => {
		console.log("Request for forecast");
		axios.get(OPEN_WEATHERMAP_API_PATH + OPEN_WEATHER_MAP_FORECAST_PATH, {
			params: {
				q: "Hamburg, de",
				mode: "json",
				APPID: OPEN_WEATHER_MAP_TOKEN,
				units: "metric"
			}
		}).then(data => {
			const ret = [];
			for (let i = 1; i < data.data.list.length; ++i) {
				const dayData: any = {};
				dayData.condition = data.data.list[i].weather[0].main;
				dayData.temperature = Math.round(data.data.list[i].temp.min) + " - " + Math.round(data.data.list[i].temp.max);
				dayData.day = data.data.list[i].dt;
				ret.push(dayData);
			}
			res.status(200).send({message: "Success", data: ret});
		}).catch((err: Error) => {
			console.error("There was an error when requesting the forecast", err);
			res.status(500).send({message: "Internal Server Error"});
		});
	};

	return {
		getCurrentWeather,
		getForecast,
	}
};
