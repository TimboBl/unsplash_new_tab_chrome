import { Request, Response } from "express";
import { MongoServiceT } from "../types/services/MongoService";
import { UnsplashHandlerT } from "../types/handlers/UnsplashHandler";

export const UnsplashHandler = (mongoService: MongoServiceT): UnsplashHandlerT => {
	const getImage = (req: Request, res: Response) => {
		mongoService.getRandomImage()
			.then((images => {
				res.status(200).send({message: "Success", data: images[0].data.links.download});
			})).catch((err: Error) =>  {
				console.error("There was an error when getting a random image from the database", err);
				res.status(500).send({message: "Internal Server Error"});
		})
	};

	return {
		getImage,
	}
};
