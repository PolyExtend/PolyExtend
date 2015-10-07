chrome.storage.sync.get("options", function(items) {
	if(!items.options || Object.keys(items.options).length != 11) {
		chrome.storage.sync.set({options: {
			twitchemotes: true,
			linkimages: true,
			realthumbs: false,
			colornames: false,
			colornamesover: false,
			chatalerts: true,
			beamlink: true,
			beamlinkcolor: true,
			showdeleted: false,
			separator: false,
			darkheader: false
		}});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message == "showicon") {
		chrome.pageAction.show(sender.tab.id);
	}
});
