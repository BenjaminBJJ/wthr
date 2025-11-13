"use client";
import Image from "next/image";
import SearchBar from "./searchbar";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/store/weatherStore";
import Link from "next/link";

const Header = () => {
  const { longitude, latitude } = useWeatherStore();
  const [cityName, setCityName] = useState<string>("");

  useEffect(() => {
    if (!longitude || !latitude) return;

    const fetchGeocoder = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_GEOCODER_API;
        if (!apiKey) {
          console.error("API KEY is missing");
          return;
        }

        const location = `${longitude},${latitude}`;
        const res = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(
            location
          )}&format=json`
        );

        if (!res.ok) {
          console.error("Geocoder response not OK", res.status);
          return;
        }

        const data = await res.json();
        const components =
          data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
            ?.metaDataProperty?.GeocoderMetaData?.Address?.Components;

        const cityComponent = components?.find(
          (c: any) => c.kind === "locality"
        );

        const name = cityComponent?.name || "Неизвестно";
        setCityName(name);
      } catch (err) {
        console.error("Geocoder fetch error:", err);
      }
    };

    fetchGeocoder();
  }, [longitude, latitude]);

  return (
    <header className="w-full flex items-center justify-between gap-3 h-10">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image
            className="w-10 h-10"
            src="/weather/animated/thermometer-celsius.svg"
            width={40}
            height={40}
            alt="Logo"
          />
        </Link>
        <SearchBar />
      </div>
      <span className="font-bold mr-10 ">{cityName}</span>
    </header>
  );
};

export default Header;
