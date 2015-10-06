$("document").ready(function() {
	chrome.storage.sync.get("options", function(items) {
		for(var i = 0; i < $(".ch").length; i++) {
			$(".ch:eq(" + i + ")").prop("checked", items.options[$(".ch:eq(" + i + ")").attr("id")]);
		}
		
		$(".ch").click(function() {
			items.options[$(this).attr("id")] = $(this).prop("checked");
			console.log(items);
			console.log($(this).prop("checked"));
			chrome.storage.sync.set(items);
		});
	});
});
