import { weatherData } from "@/lib/openMeteo";

const WeeklyWeather = () => {
	const weeklyWeatherTemperature = [...(weatherData?.daily?.temperature_2m_max ?? [])].map(
		Math.round
	);
	const weeklyWeatherDay = [...(weatherData?.daily?.time ?? [])];

	return (
		<div className="flex gap-10">
			<h1 className="text-5xl font-bold">Weekly</h1>
			{weeklyWeatherTemperature?.map((temp, i) => (
				<div key={i} className="Some">
					{weeklyWeatherDay?.[i]?.toLocaleDateString("ru-RU", {
						weekday: "short",
						day: "numeric",
						month: "short",
					})}
					: {temp}°C
				</div>
			))}
		</div>
	);
};

export default WeeklyWeather;
