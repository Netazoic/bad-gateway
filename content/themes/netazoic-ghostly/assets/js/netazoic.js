(function ($) {
  $(document).ready(function () {
    $('.post').fitVids();
  });
	fixSamples();
})(jQuery);

function fixSamples(){
 	$("a.neta-sample").each(function(){
 	
 		$(this).click(function(evt){
 			evt.preventDefault();
 			var url = $(this).attr("href");
 			njq.popWindow(url,"_sample",600,800);
			//$("#sample").load(url);	 
 			//$("#sample").dialog("open");
		});
 	});	
}




function goSlideInfo(){
	document.location="/universum#info"
}

