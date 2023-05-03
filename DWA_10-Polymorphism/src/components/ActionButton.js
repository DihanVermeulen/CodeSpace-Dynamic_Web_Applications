/**
 *  Button that takes an action and an innerText argument
 * @param {Object} props
 * @param {Function} props.onClickOfButton Function that runs when button is clicked
 * @param {String} props.icon Icon of button element
 * @returns
 */
const ActionButton = ({ onClickOfButton, icon }) => {
  const buttonElement = document.createElement("sl-icon-button");
  if (icon) buttonElement.setAttribute("name", icon);
  buttonElement.setAttribute("label", "Count");
  buttonElement.classList = "counter__button";
  buttonElement.setAttribute("size", "large");
  if (onClickOfButton) buttonElement.addEventListener("click", onClickOfButton);

  return buttonElement;
};

export default ActionButton;
