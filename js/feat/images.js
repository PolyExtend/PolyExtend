onMessageAdd(function(mut, name, message, id) {
	console.log("got it");
	var htmlized = $($.parseHTML("<div>" + message + "</div>")); // Make jQuery object from message text.
	
	if(options.linkimages && htmlized.children("a").length > 0) {
		for(var i = 0; i < htmlized.children("a").length; i++) { // For each <a> element...
			var div = $(htmlized.children("a")[i]); // Current <a> element.
			
			if(div.text().slice(-4) == ".png" || // If the link is an image, display it.
			div.text().slice(-4) == ".jpg" ||
			div.text().slice(-4) == ".jpeg" ||
			div.text().slice(-4) == ".gif") {
				div.html("<img src='" + div.text() + "' style='display: block; max-width: 100%; max-height: 200px; border-radius: 4px;'>");
			}
		}
		
		console.log(htmlized.html());
		replaceMessage(mut, name, htmlized.html());
	}
});
