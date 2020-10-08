const defaultSelectors = {
  menu: '.menu',
  button: '.btn',
};

export default class Toggle {
  constructor(element, selectors) {
    this.element = element;
    this.expanded = false;
    this.selectors = { ...defaultSelectors, ...selectors };

    if (this.menu && this.button) {
      this.listen();
    }
  }

  clickHandler() {
    const expanded = this.isExpanded;
    this.menu.setAttribute('aria-hidden', expanded);
    this.button.setAttribute('aria-expanded', !expanded);
  }

  listen() {
    this.button.addEventListener('click', this.clickHandler.bind(this));
  }

  get button() {
    return this.element.querySelector(this.selectors.button);
  }

  get menu() {
    return this.element.querySelector(this.selectors.menu);
  }

  get isExpanded() {
    return this.button.getAttribute('aria-expanded') === 'true';
  }
}