import CurrentWeather from "../components/currentWeather";
import HourlyWeather from "../components/hourlyWeather";
import WeeklyWeather from "../components/weeklyWeather";

const Page = () => {
	return (
		<div className="">
			<CurrentWeather />
			<WeeklyWeather />
			<HourlyWeather />
		</div>
	);
};
export default Page;
