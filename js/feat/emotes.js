function addEmotes(message, emotes) {
	for(var i = 0; i < emotes.length; i++) { // Replace for each emote in array.
		message = message.replace(new RegExp(":" + emotes[i][0] + "\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote' title=':" + emotes[i][0] + "'>");
		message = message.replace(new RegExp(":" + emotes[i][0] + "Spin\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin' title=':" + emotes[i][0] + "Spin'>");
		message = message.replace(new RegExp(":" + emotes[i][0] + "Wheel\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin-fast' title=':" + emotes[i][0] + "Wheel'>");
	}
	
	return message;
}

$.get("//extend.dinu.ga/emotes.json", function(emotes) {
	onMessageAdd(0, function(mut, name, message, id) { // Global emotes...
		if(options.polyemotes) {
			var toemotes = [];
			
			for(var i = 0; i < emotes.global.length; i++) {
				toemotes.push([emotes.global[i], "//extend.dinu.ga/emotes/global/" + emotes.global[i] + ".png"]);
			}
			
			var tomessage = addEmotes(message, toemotes);
			replaceMessage(mut, name, tomessage);
		}
	});
	
	onMessageAdd(1, function(mut, name, message, id) { // User emotes...
		if(options.polyemotes) {
			var toemotes = [];
			
			for(var i = 0; i < Object.keys(emotes.user).length; i++) {
				if(name.toLowerCase() == Object.keys(emotes.user)[i] ||
				getStreamerName().toLowerCase() == Object.keys(emotes.user)[i]) {
					for(var j = 0; j < emotes.user[Object.keys(emotes.user)[i]].length; j++) {
						toemotes.push([emotes.user[Object.keys(emotes.user)[i]][j], "//extend.dinu.ga/emotes/user/" + Object.keys(emotes.user)[i] + "/" + emotes.user[Object.keys(emotes.user)[i]][j] + ".png"]);
					}
				}
			}
			
			var tomessage = addEmotes(message, toemotes);
			replaceMessage(mut, name, tomessage);
		}
	});
});

$.get("//twitchemotes.com/api_cache/v2/global.json", function(emotes) {
	onMessageAdd(2, function(mut, name, message, id) { // Twitch emotes...
		if(options.twitchemotes && options.polyemotes) {
			var toemotes = [];
			
			for(var i = 0; i < Object.keys(emotes.emotes).length; i++) {
				toemotes.push([Object.keys(emotes.emotes)[i], "//static-cdn.jtvnw.net/emoticons/v1/" + emotes.emotes[Object.keys(emotes.emotes)[i]].image_id + "/1.0"]);
			}
			
			var tomessage = addEmotes(message, toemotes);
			replaceMessage(mut, name, tomessage);
		}
	});
});
