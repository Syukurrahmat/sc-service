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
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
function increaseVolume(input, volumeMultiplier = 2) {
    return (0, fluent_ffmpeg_1.default)(input).audioFilter(`volume=${volumeMultiplier}`).format('mp3'); // bisa diganti 'wav' atau lainnya
}
function increaseVolumeAllInFolder(inputFolder_1, outputFolder_1) {
    return __awaiter(this, arguments, void 0, function* (inputFolder, outputFolder, volumeMultiplier = 2) {
        if (!fs_1.default.existsSync(outputFolder)) {
            fs_1.default.mkdirSync(outputFolder, { recursive: true });
        }
        const files = fs_1.default.readdirSync(inputFolder);
        for (const file of files) {
            if (path_1.default.extname(file).toLowerCase() === '.mp3') {
                const inputPath = path_1.default.join(inputFolder, file);
                const outputPath = path_1.default.join(outputFolder, file);
                console.log(`Processing ${inputPath}...`);
                yield new Promise((resolve, reject) => {
                    increaseVolume(inputPath, volumeMultiplier)
                        .on('error', (err) => {
                        console.error(`Error processing ${file}:`, err);
                        reject(err);
                    })
                        .on('end', () => {
                        console.log(`Finished processing ${file}`);
                        resolve();
                    })
                        .save(outputPath);
                });
            }
        }
        console.log('All files processed.');
    });
}
// Contoh panggil fungsi
increaseVolumeAllInFolder('./xixixi', './xixixi_louder', 0.8)
    .then(() => console.log('Selesai menaikkan volume semua mp3.'))
    .catch((err) => console.error('Error:', err));
