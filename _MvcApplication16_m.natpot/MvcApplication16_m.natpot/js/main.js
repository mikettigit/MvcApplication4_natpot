


$(function() {

	/*-- Strict mode enabled --*/
	"use strict";


	/*-- floating contact form
	---------------------------------- --*/
	$(".floating").on('click',function(){
		$('.quform-outer').toggleClass("expand");
	});


	/* -- Smooth scrolling
	---------------------------------- --*/
	smoothScroll.init({
		selector: '[data-scroll]',
		selectorHeader: null, 
		speed: 1000,
		easing: 'easeInQuint', 
		offset: 50, 
		callback: function ( anchor, toggle ){}
	});



	/*-- Animation on scroll
	---------------------------------- --*/
	new WOW().init();


	/*-- Killer carousel
	--------------------------------- --*/
	$('.kc-wrap').KillerCarousel({
		width: 800,
		spacing3d: 120, 
		spacing2d: 120,
		showShadow: true,
		showReflection: false,
		infiniteLoop: true,
		autoScale: 80
	});


	/*-- owl carousel
	--------------------------------- --*/
	$(".feedback .owl-carousel").owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		autoplay: true,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});

	$(".details .owl-carousel").owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		autoplay: true,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});


	$(".blog .owl-carousel").owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		autoplay: true,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
	});

    //Битый код
	///*-- fullscreen youtube video bg
	//--------------------------------- --*/
 	//$(".player").mb_YTPlayer();

	
});