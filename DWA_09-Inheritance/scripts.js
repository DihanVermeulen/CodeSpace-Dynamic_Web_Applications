import { authors, genres } from "./src/data.js";
import createBookListHtml from "./src/components/BookList.js";
import createSearchHtml from "./src/components/Search.js";
import state from "./src/state.js";
import initiateSettings from "./src/components/Settings.js";
import initiateHeader from "./src/helpers/header.js";
import "./src/components/book-preview.js";

if (!document) throw new Error();
(function setup() {
  createBookListHtml(state.getBooks);
  createSearchHtml(genres, authors);

  initiateSettings();
  initiateHeader();
})();
