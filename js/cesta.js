function openMenu(){
	$('.wrap, footer, header').addClass('menu-open');
	setTimeout(function(){
		$('aside.menu').css('z-index', 2000);
	}, 300);
}
function closeMenu(){
	$('aside.menu').css('z-index', -100);
	$('.wrap, footer, header').removeClass('menu-open');
}

$(document).ready(function() {

	// (OPEN & CLOSE) SIDEBAR
	// Click anywhere to close sidebar
	$(document).click (function(e) {
		if (
			!$(e.target).is('a.menu') &&
			$(e.target).closest('aside.menu').length === 0 ) {

			closeMenu();
		}
	});

	// Menu link sidebar
	$('a.menu').click (function(e) {
		e.preventDefault(); // Zabraňuje při kliknutí na odkaz vrácení na začátek stránky tzn. zabraňuje akci odkazu.
		e.stopPropagation();
		if( $('.wrap').hasClass('menu-open') ) {
			closeMenu();
		} else {
			openMenu();

		}
	});

	// Posun šipkama v cestě
	$(document).keydown(function (event) {
		if (event.which == 37) {
			$('#prevPage')[0].click();
			// console.log ('prev');
		} else if (event.which == 39) {
			$('#nextPage')[0].click();
			// console.log ('next');
		}
	});
});
