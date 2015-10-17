if(site == "beam") {
	$("document").ready(function() {
		$("body").observe("added", ".channel-thumbnail", function(mut) { // Watch for thumbnails...
			if(options.realthumbs) {
				var name = $(mut.addedNodes).parent().parent().parent().find(".card-user .who").text();
				
				$.get("//beam.pro/api/v1/users/search?query=" + name, function(found) { // Find and set the thumbnail.
					$.get("//beam.pro/api/v1/users/" + found[0].id, function(user) {
						$.get("//beam.pro/api/v1/channels/" + user.channel.id, function(channel) {
							var thumbnail = channel.thumbnail.url;
							
							$(mut.addedNodes).append("<img src='" + thumbnail + "' class='polythumb'>");
						});
					});
				});
			}
		});
	});
}
