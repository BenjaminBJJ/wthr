import useCurrentWeather from "@/hooks/useCurrentWeather";
import Image from "next/image";

const CurrentWeather = () => {
  const {
    label,
    icon,
    currentWeatherHumidity,
    currentWeatherPrecipitaion,
    currentWeatherTemperature,
    currentWeatherWindSpeed,
  } = useCurrentWeather();
  return (
    <section className="flex gap-10">
      <h1 className="text-5xl font-bold">Current</h1>
      <h1 className="text-3xl font-bold">{currentWeatherTemperature}c</h1>
      <h1 className="text-3xl font-bold">{currentWeatherHumidity}%</h1>
      <h1 className="text-3xl font-bold">{currentWeatherPrecipitaion}см</h1>
      <h1 className="text-3xl font-bold">{currentWeatherWindSpeed}км/ч</h1>

      <div className="w-">
        <div className="">
          <h1>{label}</h1>
        </div>

        <Image
          src={`/weather/animated/${icon}`}
          loading={"eager"}
          alt="Weather Icon"
          width={200}
          height={200}
        />
      </div>
    </section>
  );
};

export default CurrentWeather;
