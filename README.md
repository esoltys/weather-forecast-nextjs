# Weather Forecast App

This is a simple weather forecast application that displays current weather conditions, a 24-hour forecast, and a 5-day forecast for a specified location. It uses the [OpenWeatherMap API](https://openweathermap.org/appid) to fetch weather data and displays it in a barebones Nextjs wrapper.

![](screenshot.png)

## Features

- Current weather conditions including temperature, feels-like temperature, humidity, wind speed and direction, pressure, and sunrise/sunset
- 24-hour forecast chart showing temperature and precipitation probability
- 5-day forecast table with high/low temperatures and weather conditions

## Prerequisites

- Node.js (v14 or later recommended)
- Bun runtime
- OpenWeatherMap API key (free tier)

## Setup

1. Clone this repository:

   ```
   git clone https://github.com/yourusername/weather-forecast-nextjs.git
   cd weather-forecast-nextjs
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Create a `.env.local` file in the project root and add your OpenWeatherMap API key and location:

   ```
   NEXT_PUBLIC_API_KEY=YOUR_API_KEY_HERE
   NEXT_PUBLIC_CITY="Castlegar"
   NEXT_PUBLIC_COUNTRY_CODE="CA"
   ```

## Running the Application

To start the server, run:

```
bun start
```

Then open your browser and navigate to `http://localhost:3000` to view the weather forecast.

## Development

To run the server in development mode with automatic restarts on file changes, use:

```
bun dev
```

## Architecture

```mermaid
graph TB
    User((User))

    subgraph "Weather Forecast Application"
        FrontendApp["Frontend Application<br/>(Next.js)"]

        subgraph "Backend Services"
            APIRoute["API Route<br/>(Next.js API)"]
        end

        subgraph "Shared Components"
            CurrentWeather["CurrentWeather<br/>(React Component)"]
            HourlyForecast["HourlyForecast<br/>(React Component)"]
            DailyForecast["DailyForecast<br/>(React Component)"]
            UtilityFunctions["Utility Functions"]
            WeatherTypes["Weather Types"]
        end
    end

    subgraph "External Services"
        OpenWeatherAPI["OpenWeatherMap API<br/>(External Weather Data)"]
    end

    User --> FrontendApp
    FrontendApp --> APIRoute
    APIRoute --> OpenWeatherAPI

    FrontendApp --> CurrentWeather
    FrontendApp --> HourlyForecast
    FrontendApp --> DailyForecast
    FrontendApp --> UtilityFunctions
    FrontendApp --> WeatherTypes

    APIRoute --> UtilityFunctions
    APIRoute --> WeatherTypes

    classDef frontend fill:#1168bd,stroke:#0b4884,color:#ffffff
    classDef backend fill:#2694ab,stroke:#1a6d7d,color:#ffffff
    classDef external fill:#999999,stroke:#666666,color:#ffffff
    classDef shared fill:#6b8e23,stroke:#556b2f,color:#ffffff

    class FrontendApp frontend
    class APIRoute backend
    class OpenWeatherAPI external
    class CurrentWeather,HourlyForecast,DailyForecast,UtilityFunctions,WeatherTypes shared
```

## License

This project is open source and available under the [MIT License](LICENSE).
