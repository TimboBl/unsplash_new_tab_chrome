import * as express from "express";
import { WeatherRouter } from "./routers/WeatherRouter";
import { WeatherHandler } from "./handlers/WeatherHandler";
import { UnsplashRouter } from "./routers/UnsplashRouter";
import { UnsplashHandler } from "./handlers/UnsplashHandler";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { PORT } from "./config/config";
import { MongoServiceT } from "./types/services/MongoService";

export const App = (mongoService: MongoServiceT) => {
	const app = express();
	const weatherHandler = WeatherHandler(mongoService);
	const unsplashHandler = UnsplashHandler(mongoService);

	app.use(cors({
		origin: ["chrome-extension://kmmffdeggnejajfmmeohnfkgmmgebiac", "http://localhost:63342"]
	}));
	app.use(bodyParser.json());
	app.use(express.urlencoded({extended: true}));

	app.use(WeatherRouter.getRouter(weatherHandler));
	app.use(UnsplashRouter.getRouter(unsplashHandler));

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
