import 'flickity-fade'
import $ from 'jquery'
import Flickity from 'flickity'
import Hero from '../components/Hero'

export default () => {
  const flickityArrow = 'M50,0A50,50,0,1,1,0,50,50.06,50.06,0,0,1,50,0Zm0,95.91A45.91,45.91,0,1,0,4.09,50,46,46,0,0,0,50,95.91Zm1.45-25.28a2.05,2.05,0,0,0,0-2.9L33.71,50,51.45,32.26a2,2,0,1,0-2.9-2.89L29.37,48.55a2,2,0,0,0,0,2.89L48.55,70.63a2.05,2.05,0,0,0,2.9,0ZM71.23,50a2.05,2.05,0,0,0-2-2H30.82a2,2,0,1,0,0,4.09H69.18A2,2,0,0,0,71.23,50Z';

  // Home Hero
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.hero').forEach(element => {
    if (!element.Hero) {
      element.Hero = new Hero(element);
    }
  });

  // Home Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new Flickity(element, {
        arrowShape: flickityArrow,
        wrapAround: true,
      });
    }
  });

  // Home Videos Modal
  // ---------------------------------------------------------------------------

  const videoModal = document.querySelector('#modal-video');

  if (videoModal) {
    // Video Modal show handler
    $(videoModal).on('show.bs.modal', () => {
      const iframeSrc = videoModal.getAttribute('data-iframe-src');
      const iframeTitle = videoModal.getAttribute('aria-label');

      if (iframeSrc && iframeTitle) {
        // Creates an iframe which houses the embed video player.
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.title = iframeTitle;
        iframe.className = 'embed-responsive-item';
        iframe.setAttribute('allowfullscreen', '');

        // If embed container is found, add our video player iframe.
        const embedContainer = videoModal.querySelector('.embed-responsive');
        if (embedContainer) {
          embedContainer.appendChild(iframe);
        }
      }
    });

    // Video Modal hide handler.
    $(videoModal).on('hide.bs.modal', () => {
      document.querySelectorAll('iframe').forEach((iframe) => {
        iframe.remove();
      });
    });
  }

  // Home Videos
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.videos .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new Flickity(element, {
        fade: true,
        draggable: false,
        prevNextButtons: false,
        arrowShape: flickityArrow,
      });

      // Add play button click handler and callback
      // -----------------------------------------------------------------------

      element.Slider.cells.forEach(cell => {
        const button = cell.element.querySelector('.button__play');
        const videoURL = button.getAttribute('data-video-url');
        const videoTitle = button.getAttribute('data-video-title');

        if (button && videoModal && videoURL && videoTitle) {
          // Add a click handler for the play button which overlays each
          // video background image and title.
          button.addEventListener('click', () => {
            // Update modal data attributes relavent to the new video.
            videoModal.setAttribute('data-iframe-src', videoURL);
            videoModal.setAttribute('aria-label', videoTitle);
          });
        }
      })
    }
  });
}
