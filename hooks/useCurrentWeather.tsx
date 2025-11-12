"use client";
import { useWeatherData } from "./useWeatherData";
import { useWeatherType } from "./useWeatherType";

const useCurrentWeather = () => {
  const { weatherData } = useWeatherData();
  const currentWeatherTemperature = Math.round(
    weatherData?.current?.temperature_2m ?? 0
  );
  const currentWeatherHumidity = Math.round(
    weatherData?.current?.relative_humidity_2m ?? 0
  );
  const currentWeatherPrecipitaion = Math.round(
    weatherData?.current?.precipitation ?? 0
  );
  const currentWeatherWindSpeed = Math.round(
    weatherData?.current?.wind_speed_10m ?? 0
  );
  const currentWeatherCloudCover = Math.round(
    weatherData?.current?.cloud_cover ?? 0
  );
  const currentWeatherCode = weatherData?.current?.weather_code;
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
