import { useWeatherType } from "@/hooks/useWeatherType";
import { weatherData } from "@/lib/openMeteo";
import Image from "next/image";

const CurrentWeather = () => {
	const currentWeatherTemperature = Math.round(weatherData.current.apparent_temperature);
	const currentWeatherHumidity = Math.round(weatherData.current.relative_humidity_2m);
	const currentWeatherPrecipitaion = Math.round(weatherData.current.precipitation);
	const currentWeatherWindSpeed = Math.round(weatherData.current.wind_speed_10m);
	const { label, icon } = useWeatherType(
		weatherData.current.weather_code,
		weatherData.current.precipitation,
		weatherData.current.cloud_cover
	);
	return (
		<section className="flex gap-10">
			<h1 className="text-5xl font-bold">Current</h1>
			<h1 className="text-3xl font-bold">{currentWeatherTemperature}c</h1>
			<h1 className="text-3xl font-bold">{currentWeatherHumidity}%</h1>
			<h1 className="text-3xl font-bold">{currentWeatherPrecipitaion}см</h1>
			<h1 className="text-3xl font-bold">{currentWeatherWindSpeed}км/ч</h1>
			<Image
				src={"/weather/animated/clear-day.svg"}
				width={200}
				height={200}
				alt="Sun Icon"
			/>
			{label}
			{icon}
		</section>
	);
};

export default CurrentWeather;
