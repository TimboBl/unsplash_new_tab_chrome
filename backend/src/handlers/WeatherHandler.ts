import { Request, Response } from "express";
import moment = require("moment");
import axios from "axios";
import {
	OPEN_WEATHER_MAP_CURRENT_PATH,
	OPEN_WEATHER_MAP_FORECAST_PATH,
	OPEN_WEATHERMAP_API_PATH
} from "../config/constants";
import { WeatherHandlerT } from "../types/handlers/WeatherHandler";
import { MongoServiceT } from "../types/services/MongoService";
import { CityIdT } from "../types/models/CityId";
import { CURRENT_WEATHER_DATE_FORMT, DATE_FORMAT, OPEN_WEATHER_MAP_TOKEN } from "../config/config";

export const WeatherHandler = (mongoService: MongoServiceT): WeatherHandlerT => {
	const getCurrentWeather = (req: Request, res: Response) => {
		console.debug("Request for current Weather");
		let {city, country} = req.query;
		let fromDB = false;
		let data: any = {};
		const date: string = moment().format(CURRENT_WEATHER_DATE_FORMT);
		if (!(city && country)) {
			city = "Hamburg";
			country = "de";
		}
		mongoService.getCityByNameAndCountry(city, country)
			.then((result: CityIdT) => {
				if (result) {
					const weatherTime = moment(result.currentWeatherTime, CURRENT_WEATHER_DATE_FORMT);
					const oneHourBefore = moment().subtract(1, "hours");
					if (weatherTime.isBetween(oneHourBefore, moment())) {
						console.debug("Getting Current Weather from Database");
						fromDB = true;
						return mongoService.getCurrentWeatherById(result.id);
					}
				} else {
					console.debug("Requesting from API");
					return getCurrentWeatherCall(city, country);
				}
			}).then((d: any) => {
			if (!d) {
				console.debug("Tried getting from database but there was nothing there");
				return getCurrentWeatherCall(city, country);
			}
			return Promise.resolve(d);
		}).then((d: any) => {
			data = d;
			if (!fromDB) {
				data.date = date;
				console.debug("Storing Current Weather in Database");
				return mongoService.storeCurrentWeather(data.data.id, data.data, date);
			} else if (data.data.date && data.data.date.isSameOrAfter(moment())) {
				console.debug("Data is too old, requesting new one");
				return getCurrentWeatherCall(city, country);
			}
			return Promise.resolve();
		}).then((d: any) => {
			if (d && d.data) {
				data = d;
				data.date = moment().format(DATE_FORMAT);
				console.debug("Storing Current Weather in Database");
				return mongoService.storeCurrentWeather(data.id, data.data, date);
			} else if (!fromDB) {
				data.date = moment().format(DATE_FORMAT);
				return mongoService.storeCurrentWeather(data.data.id, data.data, date);
			}
		}).then(() => {
			if (!fromDB) {
				console.debug("Storing city and Id in Database");
				return mongoService.storeCityId(data.data.id, data.data.name, country);
			}
			return Promise.resolve();
		}).then(() => {
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
		console.debug("Request for forecast");
		let {city, country} = req.query;
		let fromDB = false;
		let data: any = {};
		const date: string = moment().format(DATE_FORMAT);
		if (!(city && country)) {
			city = "Hamburg";
			country = "de";
		}
		mongoService.getCityByNameAndCountry(city, country)
			.then((result: CityIdT) => {
				if (result && moment(result.forecastTime, DATE_FORMAT).isSame(moment().hour(0).minute(0).second(0).millisecond(0))) {
					console.debug("Getting Forecast from the Database");
					fromDB = true;
					return mongoService.getForecastById(result.id);
				} else {
					console.debug("Requesting Forecast from the API");
					return getForecastCall(city, country);
				}
			}).then((d: any) => {
			if (!d) {
				console.debug("Tried getting from database but there was nothing there");
				return getForecastCall(city, country);
			}
			return Promise.resolve(d);
		}).then((d: any) => {
			data = d;
			if (!fromDB) {
				data.date = date;
				console.debug("Storing Forecast in Database");
				return mongoService.storeForecast(data.data.city.id, data.data, date);
			} else if (fromDB && data.data.date && data.data.date.isAfter(moment().hour(0).minute(0).second(0).millisecond(0))) {
				console.debug("Data is too old, requesting new");
				return getCurrentWeatherCall(city, country);
			}
			return Promise.resolve();
		}).then((d: any) => {
			if (d && d.data) {
				data = d;
				data.date = moment().format(DATE_FORMAT);
				console.debug("Storing Forecast Weather in Database");
				return mongoService.storeForecast(data.data.city.id, data.data, date);
			}
			return Promise.resolve();
		}).then(() => {
			if (!fromDB) {
				return mongoService.storeCityId(data.data.city.id, data.data.city.name, country);
			}
		}).then(() => {
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

	const getCurrentWeatherCall = (city: string, country: string) => {
		console.debug("Calling API for current Weather");
		return axios.get(OPEN_WEATHERMAP_API_PATH + OPEN_WEATHER_MAP_CURRENT_PATH, {
			params: {
				q: `${city},${country}`,
				mode: "json",
				APPID: OPEN_WEATHER_MAP_TOKEN,
				units: "metric",
				cnt: 4,
			}
		});
	};

	const getForecastCall = (city: string, country: string) => {
		console.debug("Calling API for Forecast");
		return axios.get(OPEN_WEATHERMAP_API_PATH + OPEN_WEATHER_MAP_FORECAST_PATH, {
			params: {
				q: `${city},${country}`,
				mode: "json",
				APPID: OPEN_WEATHER_MAP_TOKEN,
				units: "metric"
			}
		});
	};

	return {
		getCurrentWeather,
		getForecast,
	}
};
