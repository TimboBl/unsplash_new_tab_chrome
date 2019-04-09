import {Request, Response} from "express";

export interface UnsplashHandlerT {
	getImage(req: Request, res: Response): void;
}
