/**
 * All element selectors
 */
const elementSelectors = {
  /**
   * Elements inside of header
   */
  header: {
    headerSearch: "[data-header-search]",
    headerSettings: "[data-header-settings]",
  },
  /**
   * Elements inside of list
   */
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
  /**
   * Elements inside of search
   */
  search: {
    searchGenres: "[data-search-genres]",
    searchAuthors: "[data-search-authors]",
    searchOverlay: "[data-search-overlay]",
    searchCancel: "[data-search-cancel]",
    searchForm: "[data-search-form]",
    searchTitle: "[data-search-title]",
  },
  /**
   * Elements inside of settings
   */
  settings: {
    settingsCancel: "[data-settings-cancel]",
    settingsOverlay: "[data-settings-overlay]",
    settingsForm: "[data-settings-form]",
    settingsTheme: "[data-settings-theme]",
  },
};

export default elementSelectors;
