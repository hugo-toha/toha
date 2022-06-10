const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";
const COLOR_THEME = "color-theme";
const DARK_OPTIONS = {
  brightness: 100,
  contrast: 100,
  sepia: 0
};
const SVG_INVERT = {invert: ['img[src$=".svg"]']};

function enableDarkTheme() {
  localStorage.setItem(COLOR_THEME, DARK);
  DarkReader.enable(DARK_OPTIONS, SVG_INVERT);
}

function enableLightTheme() {
  localStorage.setItem(COLOR_THEME, LIGHT);
  DarkReader.disable();
}

function useSystemTheme() {
  localStorage.setItem(COLOR_THEME, SYSTEM);
  DarkReader.auto(DARK_OPTIONS, SVG_INVERT);
}

function initializeColorTheme() {
  // We're using the themeInitialization attributes as a 'hack' for setting up
  // the default color scheme because we don't want to complicate this further
  // by creating custom javascript output in Hugo.
  let themeInitialization = document.getElementById("themeInitialization");
  let defaultColorScheme = themeInitialization.getAttribute('default-theme');
  // If the user has already selected a preferred theme then use that instead
  // of the default theme. Also, the default theme gets loaded to localStorage
  // on the first visit.
  let colorTheme = localStorage.getItem(COLOR_THEME);
  if (colorTheme == null || colorTheme.length == 0) {
    colorTheme = defaultColorScheme;
  }
  // Enable the color theme
  if (colorTheme == DARK) {
    enableDarkTheme();
  } else if (colorTheme == SYSTEM) {
    useSystemTheme();
  } else {
    // We use light theme for the two conditions below.
    // 1. the selected theme is light
    // 2. no default theme is found - fall back to original behavior
    enableLightTheme();
  }
}
initializeColorTheme()
