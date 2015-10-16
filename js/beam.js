var working = false; // When true, doesn't trigger message events.
var site = "beam";
var addevents = []; // Arrays for functions to be run for message events.
var delevents = [];

$("document").ready(function() {
	$("head").append(
		"<style>" +
			".polyafter {" +
				"display: none;" +
			"}" +
			
			".message-author:hover .polyafter {" +
				"display: inline-block;" +
			"}" +
			
			"@keyframes polyspin {" +
				"from {" +
					"transform: none" +
				"}" +
				
				"to {" +
					"transform: rotate(360deg)" +
				"}" +
			"}" +
			
			".polyemote-spin {" +
				"animation-name: polyspin;" +
				"animation-duration: 2s;" +
				"animation-iteration-count: infinite;" +
			"}" +
			
			".polyemote-spin-fast {" +
				"animation-name: polyspin;" +
				"animation-duration: 0.5s;" +
				"animation-iteration-count: infinite;" +
			"}" +
		"</style>"
	);
	
	$("body").observe("added", ".messages .nano-content>*", function() { // When a message is added...
		if(!working) {
			for(var i = 0; i < addevents.length; i++) { // Run each event function.
				if(addevents[i]) {
					var name = $(".message:last-child .message-author").clone().children().remove().end().text();
					var message = $(".message:last-child .message-body").html();
					var id = $(".message:last-child").attr("id");
					
					addevents[i](name, message, id);
				}
			}
		}
	});
	$("body").observe("removed", ".messages .nano-content>*", function() { // When a message is removed...
		if(!working) {
			for(var i = 0; i < delevents.length; i++) { // Run each event function.
				if(delevents[i]) {
					delevents[i]();
				}
			}
		}
	});
});

function addMessage(name, message, id) {
	working = true;
	
	if(id) { // Set id if one is given.
		var toid = " id='" + id + "'";
		var toda = " data-message='" + id + "'";
	} else {
		var toid = "";
		var toda = "";
	}
	
	$(".messages .nano-content").append( // Add the message.
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
	var ranks = getRanks(); // Get ranks since the name will be replaced.
	
	$(".message:last-child .message-author").html(name);
	$(".message:last-child .message-body").html(message);
	
	setRanks(ranks); // Add ranks back.
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
	
	if($(".message:last-child .message-author").hasClass("polyfirst")) { // Give all badges except one the "polyafter" class.
		$(".message:last-child .message-author").prepend("<img src='" + image + "' class='polyafter' style='margin-right: 6px; width: 16px; height: 16px;'>");
	} else {
		$(".message:last-child .message-author").addClass("polyfirst");
		$(".message:last-child .message-author").prepend("<img src='" + image + "' style='margin-right: 6px; width: 16px; height: 16px;'>");
	}
	
	working = false;
}

function getRanks() {
	var text = $(".message:last-child .message-tooltip").text(); // Get the ranks from the tooltip text.
	var ranks = [];
	
	if(text.indexOf("Owner") > -1) { // Replace rank names and return them.
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
	var name = $(".message:last-child .message-author").clone().children().remove().end().text(); // Get name without any HTML.
	var toranks = [];
	
	for(var i = 0; i < ranks.length; i++) { // Change the names back to what Beam uses.
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
	
	var divranks = ""; // String full of spans which will go in the tooltip.
	for(var i = 0; i < toranks.length; i++) {
		divranks += "<span class='text-role text-role-" + toranks[i] + "'>" + toranks[i] + "</span>";
	}
	$(".message:last-child .message-author").html(name + "<div class='message-tooltip'>" + divranks + "</div>");
	
	$(".message:last-child").removeClass().addClass("message fadeIn a-s-fast message-role-User"); // Add the classes.
	for(var i = 0; i < toranks.length; i++) {
		$(".message:last-child").addClass("message-role-" + toranks[i]);
	}
	
	var danranks = ""; // Add stuff to data-role.
	for(var i = 0; i < toranks.length; i++) {
		danranks += toranks[i] + "|";
	}
	$(".message:last-child").attr("data-role", danranks + "User");
	
	working = false;
}

function getStreamerName() {
	name = window.location.pathname;
	arr = [];
	
	for(var i = 0; i < name.length; i++) { // Create array of the path.
		if(name.charAt(i) == "/") {
			arr.push("");
		} else {
			arr[arr.length - 1] += name.charAt(i);
		}
	}
	
	return arr[arr.length - 1]; // Return the last path item.
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
