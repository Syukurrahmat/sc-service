"use strict";
//@ts-ignore
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenMetroData = void 0;
const axios_1 = __importDefault(require("axios"));
const getOpenMetroData = (opt) => __awaiter(void 0, void 0, void 0, function* () {
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
        forecast_days: (opt === null || opt === void 0 ? void 0 : opt.isTomorow) ? 3 : 2,
        past_days: 0,
    };
    const url = 'https://api.open-meteo.com/v1/forecast';
    const query = new URLSearchParams(params).toString();
    return (0, axios_1.default)(url + '?' + query).then((e) => e.data);
});
exports.getOpenMetroData = getOpenMetroData;
