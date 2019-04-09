import { Router } from "express";
import { UnsplashHandlerT } from "../types/handlers/UnsplashHandler";

export const UnsplashRouter = (() => {
	const getRouter = (unsplashHandler: UnsplashHandlerT) => {
		const router = Router();

		router.get("/image", unsplashHandler.getImage);

		return router;
	};

	return {
		getRouter,
	}
})();
