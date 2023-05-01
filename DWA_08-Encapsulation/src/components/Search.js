import { createOptionHtml, createOptionElement } from "../helpers/options.js";
import elementSelectors from "../constants/elementSelectors.js";
import toggleOverlay from "../helpers/overlay.js";
import state from "../state.js";
import { BOOKS_PER_PAGE, authors as dataAuthors } from "../data.js";

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
  const filteredBooks = filterBooks(state.getBooks, filters);

  state.setPage = 1;
  state.setBooks = filteredBooks;

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
              <div class="preview__author">${dataAuthors[author]}</div>
          </div>
      `;

      newItems.appendChild(element);
    });

  document.querySelector(elementSelectors.list.listItems).appendChild(newItems);
  document.querySelector(elementSelectors.list.listButton).disabled =
    state.getBooks.length - state.getPage * BOOKS_PER_PAGE < 1;

  document.querySelector(elementSelectors.list.listButton).innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${
        state.getBooks.length - state.getPage * BOOKS_PER_PAGE > 0
          ? state.getBooks.length - state.getPage * BOOKS_PER_PAGE
          : 0
      })</span>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(elementSelectors.search.searchOverlay).open = false;
};

const createSearchHtml = (genres, authors) => {
  const authorsHtml = createOptionHtml("any", "All Authors");
  const genreHtml = createOptionHtml("any", "All Genres");

  // Creates option element and appends to search-authors list
  Object.entries(authors).forEach(([id, name]) => {
    authorsHtml.appendChild(createOptionElement(id, name));
  });

  // Creates option element and appends to search-genres list
  Object.entries(genres).forEach(([key, value]) => {
    genreHtml.appendChild(createOptionElement(key, value));
  });

  document
    .querySelector(elementSelectors.search.searchGenres)
    .appendChild(genreHtml);
  document
    .querySelector(elementSelectors.search.searchAuthors)
    .appendChild(authorsHtml);

  // Closes search overlay on click of cancel button
  document
    .querySelector(elementSelectors.search.searchCancel)
    .addEventListener("click", () => {
      toggleOverlay(elementSelectors.search.searchOverlay, false);
    });

  document
    .querySelector(elementSelectors.search.searchForm)
    .addEventListener("submit", handleSubmitSearchForm);
};

export default createSearchHtml;
