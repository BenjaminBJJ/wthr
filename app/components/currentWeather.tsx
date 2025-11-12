"use client";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import Image from "next/image";

const CurrentWeather = () => {
  const {
    icon,
    currentWeatherHumidity,
    currentWeatherPrecipitaion,
    currentWeatherTemperature,
    currentWeatherWindSpeed,
  } = useCurrentWeather();
  return (
    <section className="flex flex-wrap-reverse justify-center md:justify-between items-center md:flex gap-10 md:px-20">
      <div className="flex gap-5 items-center ">
        <div className="flex items-center-safe">
          <p className="text-8xl font-bold  ">{currentWeatherTemperature}</p>
          <span className="text-7xl  ">&deg;C</span>
        </div>
        <div className="items-center">
          <p className="text-sm items-center  flex">
            <Image
              src={"/weather/animated/humidity.svg"}
              width={32}
              height={32}
              alt="Humidity"
            />
            {currentWeatherHumidity} %
          </p>
          <p className="text-sm items-center flex">
            <Image
              src={"/weather/animated/raindrops.svg"}
              width={32}
              height={32}
              alt="Humidity"
            />
            {currentWeatherPrecipitaion} см
          </p>
          <p className=" text-sm items-center flex">
            <Image
              src={"/weather/animated/wind.svg"}
              width={32}
              height={32}
              alt="Humidity"
            />
            {currentWeatherWindSpeed} км/ч
          </p>
        </div>
      </div>
      <Image
        className="w-100 h-100"
        src={`/weather/animated/${icon}`}
        loading={"eager"}
        alt="Weather Icon"
        width={200}
        height={200}
      />
    </section>
  );
};

export default CurrentWeather;
