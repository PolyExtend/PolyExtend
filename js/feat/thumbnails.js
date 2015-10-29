if(site == "beam") {
	$("document").ready(function() {
		$("body").observe("added", ".channel-thumbnail", function(mut) { // Watch for thumbnails...
			if(options.realthumbs) {
				for(var i = 0; i < mut.addedNodes.length; i++) {
					if($(mut.addedNodes[i]).hasClass("channel-thumbnail")) {
						var name = $(mut.addedNodes[i]).parent().parent().parent().find(".card-user .who").text();
						
						$.get("//beam.pro/api/v1/users/search?query=" + name, function(found) { // Find and set the thumbnail.
							$.get("//beam.pro/api/v1/users/" + found[0].id, function(user) {
								$.get("//beam.pro/api/v1/channels/" + user.channel.id, function(channel) {
									$(this.mut.addedNodes[this.i]).append("<img src='" + channel.thumbnail.url + "' class='polythumb img-responsive'>");
								}.bind(this));
							}.bind(this));
						}.bind({mut: mut, i: i}));
					}
				}
			}
		});
	});
}
