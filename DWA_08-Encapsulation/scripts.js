// eslint-disable-next-line import/extensions
import { books, authors, genres, BOOKS_PER_PAGE } from "./src/data.js";
// eslint-disable-next-line import/extensions
import toggleOverlay from "./src/overlay.js";
// eslint-disable-next-line import/extensions
import elementSelectors from "./src/constants/elementSelectors.js";

if (!document) throw new Error();

const starting = document.createDocumentFragment();


/* Refactored this part to create the option Html inside of a function */
const createOptionHtml = (value, innerText) => {
  const Html = document.createDocumentFragment();
  const firstElement = document.createElement("option");
  firstElement.value = value;
  firstElement.innerText = innerText;
  Html.appendChild(firstElement);

  return Html;
};

const genreHtml = createOptionHtml("any", "All Genres");

/**
 * Creates an option element
 * @param {string} id - ID of option
 * @param {string} name - Name of option
 * @returns {HTMLOptionElement} - Option element
 */
const createOptionElement = (id, name) => {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  return element;
};

// Creates option element and appends to search-genres list
Object.entries(genres).forEach((id, name) => {
  genreHtml.appendChild(createOptionElement(id, name));
});
// @ts-ignore
// document.querySelector("[data-search-genres]").appendChild(genreHtml);
document
  .querySelector(elementSelectors.search.searchGenres)
  .appendChild(genreHtml);

// =====================================================

const authorsHtml = createOptionHtml("any", "All Authors");

// Creates option element and appends to search-authors list
Object.entries(authors).forEach(([id, name]) => {
  authorsHtml.appendChild(createOptionElement(id, name));
});
// @ts-ignore
document
  .querySelector(elementSelectors.search.searchAuthors)
  .appendChild(authorsHtml);

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

// @ts-ignore
document.querySelector(
  elementSelectors.list.listButton
).innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
// @ts-ignore
document.querySelector(elementSelectors.list.listButton).disabled =
  matches.length - page * BOOKS_PER_PAGE > 0;

document.querySelector(elementSelectors.list.listButton).innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

// Closes search overlay on click of cancel button
document
  .querySelector(elementSelectors.search.searchCancel)
  .addEventListener("click", () => {
    toggleOverlay(elementSelectors.search.searchOverlay, false);
  });

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

/**
 * Handles submit event of the search form to search for
 * what was specified
 * @param {Event} event - Form submit event
 */
const handleSubmitSearchForm = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const filteredBooks = filterBooks(books, filters);

  page = 1;
  matches = filteredBooks;

  if (filteredBooks.length < 1) {
    document
      .querySelector(elementSelectors.list.listMessage)
      .classList.add("list__message_show");
  } else {
    document
      .querySelector(elementSelectors.list.listMessage)
      .classList.remove("list__message_show");
  }

  document.querySelector(elementSelectors.list.listItems).innerHTML = "";
  const newItems = document.createDocumentFragment();

  filteredBooks
    .slice(0, BOOKS_PER_PAGE)
    .forEach(({ author, id, image, title }) => {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `;

      newItems.appendChild(element);
    });

  document.querySelector(elementSelectors.list.listItems).appendChild(newItems);
  document.querySelector(elementSelectors.list.listButton).disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  document.querySelector(elementSelectors.list.listButton).innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${
        matches.length - page * BOOKS_PER_PAGE > 0
          ? matches.length - page * BOOKS_PER_PAGE
          : 0
      })</span>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(elementSelectors.search.searchOverlay).open = false;
};
document
  .querySelector(elementSelectors.search.searchForm)
  .addEventListener("submit", handleSubmitSearchForm);
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
