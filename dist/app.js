"use strict";
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
// server.js
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const gpt_1 = require("./gpt");
const utils_1 = require("./utils/utils");
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Endpoint streaming audio mp3
app.get('/forecast/today', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ttsBuffer = yield (0, gpt_1.getTodayAnnouncement)();
    res.setHeader('Content-Type', 'audio/mpeg');
    (0, utils_1.weatherAudioMixer)(ttsBuffer)
        .on('error', (err) => {
        console.error('FFmpeg error:', err.message);
        if (!res.headersSent)
            res.status(500).send('Error processing audio');
    })
        .on('end', () => console.log('Mixing selesai'))
        .pipe(res, { end: true });
}));
app.get('/forecast/tomorrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ttsBuffer = yield (0, gpt_1.getTomorowAnnouncement)();
    res.setHeader('Content-Type', 'audio/mpeg');
    (0, utils_1.weatherAudioMixer)(ttsBuffer)
        .on('error', (err) => {
        console.error('FFmpeg error:', err.message);
        if (!res.headersSent)
            res.status(500).send('Error processing audio');
    })
        .on('end', () => console.log('Mixing selesai'))
        .pipe(res, { end: true });
}));
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
