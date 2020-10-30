import Slider from './Slider'

const settings = {
  wrapAround: true,
  prevNexButtons: false,
  arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
  responsive: {
    desktop: {
      pageDots: false,
      cellAlign: 'left',
      prevNexButtons: true,
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
