chrome.storage.sync.get("options", function(items) {
	var tooptions = {
		polyemotes: true,
		twitchemotes: true,
		linkimages: true,
		realthumbs: false,
		devatars: true,
		colornames: false,
		colornamesover: false,
		chatalerts: true,
		teams: true,
		teamsnamesover: false,
		beamlink: true,
		beamlinkcolor: true,
		beamlinknamesover: false,
		// showdeleted: false,
		separator: false,
		// darkheader: false
	}
	
	if(!items.options || Object.keys(items.options).length != Object.keys(tooptions).length) { // Reset options when upgrade/new install.
		for(var i = 0; i < Object.keys(tooptions).length; i++) {
			var cur = Object.keys(tooptions)[i];
			
			if(Object.keys(items.options).indexOf(cur) > -1) {
				tooptions[cur] = items.options[cur];
			}
		}
		
		chrome.storage.sync.set({options: tooptions});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { // Settings icon.
	if(message == "showicon") {
		chrome.pageAction.show(sender.tab.id);
	}
});
