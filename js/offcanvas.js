// ---------------------------------------------------------------------------------------------------
// Variables

var quantity
var my_srt_list = document.getElementById("list"); // ul
var my_srt_items // li [data-sortable-id]
var IDs // [data-sortable-id]=" "

var add_to_sidebar = document.getElementsByClassName("add-to-sidebar");
var remove_from_sidebar


// ---------------------------------------------------------------------------------------------------
// Functions

function openMenu(){
	$('.wrap, .contain-to-grid').addClass('menu-open');
	setTimeout(function(){
		$('aside.menu').css('z-index', 2000);
			$(".sortable.item").delay(500).removeClass( "highlight" ); // Highlight new added item
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

	// Update the number indicating the quantity of items added to the sidebar
	quantity = $(".sortable.item").length;

	if( quantity < 1 ) {
		$("#quantity").text(quantity);
		$("#spustit-cestu").hide();
	}
	else {
		$("#quantity").text(quantity);
		$("#spustit-cestu").show();
	}

	console.log("# položek(quantity): " + quantity);
	// console.log("IDs: " + IDs);

	// Uložit pořadí do cookies pokaždý, když je vyvolaná funknce getOrder, což by se mělo stát pokaždé, když se změní počet či pořadí položek v offanvasu
	storeCookie();

	remove_from_sidebar = document.getElementsByClassName("icon-close");
	console.log("# icon-close (getOrder): " + remove_from_sidebar.length + "\n ===========");

	return false;
}

// HTML for new item
function prependItem() {
	var exp_name = $(add_to_sidebar).data('exp-name');
	var exp_text = $(add_to_sidebar).data('exp-text');
	var exp_ID   = $(add_to_sidebar).data('exp-id');

	var new_srt_list_item	="";
	new_srt_list_item  += "<li data-sortable-id=\"" + exp_ID + "\" class=\"sortable item highlight\">";
	// new_srt_list_item  += "  <hr>";
	new_srt_list_item  += "  <div class=\"row\">";
	// new_srt_list_item  += "    <div class=\"small-1 columns text-center\">";
	// new_srt_list_item  += "      <span class=\"icon-menu\"><\/span><span class=\"mls\"><\/span>";
	// new_srt_list_item  += "    <\/div>";
	// new_srt_list_item  += "    <div class=\"small-1 columns text-center\">";
	// new_srt_list_item  += "      <input type=\"checkbox\" name=\"cesta\" value=\"ano\">";
	// new_srt_list_item  += "      <label class=\"green-border\" for=\"a\"><\/label>";
	// new_srt_list_item  += "    <\/div>";
	new_srt_list_item  += "    <div class=\"small-9 small-offset-1 columns\">";
	new_srt_list_item  += "      <h4><a href=\"\">" + exp_name + "<\/a><\/h4>";
	new_srt_list_item  += "      <p>" + exp_text + "<\/p>";
	new_srt_list_item  += "    <\/div>";
	new_srt_list_item  += "    <div class=\"small-2 columns text-center\">";
	new_srt_list_item  += "      <span class=\"icon-close\"><\/span><span class=\"mls\"><\/span>";
	new_srt_list_item  += "    <\/div>";
	new_srt_list_item  += "  <\/div>";
	// new_srt_list_item  += "  <hr>";
	new_srt_list_item  += "<\/li>";

	// console.log(new_srt_list_item);

	$("ul#list").prepend(new_srt_list_item);
}

function removeItem(e) {

	console.log("# icon-close (removeItem): " + remove_from_sidebar.length);

	e.preventDefault();
	e.stopPropagation();
	$(e.target).parents('.sortable.item').remove();

	console.log("REMOVED (removeItem)");

	getOrder();

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
	console.log("SAVED (storeCookie): " + cookies);
}
// http://stackoverflow.com/questions/15353244/jquery-ui-sortable-and-js-cookie
function restoreCookie() {

	var cookies = $.cookie("order");
	console.log("LOADED (restoreCookie): " + cookies);

	if (!cookies) return;

	var SavedID = cookies.split(',');
	for ( var u=0, ul=SavedID.length; u < ul; u++ ) {
		SavedID[u] = SavedID[u].split(',');

		// console.log("SavedID: " + SavedID);
	}
	for (var Sitem=0, n = SavedID.length; Sitem < n; Sitem++) {

		prependItem();

		// console.log("Sitem: " + Sitem);
	}
}


// ---------------------------------------------------------------------------------------------------
// Executions

$(document).ready(function() {

// Skryje tlačítko „Spustit cestu“
$("#spustit-cestu").hide();

// načte položky z cookies
restoreCookie();

// zjistí se stav a updatuje počítadlo – proměnná quantity – a podle výsledku se zase zobrazí počet a tlačítko
getOrder();

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

// ADD to & REMOVE from SIDEBAR
	// #11 https://github.com/psychologie-online/psm-prototype/issues/11
	// Položky s možností přidání do výběru musejí mít unikátní manuálně nastavené ID -> var exp_ID = [data-exp-id]
	$(add_to_sidebar).on("click", function() {
		prependItem();
		openMenu();
	});

// Refresh the order everytime the item is dragged & dropped, added or deleted
my_srt_list.addEventListener("dragend", getOrder);
$(add_to_sidebar).on("click", getOrder);
$(".icon-close").on("click", removeItem);

});