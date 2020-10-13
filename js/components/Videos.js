import Flickity from 'flickity';

const flickityArrow = 'M50,0A50,50,0,1,1,0,50,50.06,50.06,0,0,1,50,0Zm0,95.91A45.91,45.91,0,1,0,4.09,50,46,46,0,0,0,50,95.91Zm1.45-25.28a2.05,2.05,0,0,0,0-2.9L33.71,50,51.45,32.26a2,2,0,1,0-2.9-2.89L29.37,48.55a2,2,0,0,0,0,2.89L48.55,70.63a2.05,2.05,0,0,0,2.9,0ZM71.23,50a2.05,2.05,0,0,0-2-2H30.82a2,2,0,1,0,0,4.09H69.18A2,2,0,0,0,71.23,50Z';
const selectors = {
  slider: '.slider',
  navigation: '.slider-nav',
};

export default class Videos {
  constructor(element) {
    this.element = element;
    this.selectors = selectors;
    this.Slider = this.addSlider();
    this.Navigation = this.addNavigation();
  }

  addSlider() {
    const Slider = new Flickity(this.slider, {
      prevNextButtons: false,
      draggable: false,
      fade: true,
    });

    // Make sure the nav group state is relative to the active slider slide.
    // -----------------------------------------------------------------------

    Slider.on('change', (index) => {
      const group = index / 3;
      const currentNavIndex = this.Navigation.selectedIndex;
      if (group !== currentNavIndex) {
        this.Navigation.select(group);
      }
    });

    return Slider;
  }

  addNavigation() {
    const Navigation = new Flickity(this.navigation, {
      arrowShape: flickityArrow,
      setGallerySize: false,
      wrapAround: true,
      draggable: false,
      pageDots: false,
    });

    this.navigation.querySelectorAll('.option').forEach((option) => {
      option.addEventListener('click', (event) => {
        const currentIndex = event.currentTarget.getAttribute('data-slide');
        this.Slider.select(currentIndex);
      });
    });

    return Navigation;
  }

  get slider() {
    return this.element.querySelector(this.selectors.slider);
  }

  get navigation() {
    return this.element.querySelector(this.selectors.navigation);
  }
}
