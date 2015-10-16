function addEmotes(message, emotes) {
	for(var i = 0; i < emotes.length; i++) { // Replace for each emote in array.
		message = message.replace(new RegExp(":" + emotes[i][0] + "\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote'>");
		message = message.replace(new RegExp(":" + emotes[i][0] + "Spin\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin'>");
		message = message.replace(new RegExp(":" + emotes[i][0] + "Wheel\\b", "g"), "<img src='" + emotes[i][1] + "' class='polyemote polyemote-spin-fast'>");
	}
	
	return message;
}

$.get("//extend.dinu.ga/emotes.json", function(emotes) {
	onMessageAdd(function(name, message, id) {
		var toemotes = [];
		
		for(var i = 0; i < emotes.global.length; i++) { // Global emotes.
			toemotes.push([emotes.global[i], "//extend.dinu.ga/emotes/global/" + emotes.global[i] + ".png"]);
		}
		
		var tomessage = addEmotes(message, toemotes);
		replaceMessage(name, tomessage);
	});
});
