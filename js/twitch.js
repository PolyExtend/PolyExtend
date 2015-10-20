var working = false; // When true, doesn't trigger message events.
var site = "twitch";
var addevents = []; // Arrays for functions to be run for message events.
var delevents = [];

$("document").ready(function() {
	// $("head").append(
	// 	"<style>" +
	// 		".polyafter {" +
	// 			"display: none;" +
	// 		"}" +
			
			// ".from:hover .polyafter {" +
			// 	"display: inline-block;" +
			// "}" +
			
			// "@keyframes polyspin {" +
			// 	"from {" +
			// 		"transform: none" +
			// 	"}" +
				
			// 	"to {" +
			// 		"transform: rotate(360deg)" +
			// 	"}" +
			// "}" +
			
			// ".polyemote-spin {" +
			// 	"animation-name: polyspin;" +
			// 	"animation-duration: 2s;" +
			// 	"animation-iteration-count: infinite;" +
			// "}" +
			
			// ".polyemote-spin-fast {" +
			// 	"animation-name: polyspin;" +
			// 	"animation-duration: 0.5s;" +
			// 	"animation-iteration-count: infinite;" +
			// "}" +
			
			// ".polythumb {" +
			// 	"position: absolute;" +
			// 	"top: 0;" +
			// 	"left: 0;" +
			// 	"opacity: 1;" +
			// 	"transition: opacity 0.4s;" +
			// "}" +
			
	// 		".channel-card:hover .polythumb {" +
	// 			"opacity: 0;" +
	// 		"}" +
	// 	"</style>"
	// );
	
	$("body").observe("added", ".chat-lines .chat-line", function(mut) { // When a message is added...
		if(!working) {
			for(var i = 0; i < addevents.length; i++) { // Run each event function.
				if(addevents[i]) {
					for(var j = 0; j < mut.addedNodes.length; j++) {
						var name = $(mut.addedNodes[j]).find(".from").html();
						var message = $(mut.addedNodes[j]).find(".message").html();
						var id = $(mut.addedNodes[j]).attr("id");
						
						addevents[i]($(mut.addedNodes[j]), name, message, id);
					}
				}
			}
		}
	});
	$("body").observe("removed", ".chat-lines .chat-line", function() { // When a message is removed...
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
	} else {
		var toid = "";
	}
	
	$(".chat-lines").append( // Add the message.
		"<div class='ember-view'>" +
			"<li" + toid + " class='ember-view message-line chat-line'>" +
				"<span class='badges float-left'></span>" +
				"<span class='from'>" +
					name +
				"</span>" +
				"<span class='colon'>:</span>" +
				"<span class='message'>" +
					message +
				"</span>" +
			"</li>" +
		"</div>"
	);
	
	working = false;
}
function replaceMessage(mut, name, message) {
	working = true;
	
	mut.find(".from").html(name);
	mut.find(".message").html(message);
	
	working = false;
}
function removeMessage(mut) {
	working = true;
	mut.remove();
	working = false;
}

function addColor(mut, color) {
	working = true;
	mut.find(".from").css("color", color);
	working = false;
}
function addBadge(mut, image) {
	working = true;
	
	if(mut.find(".badges").hasClass("polyfirst")) { // Give all badges except one the "polyafter" class.
		mut.find(".badges").prepend("<img src='" + image + "' class='badge float-left polyafter' style='width: 16px; height: 16px;'>");
	} else {
		mut.find(".badges").addClass("polyfirst");
		mut.find(".badges").prepend("<img src='" + image + "' class='badge float-left' style='width: 16px; height: 16px;'>");
	}
	
	working = false;
}

function getRanks(mut) {
	// var text = mut.find(".message-tooltip").text(); // Get the ranks from the tooltip text.
	// var ranks = [];
	
	// if(text.indexOf("Owner") > -1) { // Replace rank names and return them.
	// 	ranks.push("streamer");
	// }
	// if(text.indexOf("Mod") > -1) {
	// 	ranks.push("mod");
	// }
	// if(text.indexOf("Admin") > -1) {
	// 	ranks.push("admin");
	// }
	// if(text.indexOf("Developer") > -1) {
	// 	ranks.push("dev");
	// }
	// if(text.indexOf("Pro") > -1) {
	// 	ranks.push("pro");
	// }
	// if(text.indexOf("Subscriber") > -1) {
	// 	ranks.push("sub");
	// }
	
	// return ranks;
}
function setRanks(mut, ranks) {
	// working = true;
	// var name = mut.find(".from").html(); // Get name without any HTML.
	// var toranks = [];
	
	// for(var i = 0; i < ranks.length; i++) { // Change the names back to what Beam uses.
	// 	if(ranks[i] == "streamer") {
	// 		toranks.push("Owner");
	// 	}
	// 	if(ranks[i] == "mod") {
	// 		toranks.push("Mod");
	// 	}
	// 	if(ranks[i] == "admin") {
	// 		toranks.push("Admin");
	// 	}
	// 	if(ranks[i] == "dev") {
	// 		toranks.push("Developer");
	// 	}
	// 	if(ranks[i] == "pro") {
	// 		toranks.push("Pro");
	// 	}
	// 	if(ranks[i] == "sub") {
	// 		toranks.push("Subscriber");
	// 	}
	// }
	
	// var divranks = ""; // String full of spans which will go in the tooltip.
	// for(var i = 0; i < toranks.length; i++) {
	// 	divranks += "<span class='text-role text-role-" + toranks[i] + "'>" + toranks[i] + "</span>";
	// }
	// mut.find(".from").html(name + "<div class='message-tooltip'>" + divranks + "</div>");
	
	// var tagged = mut.hasClass("tagged"); // If the message is mentioning you.
	
	// mut.removeClass().addClass("message fadeIn a-s-fast message-role-User"); // Add the classes.
	// for(var i = 0; i < toranks.length; i++) {
	// 	mut.addClass("message-role-" + toranks[i]);
	// }
	
	// if(tagged) {
	// 	mut.addClass("tagged"); // Add the tagged class again.
	// }
	
	// var danranks = ""; // Add stuff to data-role.
	// for(var i = 0; i < toranks.length; i++) {
	// 	danranks += toranks[i] + "|";
	// }
	// mut.attr("data-role", danranks + "User");
	
	// working = false;
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
	
	return arr[0]; // Return the first path item.
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
