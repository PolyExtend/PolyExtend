var working = false; // When true, doesn't trigger message events.
var site = "mixer";
var addevents = []; // Arrays for functions to be run for message events.
var delevents = [];

$("document").ready(function() {
	$("head").append(
		"<style>" +
			".message-author img {" +
				"display: none;" +
			"}" +
			
			".message-author:hover img, .message-author img:last-of-type {" +
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
	
	$("body").observe("added", ".message", function(mut) { // When a message is added...
		if(!working) {
			for(var i = 0; i < addevents.length; i++) { // Run each event function.
				if(addevents[i]) {
					for(var j = 0; j < mut.addedNodes.length; j++) {
						if($(mut.addedNodes[j]).hasClass("message")) {
							var name = $(mut.addedNodes[j]).find(".message-author").clone().children().remove().end().html();
							var message = $(mut.addedNodes[j]).find(".message-body").html();
							var id = $(mut.addedNodes[j]).attr("id");
							
							if($(mut.addedNodes[j]).attr("id").indexOf("temp") < 0) {
								addevents[i]($(mut.addedNodes[j]), name, message, id);
							} else {
								setTimeout(function(addevents, i, mut, j, name, message, id) {
									addevents[i]($(mut.addedNodes[j]), name, message, id);
								}.bind(this, addevents, i, mut, j, name, message, id), 500);
							}
						}
					}
				}
			}
		}
	});
	$("body").observe("removed", ".message", function(mut) { // When a message is removed...
		if(!working) {
			for(var i = 0; i < delevents.length; i++) { // Run each event function.
				if(delevents[i]) {
					for(var j = 0; j < mut.removedNodes.length; j++) {
						if($(mut.removedNodes[j]).hasClass("message")) {
							delevents[i]($(mut.removedNodes[j]));
						}
					}
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
function replaceMessage(mut, name, message) {
	working = true;
	var ranks = getRanks(mut); // Get ranks since the name will be replaced.
	
	mut.find(".message-author").html(name);
	mut.find(".message-body").html(message);
	
	setRanks(mut, ranks); // Add ranks back.
	working = false;
}
function removeMessage(mut) {
	working = true;
	mut.remove();
	working = false;
}

function addColor(mut, color) {
	working = true;
	mut.find(".message-author").css("color", color);
	working = false;
}
function addBadge(mut, title, color, image) {
	working = true;
	
	mut.find(".message-author").prepend("<img src='" + image + "' style='margin-right: 6px; width: 16px; height: 16px;'>");
	
	if(!mut.find(".message-tooltip").length) { // Add a tooltip if there is none.
		mut.find(".message-author").append("<div class='message-tooltip'></div>");
	}
	
	if(color) { // Add team to the tooltip.
		mut.find(".message-tooltip").append(
			"<span class='text-role text-role-Poly' style='color: " + color + "'>" + title + "</span>"
		);
	} else {
		mut.find(".message-tooltip").append(
			"<span class='text-role text-role-Poly'>" + title + "</span>"
		);
	}
	
	working = false;
}

function getRanks(mut) {
	var text = mut.find(".message-tooltip").text(); // Get the ranks from the tooltip text.
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
	if(text.indexOf("Developer") > -1) {
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
function setRanks(mut, ranks) {
	working = true;
	var name = mut.find(".message-author").clone().children().remove().end().html(); // Get name without any HTML.
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
			toranks.push("Developer");
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
	mut.find(".message-author").html(name + "<div class='message-tooltip'>" + divranks + "</div>");
	
	var tagged = mut.hasClass("tagged"); // If the message is mentioning you.
	
	mut.removeClass().addClass("message fadeIn a-s-fast message-role-User"); // Add the classes.
	for(var i = 0; i < toranks.length; i++) {
		mut.addClass("message-role-" + toranks[i]);
	}
	
	if(tagged) {
		mut.addClass("tagged"); // Add the tagged class again.
	}
	
	var danranks = ""; // Add stuff to data-role.
	for(var i = 0; i < toranks.length; i++) {
		danranks += toranks[i] + "|";
	}
	mut.attr("data-role", danranks + "User");
	
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
