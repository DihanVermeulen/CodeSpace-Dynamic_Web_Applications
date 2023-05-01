import elementSelectors from "../constants/elementSelectors.js";
import toggleOverlay from "./overlay.js";

/**
 * Handles submit event of settings form to change the
 * theme between dark or light
 * @param {Event} event - Form submit event
 */
const handleSubmitSettingsForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  toggleOverlay(elementSelectors.settings.settingsOverlay, false);
};

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
  document
    .querySelector(elementSelectors.settings.settingsForm)
    .addEventListener("submit", handleSubmitSettingsForm);

  document
    .querySelector(elementSelectors.settings.settingsCancel)
    .addEventListener("click", () => {
      toggleOverlay(elementSelectors.settings.settingsOverlay, false);
    });
};

export default initiateSettings;
