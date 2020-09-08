const { Broadcast, Settings } = TTVST;

function overlayReady(overlayPage) {
	overlayPage.addSettingsSet({
		label: "GIF Overlay",
		key: "gifoverlay",
		settings: [
			{ setting: '', default: 'http://localhost:' + Settings.getString('overlayhost.global.port', '8090') + '/gif.html', type: 'text', label: 'Overlay-URL', description: 'Example URL to GIF overlay. If you changed the host port you\'ll need to make changes accordingly.', readonly: true },
			{ type: 'description', description: 'To make GIFs and videos appear on the overlay use webhooks, hotkeys or any other addon that can call TTVST actions.', label: '', setting: '', default: '' }
		]
	});
}

let overlayPage = TTVST.ui.getPage('Overlays')
if(overlayPage !== null) {
	overlayReady(overlayPage);
} else {
	Broadcast.instance.once('app.ttvst.overlay.ready', () => {
		let overlayPage = TTVST.ui.getPage('Overlays')
		overlayReady(overlayPage);
	})
}