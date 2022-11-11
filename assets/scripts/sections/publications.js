import Filterizr from 'filterizr';

document.addEventListener('DOMContentLoaded', () => {
  var publicationCardHolder = document.getElementById("publication-card-holder");
  if (publicationCardHolder != null && publicationCardHolder.children.length != 0) {
    new Filterizr(".filtr-publications", {
      layout: 'sameWidth',
      gridItemsSelector: '.pub-filtr-item',
      controlsSelector: '.pub-filtr-control',
    });
  }
});
