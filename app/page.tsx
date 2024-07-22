'use client'

import React, { useState, useEffect } from 'react';
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import { fetchWeatherData } from "../utils/api";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData().then((data) => {
      setWeatherData(data);
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
