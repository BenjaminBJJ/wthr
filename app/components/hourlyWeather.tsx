import { weatherData } from "@/lib/openMeteo";
import Image from "next/image";

const HourlyWeather = () => {
	const hourlyWeatherTemperature = [...(weatherData?.hourly?.temperature_2m ?? [])].map(
		Math.round
	);

	return (
		<div>
			{hourlyWeatherTemperature.length}
			<Image src={"/clear-day.svg"} width={132} height={132} alt="some" />
		</div>
	);
};

export default HourlyWeather;
