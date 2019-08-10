class GifOverlay {

	constructor(tool, i18n) {
		this._tool = tool

		this.overlays.appendSetting('', i18n.__('GIF overlay URL'), 'text', {attrid: 'gif_overlay_url', set: 'gif', setLabel: i18n.__('GIF Overlay'), readonly: true, default: 'http://localhost:' + this.overlays.overlayport + '/gif.html'})
		this.overlays.appendSetting('', i18n.__('GIF command'), 'text', {set: 'gif', readonly: true, default: 'gif=/C:/path/to/hello.gif&duration=3000', description: i18n.__('Define the absolute path to your gif file. Use duration in milliseconds to control how long the gif should be displayed for. Defaults to 3 seconds (3000 milliseconds)')})
		this.overlays.appendSetting('', i18n.__('Video command'), 'text', {set: 'gif', readonly: true, default: 'video=C:\\path\\to\\hello.mp4&volume=0.5', description: i18n.__('Define the absolute path to your video file. Use volume between 0 and 1 to set the volume of the audio.')})
		this.overlays.appendSetting('', i18n.__('Audio command'), 'text', {set: 'gif', readonly: true, default: 'audio=C:/path/to/hello.mp3&volume=0.5', description: i18n.__('Define the absolute path to your audio file. Use volume between 0 and 1 to set the volume of the audio.')})
		this.overlays.appendSetting('', i18n.__('GIF+Audio command'), 'text', {set: 'gif', readonly: true, default: 'gif=C:\\path\\to\\hello.gif&duration=1500&audio=C:\\path\\to\\hello.mp3&volume=0.5', description: i18n.__('You can use the gif and audio together, although the audio is always playing to the end, no matter if the duration for the gif is shorter.')})

		tool.overlays.allowedFiles.push('.webm')
		tool.overlays.allowedFiles.push('.mp4')

		tool.overlays.fileMimeType['.webm'] = 'video/webm'
		tool.overlays.fileMimeType['.mp4'] = 'video/mp4'
	}

	get overlays() {
		return this._tool.overlays
	}
}
module.exports = GifOverlay