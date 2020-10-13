import $ from 'jquery';

export default class VideoModal {
  constructor(element) {
    this.element = element;
    this.listen();
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
    const iframeSrc = this.element.getAttribute('data-iframe-src');
    const iframeTitle = this.element.getAttribute('aria-label');

    if (iframeSrc && iframeTitle) {
      // Creates an iframe which houses the embed video player.
      const iframe = document.createElement('iframe');
      iframe.src = iframeSrc;
      iframe.title = iframeTitle;
      iframe.className = 'embed-responsive-item';
      iframe.setAttribute('allowfullscreen', '');

      // If embed container is found, add our video player iframe.
      const embedContainer = this.element.querySelector('.embed-responsive');
      if (embedContainer) {
        embedContainer.appendChild(iframe);
      }
    }
  }

  //
  // Modal on 'hide' event handler.
  //

  onHideHandler() {
    document.querySelectorAll('iframe').forEach((iframe) => {
      iframe.remove();
    });
  }
}
