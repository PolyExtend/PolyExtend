$.get("//extend.dinu.ga/teams.json", function(teams) {
	onMessageAdd(5, function(mut, name, message, id) {
		if(options.teams) {
			for(var i = 0; i < Object.keys(teams).length; i++) { // For each team...
				if(teams[Object.keys(teams)[i]].members.indexOf(name.toLowerCase()) > -1) { // If user is in current selected team...
					addBadge(mut, "//extend.dinu.ga/badges/" + Object.keys(teams)[i] + ".png"); // Add team badge.
					
					if(teams[Object.keys(teams)[i]].color) { // Add team color if there is one.
						addColor(mut, teams[Object.keys(teams)[i]].color);
					}
					
					if(site == "beam") {
						if(!mut.find(".message-tooltip").length) { // Add a tooltip if there is none.
							mut.find(".message-author").append("<div class='message-tooltip'></div>");
						}
						
						if(teams[Object.keys(teams)[i]].color) { // Add team to the tooltip.
							mut.find(".message-tooltip").append(
								"<span class='text-role text-role-" + Object.keys(teams)[i] + "' style='color: " + teams[Object.keys(teams)[i]].color + "'>" + Object.keys(teams)[i] + "</span>"
							);
						} else {
							mut.find(".message-tooltip").append(
								"<span class='text-role text-role-" + Object.keys(teams)[i] + "'>" + Object.keys(teams)[i] + "</span>"
							);
						}
					}
				}
			}
		}
	});
});
