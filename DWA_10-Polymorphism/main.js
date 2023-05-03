import ActionButton from "./src/components/ActionButton.js";
import countByMethod from "./src/helpers/count.js";
import { SUBTRACT, ADD } from "./src/constants/methods.js";
import state from "./src/state.js";
import CounterLabel from "./src/components/CounterLabel.js";
import elementSelectors from "./src/constants/elementSelectors.js";

(function setup() {
  const root = document.querySelector("#root");
  const upperRow = document.createElement("section");
  upperRow.classList = "upper__row";
  const lowerRow = document.createElement("section");
  root.appendChild(upperRow);
  root.appendChild(lowerRow);
  upperRow.appendChild(
    ActionButton({
      onClickOfButton: () => {
        state.setValue = countByMethod(SUBTRACT, state.value);
        document.querySelector(elementSelectors.counterLabel).innerText =
          state.value;
      },
      icon: "dash",
    })
  );
  upperRow.appendChild(CounterLabel());
  upperRow.appendChild(
    ActionButton({
      onClickOfButton: () => {
        state.setValue = countByMethod(ADD, state.value);
        document.querySelector(elementSelectors.counterLabel).innerText =
          state.value;
      },
      icon: "plus",
    })
  );
  lowerRow.appendChild(
    ActionButton({
      onClickOfButton: () => {
        state.setValue = 0;
        document.querySelector(elementSelectors.counterLabel).innerText =
          state.value;
      },
      icon: "arrow-clockwise",
    })
  );
})();
