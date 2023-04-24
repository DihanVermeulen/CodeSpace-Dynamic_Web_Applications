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

window.addEventListener("error", () => {
  // @ts-ignore
  document.querySelector("body").innerHTML =
    "Something critical went wrong. Please reload the page";
});

if (!form) throw new Error();

form.addEventListener("submit", (event) => {
  if (!event) throw new Error();
  event.preventDefault();

  /**
   * Entries derived from submit event
   */
  // @ts-ignore
  const entries = new FormData(event.target);

  const formData = {};
  for (const [key, value] of entries.entries()) {
    formData[key] = value;
  }

  const { dividend, divider } = formData;

  if (!result) throw new Error();

  /* Checks if both values are present, and if not an error message
   * is shown
   */
  if (!dividend || !divider) {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";
  } else if (isNaN(dividend) || isNaN(divider)) {
    throw new Error("Value that is not a number was passed in");
  } else {
    if (parseInt(dividend) < 0 || parseInt(divider) < 0) {
      console.error(
        "Division not performed. Invalid number provided. Try again"
      );
      result.innerText =
        "Division not performed. Invalid number provided. Try again";
    } else {
      // Math.trunc is used to remove decimal numbers
      result.innerText = Math.trunc(
        parseInt(dividend) / parseInt(divider)
      ).toString();
    }
  }
});
