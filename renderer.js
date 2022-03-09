const { Broadcast, Settings } = TTVST;

function overlayReady(overlayPage) {
	overlayPage.addSettingsSet({
		label: "GIF Overlay",
		key: "gifoverlay",
		settings: [
			{ setting: '', id: 'overlay_gif_url_copy_bay', default: 'http://localhost:' + Settings.getString('overlayhost.global.port', '8090') + '/gif.html', type: 'text', label: 'Overlay-URL', description: 'Example URL to GIF overlay. If you changed the host port you\'ll need to make changes accordingly.', readonly: true },
			{ type: 'description', description: 'To make GIFs and videos appear on the overlay use webhooks, hotkeys or any other addon that can call TTVST actions.', label: '', setting: '', default: '' },
			{ setting: '', default: '', type: 'text', label: 'Overlay Channel', description: 'You can enter a channel here to create a new URL. You can use different channels to split up your GIF actions into different overlays. You can then play different GIFs in different locations in your scenes. Make sure you enter the channel name in the action. Press Enter to make sure the URL above updates.', oninputchange: (ev) => {
				var copybay = document.querySelector('#overlay_gif_url_copy_bay input');
				var newchannel = ev.target.value;
				if(newchannel.length > 0) {
					copybay.value = 'http://localhost:' + Settings.getString('overlayhost.global.port', '8090') + '/gif.html?channel=' + encodeURIComponent(newchannel);
				} else {
					copybay.value = 'http://localhost:' + Settings.getString('overlayhost.global.port', '8090') + '/gif.html';
				}
			} },
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