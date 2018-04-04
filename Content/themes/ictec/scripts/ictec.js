function goToByScroll(id) {
	$("html,body").animate({ scrollTop: $("#" + id).offset().top-20 }, 1000);
}
$(window).scroll(function () { 
	currentScrollTop = $(this).scrollTop();
	if (currentScrollTop > 600) {
			$(".moveTop").fadeIn(500);
	}
	else {
			$(".moveTop").fadeOut(500);
	}
});

$(document).ready(function () {

	//Gallery <br />
	$(".gallery").find("br").remove();

	//fancybox
	$(".fancybox").fancybox({padding: 0, maxWidth: 700, maxHeight: 560, autoSize: true, closeClick: false, openEffect: "elastic", openSpeed: 300, closeEffect: "elastic", closeSpeed: 300});
	
	$(".spoiler_button").click(function(){
	    var parent = $("." + $(this).attr("id"));
	    if (parent.is(":visible")) {
	        parent.hide("slow");
	        $(this).html("развернуть...");
	    }
	    else
	    {
	        parent.show("slow");
	        $(this).html("свернуть...");
	    }
	})

 	$('.multiple-items-vert').slick({
        	infinite: true,
	        slidesToShow: 5,
        	slidesToScroll: 1
	    });
	
	    $('.multiple-items-hor').slick({
        	infinite: true,
	        slidesToShow: 3,
	        slidesToScroll: 1
	    });

	    $('.multiple-items div img, .SingleImage').click(function () {
	        $.fancybox($(this).clone().css("height", "").css("max-height", "800px"));
	    });

	    $('.GalleryImage').click(function (e) {
	        $.fancybox($("<img src='" +$(this).attr("href") + "' style='max-height: 800px;'>"));
	        return false;
	    });

	    $(".akcia3").hover(
        function () {
            var dropdown = $(this).find('.dropdown');
            dropdown.css("z-index", 98);
            dropdown.parent().find(".title").css("z-index", 99);
            dropdown.stop().show(300);
        },
        function () {
            var dropdown = $(this).find('.dropdown');
            dropdown.css("z-index", 9);
            dropdown.parent().find(".title").css("z-index", 10);
            dropdown.stop().hide(0);
        }
);

	    $(".akcia3 .dropdown").each(function () {
	        $(this).css("width", $(this).parent().find(".title").width() + 52);
	    });
});

