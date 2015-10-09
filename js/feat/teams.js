$.get("//extend.dinu.ga/teams.json", function(teams) {
	onMessageAdd(function(name, message, id) {
		for(var i = 0; i < Object.keys(teams).length; i++) {
			if(teams[Object.keys(teams)[i]].members.indexOf(name.toLowerCase()) > -1 &&
			!$(".message:last-child").hasClass("polyteam-" + Object.keys(teams)[i].replace(/\s+/g, "-"))) {
				$(".message:last-child").addClass("polyteam-" + Object.keys(teams)[i].replace(/\s+/g, "-"));
				addBadge("//extend.dinu.ga/badges/" + Object.keys(teams)[i] + ".png");
				
				if(teams[Object.keys(teams)[i]].color) {
					addColor(teams[Object.keys(teams)[i]].color);
				}
				
				if(site == "beam") {
					if(!$(".message:last-child .message-tooltip").length) {
						$(".message:last-child .message-author").append("<div class='message-tooltip'></div>");
					}
					
					if(teams[Object.keys(teams)[i]].color) {
						$(".message:last-child .message-tooltip").append(
							"<span class='text-role text-role-" + Object.keys(teams)[i] + "' style='color: " + teams[Object.keys(teams)[i]].color + "'>" + Object.keys(teams)[i] + "</span>"
						);
					} else {
						$(".message:last-child .message-tooltip").append(
							"<span class='text-role text-role-" + Object.keys(teams)[i] + "'>" + Object.keys(teams)[i] + "</span>"
						);
					}
				}
			}
		}
	});
});
