const template = document.createElement("template");

template.innerHTML = /* html */ `
<style>
@keyframes enter {
  from {
    transform: translateY(10rem);
  }
  to {
    transform: translateY(0);
  }
}

.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-width: 0;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  animation-name: enter;
  animation-duration: 0.6s;
  z-index: 10;
  background-color: rgba(var(--color-light), 1);
}

@media (min-width: 30rem) {
  .overlay {
    max-width: 30rem;
    left: 0%;
    top: 0;
    border-radius: 8px;;
  }
}

.overlay__form {
  padding-bottom: 0.5rem;
  margin: 0 auto;
}

.overlay__row {
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
  justify-content: center;
}

.overlay__button {
  font-family: Roboto, sans-serif;
  background-color: rgba(var(--color-blue), 0.1);
  transition: background-color 0.1s;
  border-width: 0;
  border-radius: 6px;
  height: 2.75rem;
  cursor: pointer;
  width: 50%;
  color: rgba(var(--color-blue), 1);
  font-size: 1rem;
  border: 1px solid rgba(var(--color-blue), 1);
}

.overlay__button_primary {
  background-color: rgba(var(--color-blue), 1);
  color: rgba(var(--color-force-light), 1);
}

.overlay__button:hover {
  background-color: rgba(var((var(--color-blue))), 0.2);
}


.overlay__button_primary:hover {
  background-color: rgba(var(--color-blue), 0.8);
  color: rgba(var(--color-force-light), 1);
}

.overlay__input {
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: rgba(var(--color-dark), 0.05);
  border-width: 0;
  border-radius: 6px;
  width: 100%;
  height: 4rem;
  color: rgba(var(--color-dark), 1);
  padding: 1rem 0.5rem 0 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  cursor: pointer;
}

.overlay__input_select {
  padding-left: 0.5rem;
}

.overlay__field {
  position: relative;
  display: block;
}

.overlay__label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-size: 0.85rem;
  color: rgba(var(--color-dark), 0.4);
}

.overlay__input:hover {
  background-color: rgba(var(--color-dark), 0.1);
}

.overlay__title {
  padding: 1rem 0 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
  letter-spacing: -0.1px;
  max-width: 25rem;
  margin: 0 auto;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__blur {
  width: 100%;
  height: 200px;
  filter: blur(10px);
  opacity: 0.5;
  transform: scale(2);
}

.overlay__image {
  max-width: 10rem;
  position: absolute;
  top: 1.5m;
  left: calc(50% - 5rem);
  border-radius: 2px;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
}

.overlay__data {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__data_secondary {
  color: rgba(var(--color-dark), 0.6)
}

.overlay__content {
  padding: 2rem 1.5rem;
  text-align: center;
  padding-top: 3rem;
}

.overlay__preview {
  overflow: hidden;
  margin: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay__background {
  background: rgba(var(--color-dark), 0.6);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

</style>

<dialog class="overlay" data-list-active>
  <div class="overlay__preview"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
  <div class="overlay__content">
    <h3 class="overlay__title" data-list-title></h3>
    <div class="overlay__data" data-list-subtitle></div>
    <p class="overlay__data overlay__data_secondary" data-list-description></p>
  </div>

  <div class="overlay__row">
    <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
  </div>
</dialog>
`;

customElements.define(
  "book-preview",
  class extends HTMLElement {
    /**
     * @type {boolean} - Whether dialog is open or closed
     */
    #open = false;

    /**
     * @type {String} - Title of book will be displayed
     */
    #title = this.getAttribute("title");

    /**
     * @type {String} - Image source that will be used to display image
     */
    #image = this.getAttribute("image");

    /**
     * @type {String} - Image blur
     */
    #blur = this.getAttribute("image");

    #subtitle = this.getAttribute("subtitle");

    #description = this.getAttribute("description");

    #elements = {
      title: undefined,
      image: undefined,
      subtitle: undefined,
      description: undefined,
      dialog: undefined,
      blur: undefined,
    };

    #inner = this.attachShadow({ mode: "closed" });

    constructor() {
      super();
      const { content } = template;
      this.#inner.appendChild(content.cloneNode(true));
    }

    connectedCallback() {
      this.#elements = {
        title: this.#inner.querySelector("[data-list-title]"),
        dialog: this.#inner.querySelector("[data-list-active]"),
        close: this.#inner.querySelector("[data-list-close]"),
        image: this.#inner.querySelector("[data-list-image]"),
        subtitle: this.#inner.querySelector("[data-list-subtitle]"),
        description: this.#inner.querySelector("[data-list-description]"),
        blur: this.#inner.querySelector("[data-list-blur]"),
      };
      if (!(this.#elements.dialog instanceof HTMLDialogElement))
        throw new Error("Element has to be a dialog");
      if (this.#open) this.#elements.dialog.showModal();
      this.#elements.title.innerText = this.#title;
      this.#elements.image.setAttribute("src", this.#image);
      this.#elements.blur.setAttribute("src", this.#image);
      this.#elements.close.addEventListener("click", () => {
        this.closeDialog();
      });
    }

    openDialog() {
      this.#elements.dialog.showModal();
    }

    closeDialog() {
      this.#elements.dialog.close();
    }

    set title(newValue) {
      if (newValue === this.#title) return;
      this.#title = newValue;
      this.#elements.title.innerText = newValue;
    }

    get title() {
      return this.#title;
    }

    set image(newValue) {
      if (newValue === this.#image) return;
      this.#image = newValue;
      this.#elements.image.setAttribute("src", newValue);
    }

    get image() {
      return this.#image;
    }

    set subtitle(newValue) {
      if (newValue === this.#subtitle) return;
      this.#subtitle = newValue;
      this.#elements.subtitle.innerText = newValue;
    }

    get subtitle() {
      return this.#subtitle;
    }

    set description(newValue) {
      if (newValue === this.#description) return;
      this.#description = newValue;
      this.#elements.description.innerText = newValue;
    }

    get description() {
      return this.#description;
    }

    set blur(newValue) {
      if (newValue === this.#blur) return;
      this.#blur = newValue;
      this.#elements.blur.setAttribute("src", newValue);
    }

    get blur() {
      return this.#blur;
    }
  }
);
