import React from 'react';
import { getWindDirection, getWindDirectionArrow } from '../utils/utils';

function CurrentWeather({ data }) {
  const sunrise = new Date(data.sunrise).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(data.sunset).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="current-weather">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{`${data.city}, ${data.country}`}</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 flex items-center">
        <img 
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} 
          alt={data.description} 
          className="weather-icon" 
          aria-label={`Weather icon: ${data.description}`}
        />
        {data.temp.toFixed(1)}°C
      </h2>
      <p className="text-base text-gray-700 mb-2">Feels like {data.feels_like.toFixed(1)}°C. {data.description}</p>
      <p className="text-base text-gray-700 mb-2">
        Humidity: {data.humidity}% | Wind: {data.wind_speed.toFixed(1)} m/s {getWindDirection(data.wind_direction)} {getWindDirectionArrow(data.wind_direction)}
      </p>
      <p className="text-base text-gray-700 mb-2">Pressure: {data.pressure}hPa</p>
      <p className="text-base text-gray-700 mb-2">Sunrise: {sunrise} | Sunset: {sunset}</p>
    </div>
  );
}

export default CurrentWeather;
