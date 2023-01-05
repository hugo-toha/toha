const PERSISTENCE_KEY = 'darkmode:color-scheme'

async function getService () {
  if (process.env.FEATURE_DARKMODE_DARKREADER === '1') {
    return await import('./darkreader')
  }

  throw Error(' No service defined for feature darkMode.')
}

window.addEventListener('DOMContentLoaded', async () => {
  const menu = document.getElementById('themeMenu')
  const $icon = document.getElementById('navbar-theme-icon-svg')
  if (menu == null || $icon == null) return

  const btns = menu.getElementsByTagName('a')
  const iconMap = Array.from(btns).reduce((map, btn) => {
    const $img = btn.getElementsByTagName('img')[0]
    map[btn.dataset.scheme] = $img.src
    return map
  }, {})

  const {
    setSchemeDark,
    setSchemeLight,
    setSchemeSystem,
    defaultColorScheme
  } = await getService()

  function loadScheme () {
    return localStorage.getItem(PERSISTENCE_KEY) || defaultColorScheme
  }

  function saveScheme (scheme) {
    localStorage.setItem(PERSISTENCE_KEY, scheme)
  }

  function setScheme (newScheme) {
    $icon.src = iconMap[newScheme]

    if (newScheme === 'dark') {
      setSchemeDark()
    } else if (newScheme === 'system') {
      setSchemeSystem()
    } else {
      setSchemeLight()
    }

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
