// Posun šipkama v cestě
$(document).keydown(function (event) {
  if (event.which == 37) {
    $('#prevPage').get(0).click();
    // console.log ('prev');
  } else if (event.which == 39) {
    $('#nextPage').get(0).click();
    // console.log ('next');
  }
});