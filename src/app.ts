// server.js
require('dotenv').config()
import express from 'express';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { getTodayAnnouncement, getTomorowAnnouncement } from './gpt';
import { weatherAudioMixer } from './utils/utils';
ffmpeg.setFfmpegPath(ffmpegPath as string); 

const app = express();
const port = process.env.PORT || 3000
 
// Endpoint streaming audio mp3
app.get('/forecast/today', async (req, res) => {
	const ttsBuffer = await getTodayAnnouncement();

	res.setHeader('Content-Type', 'audio/mpeg');

	weatherAudioMixer(ttsBuffer)
		.on('error', (err) => {
			console.error('FFmpeg error:', err.message);
			if (!res.headersSent) res.status(500).send('Error processing audio');
		})
		.on('end', () => console.log('Mixing selesai'))
		.pipe(res, { end: true });
});

app.get('/forecast/tomorrow', async (req, res) => {
	const ttsBuffer = await getTomorowAnnouncement();
	res.setHeader('Content-Type', 'audio/mpeg');

	weatherAudioMixer(ttsBuffer)
		.on('error', (err) => {
			console.error('FFmpeg error:', err.message);
			if (!res.headersSent) res.status(500).send('Error processing audio');
		})
		.on('end', () => console.log('Mixing selesai'))
		.pipe(res, { end: true });
});

app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
