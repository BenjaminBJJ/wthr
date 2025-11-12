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
              disabled={isLoading}
            />

            <InputGroupAddon align="inline-end">
              {isLoading ? <Spinner /> : ""}
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
