"use client";
import { useWeeklyWeather } from "@/hooks/useWeeklyWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const WeeklyWeather = () => {
  const { icon, weeklyWeatherDate, weeklyWeatherTemperature } =
    useWeeklyWeather();

  return (
    <section className="flex  gap-3 overflow-x-scroll scrollbar-hidden">
      {weeklyWeatherTemperature?.map((temp, i) => (
        <Card className="min-w-fit max-w-fit items-center" key={i}>
          <CardHeader className="w-full text-center">
            <CardTitle className="capitalize">
              {weeklyWeatherDate?.[i]?.toLocaleDateString("ru-RU", {
                weekday: "short",
              })}
            </CardTitle>
            {weeklyWeatherDate?.[i]?.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
            })}
          </CardHeader>
          <CardContent className="items-center text-center">
            <p>{temp}°C</p>
            <Image
              src={`/weather/animated/${Array.isArray(icon) ? icon[i] : icon}`}
              loading={"eager"}
              alt="Weather Icon"
              width={100}
              height={100}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default WeeklyWeather;
