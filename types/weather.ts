export interface CurrentWeatherType {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: WindDirectionType;
  pressure: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export interface HourlyForecastType {
  time: string;
  temp: number;
  pop: number;
  icon: string;
}

export interface DailyForecastType {
  date: string;
  temp_min: number;
  temp_max: number;
  icon: string;
  description: string;
}

export interface WeatherDataType {
  current: CurrentWeatherType;
  hourly: HourlyForecastType[];
  daily: DailyForecastType[];
}

export interface WindDirectionType {
  degrees: number;
}
