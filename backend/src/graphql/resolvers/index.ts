import { mergeResolvers } from "merge-graphql-schemas";
import CurrentWeather from "./CurrentWeather/";

const resolvers = [CurrentWeather];

export default mergeResolvers(resolvers);
