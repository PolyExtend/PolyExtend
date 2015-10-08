chrome.runtime.sendMessage("showicon");

var options;
chrome.storage.sync.get("options", function(items) {
	options = items.options;
});
chrome.storage.onChanged.addListener(function() {
	chrome.storage.sync.get("options", function(items) {
		options = items.options;
	});
});
