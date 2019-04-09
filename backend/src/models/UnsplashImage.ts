import { model, Schema } from "mongoose";

const UnsplashImageSchema = new Schema({
	id: {type: String},
	data: {type: Object},
});

UnsplashImageSchema.index({id: 1}, {unique: true});

export const UnsplashImage = model("UnsplashImage", UnsplashImageSchema);
