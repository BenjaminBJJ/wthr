"use client";

import { FC, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSWR from "swr";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useWeatherStore } from "@/store/weatherStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Suggestion {
  title: { text: string };
  subtitle?: { text?: string };
  address?: { formatted_address?: string };
  uri?: string;
}

const SearchBar: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<Suggestion | null>(
    null
  );
  const setCoordinates = useWeatherStore((state) => state.setCoordinates);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedInput(inputValue), 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useSWR(
    debouncedInput ? `/api/yandex-suggest?text=${debouncedInput}` : null,
    fetcher
  );

  const suggestions: Suggestion[] = data?.results || [];

  const handleSelect = (item: Suggestion) => {
    setSelectedAddress(item);
    setInputValue(item.title.text);
  };

  useEffect(() => {
    if (!selectedAddress) return;

    console.log("Selected address:", selectedAddress.title.text);

    const fetchGeocoder = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_GEOCODER_API;
        if (!apiKey) {
          console.error("API KEY is missing");
          return;
        }

        const res = await fetch(
          `https://geocode-maps.yandex.ru/v1/?apikey=${apiKey}&geocode=${encodeURIComponent(
            selectedAddress.title.text
          )}&format=json`
        );

        if (!res.ok) {
          console.error("Geocoder response not OK", res.status);
          return;
        }

        const data = await res.json();
        const pointString =
          data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
            ?.Point?.pos;
        if (pointString) {
          const [lon, lat] = pointString.split(" ").map(Number);
          setCoordinates(lat, lon);
        }
      } catch (err) {
        console.error("Geocoder fetch error:", err);
      }
    };

    fetchGeocoder();
  }, [selectedAddress]);
  return (
    <div className="relative w-full max-w-md">
      <Popover
        open={!!inputValue && !selectedAddress}
        onOpenChange={() => setSelectedAddress(null)}
      >
        <PopoverTrigger>
          <InputGroup>
            <InputGroupInput
              placeholder="Введите адрес..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSelectedAddress(null);
              }}
            />

            <InputGroupAddon align="inline-end">
              {isLoading && <Spinner />}
            </InputGroupAddon>
          </InputGroup>
        </PopoverTrigger>

        {suggestions.length > 0 && (
          <PopoverContent className="w-full p-0 max-h-64 overflow-auto">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSelect(item)}
              >
                <div className="font-medium">
                  {item.title?.text || "Без названия"}
                </div>
                {item.subtitle?.text && (
                  <div className="text-sm text-gray-500">
                    {item.subtitle.text}
                  </div>
                )}
                {item.address?.formatted_address && (
                  <div className="text-xs text-gray-400">
                    {item.address.formatted_address}
                  </div>
                )}
              </div>
            ))}
          </PopoverContent>
        )}
      </Popover>

      {error && <div className="mt-2 text-red-600">Ошибка загрузки данных</div>}
    </div>
  );
};

export default SearchBar;
