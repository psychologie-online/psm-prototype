// Click anywhere to close sidebars
$(document).click (function(e) {
	if (
		!$(e.target).is('a.menu') &&
		$(e.target).closest('aside.menu').length === 0
	){
		closeMenu();
	}
});

// Click Cesty
$('a.menu').click (function(e){
	e.preventDefault(); // Zabraňuje při kliknutí na odkaz vrácení na začátek stránky tzn. zabraňuje akci odkazu.
	e.stopPropagation();
	if( $('.wrap').hasClass('menu-open') ){
		closeMenu();
	} else {
		openMenu();

	}
});
function openMenu(){
	$('.wrap, .contain-to-grid').addClass('menu-open');
	setTimeout(function(){
		$('aside.menu').css('z-index', 200);
	}, 300);
}
function closeMenu(){
	$('aside.menu').css('z-index', -100);
	$('.wrap, .contain-to-grid').removeClass('menu-open');
}