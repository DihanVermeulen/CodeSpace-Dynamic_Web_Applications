// @ts-check

/**
 * Form from html
 * @type {Element | null}
 */
const form = document.querySelector("[data-form]");
/**
 * Div element from html
 * @type {HTMLDivElement | null}
 */
const result = document.querySelector("[data-result]");
if (!form) {
  throw new Error();
} else {
  form.addEventListener("submit", (event) => {
    if (!event) throw new Error();
    event.preventDefault();

    /**
     * Entries derived from submit event
     */
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);
    if (result) {
      result.innerText = (dividend / divider).toString();
    }
  });
}
