import Keyboard from 'keyboard-key'

export default class Flyout {
  constructor() {
    this.listen();
  }

  toggleClickHandler() {
    // Toggle visibility of flyout element.
    document.body.classList.toggle('flyout--expanded');

    // Control aria attributes based on current state of flyout element.
    this.flyoutToggleButtons.forEach(element => {
      element.setAttribute('aria-expanded', this.isExpanded);
    });
  }

  keydownHandler(event) {
    const keyCode = Keyboard.getCode(event);
    if (keyCode === Keyboard.Escape && this.isExpanded) {
      this.toggleClickHandler();
    }
  }

  listen() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));
    this.flyoutToggleButtons.forEach(toggleButton => {
      toggleButton.addEventListener('click', this.toggleClickHandler.bind(this));
    });
  }

  get isExpanded() {
    return document.body.classList.contains('flyout--expanded');
  }

  get flyoutToggleButtons() {
    return document.querySelectorAll('[data-toggle="flyout"]');
  }
}
