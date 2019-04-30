import { mergeTypes } from "merge-graphql-schemas";
import CurrentWeather from "./CurrentWeather/";

const typeDefs = [CurrentWeather];

const types = mergeTypes(typeDefs, {all: true});

export default types;
