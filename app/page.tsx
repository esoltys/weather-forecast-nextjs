"use client";

import React, { useState, useEffect } from "react";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import {
  WeatherDataType,
  CurrentWeatherType,
  HourlyForecastType,
  DailyForecastType,
} from "@/types/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((response) => response.json())
      .then((data: WeatherDataType) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <main className="max-w-5xl mx-auto bg-white p-5 m-5 rounded-lg shadow-md">
      <CurrentWeather data={weatherData.current as CurrentWeatherType} />
      <HourlyForecast data={weatherData.hourly as HourlyForecastType[]} />
      <DailyForecast data={weatherData.daily as DailyForecastType[]} />
    </main>
  );
}
