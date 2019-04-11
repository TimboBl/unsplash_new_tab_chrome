import * as mongoose from "mongoose";
import { CurrentWeather } from "../models/CurrentWeather";
import { ForecastWeather } from "../models/ForecastWeather";
import { UnsplashImage } from "../models/UnsplashImage";
import { CityId } from "../models/CityId";

export const MongoService = (() => {
	const storeCityId = (id: string, name: string, country: string) => {
		return CityId.updateOne({name, country}, {id, name, country}, {upsert: true}).exec();
	};

	const storeCurrentWeather = (id: string, data: any) => {
		return CurrentWeather.updateOne({id}, {id, data}, {upsert: true}).exec();
	};

	const storeForecast = (id: string, data: any) => {
		return ForecastWeather.updateOne({id}, {id, data}, {upsert: true}).exec();
	};

	const storeImageData = (id: string, data: any) => {
		return UnsplashImage.updateOne({id}, {id, data}, {upsert: true}).exec();
	};

	const getCityByNameAndCountry = (name: string, country: string) => {
		return CityId.findOne({name, country}).exec();
	};

	const getCurrentWeatherById = (id: string) => {
		return CurrentWeather.findOne({id}).exec();
	};

	const getForecastById = (id: string) => {
		return ForecastWeather.findOne({id}).exec();
	};

	const getImageById = (id: string) => {
		return UnsplashImage.findOne({id}).exec();
	};

	const getRandomImage = () => {
		return UnsplashImage.count({}).exec().then((count) => {
			const r = Math.floor(Math.random() * count);
			return UnsplashImage.find({}).limit(1).skip(r).exec();
		});
	};

	const mongoService = {
		storeCityId,
		storeCurrentWeather,
		storeForecast,
		storeImageData,
		getCityByNameAndCountry,
		getCurrentWeatherById,
		getForecastById,
		getImageById,
		getRandomImage,
	};

	const init = (connectionString: string) => {
		return mongoose.connect(connectionString, {useNewUrlParser: true}).then(() => {
			console.info("Connected to database");
			return mongoService;
		}).catch((err) => {
			console.log(err);
			return process.exit(-1);
		});
	};

	const shutdown = () => {
		return Promise.resolve(mongoose.connection.close(() => {
			console.info("Database connection was closed");
			return Promise.resolve();
		}));
	};

	return {
		init,
		shutdown,
	}
})();
