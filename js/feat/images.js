onMessageAdd(function(name, message, id) {
    if(site === "beam") {
        var htmlized = $($.parseHTML("<div class='message-body'>" + message + "</div>"));
        if(options.linkimages && htmlized.children("a").length > 0) {
            for(var i = 0; i < htmlized.children("a").length; i++) {
                var div = $(htmlized.children("a")[i]);

                if(div.text().slice(-4) == ".png" ||
                div.text().slice(-4) == ".jpg" ||
                div.text().slice(-4) == ".gif") {
                    div.html("<img src='" + div.text() + "' style='display: block; max-width: 100%; max-height: 200px; border-radius: 4px;'>");
                }
            }

            replaceMessage(name, htmlized.html());
        }
    } else if(site === "twitch") {
        // http://stackoverflow.com/questions/11047670/creating-a-jquery-object-from-a-big-html-string
        var href = $('<div/>').html(message).contents().attr('href');
        var imghtml = "<img src='" + href + "' style='display: block; max-width: 100%; max-height: 200px; border-radius: 4px;'>";
        replaceMessage(name, imghtml, id);
      /*
      <a href="https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" style="display: block; max-width: 100%; max-height: 200px; border-radius: 4px;"></a>
      */
    }
});
