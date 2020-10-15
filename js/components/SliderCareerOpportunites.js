import Slider from './Slider'

const settings = {
  wrapAround: true,
  prevNexButtons: false,
  responsive: {
    desktop: {
      disabled: true,
    },
  },
}

export default class {
  constructor(element) {
    this.element = element;
    this.Slider = this.build();
    this.element.classList.add('ready');
  }

  build() {
    return new Slider(this.element, settings);
  }
}
