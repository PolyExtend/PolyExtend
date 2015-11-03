var applyTeamsEvent = function() {};
onMessageAdd(function(mut, name, message, id) {
	applyTeamsEvent(mut, name, message, id);
});

$.get("//extend.dinu.ga/teams.json", function(teams) {
	applyTeamsEvent = function(mut, name, message, id) {
		if(options.teams) {
			for(var i = 0; i < Object.keys(teams).length; i++) { // For each team...
				if(teams[Object.keys(teams)[i]].members.indexOf(name.toLowerCase()) > -1) { // If user is in current selected team...
					addBadge(mut, Object.keys(teams)[i], teams[Object.keys(teams)[i]].color, "//extend.dinu.ga/badges/" + Object.keys(teams)[i] + ".png"); // Add team badge.
					
					if(teams[Object.keys(teams)[i]].color) { // Add team color if there is one.
						addColor(mut, teams[Object.keys(teams)[i]].color);
					}
				}
			}
		}
	};
});
