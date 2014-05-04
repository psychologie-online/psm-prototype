// ---------------------------------------------------------------------------------------------------
// Variables

var quantity
var my_srt_list = document.getElementById("list"); // ul
var my_srt_items // li [data-sortable-id]
var IDs // [data-sortable-id]=" "

var add_to_sidebar = document.getElementsByClassName("add-to-sidebar");
var remove_from_sidebar = document.getElementsByClassName("icon-close");


// ---------------------------------------------------------------------------------------------------
// Functions


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

// Get the sorted string of items
function getOrder() {
	my_srt_items = document.querySelectorAll("[data-sortable-id]");
	IDs = [].map.call(my_srt_items, function (element) {
							return element.dataset.sortableId; // [data-sortable-id]
						});

		// Update the number indicating the quantity of items added in sidebar
		quantity = $(".sortable.item").length + 1;

		if( quantity < 1 ) {
			$("#quantity").fadeOut();
		}
		else {
			$("#quantity").fadeIn(100).text(quantity);
		}

		console.log("Počet položek: " + quantity);
		console.log("IDs: " + IDs);

		storeCookie();

		return false;
	}


// HTML for new item
function prependItem() {
	var exp_name = $(add_to_sidebar).data('exp-name');
	var exp_text = $(add_to_sidebar).data('exp-text');
	var exp_ID   = $(add_to_sidebar).data('exp-id');

	var new_srt_list_item	="";
	new_srt_list_item  += "<li data-sortable-id=\"" + exp_ID + "\" class=\"sortable item highlight\">";
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

	// console.log(new_srt_list_item);

	$("ul#list").prepend(new_srt_list_item);
}

function removeItem() {
	// $(".icon-close").click (function(e) {
	// 	document.find(e.closest('.sortable.item').remove());
	// });
}


// COOKIES
//
// ! Doesn't work in Chrome when testing local – use Firefox
// Store an order of our sortable list for user in cookie
// ?
function storeCookie() {
	$.cookie('order', IDs, { expires: 31, path: '/' });

	// console.log("Cookie: " + cookie);
	var cookies = $.cookie("order");
	console.log("Saved cookie ORDER: " + cookies);
}

// http://stackoverflow.com/questions/15353244/jquery-ui-sortable-and-js-cookie
function restoreCookie() {

	var cookies = $.cookie("order");
	console.log("Loaded cookie ORDER: " + cookies);

	if (!cookies) return;

	var SavedID = cookies.split(',');
	for ( var u=0, ul=SavedID.length; u < ul; u++ ) {
		SavedID[u] = SavedID[u].split(',');
	}
	console.log("SavedID: " + SavedID);

	for (var Scolumn=0, n = SavedID.length; Scolumn < n; Scolumn++) {
		for (var Sitem=0, m = SavedID[Scolumn].length; Sitem < m; Sitem++) {
			prependItem();

			// console.log("Scolumn: " + Scolumn);
			// console.log("Sitem: " + Sitem);
		}


	}
}


// ---------------------------------------------------------------------------------------------------
// Executions

$(document).ready(function() {

// (OPEN & CLOSE) SIDEBAR
	// Click anywhere to close sidebar
	$(document).click (function(e) {
		if (
			!$(e.target).is('a.menu') &&
			!$(e.target).is(add_to_sidebar) &&
			!$(e.target).is(remove_from_sidebar) &&
			$(e.target).closest('aside.menu').length === 0 ) {

			closeMenu();
		}
	});

	// Menu link sidebar
	$('a.menu').click (function(e){

		if( $('.wrap').hasClass('menu-open') ){
			closeMenu();
		} else {
			openMenu();
		}

		// e.preventDefault();
		// e.stopPropagation();
		return false;
	});

// (ADD TO) SIDEBAR
	// Pokud experiment ve výběru již figuruje, znemožnit jeho opětovné přidání
	// Položky s možností přidání do výběru musejí mít unikátní manuálně nastavené ID -> var exp_ID = [data-exp-id]
	$(add_to_sidebar).on("click", function(e) {
		prependItem();
		openMenu();

	});

	$(remove_from_sidebar).click (function(e) {
		$(e.target).parents('.sortable.item').remove();
	});

// Refresh the order everytime the item is dragged & dropped, added or deleted
my_srt_list.addEventListener("dragend", getOrder);
$(add_to_sidebar).on("click", getOrder);
$(remove_from_sidebar).on("click", getOrder);

restoreCookie();
});