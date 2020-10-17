import $ from 'jquery';
import VideoButton from './VideoButton';

export default class VideoModal {
  constructor(element) {
    this.element = element;
    this.listen();
  }

  //
  // Adds event listeners.
  //

  listen() {
    // When the modal is shown.
    $(this.element).on('show.bs.modal', this.onShowHandler.bind(this));

    // When the modal is hidden.
    $(this.element).on('hide.bs.modal', this.onHideHandler.bind(this));

    // Adds button support to control what plays in the modal.
    this.videoButtons.forEach(button => {
      if (!button.VideoButton) {
        button.VideoButton = new VideoButton(button, this.element, true);
      }
    });
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

    // Add a helper classname to the body to aid theme.
    document.body.classList.add('modal-video--active');
  }

  //
  // Modal on 'hide' event handler.
  //

  onHideHandler() {
    // Remove the helper classname.
    document.body.classList.remove('modal-video--active');

    // Remove the video within the modal
    this.element.querySelectorAll('iframe').forEach((iframe) => {
      iframe.remove();
    });
  }

  get videoButtons() {
    return document.querySelectorAll(`[data-toggle="modal"][data-target="#${this.element.id}"]`);
  }
}
