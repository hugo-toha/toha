const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";

function enableDarkTheme() {
  localStorage.setItem('color-theme', DARK);
  DarkReader.enable({
      brightness: 100,
      contrast: 100,
      sepia: 0
  });
}

function enableLightTheme() {
  localStorage.setItem('color-theme', LIGHT);
  DarkReader.disable();
}

function useSystemTheme() {
  localStorage.setItem('color-theme', SYSTEM);
  DarkReader.auto({
    brightness: 100,
    contrast: 100,
    sepia: 0
  });
}

function initializeColorScheme() {
  // We're using the themeInitialization attributes as a 'hack' for setting up
  // the default color scheme because we don't want to complicate this further
  // by creating custom javascript output in Hugo.
  let themeInitialization = document.getElementById("themeInitialization");
  let defaultColorScheme = themeInitialization.getAttribute('default-theme');
  // If the user has already selected a preferred theme then use that instead
  // of the default theme. Also, the default theme gets loaded to localStorage
  // on the first visit.
  let colorTheme = localStorage.getItem('color-theme');
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
initializeColorScheme()
