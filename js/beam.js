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
	
	if(id) {
		var toid = " id='" + id + "'";
		var toda = " data-message='" + id + "'";
	} else {
		var toid = "";
		var toda = "";
	}
	
	$(".message:last-child").append(
		"<div" + toid + " class='message fadeIn a-s-fast message-role-User' data-role='User'>" +
			"<div class='message-author'" + toda + ">" +
				name +
			"</div>" +
			"<div class='message-body'>" +
				message +
			"</div>" +
		"</div>"
	);
	
	working = false;
}
function replaceMessage(name, message) {
	working = true;
	var ranks = getRanks();
	
	$(".message:last-child .message-author").html(name);
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
	
	$(".message:last-child").removeClass();
	$(".message:last-child").addClass("message fadeIn a-s-fast message-role-User");
	for(var i = 0; i < toranks.length; i++) {
		$(".message:last-child").addClass("message-role-" + toranks[i]);
	}
	
	var danranks = "";
	for(var i = 0; i < toranks.length; i++) {
		danranks += toranks[i] + "|";
	}
	$(".message:last-child").attr("data-role", danranks + "Users");
	
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
