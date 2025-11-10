import { useMemo } from "react";

type WeatherResult =
  | { label: string; icon: string }
  | { label: string[]; icon: string[] };

const mapWeather = (
  code: number,
  wet?: boolean,
  cloudy?: boolean
): { label: string; icon: string } => {
  let label = "Неизвестно";
  let icon = "❔";

  if (code === 0) [label, icon] = ["Солнечно", "clear-day.svg"];
  else if ([1, 2].includes(code)) [label, icon] = ["Ясно", "overcast-day.svg"];
  else if (code === 3) [label, icon] = ["Пасмурно", "cloudy.svg"];
  else if ([45, 48].includes(code)) [label, icon] = ["Туман", "mist.svg"];
  else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    [label, icon] = ["Дождь", "rain.svg"];
  else if ([66, 67].includes(code))
    [label, icon] = ["Дождь со снегом", "sleet.svg"];
  else if ([71, 73, 75, 77, 85, 86].includes(code))
    [label, icon] = ["Снег", "snow.svg"];
  else if ([95, 96, 99].includes(code))
    [label, icon] = ["Гроза", "thunderstorms-rain.svg"];

  if (["Солнечно", "Ясно"].includes(label) && wet)
    [label, icon] = ["Солнечно с осадками", "partly-cloudy-day-rain.svg"];
  else if (cloudy && label === "Солнечно")
    [label, icon] = ["Переменная облачность", "partly-cloudy-day.svg"];
  else if (cloudy && wet && label === "Пасмурно")
    [label, icon] = ["Пасмурно, дождь", "rain.svg"];

  return { label, icon };
};

export const useWeatherType = (
  weatherCode?: number | number[],
  precipitation?: number | number[],
  cloudcover?: number | number[]
): WeatherResult =>
  useMemo(() => {
    if (weatherCode == null) return { label: "Неизвестно", icon: "❔" };

    const codes = Array.isArray(weatherCode) ? weatherCode : [weatherCode];
    const wetArr = Array.isArray(precipitation)
      ? precipitation
      : [precipitation];
    const cloudArr = Array.isArray(cloudcover) ? cloudcover : [cloudcover];

    const results = codes.map((code, i) => {
      const wet = wetArr[i] != null ? wetArr[i]! > 0.1 : false;
      const cloudy = cloudArr[i] != null ? cloudArr[i]! > 60 : false;
      return mapWeather(code, wet, cloudy);
    });

    if (Array.isArray(weatherCode)) {
      return {
        label: results.map((r) => r.label),
        icon: results.map((r) => r.icon),
      };
    }

    return results[0];
  }, [weatherCode, precipitation, cloudcover]);
