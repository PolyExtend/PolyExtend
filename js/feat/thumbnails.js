// if(site == "beam") {
// 	$("document").ready(function() {
// 		$("body").observe("added characterdata subtree", ".channel-thumbnail", function(good) { // Watch for thumbnails...
// 			var name = $(good).parent().parent().parent().parent(".card-user .who").text();
// 			console.log($(good));
			
			// $.get("//beam.pro/api/v1/users/search?query=" + name, function(found) { // Find and set the thumbnail.
			// 	$.get("//beam.pro/api/v1/users/" + found[0].id, function(user) {
			// 		$.get("//beam.pro/api/v1/channels/" + user.channel.id, function(channel) {
			// 			var thumbnail = channel.thumbnail.url;
						
// 						$(good).parent().append("<img src='" + thumbnail + "' class='polythumb'>");
// 					});
// 				});
// 			});
// 		});
// 	});
// }
