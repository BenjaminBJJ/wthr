import { weatherData } from "@/lib/openMeteo";

const CurrentWeather = () => {
	const currentWeather = Math.round(weatherData.current.apparent_temperature);
	return (
		<section>
			<h1 className="text-5xl font-bold">Current</h1>
			<h1 className="text-9xl font-bold">{currentWeather}</h1>
		</section>
	);
};

export default CurrentWeather;
