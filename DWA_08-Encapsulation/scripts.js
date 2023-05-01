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
})();

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

// ==============================================================

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

/**
 * Gets the active book that is selected
 * @param {Event} event - Event that is passed in
 * @returns {boolean} - If the book is active
 */
const getActiveBook = (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  pathArray.forEach((node) => {
    if (active) return;

    if (node?.dataset?.preview) {
      let result = null;
      books.forEach((singleBook) => {
        if (result) return;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      });

      active = result;
    }
  });

  return active;
};

/**
 * Updates the active book view
 * @param {boolean} active - Active book
 */
const updateActiveBookView = (active) => {
  toggleOverlay(elementSelectors.list.listActive, true);
  document.querySelector(elementSelectors.list.listBlur).src = active.image;
  document.querySelector(elementSelectors.list.listImage).src = active.image;
  document.querySelector(elementSelectors.list.listTitle).innerText =
    active.title;
  document.querySelector(elementSelectors.list.listSubtitle).innerText = `${
    authors[active.author]
  } (${new Date(active.published).getFullYear()})`;
  document.querySelector(elementSelectors.list.listDescription).innerText =
    active.description;
};

/**
 * On click event for list items to open modal
 * @param {Event} event - On click event
 */
const handleListItemsClick = (event) => {
  const active = getActiveBook(event);
  if (active) updateActiveBookView(active);
};

document
  .querySelector(elementSelectors.list.listItems)
  .addEventListener("click", handleListItemsClick);
// =========================================================
