import { model, Schema } from "mongoose";

const ForecastWeatherSchema = new Schema({
	id: {type: String},
	data: {type: Object}
});

ForecastWeatherSchema.index({id: 1}, {unique: true});

export const ForecastWeather = model("ForecastWeather", ForecastWeatherSchema, "ForecastWeather");
