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
    $(this.element).on('show.bs.modal', this.onShowHandler.bind(this));
    $(this.element).on('hide.bs.modal', this.onHideHandler.bind(this));
  }

  //
  // Modal on 'show' event handler.
  //

  onShowHandler() {
    // Add a helper classname to the body to aid theme.
    document.body.classList.add('modal-info-popup--active');
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
      // Remove the content from within the modal.
      this.modalBody.innerHTML = '';
    }, 500);

    // Remove the helper classname.
    document.body.classList.remove('modal-info-popup--active');
  }

  get modalBody() {
    return this.element.querySelector('.modal-body');
  }
}
