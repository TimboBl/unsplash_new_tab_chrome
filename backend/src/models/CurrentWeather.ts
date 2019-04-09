import { model, Schema } from "mongoose";

const CurrentWeatherSchema = new Schema({
	id: {type: String},
	data: {type: Object},
});

CurrentWeatherSchema.index({id: 1}, {unique: true});

export const CurrentWeather = model("CurrentWeather", CurrentWeatherSchema, "CurrentWeather");
