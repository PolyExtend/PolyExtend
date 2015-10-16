$("document").ready(function() {
	chrome.storage.sync.get("options", function(items) {
		for(var i = 0; i < $(".ch").length; i++) { // Check options that are enabled.
			$(".ch:eq(" + i + ")").prop("checked", items.options[$(".ch:eq(" + i + ")").attr("id")]);
		}
		
		$(".ch").click(function() { // Update option when it's clicked.
			items.options[$(this).attr("id")] = $(this).prop("checked");
			console.log(items);
			console.log($(this).prop("checked"));
			chrome.storage.sync.set(items);
		});
	});
});
