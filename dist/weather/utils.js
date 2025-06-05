"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherDescriptions = void 0;
exports.getWeatherDescription = getWeatherDescription;
exports.getWindDirection = getWindDirection;
exports.weatherDescriptions = {
    0: 'Langit cerah',
    1: 'Sebagian besar cerah',
    2: 'Sebagian berawan',
    3: 'Berawan tebal',
    45: 'Kabut',
    48: 'Kabut es menempel',
    51: 'Gerimis ringan',
    53: 'Gerimis sedang',
    55: 'Gerimis deras',
    56: 'Gerimis beku ringan',
    57: 'Gerimis beku deras',
    61: 'Hujan ringan',
    63: 'Hujan sedang',
    65: 'Hujan lebat',
    66: 'Hujan beku ringan',
    67: 'Hujan beku lebat',
    71: 'Salju ringan',
    73: 'Salju sedang',
    75: 'Salju lebat',
    77: 'Butiran salju',
    80: 'Hujan lokal ringan',
    81: 'Hujan lokal sedang',
    82: 'Hujan lokal sangat deras',
    85: 'Salju lokal ringan',
    86: 'Salju lokal lebat',
    95: 'Badai petir ringan sampai sedang',
    96: 'Badai petir dengan hujan es ringan',
    99: 'Badai petir dengan hujan es lebat',
};
function getWeatherDescription(code) {
    return exports.weatherDescriptions[code] || 'cuaca tidak diketahui';
}
function getWindDirection(degree) {
    const directions = [
        'utara',
        'timur laut',
        'timur',
        'tenggara',
        'selatan',
        'barat daya',
        'barat',
        'barat laut',
    ];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
}
