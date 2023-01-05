import Filterizr from 'filterizr'

document.addEventListener('DOMContentLoaded', () => {
  const publicationCardHolder = document.getElementById('publication-card-holder')
  if (publicationCardHolder != null && publicationCardHolder.children.length !== 0) {
    // eslint-disable-next-line no-new
    new Filterizr('.filtr-publications', {
      layout: 'sameWidth',
      gridItemsSelector: '.pub-filtr-item',
      controlsSelector: '.pub-filtr-control'
    })
  }
})
