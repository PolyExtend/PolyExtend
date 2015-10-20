function addEmotes(message, emotes) {
	if(site == "beam") {
		for(var i = 0; i < emotes.length; i++) { // Replace for each emote in array.
			message = message.replace(new RegExp(":" + emotes[i][0] + "\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote' title=':" + emotes[i][0] + "'>");
			message = message.replace(new RegExp(":" + emotes[i][0] + "Spin\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin' title=':" + emotes[i][0] + "Spin'>");
			message = message.replace(new RegExp(":" + emotes[i][0] + "Wheel\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin-fast' title=':" + emotes[i][0] + "Wheel'>");
		}
	} else if(site == "twitch") {
		for(var i = 0; i < emotes.length; i++) { // Replace for each emote in array.
			message = message.replace(new RegExp("\\b" + emotes[i][0] + "\\b", "g"), "<img src='" + emotes[i][1] + "' class='emoticon tooltip polyemote' original-title='" + emotes[i][0] + "'>");
			message = message.replace(new RegExp("\\b" + emotes[i][0] + "Spin\\b", "g"), "<img src='" + emotes[i][1] + "' class='emoticon tooltip polyemote polyemote-spin' original-title='" + emotes[i][0] + "Spin'>");
			message = message.replace(new RegExp("\\b" + emotes[i][0] + "Wheel\\b", "g"), "<img src='" + emotes[i][1] + "' class='emoticon tooltip polyemote polyemote-spin-fast' original-title='" + emotes[i][0] + "Wheel'>");
		}
	}
	
	return message;
}

var applyEmotesEvent = function() {};
onMessageAdd(function(mut, name, message, id) {
	applyEmotesEvent(mut, name, message, id);
});

$.get("//twitchemotes.com/api_cache/v2/global.json", function(twitchemotes) {
	$.get("//extend.dinu.ga/emotes.json", function(emotes) {
		applyEmotesEvent = function(mut, name, message, id) {
			if(options.polyemotes) {
				var toemotes = [];
				
				for(var i = 0; i < emotes.global.length; i++) { // Global emotes...
					toemotes.push([emotes.global[i], "//extend.dinu.ga/emotes/global/" + emotes.global[i] + ".png"]);
				}
				
				for(var i = 0; i < Object.keys(emotes.user).length; i++) { // User emotes...
					if(name.toLowerCase() == Object.keys(emotes.user)[i] ||
					getStreamerName().toLowerCase() == Object.keys(emotes.user)[i]) {
						for(var j = 0; j < emotes.user[Object.keys(emotes.user)[i]].length; j++) {
							toemotes.push([emotes.user[Object.keys(emotes.user)[i]][j], "//extend.dinu.ga/emotes/user/" + Object.keys(emotes.user)[i] + "/" + emotes.user[Object.keys(emotes.user)[i]][j] + ".png"]);
						}
					}
				}
				
				if(options.twitchemotes) {
					for(var i = 0; i < Object.keys(twitchemotes.emotes).length; i++) { // Twitch emotes...
						toemotes.push([Object.keys(twitchemotes.emotes)[i], "//static-cdn.jtvnw.net/emoticons/v1/" + twitchemotes.emotes[Object.keys(twitchemotes.emotes)[i]].image_id + "/1.0"]);
					}
				}
				
				var tomessage = addEmotes(message, toemotes);
				if(tomessage != message) {
					replaceMessage(mut, name, tomessage);
				}
			}
		};
	});
});
