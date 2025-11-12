import { create } from "zustand";

interface WeatherState {
  latitude: number | null;
  longitude: number | null;
  setCoordinates: (latitude: number, longitude: number) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  latitude: 38,
  longitude: 68,
  setCoordinates: (latitude: number, longitude: number) =>
    set({ latitude: latitude, longitude: longitude }),
}));
