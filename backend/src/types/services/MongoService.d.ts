export interface MongoServiceT {
	storeCurrentWeather(id: string, data: any): Promise<any>,
	storeForecast(id: string, data: any): Promise<any>,
	storeImageData(id: string, data: any): Promise<any>,
	getCurrentWeatherById(id: string): Promise<any>,
	getForecastById(id: string): Promise<any>,
	getImageById(id: string): Promise<any>,
	storeCityId(id: string, name: string, country: string): Promise<any>;
	getCityByNameAndCountry(name: string, country: string): Promise<any>;
	getRandomImage(): Promise<any>;
}
