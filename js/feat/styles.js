setInterval(function() {
	if(site == "beam") {
		if(options.separator && !$("#polystyle-separator").length) {
			$("head").append(
				"<style id='polystyle-separator'>" +
					".message:nth-child(odd) {" +
						"background: rgba(0, 0, 0, 0.4);" +
					"}" +
				"</style>"
			);
		} else if(!options.separator && $("#polystyle-separator").length) {
			$("#polystyle-separator").remove();
		}
		
		if(options.darkheader && !$("#polystyle-darkheader").length) {
			$("head").append(
				"<style id='polystyle-darkheader'>" +
					".navbar.ng-scope, .footer {" +
						"background-color: rgba(0, 0, 0, 0.4);" +
					"}" +
				"</style>"
			);
		} else if(!options.darkheader && $("#polystyle-darkheader").length) {
			$("#polystyle-darkheader").remove();
		}
	} else if(site == "twitch") {
		if(options.separator && !$("#polystyle-separator").length) {
			$("head").append(
				"<style id='polystyle-separator'>" +
					".chat-lines > .ember-view:nth-child(odd) {" +
						"background: rgba(0, 0, 0, 0.4);" +
					"}" +
				"</style>"
			);
		} else if(!options.separator && $("#polystyle-separator").length) {
			$("#polystyle-separator").remove();
		}
		
		// if(options.darkheader && !$("#polystyle-darkheader").length) {
		// 	$("head").append(
		// 		"<style id='polystyle-darkheader'>" +
		// 			".navbar.ng-scope, .footer {" +
		// 				"background-color: rgba(0, 0, 0, 0.4);" +
		// 			"}" +
		// 		"</style>"
		// 	);
		// } else if(!options.darkheader && $("#polystyle-darkheader").length) {
		// 	$("#polystyle-darkheader").remove();
		// }
	}
}, 5000);
