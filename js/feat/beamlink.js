onMessageAdd(function(name, message, id) {
	if(options.beamlink) {
        if(site === "beam") {
            if((name.toLowerCase() == "beamlink" || name.toLowerCase() == "beamlinkdev") && message.slice(0, 1) == "[") {
                replaceMessage(
                    message.slice(1, message.indexOf("]")),
                    message.slice(message.indexOf("]") + 2)
                );

                if(options.beamlinkcolor) {
                    addBadge("http://www.twitch.tv/favicon.ico");
                    addColor("#9b72ca");
                }
            }
        } else if(site === "twitch") {
            console.log(id);
            if((name.toLowerCase() == "beamlink" || name.toLowerCase() == "beamlinkdev")) {
                replaceMessage(
                    message.slice(1, message.indexOf("]")),
                    message.slice(message.indexOf("]") + 2),
                    id
                );
            }
        }
	}
});
