import React from "react";
import { getTemperatureColor } from "../utils/utils";
import { DailyForecastType } from "@/types/weather";
import Image from "next/image";

function DailyForecast({ data }: { data: DailyForecastType[] }) {
  return (
    <div className="w-full">
      <div className="flex bg-gray-200 p-2 font-bold">
        <div className="w-1/3 px-2">Date</div>
        <div className="w-1/3 px-2">Conditions</div>
        <div className="w-1/6 px-2">Max</div>
        <div className="w-1/6 px-2">Min</div>
      </div>
      {data.map((day) => {
        const avgTemp = (day.temp_max + day.temp_min) / 2;
        const bgColor = getTemperatureColor(avgTemp);
        const textColor = "#000000";
        return (
          <div
            key={day.date}
            className="flex p-2"
            style={{ backgroundColor: `${bgColor}20`, color: textColor }}
          >
            <div className="w-1/3 px-2">
              {new Date(day.date).toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="w-1/3 px-2 flex items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                className="weather-icon mr-2"
                aria-label={`Weather icon: ${day.description}`}
                width={32}
                height={32}
              />
              {day.description}
            </div>
            <div className="w-1/6 px-2">{day.temp_max.toFixed(1)}°C</div>
            <div className="w-1/6 px-2">{day.temp_min.toFixed(1)}°C</div>
          </div>
        );
      })}
    </div>
  );
}

export default DailyForecast;
