onMessageAdd(function(mut, name, message, id) {
	if(options.devatars) {
		if(site == "beam") {
			mut.find(".message-image").remove();
			mut.css("padding", "6.67px 7.5px");
			var thecolor = mut.find(".message-author").css("color");
			
			if(getRanks(mut).length) {
				mut.css("borderLeftColor", thecolor);
			}
		} else if(site == "twitch") {
			
		}
	}
});
