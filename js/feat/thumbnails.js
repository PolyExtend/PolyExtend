if(site == "beam") {
	$("document").ready(function() {
		$("body").observe("added", ".be-browse-card background > img", function(mut) { // Watch for thumbnails...
			if(options.realthumbs) {
				for(var i = 0; i < mut.addedNodes.length; i++) {
					var name = $(mut.addedNodes[i]).closest(".be-browse-card").find("md-card-title-text :first").text();
					
					$.get("//mixer.com/api/v1/users/search?query=" + name, function(found) { // Find and set the thumbnail.
						$.get("//mixer.com/api/v1/users/" + found[0].id, function(user) {
							$.get("//mixer.com/api/v1/channels/" + user.channel.id, function(channel) {
								if(channel.thumbnail) {
									$(this.mut.addedNodes[this.i]).attr("src", channel.thumbnail.url);
								}
							}.bind(this));
						}.bind(this));
					}.bind({mut: mut, i: i}));
				}
			}
		});
	});
}
