import CurrentWeather from "../components/currentWeather";
import SearchBar from "../components/searchbar";
import WeatherAreaChart from "../components/weatherChart";
import WeeklyWeather from "../components/weeklyWeather";

const Page = () => {
  return (
    <div className="p-3 space-y-4">
      <SearchBar />
      <WeeklyWeather />
      <CurrentWeather />
      <WeatherAreaChart />
    </div>
  );
};
export default Page;
