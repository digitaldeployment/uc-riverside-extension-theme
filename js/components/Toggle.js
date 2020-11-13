const defaultSelectors = {
  menu: '.menu',
  button: '.btn',
};

export default class Toggle {
  constructor(element, selectors) {
    this.element = element;
    this.expanded = false;
    this.selectors = { ...defaultSelectors, ...selectors };
    this.clickHandler = this.clickHandler.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);

    if (this.menu && this.button) {
      this.listen();
    }
  }

  clickHandler() {
    this.isExpanded ? this.collapse() : this.expand();
  }

  expand() {
    this.menu.setAttribute('aria-hidden', false);
    this.button.setAttribute('aria-expanded', true);
  }

  collapse() {
    this.menu.setAttribute('aria-hidden', true);
    this.button.setAttribute('aria-expanded', false);
  }

  listen() {
    this.button.addEventListener('click', this.clickHandler);
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