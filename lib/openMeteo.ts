import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 25.276987,
	longitude: 55.296249,
	daily: [
		"sunrise",
		"sunset",
		"wind_speed_10m_max",
		"temperature_2m_max",
		"temperature_2m_min",
		"daylight_duration",
		"precipitation_hours",
		"weather_code",
		"relative_humidity_2m_mean",
		"cloud_cover_mean",
		"precipitation_probability_mean",
	],
	hourly: "temperature_2m",
	models: "icon_seamless",
	current: [
		"cloud_cover",
		"rain",
		"precipitation",
		"is_day",
		"apparent_temperature",
		"relative_humidity_2m",
		"temperature_2m",
		"wind_speed_10m",
		"weather_code",
	],
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		cloud_cover: current.variables(0)!.value(),
		rain: current.variables(1)!.value(),
		precipitation: current.variables(2)!.value(),
		is_day: current.variables(3)!.value(),
		apparent_temperature: current.variables(4)!.value(),
		relative_humidity_2m: current.variables(5)!.value(),
		temperature_2m: current.variables(6)!.value(),
		wind_speed_10m: current.variables(7)!.value(),
		weather_code: current.variables(8)!.value(),
	},
	hourly: {
		time: [
			...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()),
		].map(
			(_, i) =>
				new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
	},
	daily: {
		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) =>
				new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		wind_speed_10m_max: daily.variables(2)!.valuesArray(),
		temperature_2m_max: daily.variables(3)!.valuesArray(),
		temperature_2m_min: daily.variables(4)!.valuesArray(),
		daylight_duration: daily.variables(5)!.valuesArray(),
		precipitation_hours: daily.variables(6)!.valuesArray(),
		weather_code: daily.variables(0)!.valuesArray(),
		relative_humidity_2m_mean: daily.variables(1)!.valuesArray(),
		cloud_cover_mean: daily.variables(2)!.valuesArray(),
		precipitation_probability_mean: daily.variables(3)!.valuesArray(),
	},
};
