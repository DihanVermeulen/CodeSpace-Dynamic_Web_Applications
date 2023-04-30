import { createOptionHtml, createOptionElement } from "../helpers/options.js";
import elementSelectors from "../constants/elementSelectors.js";

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
};

export default createSearchHtml;
