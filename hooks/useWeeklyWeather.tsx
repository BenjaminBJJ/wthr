import weatherData from "@/lib/openMeteo";
import { useWeatherType } from "./useWeatherType";

const weeklyWeatherTemperature = [
  ...(weatherData?.daily?.temperature_2m_mean ?? []),
].map(Math.round);
const weeklyWeatherDate = [...(weatherData?.daily?.time ?? [])];
const weeklyWeatherCode = [...(weatherData?.daily?.weather_code ?? [])];
const weeklyWeatherPrecipitaion = [
  ...(weatherData?.daily?.precipitation_probability_mean ?? []),
];
const weeklyWeatherCloudCover = [
  ...(weatherData?.daily?.cloud_cover_mean ?? []),
];

export const useWeeklyWeather = () => {
  const { label, icon } = useWeatherType(
    weeklyWeatherCode,
    weeklyWeatherPrecipitaion,
    weeklyWeatherCloudCover
  );
  return { label, icon, weeklyWeatherDate, weeklyWeatherTemperature };
};
