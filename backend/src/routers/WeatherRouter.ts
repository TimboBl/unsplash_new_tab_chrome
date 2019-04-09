import { Router } from "express";

export const WeatherRouter = (() => {
	const getRouter = (weatherHandler: any) => {
		const router = Router();
		router.get("/weather", weatherHandler.getCurrentWeather);
		router.get("/forecast", weatherHandler.getForecast);

		return router;
	}

	return {
		getRouter,
	}
});
