export default class VideoButton {
  constructor(button, modal, addOnClickHandler = false) {
    this.button = button;
    this.modal = modal;

    if (addOnClickHandler) {
      this.listen();
    }
  }
  
  clickHandler() {
    if (this.videoURL && this.videoTitle) {
      // Update modal data attributes relavent to the new video.
      this.modal.setAttribute('data-iframe-src', this.videoURL);
      this.modal.setAttribute('aria-label', this.videoTitle);
    }
  }

  listen() {
    // Add a click handler for the play button which overlays each
    // video background image and title.
    this.button.addEventListener('click', this.clickHandler.bind(this));
  }

  get videoURL() {
    return this.button.getAttribute('data-video-url');
  }

  get videoTitle() {
    return this.button.getAttribute('data-video-title');
  }
}
