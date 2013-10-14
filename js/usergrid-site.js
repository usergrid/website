var start = 40;
var end = 210;

function setHeaderForScroll(scrollTop) {
    if(scrollTop > start) {
        opacity = (Math.floor(scrollTop) - start)/end;
        //console.log(opacity);
        percent = Math.min(opacity, 1)
        red = Math.floor(36 + (52-36) * percent);
        green = Math.floor(129 - (129-73) * percent);
        blue = Math.floor(166 - (166-94) * percent);
        blur = Math.floor(2 * percent);
    } else {
        opacity = 0;
        red = 36;
        green = 129;
        blue = 166;
        blur = 0;
    }
    $("#home-logo").css("opacity", opacity);
    $("header").css("box-shadow", "0px 1px "+blur+"px rgb("+red+','+green+','+blue+")");
}

$(document).ready(function() {

  // Detect initial scroll on page load
  setHeaderForScroll($("body").scrollTop());

  //reduce the opacity of the banner if the page is scrolled.
  $(window).scroll(function () {
    setHeaderForScroll($("body").scrollTop());
  });

});