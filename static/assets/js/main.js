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
      // Add smooth scrolling to all links
      $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          let offset = 60;
          if (isMobile) {
            offset = 760;
          } else if (isTablet) {
            offset = 60;
          }
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top - offset
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash - offset;
          });
        } // End if
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

