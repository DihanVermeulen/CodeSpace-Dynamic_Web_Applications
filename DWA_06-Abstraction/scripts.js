// @ts-check

// eslint-disable-next-line import/extensions
import { books, authors, genres, BOOKS_PER_PAGE } from "./src/data.js";

let page = 1;
let matches = books;

const elementSelectors = {
  header: {
    headerSearch: "[data-header-search]",
    headerSettings: "[data-header-settings]",
  },
  list: {
    listItems: "[data-list-items]",
    listButton: "[data-list-button]",
    listMessage: "[data-list-message]",
    listClose: "[data-list-close]",
    listActive: "[data-list-active]",
    listBlur: "[data-list-blur]",
    listImage: "[data-list-image]",
    listTitle: "[data-list-title]",
    listDescription: "[data-list-description]",
    listSubtitle: "[data-list-subtitle]",
  },
  search: {
    searchGenres: "[data-search-genres]",
    searchAuthors: "[data-search-authors]",
    searchOverlay: "[data-search-overlay]",
    searchCancel: "[data-search-cancel]",
    searchForm: "[data-search-form]",
    searchTitle: "[data-search-title]",
  },
  settings: {
    settingsCancel: "[data-settings-cancel]",
    settingsOverlay: "[data-settings-overlay]",
    settingsForm: "[data-settings-form]",
  },
};

/**
 * Toggles the overlay based on the state passed in
 * @param {string} selector
 * @param {boolean} state
 */
const toggleOverlay = (selector, state) => {
  document.querySelector(selector).open = state;
};

const starting = document.createDocumentFragment();

/*
 * Here I refactored this piece of code that creates a button inside of a function so
 * that it can be reused
 */

/**
 * Creates a button element with the specified properties.
 *
 * @param {Object} props - The properties of the button element.
 * @param {string} props.image - The image source URL of the button.
 * @param {string} props.author - The index of the author in the authors array.
 * @param {string} props.id - The ID of the button.
 * @param {Object} props.authors - An object containing the names of the authors.
 * @param {string} props.title - The title of the button.
 * @returns {HTMLElement} The created button element.
 */
const createButtonElement = ({ image, author, id, authors, title }) => {
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

  return element;
};

// Creates button elements and appends to list-items
matches.slice(0, BOOKS_PER_PAGE).forEach(({ author, id, image, title }) => {
  starting.appendChild(
    createButtonElement({ author, id, image, title, authors })
  );
});
document.querySelector("[data-list-items]").appendChild(starting);

// ================================================

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
document.querySelector("[data-search-genres]").appendChild(genreHtml);

// =====================================================

const authorsHtml = createOptionHtml("any", "All Authors");

// Creates option element and appends to search-authors list
Object.entries(authors).forEach(([id, name]) => {
  authorsHtml.appendChild(createOptionElement(id, name));
});
document.querySelector("[data-search-authors]").appendChild(authorsHtml);

/*
 * Changed this part to use ternary operators
 * Changes colour theme of app
 */
const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const dataSettingsTheme = document.querySelector("[data-settings-theme]");
const colorDark = prefersDarkMode ? "255, 255, 255" : "10, 10, 20";
const colorLight = prefersDarkMode ? "10, 10, 20" : "255, 255, 255";

dataSettingsTheme.value = prefersDarkMode ? "night" : "day";
document.documentElement.style.setProperty("--color-dark", colorDark);
document.documentElement.style.setProperty("--color-light", colorLight);

document.querySelector("[data-list-button]").innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;
document.querySelector("[data-list-button]").disabled =
  matches.length - page * BOOKS_PER_PAGE > 0;

document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

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

  document.querySelector("[data-settings-overlay]").open = false;
};

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", handleSubmitSettingsForm);

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    result.push(
      books.filter((book) => {
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

    page = 1;
    matches = result;

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }
/**
 * On click event for list items to open modal
 * @param {Event} event - On click event
 */
const handleListItemsClick = (event) => {
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

  if (active) {
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").innerText =
      active.description;
  }
};

document
  .querySelector("[data-list-items]")
  .addEventListener("click", handleListItemsClick);
