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