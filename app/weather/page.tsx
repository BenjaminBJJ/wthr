import SpotlightCard from "@/components/SpotlightCard";
import CurrentWeather from "../components/currentWeather";
import HourlyWeather from "../components/hourlyWeather";
import WeeklyWeather from "../components/weeklyWeather";

const Page = () => {
  return (
    <>
      <WeeklyWeather />
      <SpotlightCard>
        <CurrentWeather />
      </SpotlightCard>
      <HourlyWeather />
    </>
  );
};
export default Page;
