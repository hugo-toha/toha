import Filterizr from 'filterizr';
import { insertScript } from '../core'

document.addEventListener('DOMContentLoaded', () => {
  // ================== Project cards =====================

  // setup project filter buttons
  var projectCardHolder = document.getElementById("project-card-holder");
  if (projectCardHolder != null && projectCardHolder.children.length != 0) {
    new Filterizr(".filtr-projects", {
      layout: 'sameWidth',
      controlsSelector: '.project-filtr-control',
    });
  }
});

// dynamically insert github buttons script.
insertScript('github-buttons', 'https://buttons.github.io/buttons.js');
