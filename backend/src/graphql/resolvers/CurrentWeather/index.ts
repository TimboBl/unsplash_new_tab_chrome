import { CurrentWeather} from "../../../models/CurrentWeather";

export default {
	Query: {
		currentWeather: (root: any, args: any) => {
			return new Promise(((resolve, reject) => {
				return CurrentWeather.findOne(args).exec().then(result => {
					return Promise.resolve(result);
				}).catch((err: Error) => {
					console.error("There was an error finding a day", err);
					return Promise.reject(err);
				});
			}));
		}
	},
	Mutation: {
		//@ts-ignore
		updateCurrentWeather: (root: any, {id, data, date}) => {
			//@ts-ignore
			return new Promise(((resolve, reject) => {
				CurrentWeather.updateOne({id}, {"$set": {data, date}}, {upsert: true}).exec()
					.then(result => {
						return Promise.resolve(result);
					}).catch((err: Error) => {
						console.error("There was an error when updating Current Weather", err);
						return Promise.reject(err);
				});
			}));
		}
	}
}
