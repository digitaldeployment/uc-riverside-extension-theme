export default class InfoPopupButton {
  constructor(button, modal) {
    this.button = button;
    this.modal = modal;

    if (this.title && this.content && this.modalBody) {
      this.listen();
    }
  }
  
  clickHandler() {
    this.modal.setAttribute('aria-label', this.title.textContent);
    this.modalBody.innerHTML = this.content.innerHTML;
  }

  listen() {
    this.button.addEventListener('click', this.clickHandler.bind(this));
  }

  get title() {
    return this.button.querySelector('.heading');
  }

  get content() {
    return this.button.parentNode.querySelector('.popup');
  }

  get modalBody() {
    return this.modal.querySelector('.modal-body');
  }
}
