onMessageAdd(function(name, message, id) {
	if(options.beamlink) {
		if((name.toLowerCase() == "beamlink" || // If it's a linked message...
		name.toLowerCase() == "beamlinkdev") &&
		message.slice(0, 1) == "[") {
			replaceMessage( // Set the username and message.
				message.slice(1, message.indexOf("]")),
				message.slice(message.indexOf("]") + 2)
			);
			
			if(options.beamlinkcolor) { // Decorate username.
				addBadge("http://www.twitch.tv/favicon.ico");
				addColor("#9b72ca");
			}
		}
	}
});
