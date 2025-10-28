import { useMemo } from "react";

type WeatherResult = {
	label: string; // "Солнечно", "Пасмурно" и т.д.
	icon: string; // 🟡 или ключ "sunny", если хочешь SVG/Lottie
};

export const useWeatherType = (
	weatherCode?: number,
	precipitation?: number,
	cloudcover?: number
): WeatherResult =>
	useMemo(() => {
		if (weatherCode == null) return { label: "Неизвестно", icon: "❔" };

		const w = weatherCode;
		const cloudy = cloudcover && cloudcover > 60;
		const wet = precipitation && precipitation > 0.1;

		let label = "Неизвестно";
		let icon = "❔";

		if (w === 0) {
			label = "Солнечно";
			icon = "clear-day.svg";
		} else if ([1, 2].includes(w)) {
			label = "Ясно";
			icon = "overcast-day.svg";
		} else if ([3].includes(w)) {
			label = "Пасмурно";
			icon = "cloudy.svg";
		} else if ([45, 48].includes(w)) {
			label = "Туман";
			icon = "mist.svg";
		} else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(w)) {
			label = "Дождь";
			icon = "rain.svg";
		} else if ([66, 67].includes(w)) {
			label = "Дождь со снегом";
			icon = "sleet.svg";
		} else if ([71, 73, 75, 77, 85, 86].includes(w)) {
			label = "Снег";
			icon = "snow.svg";
		} else if ([95, 96, 99].includes(w)) {
			label = "Гроза";
			icon = "thunderstorms-rain.svg";
		}

		// --- Комбинированные состояния ---
		if (["Солнечно", "Ясно"].includes(label) && wet) {
			label = "Солнечно с осадками";
			icon = "partly-cloudy-day-rain.svg";
		} else if (cloudy && label === "Солнечно") {
			label = "Переменная облачность";
			icon = "partly-cloudy-day.svg";
		} else if (cloudy && wet && label === "Пасмурно") {
			label = "Пасмурно, дождь";
			icon = "rain.svg";
		}

		return { label, icon };
	}, [weatherCode, precipitation, cloudcover]);
