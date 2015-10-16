chrome.storage.sync.get("options", function(items) {
	if(!items.options || Object.keys(items.options).length != 13) { // Reset options when upgrade/new install.
		chrome.storage.sync.set({options: {
			polyemotes: true,
			twitchemotes: true,
			linkimages: true,
			realthumbs: false,
			colornames: false,
			colornamesover: false,
			chatalerts: true,
			teams: true,
			beamlink: true,
			beamlinkcolor: true,
			showdeleted: false,
			separator: false,
			darkheader: false
		}});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { // Settings icon.
	if(message == "showicon") {
		chrome.pageAction.show(sender.tab.id);
	}
});
