import toggleOverlay from "./overlay.js";
import elementSelectors from "../constants/elementSelectors.js";

const initiateHeader = () => {
  document
    .querySelector(elementSelectors.header.headerSearch)
    .addEventListener("click", () => {
      toggleOverlay(elementSelectors.search.searchOverlay, true);
      document.querySelector(elementSelectors.search.searchTitle).focus();
    });

  document
    .querySelector(elementSelectors.header.headerSettings)
    .addEventListener("click", () => {
      toggleOverlay(elementSelectors.settings.settingsOverlay, true);
    });
};

export default initiateHeader;
