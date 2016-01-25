onMessageAdd(function(mut, name, message, id) {
	if(options.chatalerts) {
		if((site == "beam" && mut.hasClass("tagged")) ||
		(site == "twitch" && mut.find(".mentioned").length)) {
			mut.css("background", "rgba(213, 24, 18, 0.2)");
		}
	}
});
