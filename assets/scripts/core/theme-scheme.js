let theme = localStorage.getItem('theme-scheme') || localStorage.getItem('darkmode:color-scheme') || 'dark'
if (theme === 'system') {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark'
  } else {
    theme = 'dark'
  }
}
document.documentElement.setAttribute('data-theme', theme)
