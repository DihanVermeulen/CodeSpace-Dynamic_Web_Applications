// @ts-check

import { LitElement, html, css } from "../libs/lit-html.js";
import { add, reset, subtract } from "../store/actions.js";
import { dispatch } from "../store/store.js";
import { COUNTER_STEPS } from "../constants/COUNTERSTEPS.js";
import { MAXIMUM_VALUE, MINIMUM_VALUE } from "../constants/EXTREMUM.js";

class App extends LitElement {
  static properties = {
    value: { type: Number },
    maximumReached: { type: Boolean, state: true },
  };

  static styles = css`
    main {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #afbed1;
    }

    .row {
      display: flex;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.maximumReached = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("decrement-value", () => {
      if (this.value === MINIMUM_VALUE) {
        this.maximumReached = true;
        return;
      }
      this.setValue = this.value - COUNTER_STEPS;
      this.maximumReached = false;

      dispatch(subtract());
    });
    this.addEventListener("increment-value", () => {
      if (this.value === MAXIMUM_VALUE) {
        this.maximumReached = true;
        return;
      }
      this.setValue = this.value + COUNTER_STEPS;
      this.maximumReached = false;
      dispatch(add());
    });
    this.addEventListener("reset-value", () => {
      this.setValue = 0;
      dispatch(reset());
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("decrement-value", () => {
      console.log("Decrement event has been triggered");
      this.setValue = this.value - COUNTER_STEPS;
    });
    this.removeEventListener("increment-value", () => {
      this.setValue = this.value + COUNTER_STEPS;
    });
    this.removeEventListener("reset-value", () => {
      this.setValue = 0;
    });
  }

  set setValue(newValue) {
    if (this.value == newValue) return;
    this.value = newValue;
  }

  /**
   * @returns {any}
   */
  render() {
    return html`
      <main id="main">
        ${this.maximumReached ? "Maximum reached" : ""}
        <section class="row">
          <tc-action-button data-type="minus"></tc-action-button>
          <tc-counter-value .value=${this.value}></tc-counter-value>
          <tc-action-button data-type="plus"></tc-action-button>
        </section>
        <tc-action-button data-type="reset"></tc-action-button>
      </main>
    `;
  }
}

customElements.define("tc-app", App);
