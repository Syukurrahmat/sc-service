"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WIB = exports.weatherAudioMixer = void 0;
// server.js
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
const weatherAudioMixer = (buffer) => {
    const stream = new stream_1.Readable();
    stream.push(buffer);
    stream.push(null);
    const newsIntro = path_1.default.join(__dirname, '..', 'assets', 'mp3', 'news-intro.m4a');
    console.log(newsIntro);
    return (0, fluent_ffmpeg_1.default)()
        .input(newsIntro)
        .input(newsIntro)
        .input(newsIntro)
        .input(stream)
        .complexFilter([
        '[0:a]atrim=start=0:end=9.5,asetpts=PTS-STARTPTS,volume=8[a1]',
        '[1:a]atrim=start=9.5:end=55,asetpts=PTS-STARTPTS,volume=3[a2]',
        '[2:a]atrim=start=55,asetpts=PTS-STARTPTS,volume=5[a3]',
        '[a1][a2][a3]concat=n=3:v=0:a=1[vol1]',
        '[3:a]volume=14,adelay=9000|9000[delayed2]',
        '[vol1][delayed2]amix=inputs=2:duration=longest[a]',
    ])
        .outputOptions('-map', '[a]')
        .format('mp3');
};
exports.weatherAudioMixer = weatherAudioMixer;
const WIB = (inp) => (0, moment_1.default)(inp).utcOffset(7 * 60);
exports.WIB = WIB;
