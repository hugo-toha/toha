import { enable, disable, auto, setFetchMethod } from 'darkreader'
import * as params from '@params'

const darkreader = params?.darkmode?.darkreader || {}
const defaultColorScheme = darkreader.defaultcolorscheme || 'system'
const theme = {
  brightness: 100,
  contrast: 100,
  sepia: 0,
  ...(darkreader.theme || {})
}
const fixes = {
  invert: ['img[src$=".svg"]'],
  ...(darkreader.fixes || {})
}
setFetchMethod(window.fetch)

export function setSchemeDark () {
  enable(theme, fixes)
}

export function setSchemeLight () {
  disable()
}

export function setSchemeSystem () {
  auto(theme, fixes)
}

export { defaultColorScheme }
