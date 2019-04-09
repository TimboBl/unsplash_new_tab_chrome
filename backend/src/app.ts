import * as express from "express";
import { WeatherRouter } from "./routers/WeatherRouter";
import { WeatherHandler } from "./handlers/WeatherHandler";
import * as bodyParser from "body-parser";
import { PORT } from "./config/config";
import { MongoServiceT } from "./types/services/MongoService";

export const App = (mongoService: MongoServiceT) => {
	const app = express();
	const weatherHandler = WeatherHandler(mongoService);

	app.use(bodyParser.json());
	app.use(express.urlencoded({extended: true}));

	app.use(WeatherRouter().getRouter(weatherHandler));

	const listen = () => {
		return new Promise(((resolve, reject) => {
			app.listen(PORT, (err: Error) => {
				if (err) return reject(err);
				return resolve();
			})
		}))
	};

	return {
		listen,
	}
};
