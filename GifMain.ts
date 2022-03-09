import TTVSTMain from '../../dist/dev.pakl.ttvst/main/TTVSTMain';

declare var TTVST: TTVSTMain;
const { BroadcastMain } = TTVST;

class GifMain {

	private openOverlays = 0;

	constructor() {
		this.onPlayGIF = this.onPlayGIF.bind(this);
		this.onPlayGIFAudio = this.onPlayGIFAudio.bind(this);
		this.onPlayAudio = this.onPlayAudio.bind(this);
		this.onPlayVideo = this.onPlayVideo.bind(this);

		this.onOverlayLoaded = this.onOverlayLoaded.bind(this);
		this.onOverlayDisconnected = this.onOverlayDisconnected.bind(this);
		this.updateStartpageStatus = this.updateStartpageStatus.bind(this);

		BroadcastMain.instance.on('app.ttvst.gifoverlay.playGIF', this.onPlayGIF);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playGIFAudio', this.onPlayGIFAudio);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playAudio', this.onPlayAudio);
		BroadcastMain.instance.on('app.ttvst.gifoverlay.playVideo', this.onPlayVideo);

		BroadcastMain.instance.on('app.ttvst.overlay.interactiveloaded', this.onOverlayLoaded);
		BroadcastMain.instance.on('app.ttvst.overlay.interactivedisconnected', this.onOverlayDisconnected);

		TTVST.startpage.broadcastStatus({ key: 'app.ttvst.gifoverlay', icon: 'GIF', status: 'error', title: 'GIF Overlay', info: 'Waiting for overlay server...', buttons: [] });

		BroadcastMain.instance.once('app.ttvst.overlay.ready', this.updateStartpageStatus);
	}

	private onPlayGIF(gifpath: string, duration: number, fading: boolean, channel: string) {
		if(typeof(gifpath) !== 'string' || gifpath.length <= 0) return;
		if(typeof(duration) !== 'number') duration = 3000;
		if(typeof(fading) !== 'boolean') fading = false;
		if(typeof(channel) !== 'string') channel = '';
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playinggif', gifpath, duration, fading, channel);
	}

	private onPlayGIFAudio(gifpath: string, audiopath: string, volume: number, fading: boolean, channel: string) {
		if(typeof(gifpath) !== 'string' || gifpath.length <= 0) return;
		if(typeof(audiopath) !== 'string' || audiopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		if(typeof(fading) !== 'boolean') fading = false;
		if(typeof(channel) !== 'string') channel = '';
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playinggifaudio', gifpath, audiopath, volume, fading, channel);
	}

	private onPlayAudio(audiopath: string, volume: number, channel: string) {
		if(typeof(audiopath) !== 'string' || audiopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		if(typeof(channel) !== 'string') channel = '';
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playingaudio', audiopath, volume, channel);
	}

	private onPlayVideo(videopath: string, volume: number, fading: boolean, channel: string) {
		if(typeof(videopath) !== 'string' || videopath.length <= 0) return;
		if(typeof(volume) !== 'number') volume = 50;
		if(typeof(fading) !== 'boolean') fading = false;
		if(typeof(channel) !== 'string') channel = '';
		BroadcastMain.instance.emit('app.ttvst.gifoverlay.playingvideo', videopath, volume, fading, channel);
	}

	private onOverlayLoaded(path: string) {
		if(path !== '/gif.html') return;
		this.openOverlays++;
		this.updateStartpageStatus();
	}

	private onOverlayDisconnected(path: string) {
		if(path !== '/gif.html') return;
		this.openOverlays--;
		this.updateStartpageStatus();
	}

	private updateStartpageStatus() {
		if(this.openOverlays > 0) {
			TTVST.startpage.broadcastStatus({ key: 'app.ttvst.gifoverlay', icon: 'GIF', status: 'good', title: 'GIF Overlay', info: 'GIF overlay loaded', buttons: [] });
		} else {
			TTVST.startpage.broadcastStatus({ key: 'app.ttvst.gifoverlay', icon: 'GIF', status: 'warn', title: 'GIF Overlay', info: 'No GIF overlay loaded', buttons: [] });
		}
	}

}

export = GifMain;