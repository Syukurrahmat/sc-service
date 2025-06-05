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
exports.getTodayAnnouncement = getTodayAnnouncement;
exports.getTomorowAnnouncement = getTomorowAnnouncement;
exports.annoucementGPTAnnouncement = annoucementGPTAnnouncement;
const openai_1 = __importDefault(require("openai"));
const metro_1 = require("./weather/metro");
const textGenerator_1 = require("./weather/textGenerator");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
function getTodayAnnouncement() {
    return __awaiter(this, void 0, void 0, function* () {
        const metro = yield (0, metro_1.getOpenMetroData)();
        metro;
        const text = [
            (0, textGenerator_1.generateDailyWeather)(metro),
            (0, textGenerator_1.generateRainText)(metro.hourly),
        ].join('\n\n');
        return annoucementGPTAnnouncement(text);
    });
}
function getTomorowAnnouncement() {
    return __awaiter(this, void 0, void 0, function* () {
        const metro = yield (0, metro_1.getOpenMetroData)({ isTomorow: true });
        metro;
        const text = [
            (0, textGenerator_1.generateDailyWeather)(metro, true),
            (0, textGenerator_1.generateRainText)(metro.hourly, true),
        ].join('\n\n');
        return annoucementGPTAnnouncement(text, true);
    });
}
function annoucementGPTAnnouncement(text_1) {
    return __awaiter(this, arguments, void 0, function* (text, isTomorow = false) {
        console.log('========= START REQUEST =========');
        const completion = yield openai.chat.completions.create({
            messages: [
                {
                    role: 'developer',
                    content: `Kamu adalah pembaca breaking news cuaca untuk ${isTomorow ? 'besok hari' : 'hari ini'} dengan input yang saya berikan. Buat dengan kalimat yang mudah dipahami dengan tetap menggunakan bahasa formal` +
                        '\n' +
                        `Awali dengan menyebutkan prakiraan cuaca ${isTomorow ? 'besok hari' : 'hari ini'} tanggal sekian.` +
                        '\n' +
                        'Akhiri dengan kalimat semangat dan waspada.',
                },
                {
                    role: 'user',
                    content: 'ubah data berikut menjadi paragraf' + '\n\n' + text,
                },
            ],
            model: 'gpt-4.1-mini',
        });
        const mp3 = yield openai.audio.speech.create({
            model: 'gpt-4o-mini-tts',
            voice: 'shimmer',
            input: completion.choices[0].message.content,
            instructions: 'berbicara seperti seorang pembawa berita breaking news prakiraan cuaca di televisi, dengan kecepatan bicara agak cepat tapi tidak terburu-buru, dam todak boleh lebih dari 1 menit',
        });
        console.log('========= END REQUEST =========');
        return Buffer.from(yield mp3.arrayBuffer());
    });
}
