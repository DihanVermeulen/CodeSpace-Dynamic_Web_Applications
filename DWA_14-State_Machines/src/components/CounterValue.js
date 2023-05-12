// @ts-check

import { LitElement, css, html } from "../libs/lit-html.js";
import { subscribe, dispatch, getState } from "../store/store.js";
import { add, subtract, reset } from "../store/actions.js";

class CounterValue extends LitElement {
  static properties = {
    value: { type: Number },
  };

  static styles = css`
    p {
      text-align: center;
      font-size: 40px;
      width: 50px;
    }
  `;

  /**
   * @returns {any}
   */
  render() {
    // @ts-ignore
    return html` <p>${this.value}</p> `;
  }
}

customElements.define("tc-counter-value", CounterValue);
