import { useWeeklyWeather } from "@/hooks/useWeeklyWeather";

const WeeklyWeather = () => {
	const { weeklyWeatherDate, weeklyWeatherTemperature } = useWeeklyWeather();
	return (
		<div className="flex gap-10">
			<h1 className="text-5xl font-bold">Weekly</h1>
			{weeklyWeatherTemperature?.map((temp, i) => (
				<div key={i} className="Some">
					{weeklyWeatherDate?.[i]?.toLocaleDateString("ru-RU", {
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
