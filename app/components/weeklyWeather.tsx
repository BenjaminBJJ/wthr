import SpotlightCard from "@/components/SpotlightCard";
import { useWeeklyWeather } from "@/hooks/useWeeklyWeather";
import Image from "next/image";

const WeeklyWeather = () => {
  const { label, icon, weeklyWeatherDate, weeklyWeatherTemperature } =
    useWeeklyWeather();

  return (
    <div className="flex gap-10">
      <h1 className="text-5xl font-bold">Weekly</h1>

      {weeklyWeatherTemperature?.map((temp, i) => (
        <SpotlightCard key={i}>
          {weeklyWeatherDate?.[i]?.toLocaleDateString("ru-RU", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
          : {temp}°C
          {/* {Array.isArray(label) ? label[i] : label}{" "} */}
          <Image
            src={`/weather/animated/${Array.isArray(icon) ? icon[i] : icon}`}
            loading={"eager"}
            alt="Weather Icon"
            width={72}
            height={72}
          />
        </SpotlightCard>
      ))}
    </div>
  );
};

export default WeeklyWeather;
