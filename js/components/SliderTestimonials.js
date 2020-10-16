import Slider from './Slider'

const settings = {
  wrapAround: true,
  prevNexButtons: false,
  responsive: {
    desktop: {
      prevNexButtons: true,
      arrowShape: 'M24.5,51.6v-3.2l19.6-19.6l3.2,3.2L31.5,47.8h44.1v4.5H31.5L47.2,68l-3.2,3.2L24.5,51.6z',
    }
  }
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
