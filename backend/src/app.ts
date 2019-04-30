import * as express from "express";
import { WeatherRouter } from "./routers/WeatherRouter";
import { WeatherHandler } from "./handlers/WeatherHandler";
import { UnsplashRouter } from "./routers/UnsplashRouter";
import { UnsplashHandler } from "./handlers/UnsplashHandler";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { PORT } from "./config/config";
import { MongoServiceT } from "./types/services/MongoService";
const graphqlHTTP = require("express-graphql");
import schema from "./graphql/";

export const App = (mongoService: MongoServiceT) => {
	const app = express();
	const weatherHandler = WeatherHandler(mongoService);
	const unsplashHandler = UnsplashHandler(mongoService);

	app.use(cors());
	app.use(bodyParser.json());
	app.use(express.urlencoded({extended: true}));

	app.use("/graphql", graphqlHTTP({
		schema,
		graphiql: true,
	}));

	app.use(WeatherRouter.getRouter(weatherHandler));
	app.use(UnsplashRouter.getRouter(unsplashHandler));

	const listen = () => {
		return new Promise(((resolve, reject) => {
			app.listen(PORT, (err: Error) => {
				if (err) return reject(err);
				console.info("App is listening");
				return resolve();
			})
		}))
	};

	return {
		listen,
	}
};
