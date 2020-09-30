import Navigation from './Navigation';

const components = {
  menu: '#term-navigation-menu',
  button: '.term-navigation-toggle__button',
  buttonLink: '.term-navigation-toggle__link',
};

export default class TermNavigation {
  constructor(element) {
    this.element = element;
    this.open = false;

    if (this.menu) {
      this.addLogic();
      this.listen();
    }

    this.ready();
  }

  // Enhance the term navigation with the standardized, accessible, menu.
  addLogic() {
    return new Navigation({ menuElement: this.menu });
  }

  // We want to control the mobile dropdown but let the desktop link go thru.
  clickHandler() {
    if (this.open) {
      this.open = false;
      this.button.setAttribute('aria-expanded', false);
      this.element.classList.remove('term-navigation-menu--expanded');
      this.menu.setAttribute('aria-hidden', true);
    } else {
      this.open = true;
      this.button.setAttribute('aria-expanded', true);
      this.element.classList.add('term-navigation-menu--expanded');
      this.menu.setAttribute('aria-hidden', false);
      this.buttonLink.focus();
    }
  }

  keydownHandler({ key }) {
    if (key === 'Escape' && this.open) {
      this.clickHandler();
    }
  }

  listen() {
    // Add a click handler to control the mobile dropdown menu
    this.button.addEventListener('click', this.clickHandler.bind(this));
    this.element.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  ready() {
    this.element.classList.add('ready');
  }

  get button() {
    return this.element.querySelector(components.button);
  }

  get buttonLink() {
    return this.element.querySelector(components.buttonLink);
  }

  get menu() {
    return this.element.querySelector(components.menu);
  }
}
