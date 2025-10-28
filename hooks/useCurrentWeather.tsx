import { weatherData } from "@/lib/openMeteo";
import { useWeatherType } from "./useWeatherType";
const currentWeatherTemperature = Math.round(weatherData.current.apparent_temperature);
const currentWeatherHumidity = Math.round(weatherData.current.relative_humidity_2m);
const currentWeatherPrecipitaion = Math.round(weatherData.current.precipitation);
const currentWeatherWindSpeed = Math.round(weatherData.current.wind_speed_10m);
const currentWeatherCode = weatherData.current.weather_code;
const currentWeatherCloudCover = weatherData.current.cloud_cover;

const useCurrentWeather = () => {
	const { label, icon } = useWeatherType(
		currentWeatherCode,
		currentWeatherPrecipitaion,
		currentWeatherCloudCover
	);

	return {
		currentWeatherHumidity,
		currentWeatherTemperature,
		currentWeatherPrecipitaion,
		currentWeatherWindSpeed,
		label,
		icon,
	};
};

export default useCurrentWeather;
