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
        if(message) {
            if(message.indexOf("a href=") > -1) {
                // http://stackoverflow.com/questions/11047670/creating-a-jquery-object-from-a-big-html-string
                var href = getInterSegment(message, 'href=', ' ');
                href = href.replace("ref=", "");
                href = href.replace('"', '');
                href = href.substring(0, href.length - 1);
                console.log("href: " + href);
                var orig = "<" + getInterSegment(message, '<a', '</a>') + "</a>";
                console.log("Original: " + orig);
                var built = "<img src='" + href + "' style='display: block; max-width: 100%; max-height: 200px; border-radius: 4px;' href='" + href + "' target='_blank'>";
                console.log("Built: " + built);
                var msgNEW = message.replace(orig, built); // replace link with image object
                console.log("Result: " + msgNEW);
                replaceMessage(name, msgNEW, id);

            }
        }
    }
});

function getInterSegment(msg, start, end) {
    var test_str = msg;
    var start_pos = test_str.indexOf(start) + 1;
    var end_pos = test_str.indexOf(end, start_pos);
    return test_str.substring(start_pos, end_pos);

}
