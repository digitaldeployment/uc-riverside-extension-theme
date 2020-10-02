import Change from './Change';

const offsets = {
  sidebar: 200,
}

export default class Sticky {
  constructor(element) {
    this.element = element;
    this.register();
    this.update();
  }

  register() {
    Change.onChange(this.update.bind(this));
  }

  update() {
    if (window.innerHeight - offsets.sidebar > this.element.offsetHeight) {
      this.element.classList.add('sticky');
    } else {
      this.element.classList.remove('sticky');
    }
  }
}
