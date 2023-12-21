import { getDeviceState } from '../core/device'

// Toggle sidebar on click. Here, class "hide" open the sidebar
function toggleSidebar () {
  const sidebar = document.getElementById('sidebar-section')
  if (sidebar == null) {
    return
  }
  if (sidebar.classList.contains('expanded')) {
    sidebar.classList.remove('expanded')
  } else {
    // if toc-section is open, then close it first
    const toc = document.getElementById('toc-section')
    if (toc != null && toc.classList.contains('hide')) {
      toc.classList.remove('hide')
    }
    // add "expanded" class
    sidebar.classList.add('expanded')
    // if it is mobile device. then scroll to top.
    const { isMobile } = getDeviceState()
    if (isMobile && sidebar.classList.contains('expanded')) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      if (document.getElementById('hero-area') != null) {
        document.getElementById('hero-area').classList.toggle('hide')
      }
    }
  }
  if (document.getElementById('content-section') != null) {
    document.getElementById('content-section').classList.toggle('hide')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // bind click event to #sidebar-toggler in navbar-2.html
  const toggle = document.getElementById('sidebar-toggler')
  if (toggle) toggle.addEventListener('click', toggleSidebar)
})
