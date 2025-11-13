import CurrentWeather from "../components/currentWeather";
import Header from "../components/header";
import WeatherAreaChart from "../components/weatherChart";
import WeeklyWeather from "../components/weeklyWeather";

const Page = () => {
  return (
    <div className="p-3 space-y-4">
      <Header />
      <WeeklyWeather />
      <CurrentWeather />
      <WeatherAreaChart />
    </div>
  );
};
export default Page;
