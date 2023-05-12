// @ts-check

import { LitElement, html, css } from "../libs/lit-html.js";

class ActionButton extends LitElement {
  static properties = {
    type: { type: String },
  };

  static styles = css`
    button {
      background-color: rgba(234, 197, 216, 1);
      border: 0px;
      font-size: 40px;
      color: #ffffff;
      margin: 10px;
      padding: 10px;
    }

    button:hover {
      cursor: pointer;
      background-color: rgba(234, 197, 216, .5);
    }
  `;

  constructor() {
    super();
    this.type = this.getAttribute("data-type");
    // console.log(this.type);
  }

  /**
   * Checks what type the button is then dispatches events based on the type
   */
  handleClick() {
    switch (this.type) {
      case "plus":
        this.dispatchEvent(
          new CustomEvent("increment-value", { bubbles: true, composed: true })
        );
        break;
      case "minus":
        this.dispatchEvent(
          new CustomEvent("decrement-value", { bubbles: true, composed: true })
        );
        break;
      default:
        this.dispatchEvent(
          new CustomEvent("reset-value", { bubbles: true, composed: true })
        );
        break;
    }
  }

  /**
   * @returns {any}
   */
  render() {
    return html`
      <button @click=${() => this.handleClick()}>
        ${this.type === "minus" ? "-" : this.type === "plus" ? "+" : "reset"}
      </button>
    `;
  }
}

customElements.define("tc-action-button", ActionButton);
