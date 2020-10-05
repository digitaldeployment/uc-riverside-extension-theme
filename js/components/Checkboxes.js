export default class ProgramFilterCheckboxes {
  constructor(element) {
    this.element = element;
    if (this.display) {
      this.listen();
    }
  }

  update() {
    this.display.textContent = this.totalChecked;
  }

  uncheck(parentNode) {
    parentNode.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      checkbox.indeterminate = false;
      checkbox.checked = false;
    });
    this.update();
  }

  clickHandler(event) {
    this.uncheck(event.currentTarget.parentNode);
  }

  listen() {
    this.element.addEventListener('change', this.update.bind(this));
    this.element.querySelectorAll('.clear-filters-btn').forEach(button => {
      button.addEventListener('click', this.clickHandler.bind(this));
    });
  }

  get totalChecked() {
    return this.element.querySelectorAll('input[type=checkbox]:checked').length;
  }

  get display() {
    return this.element.querySelector('.total-active-filters');
  }
}
