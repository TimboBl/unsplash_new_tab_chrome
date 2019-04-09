import axios from "axios";
import { UNSPLASH_API_PATH, UNSPLASH_RANDOM_PHOTO_PATH } from "../config/constants";
import { DATE_FORMAT, UNSPLASH_ACCESS_TOKEN } from "../config/config";
import { MongoServiceT } from "../types/services/MongoService";
import { UnsplashServiceT } from "../types/services/UnsplashService";
import moment = require("moment");

export const UnsplashService = (mongoService: MongoServiceT): UnsplashServiceT => {
	const getRandomImage = () => {
		return axios.get(UNSPLASH_API_PATH + UNSPLASH_RANDOM_PHOTO_PATH, {params: {
			client_id: UNSPLASH_ACCESS_TOKEN,
				query: "nature",
				orientation: "landscape",
			}}).then((result: any) => {
				console.info("Image was fetched at: ", moment().format(DATE_FORMAT + " - HH:mm"));
				return mongoService.storeImageData(result.data.id, result.data);
		});
	};

	return {
		getRandomImage,
	}
};
