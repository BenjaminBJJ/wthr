"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import weatherData from "@/lib/openMeteo";
import { useWeatherType } from "@/hooks/useWeatherType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

export default function WeatherAreaChart() {
  const sunrise = weatherData.daily.sunrise;
  const sunset = weatherData.daily.sunset;
  const hourly = weatherData.hourly;

  const sunriseDate = new Date(sunrise[sunrise.length - 1]);
  const sunsetDate = new Date(sunset[0]);

  // определяем тип погоды (иконка + подпись)
  const { label, icon } = useWeatherType(0, 12, 12);

  // формируем данные для графика
  const chartData = hourly.time.map((t, i) => ({
    time: new Date(t).toLocaleTimeString("ru-RU", { hour: "2-digit" }),
    temperature: hourly.temperature_2m[i],
    weather: Array.isArray(label) ? label[i] : label,
    icon: Array.isArray(icon) ? icon[i] : icon,
  }));

  const chartConfig = {
    temperature: {
      label: "Температура",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-neutral-900 text-white">
      <CardHeader>
        <CardTitle>Почасовая температура 🌡️</CardTitle>
        <CardDescription>Визуализация данных Open Meteo</CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart
              data={chartData}
              margin={{ top: 16, right: 24, left: 12, bottom: 16 }}
            >
              {/* Сетка с градацией */}
              <CartesianGrid
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="time"
                stroke="#aaa"
                tickLine={false}
                tickFormatter={(v) => `${v}:00`}
                axisLine={false}
              />
              <YAxis
                stroke="#aaa"
                width={40}
                tickFormatter={(v) => `${v}°C`}
                domain={["auto", "auto"]}
              />

              {/* Подсветка ночного времени */}
              <ReferenceArea
                x1={sunsetDate.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                })}
                x2={sunriseDate.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                })}
                fill="#0f172a"
                fillOpacity={0.6}
              />

              <ReferenceLine
                x={sunriseDate.toLocaleTimeString("ru-RU", { hour: "2-digit" })}
                stroke="#facc15"
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{
                  value: "Восход",
                  fill: "#fbbf24",
                  position: "top",
                  fontSize: 12,
                }}
              />

              <ReferenceLine
                x={sunsetDate.toLocaleTimeString("ru-RU", { hour: "2-digit" })}
                stroke="#3b82f6"
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{
                  value: "Закат",
                  fill: "#3b82f6",
                  position: "top",
                  fontSize: 12,
                }}
              />

              {/* Tooltip и кривая температуры */}
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="temperature"
                    formatter={(v, _, p) => [
                      `${v}°C`,
                      p.payload.weather || "Температура",
                    ]}
                  />
                }
              />

              <defs>
                <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#facc15"
                fill="url(#tempFill)"
                fillOpacity={0.3}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <g key={cx}>
                      <circle cx={cx} cy={cy} r={3} fill="#facc15" />
                      <Image
                        src={`/weather-icons/${payload.icon}`}
                        alt={payload.weather}
                        width={28}
                        height={28}
                        style={{
                          transform: "translate(-14px, -40px)",
                          opacity: 0.9,
                        }}
                      />
                    </g>
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
