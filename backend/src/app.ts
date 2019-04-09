import * as express from "express";
import { WeatherRouter } from "./routers/WeatherRouter";
import { WeatherHandler } from "./handlers/WeatherHandler";
import { PORT } from "./config/config";

export const App = () => {
	const app = express();
	const weatherHandler = WeatherHandler();

	app.use(WeatherRouter().getRouter(weatherHandler));

	const listen = () => {
		return new Promise(((resolve, reject) => {
			app.listen(PORT, (err: Error) => {
				if (err) return reject(err);
				return resolve();
			})
		}))
	}

	return {
		listen,
	}
};
