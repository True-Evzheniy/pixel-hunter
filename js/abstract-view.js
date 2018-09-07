import getElementFromString from "./utils/get-element-from-template";

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new TypeError(`Cannot construct Abstract instances directly`);
    }
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this.render();
    this.bind();

    return this._element;
  }

  get template() {}

  render() {
    this._element = getElementFromString(this.template);
  }

  bind() {}
}

export default AbstractView;
