var working = false;
var site = "beam";
var addevents = [];
var delevents = [];

$("body").on("DOMNodeInserted", ".messages .nano-content", function() {
	if(!working) {
		for(var i = 0; i < addevents.length; i++) {
			if(addevents[i]) {
				var name = $(".message:last-child .message-author").clone().children().remove().end().text();
				var message = $(".message:last-child .message-body").html();
				var id = $(".message:last-child").attr("id");
				
				addevents[i](name, message, id);
			}
		}
	}
});
$("body").on("DOMNodeRemoved", ".messages .nano-content", function() {
	for(var i = 0; i < delevents.length; i++) {
		if(delevents[i]) {
			delevents[i]();
		}
	}
});

function addMessage(name, message, id) {
	working = true;
	
	working = false;
}
function replaceMessage(name, message) {
	working = true;
	var ranks = getRanks();
	$(".message:last-child .message-author").text(name);
	$(".message:last-child .message-body").html(message);
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
	var text = $(".message:last-child .message-author .text-role").text();
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
	
	working = false;
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
