import * as params from '@params';
const PERSISTENCE_KEY = 'theme-scheme'

const themeOptions = params.theme || {}
const THEME_DARK = typeof themeOptions.dark === 'undefined' ? true : themeOptions.dark;
const THEME_LIGHT = typeof themeOptions.light === 'undefined' ? true : themeOptions.light;
const THEME_DEFAULT = typeof themeOptions.default === 'undefined' ? "system" : themeOptions.default;

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


  function checkScheme(scheme) {
    if (THEME_LIGHT === false) return "dark"
    if (THEME_DARK === false) return "light"
    return scheme
  }

  function loadScheme() {
    return localStorage.getItem(PERSISTENCE_KEY) || loadDefaultScheme()
  }

  function loadDefaultScheme() {
    return THEME_DEFAULT || "system"
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
  
    setImages(theme)
  }

  const checkedScheme = checkScheme(loadScheme())
  setScheme(checkedScheme)

  Array.from(menu.getElementsByTagName('a')).forEach((btn) => {
    btn.addEventListener('click', () => {
      const { scheme } = btn.dataset
      setScheme(scheme)
    })
  })
})

function setImages(newScheme) {
  const els = Array.from(document.getElementsByClassName('logo-holder'));
  for (const el of els) {
    const light = el.querySelector('.light-logo');
    const dark = el.querySelector('.dark-logo');

    if (newScheme === "dark" && dark !== null) {
      if (light !== null) light.style.display = 'none'
      dark.style.display = 'inline'
    }
    else {
      if (light !== null) light.style.display = 'inline'
      if (dark !== null) dark.style.display = 'none'
    }
  }
}
