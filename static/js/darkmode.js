function enableDarkTheme() {
  localStorage.setItem('color-scheme', "dark");
  DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 10
  });
}

function enableLightTheme() {
  localStorage.setItem('color-scheme', "light");
  DarkReader.disable();
}

function useSystemTheme() {
  localStorage.setItem('color-scheme', "system");
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkTheme();
  } else {
    enableLightTheme();
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  });
}

// Initialize. Use dark as default.
function initializeColorScheme() {
  // We're using the themeSelector attributes as a workaround for setting up
  // the default coor scheme since we don't want to complicate this further by
  // creating custom javascript output in Hugo.
  themeSelector = document.getElementById("themeSelector");
  defaultColorScheme = themeSelector.getAttribute('default-theme');
  // If the user has already selected a preferred theme then use that instead
  // of the default theme. Also, the default theme gets loaded to localStorage
  // on the first visit.
  if (!localStorage.getItem('color-scheme'))
    localStorage.setItem('color-scheme', defaultColorScheme);
  storedColorScheme = localStorage.getItem('color-scheme');
  if (storedColorScheme == "light") {
    enableLightTheme();
  } else if (storedColorScheme == "system") {
    useSystemTheme();
  } else {
    // Use dark theme as fallback since it is my default.
    enableDarkTheme();
  }
}
initializeColorScheme()
