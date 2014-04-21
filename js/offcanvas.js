$(document).ready(function() {

//
// (OPEN & CLOSE) SIDEBAR
	// Click anywhere to close sidebar
	$(document).click (function(e) {
		if (
			!$(e.target).is('a.menu') &&
			!$(e.target).is('a.add-to-sidebar') &&
			$(e.target).closest('aside.menu').length === 0
			){
			closeMenu();
	}
});

	// Menu link sidebar
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
			$('aside.menu').css('z-index', 2000);
			$(".sortable.item:first-child").delay(500).removeClass( "highlight" ); // Highlight new added item
		}, 300);
	}
	function closeMenu(){
		$('aside.menu').css('z-index', -100);
		$('.wrap, .contain-to-grid').removeClass('menu-open');
	}

	// Add to sidebar
	// Pokud experiment ve výběru již figuruje, znemožnit jeho opětovné přidání
	// Položky s možností přidání do výběru musejí mít unikátní manuálně nastavené ID

	var quantity
	var a_menu = $("a.menu");

	$('a.add-to-sidebar').on("click", function(e) {
		e.preventDefault();

		// Update the number indicating the quantity of items added in sidebar
		// function quantityCesty {
		quantity = $(".sortable.item").length + 1;
			console.log("Počet položek: " + quantity);
			if( quantity < 1 ) {
				$("#quantity").fadeOut();
			}
			else {
				$("#quantity").fadeIn();
			}
			$("#quantity").text(quantity);
			// $("a.menu").append("<span id=\"quantity\" class=\"cesty-quantity\">" + quantity + " <\/span>");
			// }

		var exp_name = $(this).data('exp-name');
		var exp_text = $(this).data('exp-text');

		var new_srt_list_item	="";
		new_srt_list_item  += "<li data-sortable-id=\"item" + quantity + "\" class=\"sortable item highlight\">";
		new_srt_list_item  += "  <hr>";
		new_srt_list_item  += "  <div class=\"row\">";
		new_srt_list_item  += "    <div class=\"medium-1 columns text-center\">";
		new_srt_list_item  += "      <span class=\"icon-menu\"><\/span><span class=\"mls\"><\/span>";
		new_srt_list_item  += "    <\/div>";
		new_srt_list_item  += "    <div class=\"medium-1 columns text-center\">";
		new_srt_list_item  += "      <input type=\"checkbox\" name=\"cesta\" value=\"ano\">";
		new_srt_list_item  += "      <label class=\"green-border\" for=\"a\"><\/label>";
		new_srt_list_item  += "    <\/div>";
		new_srt_list_item  += "    <div class=\"medium-8 columns\">";
		new_srt_list_item  += "      <h4><a href=\"\">" + exp_name + "<\/a><\/h4>";
		new_srt_list_item  += "      <p>" + exp_text + "<\/p>";
		new_srt_list_item  += "    <\/div>";
		new_srt_list_item  += "    <div class=\"medium-2 columns text-center\">";
		new_srt_list_item  += "      <span class=\"icon-close\"><\/span><span class=\"mls\"><\/span>";
		new_srt_list_item  += "    <\/div>";
		new_srt_list_item  += "  <\/div>";
		new_srt_list_item  += "  <hr>";
		new_srt_list_item  += "<\/li>";

		console.log(new_srt_list_item);

		$("ul#list").prepend(new_srt_list_item);


		// .css({
		// 	"background-color"	: "rgba(250,250,250,.025)",
		// 	"transition" 		: "background-color .3s linear .5s",
		// 	"-webkit-transition": "background-color .3s linear .5s"
		// })
		// .delay("slow")
		// .css("background-color", "auto")
		// ;

		openMenu();
	});

//
// (DRAG & DROP) & COOKIES
	var my_srt_list = document.getElementById("list"); // ul
	var my_srt_items // li
	var ids // li [data-sortable-id]

	//-- Get the sorted NodeList (array) of items
	function getOrder() {
		my_srt_items = document.querySelectorAll("[data-sortable-id]");
		IDs = [].map.call(my_srt_items, function (el) {
							return el.dataset.sortableId; // [data-sortable-id]
						});
		console.log("IDs: " + IDs);
	}
	//-- Refresh the order everytime the item is dragged & dropped
	my_srt_list.addEventListener("dragend", getOrder, false);

	// Store an order of our sortable list for user in cookie
	// ?

// Change background color of item being dragged
/*	$(".sortable.item").bind({
		dragstart: function() {
			$(this)
				.css({
					"background-color"	: "rgba(250,250,250,.025)",
					"transition" 		: "background-color .3s linear .5s",
					"-webkit-transition": "background-color .3s linear .5s"
				});
		},
		dragend: function() {
			$(this).css("background-color", "transparent");
		},
	});
*/
// console.log("List: " + my_srt_list);
// console.log("Items: " + window.my_srt_items);

});