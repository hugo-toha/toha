import Filterizr from 'filterizr'

document.addEventListener('DOMContentLoaded', () => {
  // ================== Skill cards =====================

  // setup skill filter buttons
  const skillCardHolder = document.getElementById('skill-card-holder')
  if (skillCardHolder != null && skillCardHolder.children.length !== 0) {
    // eslint-disable-next-line no-new
    new Filterizr('.filtr-skills', {
      layout: 'sameWidth',
      controlsSelector: '.skill-filtr-control'
    })
  }
})
