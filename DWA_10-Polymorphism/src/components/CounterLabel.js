import state from "../state.js";

const CounterLabel = () => {
  const label = document.createElement("label");
  label.classList = "counter__label";
  label.setAttribute("data-counter-label", "");
  label.innerText = state.value;

  return label;
};

export default CounterLabel;
