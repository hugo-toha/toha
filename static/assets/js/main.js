"use strict";

var projectCards;
var isMobile = false, isTablet = false, isLaptop = false;
(function ($) {
  jQuery(document).ready(function () {
    function detectDevice() {
      if (window.innerWidth <= 425) {
        isMobile = true;
        isTablet = false;
        isLaptop = false;
      } else if (window.innerWidth <= 768) {
        isMobile = false;
        isTablet = true;
        isLaptop = false;
      } else {
        isMobile = false;
        isTablet = false;
        isLaptop = true;
      }
    }
    detectDevice();

    // ================= Smooth Scroll ===================
    function addSmoothScroll() {
      // ref: https://css-tricks.com/snippets/jquery/smooth-scrolling/
      // Select all links with hashes
      $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();

              let offset = 60;
              if (isMobile) {
                offset = 710;
              } else if (isTablet) {
                offset = 60;
              }
              $('html, body').animate({
                scrollTop: target.offset().top - offset
              }, 1000, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                };
              });
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = this.hash
            }
          }
        });
    }
    addSmoothScroll();

    // re-render custom functions on window resize
    window.onresize = function () {
      detectDevice();
      addSmoothScroll();
    };
  });
})(jQuery);


// Toggle sidebar on click. Here, class "hide" open the sidebar
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar-section");
  if (sidebar == null) {
    return
  }
  if (sidebar.classList.contains("hide")) {
    sidebar.classList.remove("hide")
  } else {
    // if toc-section is open, then close it first
    let toc = document.getElementById("toc-section");
    if (toc != null && toc.classList.contains("hide")) {
      toc.classList.remove("hide");
    }
    // add "hide" class
    sidebar.classList.add("hide")
    // if it is mobile device. then scroll to top.
    if (isMobile && sidebar.classList.contains("hide")) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (document.getElementById("hero-area") != null) {
        document.getElementById("hero-area").classList.toggle("hide");
      }
    }
  }
  if (document.getElementById("content-section") != null) {
    document.getElementById("content-section").classList.toggle("hide");
  }
}

// Toggle Table of Contents on click. Here, class "hide" open the toc
function toggleTOC() {
  let toc = document.getElementById("toc-section");
  if (toc == null) {
    return
  }
  if (toc.classList.contains("hide")) {
    toc.classList.remove("hide");
  } else {
    // if sidebar-section is open, then close it first
    let sidebar = document.getElementById("sidebar-section");
    if (sidebar != null && sidebar.classList.contains("hide")) {
      sidebar.classList.remove("hide");
    }
    // add "hide" class
    toc.classList.add("hide")
    // if it is mobile device. then scroll to top.
    if (isMobile && toc.classList.contains("hide")) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
  if (document.getElementById("hero-area") != null) {
    document.getElementById("hero-area").classList.toggle("hide");
  }
}

