function enableDarkTheme() {
  localStorage.setItem('color-scheme', "dark");
  DarkReader.enable({
      brightness: 100,
      contrast: 100,
      sepia: 0
  });
}

function enableLightTheme() {
  localStorage.setItem('color-scheme', "light");
  DarkReader.disable();
}

function useSystemTheme() {
  localStorage.setItem('color-scheme', "system");
  DarkReader.auto({
    brightness: 100,
    contrast: 100,
    sepia: 0
  });
}

function initializeColorScheme() {
  // We're using the themeInitialization attributes as a 'hack' for setting up the
  // default color scheme becauase we don't want to complicate this further by
  // creating custom javascript output in Hugo.
  themeInitialization = document.getElementById("themeInitialization");
  defaultColorScheme = themeInitialization.getAttribute('default-theme');
  // If the user has already selected a preferred theme then use that instead
  // of the default theme. Also, the default theme gets loaded to localStorage
  // on the first visit.
  if (!localStorage.getItem('color-scheme'))
    localStorage.setItem('color-scheme', defaultColorScheme);
  storedColorScheme = localStorage.getItem('color-scheme');
  if (storedColorScheme == "dark") {
    enableDarkTheme();
  } else if (storedColorScheme == "system") {
    useSystemTheme();
  } else {
    // We use light theme for the two conditions below.
    // 1. the selected theme is light
    // 2. no default theme is found - fall back to original behavior
    enableLightTheme();
  }
}
initializeColorScheme()
