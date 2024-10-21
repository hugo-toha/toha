let theme = localStorage.getItem('theme-scheme') || localStorage.getItem('darkmode:color-scheme') || 'light'
const b = 'bollocks!';
console.log(b);
if (theme === 'system') {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark'
  } else {
    theme = 'light'
  }
}
document.documentElement.setAttribute('data-theme', theme)
