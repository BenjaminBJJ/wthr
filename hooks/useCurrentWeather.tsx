import weatherData from "@/lib/openMeteo";
import { useWeatherType } from "./useWeatherType";
const currentWeatherTemperature = Math.round(
  weatherData.current.temperature_2m
);
const currentWeatherHumidity = Math.round(
  weatherData.current.relative_humidity_2m
);
const currentWeatherPrecipitaion = Math.round(
  weatherData.current.precipitation
);
const currentWeatherWindSpeed = Math.round(weatherData.current.wind_speed_10m);
const currentWeatherCloudCover = Math.round(weatherData.current.cloud_cover);
const currentWeatherCode = weatherData.current.weather_code;

const useCurrentWeather = () => {
  const { label, icon } = useWeatherType(
    currentWeatherCode,
    currentWeatherPrecipitaion,
    currentWeatherCloudCover
  );

  return {
    currentWeatherHumidity,
    currentWeatherTemperature,
    currentWeatherPrecipitaion,
    currentWeatherWindSpeed,
    label,
    icon,
  };
};

export default useCurrentWeather;
