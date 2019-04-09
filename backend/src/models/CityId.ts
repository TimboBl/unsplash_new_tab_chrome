import {model, Schema} from "mongoose";

const CityIdSchema = new Schema({
	name: {type: String},
	country: {type: String},
	id: {type: String},
});

CityIdSchema.index({name: 1, country: 1}, {unique: true});

export const CityId = model("CityId", CityIdSchema);
