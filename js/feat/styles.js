setInterval(function() {
	if(site == "beam") {
		if(options.chatalerts && !$("#polystyle-chatalerts").length) {
			$("head").append(
				"<style id='polystyle-chatalerts'>" +
					".tagged {" +
						"background: rgba(213, 24, 18, 0.2) !important;" +
					"}" +
				"</style>"
			);
		} else if(!options.chatalerts && $("#polystyle-chatalerts").length) {
			$("#polystyle-chatalerts").remove();
		}
		
		if(options.separator && !$("#polystyle-separator").length) {
			$("head").append(
				"<style id='polystyle-separator'>" +
					".message:nth-child(odd) {" +
						"background: rgba(0, 0, 0, 0.2);" +
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
						"background-color: rgba(0, 0, 0, 0.2);" +
					"}" +
				"</style>"
			);
		} else if(!options.darkheader && $("#polystyle-darkheader").length) {
			$("#polystyle-darkheader").remove();
		}
	} else if(site == "twitch") {
		// if(options.chatalerts && !$("#polystyle-chatalerts").length) {
		// 	$("head").append(
		// 		"<style id='polystyle-chatalerts'>" +
		// 			".tagged {" +
		// 				"background: rgba(213, 24, 18, 0.2) !important;" +
		// 			"}" +
		// 		"</style>"
		// 	);
		// } else if(!options.chatalerts && $("#polystyle-chatalerts").length) {
		// 	$("#polystyle-chatalerts").remove();
		// }
		
		if(options.separator && !$("#polystyle-separator").length) {
			$("head").append(
				"<style id='polystyle-separator'>" +
					":nth-child(odd) > .chat-line {" +
						"background: rgba(0, 0, 0, 0.2);" +
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
		// 				"background-color: rgba(0, 0, 0, 0.2);" +
		// 			"}" +
		// 		"</style>"
		// 	);
		// } else if(!options.darkheader && $("#polystyle-darkheader").length) {
		// 	$("#polystyle-darkheader").remove();
		// }
	}
}, 5000);
