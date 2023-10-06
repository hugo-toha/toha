const PERSISTENCE_KEY = 'darkmode:color-scheme'

window.addEventListener('load', async () => {
  const menu = document.getElementById('themeMenu')
  const $icon = document.getElementById('navbar-theme-icon-svg')
  if (menu == null || $icon == null) return

  const btns = menu.getElementsByTagName('a')
  const iconMap = Array.from(btns).reduce((map, btn) => {
    const $img = btn.getElementsByTagName('img')[0]
    map[btn.dataset.scheme] = $img.src
    return map
  }, {})


  function loadScheme() {
    return localStorage.getItem(PERSISTENCE_KEY) || "system"
  }

  function saveScheme(scheme) {
    localStorage.setItem(PERSISTENCE_KEY, scheme)
  }

  function getPreferredColorScheme() {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkMode ? "dark" : "light";
  }

  function setScheme(newScheme) {
    let theme = newScheme
    if (newScheme === 'system') {
      theme = getPreferredColorScheme()
    }
    // set data-theme attribute on html tag
    document.querySelector("html").dataset.theme = theme;

    // update icon
    $icon.src = iconMap[newScheme]

    // save preference to local storage
    saveScheme(newScheme)
  }

  setScheme(loadScheme())

  Array.from(menu.getElementsByTagName('a')).forEach((btn) => {
    btn.addEventListener('click', () => {
      const { scheme } = btn.dataset
      setScheme(scheme)
    })
  })
})
