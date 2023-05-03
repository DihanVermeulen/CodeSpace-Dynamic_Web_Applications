import { books } from "./data.js";

/**
 * @typedef {Object} State
 * @prop {Object} books
 */
const state = {
  books,
  page: 1,
  /**
   * @param {(arg0: { newbook: string; }) => void} newBooks
   */
  set setBooks(newBooks) {
    this.books = newBooks;
  },
  /**
   * @param {(arg0: { newPage: string; }) => void} newPage
   */
  set setPage(newPage) {
    this.page = newPage;
  },
  get getBooks() {
    return this.books;
  },
  get getPage() {
    return this.page;
  },
};

export default state;
