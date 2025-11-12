"use client";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/store/weatherStore";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    precipitation: number;
    weather_code: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    cloud_cover: number;
    is_day: number;
  };
  hourly: Record<string, any>;
  daily: Record<string, any>;
}

export function useWeatherData() {
  const { latitude, longitude } = useWeatherStore();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      setLoading(false);
      return;
    }

    const getWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        const params = {
          latitude,
          longitude,
          daily: [
            "weather_code",
            "temperature_2m_mean",
            "relative_humidity_2m_mean",
            "cloud_cover_mean",
            "precipitation_probability_mean",
            "sunrise",
            "sunset",
          ],
          hourly: [
            "temperature_2m",
            "weather_code",
            "is_day",
            "sunshine_duration",
            "precipitation_probability",
            "cloud_cover",
          ],
          current: [
            "temperature_2m",
            "precipitation",
            "weather_code",
            "relative_humidity_2m",
            "wind_speed_10m",
            "cloud_cover",
            "is_day",
          ],
          forecast_hours: 24,
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;
        const sunrise = daily.variables(5)!;
        const sunset = daily.variables(6)!;

        const data: WeatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            precipitation: current.variables(1)!.value(),
            weather_code: current.variables(2)!.value(),
            relative_humidity_2m: current.variables(3)!.value(),
            wind_speed_10m: current.variables(4)!.value(),
            cloud_cover: current.variables(5)!.value(),
            is_day: current.variables(6)!.value(),
          },
          hourly: {
            time: Array.from(
              {
                length:
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                    1000
                )
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            weather_code: hourly.variables(1)!.valuesArray(),
            is_day: hourly.variables(2)!.valuesArray(),
            sunshine_duration: hourly.variables(3)!.valuesArray(),
            precipitation_probability: hourly.variables(4)!.valuesArray(),
            cloud_cover: hourly.variables(5)!.valuesArray(),
          },
          daily: {
            time: Array.from(
              {
                length:
                  (Number(daily.timeEnd()) - Number(daily.time())) /
                  daily.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(daily.time()) +
                    i * daily.interval() +
                    utcOffsetSeconds) *
                    1000
                )
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_mean: daily.variables(1)!.valuesArray(),
            relative_humidity_2m_mean: daily.variables(2)!.valuesArray(),
            cloud_cover_mean: daily.variables(3)!.valuesArray(),
            precipitation_probability_mean: daily.variables(4)!.valuesArray(),
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
              (_, i) =>
                new Date(
                  (Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000
                )
            ),
            sunset: [...Array(sunset.valuesInt64Length())].map(
              (_, i) =>
                new Date(
                  (Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000
                )
            ),
          },
        };

        setWeatherData(data);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки погоды");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
}
