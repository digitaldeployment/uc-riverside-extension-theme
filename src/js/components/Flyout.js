export default class Flyout {
  constructor() {
    this.listen();
  }

  toggleClickHandler() {
    // Toggle visibility of flyout element.
    document.body.classList.toggle('flyout--expanded');
    
    // Get current status of flyout element.
    const isExpanded = document.body.classList.contains('flyout--expanded');
    
    // Control aria attributes based on current state of flyout element.
    this.flyoutToggleButtons.forEach(element => {
      element.setAttribute('aria-expanded', isExpanded);
    });
  }

  listen() {
    this.flyoutToggleButtons.forEach(toggleButton => {
      toggleButton.addEventListener('click', this.toggleClickHandler.bind(this));
    });
  }

  get flyoutToggleButtons() {
    return document.querySelectorAll('[data-toggle="flyout"]');
  }
}
