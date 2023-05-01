import elementSelectors from "../constants/elementSelectors.js";

const initiateSettings = () => {
  /*
   * Changed this part to use ternary operators
   * Changes colour theme of app
   */
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const dataSettingsTheme = document.querySelector(
    elementSelectors.settings.settingsTheme
  );
  const colorDark = prefersDarkMode ? "255, 255, 255" : "10, 10, 20";
  const colorLight = prefersDarkMode ? "10, 10, 20" : "255, 255, 255";

  // @ts-ignore
  dataSettingsTheme.value = prefersDarkMode ? "night" : "day";
  document.documentElement.style.setProperty("--color-dark", colorDark);
  document.documentElement.style.setProperty("--color-light", colorLight);
};

export default initiateSettings;
