import { getDeviceState } from '../../core'

// Toggle Table of Contents on click. Here, class "hide" open the toc
function toggleTOC () {
  const toc = document.getElementById('toc-section')
  if (toc == null) {
    return
  }

  if (toc.classList.contains('hide')) {
    toc.classList.remove('hide')
  } else {
    // if sidebar-section is open, then close it first
    const sidebar = document.getElementById('sidebar-section')
    if (sidebar != null && sidebar.classList.contains('hide')) {
      sidebar.classList.remove('hide')
    }
    // add "hide" class
    toc.classList.add('hide')
    // if it is mobile device. then scroll to top.
    const { isMobile } = getDeviceState()
    if (isMobile && toc.classList.contains('hide')) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
  if (document.getElementById('hero-area') != null) {
    document.getElementById('hero-area').classList.toggle('hide')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // bind click event to #toc-toggle in navbar-2.html
  const toggle = document.getElementById('toc-toggler')
  if (toggle) toggle.addEventListener('click', toggleTOC)

  // hide TOC when user clicks on a TOC link.
  // Only applies if it's mobile.
  const toc = document.getElementById('TableOfContents')
  if (toc) {
    toc.addEventListener('click', (event) => {
      const { isMobile } = getDeviceState()
      if (isMobile && event.target.nodeName === 'A') {
        toggleTOC()
      }
    })
  }
})
