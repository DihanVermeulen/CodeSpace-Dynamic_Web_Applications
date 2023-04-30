import { BOOKS_PER_PAGE, authors, books } from "../data.js";
import elementSelectors from "../constants/elementSelectors.js";
import toggleOverlay from "../helpers/overlay.js";
import state from "../state.js";

/**
 * Creates a button element with the specified properties.
 *
 * @param {Object} props - The properties of the button element.
 * @param {string} props.image - The image source URL of the button.
 * @param {string} props.authorsObject - The index of the author in the authors array.
 * @param {string} props.id - The ID of the button.
 * @param {Object} props.authors - An object containing the names of the authors.
 * @param {string} props.title - The title of the button.
 * @param {string} props.author - The author of the book.
 * @returns {HTMLElement} The created button element.
 */
const createBookListButtonElement = ({
  image,
  author,
  id,
  authorsObject,
  title,
}) => {
  const element = document.createElement("button");
  // @ts-ignore
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
          class="preview__image"
          src="${image}"
        />
    
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authorsObject[author]}</div>
        </div>
      `;

  return element;
};

/**
 * Creates card for each book
 * @param {Object} booksToLoopThrough
 */
const createBookListCards = (
  booksToLoopThrough,
  elementToAppendTo,
  authorsObject
) => {
  const starting = document.createDocumentFragment();
  // Creates button elements and appends to list-items
  booksToLoopThrough
    .slice(0, BOOKS_PER_PAGE)
    .forEach(({ author, id, image, title }) => {
      starting.appendChild(
        createBookListButtonElement({ author, id, image, title, authorsObject })
      );
    });
  // @ts-ignore
  document.querySelector(elementToAppendTo).appendChild(starting);
};

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

const createBookListHtml = (booksToDisplay) => {
  createBookListCards(booksToDisplay, elementSelectors.list.listItems, authors);

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

  // @ts-ignore
  document.querySelector(elementSelectors.list.listButton).disabled =
    state.getBooks.length - state.getPage * BOOKS_PER_PAGE > 0;

  // @ts-ignore
  document.querySelector(
    elementSelectors.list.listButton
  ).innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;

  document.querySelector(elementSelectors.list.listButton).innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      state.getBooks.length - state.getPage * BOOKS_PER_PAGE > 0
        ? state.getBooks.length - state.getPage * BOOKS_PER_PAGE
        : 0
    })</span>
`;
};

export default createBookListHtml;
