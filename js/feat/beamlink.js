onMessageAdd(function(mut, name, message, id) {
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
				if(site == "beam") {
					addBadge(mut, "Twitch", "#9b72ca", "//extend.dinu.ga/images/twitch.png");
					if(options.beamlinknamesover || !getRanks(mut).length) {
						addColor(mut, "#9b72ca");
					}
				} else if(site == "twitch") {
					addBadge(mut, "Beam", "#37e4ee", "//extend.dinu.ga/images/beam.png");
					if(options.beamlinknamesover || !getRanks(mut).length) {
						addColor(mut, "#37e4ee");
					}
				}
			}
		}
	}
});
