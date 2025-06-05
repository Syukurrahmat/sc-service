// server.js
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
ffmpeg.setFfmpegPath(ffmpegPath as string);

function increaseVolume(input: string | Readable, volumeMultiplier = 2) {
	return ffmpeg(input).audioFilter(`volume=${volumeMultiplier}`).format('mp3'); // bisa diganti 'wav' atau lainnya
}

async function increaseVolumeAllInFolder(
	inputFolder: string,
	outputFolder: string,
	volumeMultiplier = 2
) {
	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder, { recursive: true });
	}

	const files = fs.readdirSync(inputFolder);

	for (const file of files) {
		if (path.extname(file).toLowerCase() === '.mp3') {
			const inputPath = path.join(inputFolder, file);
			const outputPath = path.join(outputFolder, file);

			console.log(`Processing ${inputPath}...`);

			await new Promise<void>((resolve, reject) => {
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
}

// Contoh panggil fungsi
increaseVolumeAllInFolder('./xixixi', './xixixi_louder', 0.8)
	.then(() => console.log('Selesai menaikkan volume semua mp3.'))
	.catch((err) => console.error('Error:', err));
