import React from 'react';
import { getTemperatureColor, getContrastColor } from '../utils/utils';

function DailyForecast({ data }) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Conditions</th>
          <th className="px-4 py-2 text-left">Max</th>
          <th className="px-4 py-2 text-left">Min</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day) => {
          const avgTemp = (day.temp_max + day.temp_min) / 2;
          const bgColor = getTemperatureColor(avgTemp);
          const textColor = getContrastColor(bgColor);
          return (
            <tr key={day.date} style={{ backgroundColor: `${bgColor}20`, color: textColor }}>
              <td className="border px-4 py-2">
                {new Date(day.date).toLocaleDateString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="border px-4 py-2 flex items-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                  alt={day.description} 
                  className="weather-icon mr-2" 
                  aria-label={`Weather icon: ${day.description}`}
                />
                {day.description}
              </td>
              <td className="border px-4 py-2">{day.temp_max.toFixed(1)}°C</td>
              <td className="border px-4 py-2">{day.temp_min.toFixed(1)}°C</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DailyForecast;
