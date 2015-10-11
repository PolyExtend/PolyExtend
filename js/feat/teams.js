$.get("//extend.dinu.ga/teams.json", function(teams) {
	onMessageAdd(function(name, message, id) {
		for(var i = 0; i < Object.keys(teams).length; i++) { // For each team...
			if(teams[Object.keys(teams)[i]].members.indexOf(name.toLowerCase()) > -1) { // If user is in current selected team...
				addBadge("//extend.dinu.ga/badges/" + Object.keys(teams)[i] + ".png"); // Add team badge.
				
				if(teams[Object.keys(teams)[i]].color) { // Add team color if there is one.
					addColor(teams[Object.keys(teams)[i]].color);
				}
				
				if(site == "beam") {
					if(!$(".message:last-child .message-tooltip").length) { // Add a tooltip if there is none.
						$(".message:last-child .message-author").append("<div class='message-tooltip'></div>");
					}
					
					if(teams[Object.keys(teams)[i]].color) { // Add team to the tooltip.
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
