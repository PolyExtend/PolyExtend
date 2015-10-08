var working = false;
var site = "twitch";
var addevents = [];
var delevents = [];
var processed = {};
$("body").on("DOMNodeInserted", ".chat-lines", function(evt) {
    if(!working) {
        for(var i = 0; i < addevents.length; i++) {
            if(addevents[i]) {
                var name = $(evt.target).find(".from").text();
                var message = $(evt.target).find(".message").html();
                var id = evt.target.id.replace(/\D/g,'');
                addevents[i](name, message, id);

            }
        }
    }
});

function addMessage(name, message, id) {
	working = true;
	$(".chat-lines").append(
		'<div id="ember' + id + '" class="ember-view">' +
            '<li id="ember' + (id + 1) + '" class="ember-view message-line chat-line">' +
                '<div class="indicator"></div>' +
                '<span class="timestamp float-left">2:43</span>' +
                '<span class="mod-icons float-left">' +
                    '<a class="mod-icon float-left tooltip ban" title="Ban User" href="#">Ban</a>' +
                    '<a class="mod-icon float-left tooltip timeout" title="Timeout User" href="#">Timeout</a>' +
                '</span>' +
                '<span class="badges float-left"></span>' +
                '<span class="from" style="color:#8A2BE2">BeamLink</span><span class="colon">:</span>' +
                '<span class="message" style="undefined">[lite20] test</span>' +
            '</li>' +
        '</div>'
	);

	working = false;
}
function replaceMessage(name, message, id) {
	working = true;
	var ranks = getRanks();
    console.log(message);
    $(document.getElementById("ember" + id)).html(
        '<li id="ember' + (id + 1) + '" class="ember-view message-line chat-line">' +
            '<div class="indicator"></div>' +
            '<span class="timestamp float-left">6:54</span>' +
            '<span class="mod-icons float-left">' +
                '<a class="mod-icon float-left tooltip ban" title="Ban User" href="#">Ban</a>' +
                '<a class="mod-icon float-left tooltip timeout" title="Timeout User" href="#">Timeout</a>' +
            '</span>' +
            '<span class="badges float-left"></span>' +
            '<span class="from" style="color:#8A2BE2">' + name + '</span>' +
            '<span class="colon">:</span> <span class="message" style="undefined">' + message + '</span>' +
        '</li>');
	setRanks(ranks);
	working = false;
}
function removeMessage() {
	working = true;
	$(".message:last-child").remove();
	working = false;
}

function addColor(color) {
	working = true;
	$(".message:last-child .message-author").css("color", color);
	working = false;
}
function addBadge(image) {
	working = true;
	$(".message:last-child .message-author").prepend("<img src='" + image + "' style='margin-right: 8px;'>");
	working = false;
}

function getRanks() {
	var text = $(".message:last-child .message-tooltip").text();
	var ranks = [];

	if(text.indexOf("Owner") > -1) {
		ranks.push("streamer");
	}
	if(text.indexOf("Mod") > -1) {
		ranks.push("mod");
	}
	if(text.indexOf("Admin") > -1) {
		ranks.push("admin");
	}
	if(text.indexOf("Dev") > -1) {
		ranks.push("dev");
	}
	if(text.indexOf("Pro") > -1) {
		ranks.push("pro");
	}
	if(text.indexOf("Subscriber") > -1) {
		ranks.push("sub");
	}

	return ranks;
}
function setRanks(ranks) {
	working = true;
	var name = $(".message:last-child .message-author").clone().children().remove().end().text();
	var toranks = [];

	for(var i = 0; i < ranks.length; i++) {
		if(ranks[i] == "streamer") {
			toranks.push("Owner");
		}
		if(ranks[i] == "mod") {
			toranks.push("Mod");
		}
		if(ranks[i] == "admin") {
			toranks.push("Admin");
		}
		if(ranks[i] == "dev") {
			toranks.push("Dev");
		}
		if(ranks[i] == "pro") {
			toranks.push("Pro");
		}
		if(ranks[i] == "sub") {
			toranks.push("Subscriber");
		}
	}

	var divranks = "";
	for(var i = 0; i < toranks.length; i++) {
		divranks += "<span class='text-role text-role-" + toranks[i] + "'>" + toranks[i] + "</span>";
	}
	$(".message:last-child .message-author").html(name + "<div class='message-tooltip'>" + divranks + "</div>");
	$(".message:last-child").removeClass().addClass("message fadeIn a-s-fast message-role-User");
	for(var i = 0; i < toranks.length; i++) {
		$(".message:last-child").addClass("message-role-" + toranks[i]);
	}

	var danranks = "";
	for(var i = 0; i < toranks.length; i++) {
		danranks += toranks[i] + "|";
	}
	$(".message:last-child").attr("data-role", danranks + "User");

	working = false;
}

function getStreamerName() {
	name = window.location.pathname;
	arr = [];

	for(var i = 0; i < name.length; i++) {
		if(name.charAt(i) == "/") {
			arr.push("");
		} else {
			arr[arr.length - 1] += name.charAt(i);
		}
	}

	return arr[arr.length - 1];
}

function onMessageAdd(callback) {
	return addevents.push(callback) - 1;
}
function onMessageRemove(callback) {
	return delevents.push(callback) - 1;
}

function offMessageAdd(num) {
	addevents[num] = false;
}
function offMessageRemove(num) {
	delevents[num] = false;
}
