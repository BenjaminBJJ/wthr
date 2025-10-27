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
			icon = "☀️";
		} else if ([1, 2].includes(w)) {
			label = "Ясно";
			icon = "🌤️";
		} else if ([3].includes(w)) {
			label = "Пасмурно";
			icon = "☁️";
		} else if ([45, 48].includes(w)) {
			label = "Туман";
			icon = "🌫️";
		} else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(w)) {
			label = "Дождь";
			icon = "🌧️";
		} else if ([66, 67].includes(w)) {
			label = "Дождь со снегом";
			icon = "🌨️";
		} else if ([71, 73, 75, 77, 85, 86].includes(w)) {
			label = "Снег";
			icon = "❄️";
		} else if ([95, 96, 99].includes(w)) {
			label = "Гроза";
			icon = "⛈️";
		}

		// --- Комбинированные состояния ---
		if (["Солнечно", "Ясно"].includes(label) && wet) {
			label = "Солнечно с осадками";
			icon = "🌦️";
		} else if (cloudy && label === "Солнечно") {
			label = "Переменная облачность";
			icon = "🌤️";
		} else if (cloudy && wet && label === "Пасмурно") {
			label = "Пасмурно, дождь";
			icon = "🌧️";
		}

		return { label, icon };
	}, [weatherCode, precipitation, cloudcover]);
