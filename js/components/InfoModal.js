import $ from 'jquery';

export default class InfoModal {
  constructor(element) {
    this.element = element;
    this.timer = null;

    if (this.modalBody) {
      this.listen();
    }
  }

  //
  // Adds event listeners.
  //

  listen() {
    $(this.element).on('hide.bs.modal', this.onHideHandler.bind(this));
  }

  //
  // Modal on 'hide' event handler.
  //

  onHideHandler() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.element.setAttribute('aria-label', 'Info modal');
      this.modalBody.innerHTML = '';
    }, 500);
  }

  get modalBody() {
    return this.element.querySelector('.modal-body');
  }
}
