$(document).ready(function(){
	var screen_width = $(window).width();
	var screen_height = $(window).innerHeight();
	$("html, body").animate({ scrollTop: 0 }, "slow");


	// load plugin
	$(document).stereopticon({
		page_height : screen_height,
		maxIndex: 4
	});

	
});
