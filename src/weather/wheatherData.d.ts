export interface WeatherResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  weather_code: string
  rain: string
  showers: string
  snowfall: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  rain: number
  showers: number
  snowfall: number
}

export interface HourlyUnits {
  time: string
  rain: string
  precipitation: string
  precipitation_probability: string
  weather_code: string
}

export interface Hourly {
  time: string[]
  rain: number[]
  precipitation: number[]
  precipitation_probability: number[]
  weather_code: number[]
}

export interface DailyUnits {
  time: string
  weather_code: string
  temperature_2m_max: string
  temperature_2m_min: string
  uv_index_max: string
  precipitation_sum: string
  precipitation_probability_max: string
  wind_direction_10m_dominant: string
  wind_speed_10m_max: string
}

export interface Daily {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  uv_index_max: number[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
  wind_direction_10m_dominant: number[]
  wind_speed_10m_max: number[]
}

