var limit = 300;

function setOpacityForScroll(scrollTop) {
    if(scrollTop > limit) {
        opacity = (Math.floor(scrollTop) - limit)/100;
    } else {
        opacity = 0;
    }
    $("#home-logo").css("opacity", opacity);
}


$(document).ready(function() {

  // Detect initial scroll on page load
  setOpacityForScroll($("body").scrollTop());

  //reduce the opacity of the banner if the page is scrolled.
  $(window).scroll(function () {
    setOpacityForScroll($("body").scrollTop())
  });

});