export default `
	type CurrentWeather {
		id: String!
		data: String!
		date: String!
	}
	
	type Query {
		currentWeather(id: String!): CurrentWeather
	}
	
	type Mutation {
		updateCurrentWeather(id: String!, data: String!, date: String!): CurrentWeather
	}
`;
