// eslint-disable-next-line import/extensions
import { books, authors, genres, BOOKS_PER_PAGE } from "./src/data.js";
// eslint-disable-next-line import/extensions
import toggleOverlay from "./src/overlay.js";
// eslint-disable-next-line import/extensions
import elementSelectors from "./src/constants/elementSelectors.js";

if (!document) throw new Error();
(function setup() {
  const bookList = createBookListHtml(state.getBooks);

  const search = createSearchHtml(genres, authors);


document
  .querySelector(elementSelectors.settings.settingsCancel)
  .addEventListener("click", () => {
    toggleOverlay(elementSelectors.settings.settingsOverlay, false);
  });

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

document
  .querySelector(elementSelectors.list.listClose)
  .addEventListener("click", () => {
    toggleOverlay(elementSelectors.list.listActive, false);
  });

/* Here I refactored the onSubmit event to be inside of a function */

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

document
  .querySelector(elementSelectors.settings.settingsForm)
  .addEventListener("submit", handleSubmitSettingsForm);
// =======================================================

/* Here I refactored the onSubmit event to be inside a function */

const filterBooks = (booksThatWillBeFiltered, filters) => {
  const result = [];

  result.push(
    booksThatWillBeFiltered.filter((book) => {
      const genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);

      return (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      );
    })
  );

  return result;
};



// ========================================================

/*
 *Here I refactored the code to put the onclick event into a function
 * and separated the getting of the active book as the business logic from the
 * updating of the view
 */

