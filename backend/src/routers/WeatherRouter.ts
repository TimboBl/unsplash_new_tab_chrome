import { Router } from "express";
import { WeatherHandlerT } from "../types/handlers/WeatherHandler";

export const WeatherRouter = (() => {
	const getRouter = (weatherHandler: WeatherHandlerT) => {
		const router = Router();
		router.get("/weather", weatherHandler.getCurrentWeather);
		router.get("/forecast", weatherHandler.getForecast);

		return router;
	};

	return {
		getRouter,
	}
})();
