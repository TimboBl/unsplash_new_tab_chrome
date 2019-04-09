import { App } from "./app";
import { MongoService } from "./services/MongoService";
import { UnsplashService } from "./services/UnsplashService";
import { MONGO_CONNECTION_STRING } from "./config/constants";
import { PORT } from "./config/config";
import { UnsplashServiceT } from "./types/services/UnsplashService";

let unsplashService: UnsplashServiceT = undefined;
MongoService.init(MONGO_CONNECTION_STRING).then(mongoService => {
	unsplashService = UnsplashService(mongoService);
	return App(mongoService).listen()
}).then(() => {
	return unsplashService.getRandomImage();
}).then(() => {
	setInterval(unsplashService.getRandomImage, 1000 * 60 * 60 * 2);
	console.log(`Server is listening on Port ${PORT}`);
}).catch((err: Error) => {
	console.error("There was an error during startup!", err);
});
