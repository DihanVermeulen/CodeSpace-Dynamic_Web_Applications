const createOptionHtml = (value, innerText) => {
  const Html = document.createDocumentFragment();
  const firstElement = document.createElement("option");
  firstElement.value = value;
  firstElement.innerText = innerText;
  Html.appendChild(firstElement);

  return Html;
};

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

export { createOptionElement, createOptionHtml };
