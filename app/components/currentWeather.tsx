import { weatherData } from "@/lib/openMeteo";

const CurrentWeather = () => {
	const currentWeatherTemperature = Math.round(weatherData.current.apparent_temperature);
	const currentWeatherHumidity = Math.round(weatherData.current.relative_humidity_2m);
	const currentWeatherPrecipitaion = Math.round(weatherData.current.precipitation);
	const currentWeatherWindSpeed = Math.round(weatherData.current.wind_speed_10m);
	return (
		<section className="flex gap-10">
			<h1 className="text-5xl font-bold">Current</h1>
			<h1 className="text-3xl font-bold">{currentWeatherTemperature}c</h1>
			<h1 className="text-3xl font-bold">{currentWeatherHumidity}%</h1>
			<h1 className="text-3xl font-bold">{currentWeatherPrecipitaion}см</h1>
			<h1 className="text-3xl font-bold">{currentWeatherWindSpeed}км/ч</h1>
		</section>
	);
};

export default CurrentWeather;
