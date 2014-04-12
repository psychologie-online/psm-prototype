// Click anywhere to close sidebars
$(document).on(click, function(e) {
	if (
		!$(e.target).is('a.menu') &&
		$(e.target).closest('div.menu').length == 0
	){
		closeMenu();
	}
});

// Click Cesty Icon
$('a.menu').on(click, function(e){
	e.preventDefault();
	if( $('.wrap').hasClass('menu-open') ){
		closeMenu();
	} else {
		openMenu();
	}
});
function openMenu(){
	$('div.menu').show();
	$('.wrap, .sticky').addClass('menu-open');
	setTimeout(function(){
		$('div.menu').css('z-index', 200);
	}, 300);
}
function closeMenu(){
	$('div.menu').css('z-index', -100);
	$('.wrap, .sticky').removeClass('menu-open');
}