import { Request, Response } from "express";

export interface WeatherHandlerT {
	getCurrentWeather(req: Request, res: Response): void;
	getForecast(req: Request, res: Response): void;
}
