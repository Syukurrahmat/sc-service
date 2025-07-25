"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDailyWeather = generateDailyWeather;
exports.generateRainText = generateRainText;
const utils_1 = require("../utils/utils");
const utils_2 = require("./utils");
function generateDailyWeather(metro, isTomorow = false) {
    const daily = metro.daily;
    const units = metro.daily_units;
    const i = isTomorow ? 1 : 0;
    const intro = isTomorow ? 'CUACA BESOK HARI' : 'CUACA HARI INI';
    const texts = [
        `Tanggal : ${(0, utils_1.WIB)(metro.daily.time[i]).format('DD MMM yyyy')}`,
        `Cuaca : ${(0, utils_2.getWeatherDescription)(daily.weather_code[i])}`,
        `Suhu maksimum : ${daily.temperature_2m_max[i]} ${units.temperature_2m_max}`,
        `Suhu minimum : ${daily.temperature_2m_min[i]} ${units.temperature_2m_min}`,
        `Jumlah presipitasi : ${daily.precipitation_sum[i]} ${units.precipitation_sum}`,
        `Probabilitas presipitasi maksimum : ${daily.precipitation_probability_max[i]}${units.precipitation_probability_max}`,
        `Indeks UV maksimum : ${daily.uv_index_max[i]}`,
        `Arah angin dominan : ${(0, utils_2.getWindDirection)(daily.wind_direction_10m_dominant[i])}`,
        `Kecepatan angin maksimum : ${daily.wind_speed_10m_max[i]} ${units.wind_speed_10m_max}`,
    ];
    return intro + '\n' + texts.map((e) => '- ' + e).join('\n');
}
function generateRainText(hourly, isTomorow = false) {
    const rainPeriod = getRainPeriodsByWeatherCode(hourly, isTomorow);
    const intro = isTomorow
        ? 'PRAKIRAAN CUACA BESOK HARI'
        : 'PRAKIRAAN CUACA HARI INI';
    if (rainPeriod.length === 0)
        return intro + '\n' + '- tidak ada';
    const texts = [];
    rainPeriod.forEach((event, idx) => {
        let waktu;
        if (event.end === null) {
            waktu = `Mulai ${event.start}`;
        }
        else if (event.start === event.end) {
            waktu = `Pada pukul ${event.start}`;
        }
        else {
            waktu = `Pukul ${event.start} hingga ${event.end}`;
        }
        texts.push(waktu + ' : ' + event.weather);
    });
    const schedules = texts.length
        ? texts.map((e) => '- ' + e).join('\n')
        : '- tidak ada hujan';
    return intro + '\n' + schedules;
}
function getRainPeriodsByWeatherCode(hourly, isTomorow = false) {
    const result = [];
    let isRaining = false;
    let startIdx = null;
    for (let i = isTomorow ? 24 : 0; i < hourly.time.length; i++) {
        const code = hourly.weather_code[i];
        const isRainCode = code >= 51; // asumsi kode ≥ 51 adalah hujan
        if (isRainCode) {
            if (!isRaining) {
                isRaining = true;
                startIdx = i;
            }
        }
        else {
            if (isRaining && startIdx !== null) {
                const rainCode = hourly.weather_code[startIdx];
                const startTime = (0, utils_1.WIB)(hourly.time[startIdx]);
                const endTime = (0, utils_1.WIB)(hourly.time[i - 1]);
                result.push({
                    date: startTime.format('DD-MM-YY'),
                    start: startTime.format('HH:mm'),
                    end: endTime.format('HH:mm'),
                    code: rainCode,
                    weather: (0, utils_2.getWeatherDescription)(rainCode),
                });
                isRaining = false;
                startIdx = null;
            }
        }
    }
    // Penutup jika hujan berlanjut sampai akhir data
    if (isRaining && startIdx !== null) {
        const rainCode = hourly.weather_code[startIdx];
        const startTime = (0, utils_1.WIB)(hourly.time[startIdx]);
        result.push({
            date: startTime.format('DD-MM-YY'),
            start: startTime.format('HH:mm'),
            end: null,
            code: rainCode,
            weather: (0, utils_2.getWeatherDescription)(rainCode),
        });
    }
    // Filter hanya hari yang sama dengan jam pertama
    const currentDay = (0, utils_1.WIB)(hourly.time[isTomorow ? 1 : 0]).format('DD-MM-YY');
    return result.filter((e) => e.start == currentDay);
}
