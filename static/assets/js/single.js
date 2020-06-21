"use strict";

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

    // =========== Add anchor to the headers ================
    function addAnchor(element) {
      element.innerHTML = `<a href="#${element.id}" class="header-anchor">${element.innerHTML}<sup><i class="fas fa-link"></i></sup></a>`;
    }

    var postContent = document.getElementById("post-content");
    if (postContent != null) {
      var headerTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
      for (var i = 0; i < headerTypes.length; i++) {
        var headers = postContent.querySelectorAll(headerTypes[i]);
        if (headers) {
          headers.forEach(addAnchor);
        }
      }
    }

  });
})(jQuery);
