onMessageAdd(4, function(mut, name, message, id) {
	if(options.beamlink) {
		if((name.toLowerCase() == "beamlink" || // If it's a linked message...
		name.toLowerCase() == "beamlinkdev") &&
		message.slice(0, 1) == "[") {
			replaceMessage( // Set the username and message.
				mut,
				message.slice(1, message.indexOf("]")),
				message.slice(message.indexOf("]") + 2)
			);
			
			if(options.beamlinkcolor) { // Decorate username.
				addBadge(mut, "//extend.dinu.ga/images/twitch.png");
				addColor(mut, "#9b72ca");
			}
		}
	}
});
