import $ from 'jquery';
import Flickity from 'flickity';
import VideoButton from './VideoButton';

const flickityArrow = 'M50,0A50,50,0,1,1,0,50,50.06,50.06,0,0,1,50,0Zm0,95.91A45.91,45.91,0,1,0,4.09,50,46,46,0,0,0,50,95.91Zm1.45-25.28a2.05,2.05,0,0,0,0-2.9L33.71,50,51.45,32.26a2,2,0,1,0-2.9-2.89L29.37,48.55a2,2,0,0,0,0,2.89L48.55,70.63a2.05,2.05,0,0,0,2.9,0ZM71.23,50a2.05,2.05,0,0,0-2-2H30.82a2,2,0,1,0,0,4.09H69.18A2,2,0,0,0,71.23,50Z';
const selectors = {
  slider: '.slider',
  navigation: '.slider-nav',
  playButton: '.button__play',
};

export default class Videos {
  constructor(element, modal) {
    this.element = element;
    this.modal = modal;
    this.selectors = selectors;
    this.Slider = this.addSlider();

    // Adds a modifier which enhances the slider with addt'l controls.
    if (this.inDeluxeMode) {
      this.Navigation = this.addNavigation();
    }

    // Adds play button modal support.
    this.connectPlayButtons();
  }

  addSlider() {
    const Slider = new Flickity(this.slider, {
      prevNextButtons: false,
      fade: true,
    });

    // Make sure the nav group state is relative to the active slider slide.
    // -----------------------------------------------------------------------

    if (this.inDeluxeMode) {
      Slider.on('change', (index) => {
        const group = index / 3;
        const currentNavIndex = this.Navigation.selectedIndex;
        if (group !== currentNavIndex) {
          this.Navigation.select(group);
        }
      });
    }

    // Activate video in modal, when play button is clicked.
    // -----------------------------------------------------------------------

    Slider.on('staticClick', (event) => {
      let element = event.target;
      // Checks to see if the element clicked is the button,
      // or is a child of the button.
      while(element.parentNode) {
        if (Array.prototype.includes.call(this.playButtons, element)) {
          // Call the VideoButton clickHandler.
          element.VideoButton.clickHandler();
          // Show the modal.
          $(this.modal).modal('show');
          break;
        }

        // Set element variable to the next parentNode.
        element = element.parentNode;
      }
    });

    return Slider;
  }

  addNavigation() {
    const items = this.navigation.querySelectorAll('.option');
    const Navigation = new Flickity(this.navigation, {
      arrowShape: flickityArrow,
      setGallerySize: false,
      prevNextButtons: items.length > 3,
      wrapAround: true,
      draggable: false,
      pageDots: false,
    });

    items.forEach((item) => {
      item.addEventListener('click', (event) => {
        const currentIndex = event.currentTarget.getAttribute('data-slide');
        this.Slider.select(currentIndex);
      });
    });

    if (items.length <= 3) {
      this.navigation.classList.add('no-arrows');
    }

    return Navigation;
  }

  connectPlayButtons() {
    this.playButtons.forEach(button => {
      button.VideoButton = new VideoButton(button, this.modal);
    });
  }

  get slider() {
    return this.element.querySelector(this.selectors.slider);
  }

  get navigation() {
    return this.element.querySelector(this.selectors.navigation);
  }

  get playButtons() {
    return this.element.querySelectorAll(this.selectors.playButton);
  }

  get inDeluxeMode() {
    return this.element.classList.contains('deluxe');
  }
}
