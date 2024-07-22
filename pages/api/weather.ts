import type { NextApiRequest, NextApiResponse } from "next";

const NEXT_PUBLIC_CITY = process.env.NEXT_PUBLIC_CITY;
const NEXT_PUBLIC_COUNTRY_CODE = process.env.NEXT_PUBLIC_COUNTRY_CODE;
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchWeatherData() {
  const currentWeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${NEXT_PUBLIC_CITY},${NEXT_PUBLIC_COUNTRY_CODE}&appid=${NEXT_PUBLIC_API_KEY}&units=metric`
  );
  const currentWeather = await currentWeatherResponse.json();

  if (currentWeather.cod !== 200) {
    throw new Error(`Current Weather API Error: ${currentWeather.message}`);
  }

  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${NEXT_PUBLIC_CITY},${NEXT_PUBLIC_COUNTRY_CODE}&appid=${NEXT_PUBLIC_API_KEY}&units=metric`
  );
  const forecastData = await forecastResponse.json();

  if (forecastData.cod !== "200") {
    throw new Error(`Forecast API Error: ${forecastData.message}`);
  }

  const cachedWeatherData = {
    current: {
      city: NEXT_PUBLIC_CITY,
      country: NEXT_PUBLIC_COUNTRY_CODE,
      temp: currentWeather.main.temp,
      feels_like: currentWeather.main.feels_like,
      humidity: currentWeather.main.humidity,
      wind_speed: currentWeather.wind.speed,
      wind_direction: currentWeather.wind.deg,
      pressure: currentWeather.main.pressure,
      description: currentWeather.weather[0]?.description || "N/A",
      icon: currentWeather.weather[0]?.icon || "01d",
      sunrise: currentWeather.sys.sunrise * 1000,
      sunset: currentWeather.sys.sunset * 1000,
    },
    hourly: forecastData.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toISOString(),
      temp: item.main.temp,
      pop: item.pop,
      icon: item.weather[0]?.icon || "01d",
    })),
    daily: processDailyForecast(forecastData.list),
  };

  return cachedWeatherData;
}

function processDailyForecast(forecastList: any[]): any[] {
  const dailyData: { [key: string]: any } = {};

  forecastList.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        date: new Date(item.dt * 1000).toISOString(),
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        icon: item.weather[0]?.icon || "01d",
        description: item.weather[0]?.description || "N/A",
      };
    } else {
      dailyData[date].temp_min = Math.min(
        dailyData[date].temp_min,
        item.main.temp_min
      );
      dailyData[date].temp_max = Math.max(
        dailyData[date].temp_max,
        item.main.temp_max
      );
    }
  });

  return Object.values(dailyData);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const weatherData = await fetchWeatherData();
    res.status(200).json(weatherData);
  } catch (error: unknown) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
