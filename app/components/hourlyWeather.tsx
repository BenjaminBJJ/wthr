import { weatherData } from "@/lib/openMeteo";
import Image from "next/image";

const HourlyWeather = () => {
	const hourlyWeatherTemperature = [...(weatherData?.hourly?.temperature_2m ?? [])].map(
		Math.round
	);

	return <div>{hourlyWeatherTemperature.length}</div>;
};

export default HourlyWeather;
