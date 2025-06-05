//@ts-ignore

import axios from 'axios';
import { WeatherResponse } from './wheatherData';

export const getOpenMetroData = async (opt?: { isTomorow: boolean }) => {
	const params = {
		latitude: -7.3748,
		longitude: 110.8781,
		daily: [
			'weather_code',
			'temperature_2m_max',
			'temperature_2m_min',
			'uv_index_max',
			'precipitation_sum',
			'precipitation_probability_max',
			'wind_direction_10m_dominant',
			'wind_speed_10m_max',
		],

		hourly: [
			'rain',
			'precipitation',
			'precipitation_probability',
			'weather_code',
		],
		timezone: 'Asia/Bangkok',
		forecast_days: opt?.isTomorow ? 3 : 2,
		past_days: 0,
	};

	const url = 'https://api.open-meteo.com/v1/forecast';
	const query = new URLSearchParams(params as any).toString();
	return axios<WeatherResponse>(url + '?' + query).then((e) => e.data);
};
