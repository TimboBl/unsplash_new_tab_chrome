import { App } from "./app";
import { MongoService } from "./services/MongoService";
import { MONGO_CONNECTION_STRING } from "./config/constants";
import { PORT } from "./config/config";

MongoService.init(MONGO_CONNECTION_STRING)
	.then(mongoService => {
		return App(mongoService).listen()
	}).then(() => {
	console.log(`Server is listening on Port ${PORT}`);
}).catch((err: Error) => {
	console.error("There was an error during startup!", err);
});
