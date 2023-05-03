/**
 * Toggles the overlay based on the state passed in
 * @param {string} selector
 * @param {boolean} state
 */
const toggleOverlay = (selector, state) => {
  document.querySelector(selector).open = state;
};

export default toggleOverlay;
