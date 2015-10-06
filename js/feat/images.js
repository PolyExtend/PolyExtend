onMessageAdd(function(name, message, id) {
	var htmlized = $($.parseHTML("<div class='message-body'>" + message + "</div>"));
	
	if(options.linkimages && htmlized.children("a").length > 0) {
		for(var i = 0; i < htmlized.children("a").length; i++) {
			var div = $(htmlized.children("a")[i]);
			
			console.log(div.text());
			
			if(div.text().slice(-4) == ".png" ||
			div.text().slice(-4) == ".jpg" ||
			div.text().slice(-4) == ".gif") {
				div.html("<img src='" + div.text() + "' style='display: block; max-width: 100%; max-height: 200px; border-radius: 4px;'>");
			}
		}
		
		replaceMessage(name, htmlized.html());
	}
});
