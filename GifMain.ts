import TTVSTMain from '../../dist/dev.pakl.ttvst/main/TTVSTMain';

declare var TTVST: TTVSTMain;
const { BroadcastMain } = TTVST;

class GifMain {

	constructor() {
		this.onPlayGIF = this.onPlayGIF.bind(this);
		this.onPlayGIFAudio = this.onPlayGIFAudio.bind(this);
		this.onPlayAudio = this.onPlayAudio.bind(this);
		this.onPlayVideo = this.onPlayVideo.bind(this);

		BroadcastMain.instance.on('app.ttvst.gifoverlay.playGIF', this.onPlayGIF);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playGIFAudio', this.onPlayGIFAudio);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playAudio', this.onPlayAudio);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playVideo', this.onPlayVideo);
	}

	private onPlayGIF(gifpath: string, duration: number) {
		if(typeof(gifpath) !== 'string' || gifpath.length <= 0) return;
		if(typeof(duration) !== 'number') duration = 3000;
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playinggif', gifpath, duration);
	}

	private onPlayGIFAudio(gifpath: string, audiopath: string, volume: number) {
		if(typeof(gifpath) !== 'string' || gifpath.length <= 0) return;
		if(typeof(audiopath) !== 'string' || audiopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playinggifaudio', gifpath, audiopath, volume);
	}

	private onPlayAudio(audiopath: string, volume: number) {
		if(typeof(audiopath) !== 'string' || audiopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playingaudio', audiopath, volume);
	}

	private onPlayVideo(videopath: string, volume: number) {
		if(typeof(videopath) !== 'string' || videopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playingvideo', videopath, volume);
	}


}

export = GifMain;