"use strict";

(function ($) {
  jQuery(document).ready(function () {

    // change navbar style on scroll
    // ==================================================
    // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
    // $.onscroll = function() {scrollFunction()};
    $(document).scroll(function () {
      const logo = $('#logo');
      const source = logo.attr("src");
      if ($(document).scrollTop() > 40) {
        $('#top-navbar').removeClass('initial-navbar');
        $('#top-navbar').addClass('final-navbar shadow');

        $('#navbar-toggler').removeClass('navbar-dark');
        $('#navbar-toggler').addClass('navbar-light');

        if (!source.includes("assets/images/logo.png")) {
          logo.attr("src","assets/images/logo.png");
        }
      } else {
        $('#top-navbar').removeClass('final-navbar shadow');
        $('#top-navbar').addClass('initial-navbar');

        $('#navbar-toggler').removeClass('navbar-light');
        $('#navbar-toggler').addClass('navbar-dark');
        
        if (!source.includes("assets/images/logo-inverted.png")) {
          logo.attr("src","assets/images/logo-inverted.png");
        }
      }
    });
  });

})(jQuery);
