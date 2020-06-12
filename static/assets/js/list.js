"use strict";

var filterizd;

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

    // ======= Adjust height of the post cards =============
    function adjustPostCardsHeight() {
      if (!isMobile) { // no need to adjust height for mobile devices
        let postCardHolder = document.getElementById("post-cards");
        if (postCardHolder == null ){
          return
        }
        let el = postCardHolder.children;
        let maxHeight = 0;
        for (let i = 0; i < el.length; i++) {
          if (el[i].children[1].clientHeight > maxHeight) {
            maxHeight = el[i].children[1].clientHeight;
          }
        }
        for (let i = 0; i < el.length; i++) {
          el[i].children[1].setAttribute("style", "min-height: " + maxHeight + "px;")
        }
      }
    }
    adjustPostCardsHeight();

    // ============= Sidebar Tree ================
    function buildSidebarMenu() {
      var openedClass = "fa-minus-circle";
      var closedClass = "fa-plus-circle";
      // initialize top level
      var tree = $("#tree");
      // add expand icon to those li who has ul as children
      tree.find("li").has("ul").each(function () {
        var branch = $(this);
        branch.prepend('<i class="fas ' + closedClass + '"></i>');
        branch.on('click', function (e) {
          if (this.children[1] == e.target) {
            // toggle "expand" class and icon
            branch.toggleClass("expand");
            var icon = $(this).children('i:first');
            icon.toggleClass(openedClass + " " + closedClass);
          }
        });
      });

      // remove "expnad" class from siblings of the clicked item
      tree.find("li").on("click", function () {
        var item = $(this);
        var shiblings = item.siblings().each(function () {
          var sibling = $(this);
          if (sibling.hasClass("expand")) {
            sibling.removeClass("expand");
            var icon = sibling.children('i:first');
            icon.toggleClass(openedClass + " " + closedClass);
          }
        });
      });

      // focus the cliked item
      tree.find("a").on("click", function () {
        // clear other focused link
        tree.find("a.focused").each(function () {
          $(this).removeClass("focused");
        });
        // focus cliked link
        $(this).addClass("focused");
      });
    }

    buildSidebarMenu();
    // initialize filterizr
    filterizd = $(".filtr-container").filterizr({ layout: 'sameWidth' });
  });
})(jQuery);

// toggle sidebar on click
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hide");
  document.getElementById("content").classList.toggle("overley");

  // if it is mobile device. then scroll to top.
  if (isMobile && $("#sidebar").hasClass("hide")) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  setTimeout(function () {
    filterizd.filterizr('sort');
  }, 300);
}
