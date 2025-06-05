import OpenAI from 'openai';
import { getOpenMetroData } from './weather/metro';
import {
	generateDailyWeather,
	generateRainText,
} from './weather/textGenerator';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getTodayAnnouncement() {
	const metro = await getOpenMetroData();
	metro;
	const text = [
		generateDailyWeather(metro),
		generateRainText(metro.hourly),
	].join('\n\n');

	return annoucementGPTAnnouncement(text);
}

export async function getTomorowAnnouncement() {
	const metro = await getOpenMetroData({ isTomorow: true });
	metro;
	const text = [
		generateDailyWeather(metro, true),
		generateRainText(metro.hourly, true),
	].join('\n\n');

	return annoucementGPTAnnouncement(text, true);
}

export async function annoucementGPTAnnouncement(
	text: string,
	isTomorow = false
) {
	console.log('========= START REQUEST =========');

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'developer',
				content:
					`Kamu adalah pembaca breaking news cuaca untuk ${
						isTomorow ? 'besok hari' : 'hari ini'
					} dengan input yang saya berikan. Buat dengan kalimat yang mudah dipahami dengan tetap menggunakan bahasa formal` +
					'\n' +
					`Awali dengan menyebutkan prakiraan cuaca ${
						isTomorow ? 'besok hari' : 'hari ini'
					} tanggal sekian.` +
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
	const mp3 = await openai.audio.speech.create({
		model: 'gpt-4o-mini-tts',
		voice: 'shimmer',
		input: completion.choices[0].message.content!,
		instructions:
			'berbicara seperti seorang pembawa berita breaking news prakiraan cuaca di televisi, dengan kecepatan bicara agak cepat tapi tidak terburu-buru, dam todak boleh lebih dari 1 menit',
	});
	console.log('========= END REQUEST =========');

	return Buffer.from(await mp3.arrayBuffer());
}
