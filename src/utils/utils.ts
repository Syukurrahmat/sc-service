// server.js
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import moment from 'moment';
import path from 'path';
import { Readable } from 'stream';
ffmpeg.setFfmpegPath(ffmpegPath as string);


export const weatherAudioMixer = (buffer: Buffer) => {
	const stream = new Readable();
	stream.push(buffer);
	stream.push(null);
	
	const newsIntro = path.join(__dirname, '..', 'assets','mp3', 'news-intro.m4a')
	console.log(newsIntro)

	return ffmpeg()
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

export const WIB = (inp?: moment.MomentInput) => moment(inp).utcOffset(7 * 60);
