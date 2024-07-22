'use client'

import React, { useState, useEffect } from 'react';
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('/api/weather')
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <main className="container">
      <CurrentWeather data={weatherData.current} />
      <HourlyForecast data={weatherData.hourly} />
      <DailyForecast data={weatherData.daily} />
    </main>
  );
}
