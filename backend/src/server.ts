import { App } from "./app";
import { MongoService } from "./services/MongoService";
import { UnsplashService } from "./services/UnsplashService";
import { MONGO_CONNECTION_STRING } from "./config/constants";
import { PORT } from "./config/config";
import { UnsplashServiceT } from "./types/services/UnsplashService";
import { MongoServiceT } from "./types/services/MongoService";

let unsplashService: UnsplashServiceT = undefined;
let mongoService: MongoServiceT = undefined;
MongoService.init(MONGO_CONNECTION_STRING).then(ms => {
	mongoService = ms;
	unsplashService = UnsplashService(mongoService);
	console.info("Unsplash Service initiated");
	return unsplashService.getRandomImage();
}).then(() => {
	console.info("App is starting");
	return App(mongoService).listen()
}).then(() => {
	setInterval(unsplashService.getRandomImage, 1000 * 60 * 60 * 2);
	console.log(`Server is running and listening on Port ${PORT}`);
	return Promise.resolve();
}).catch((err: Error) => {
	console.error("There was an error during startup!", err);
});
