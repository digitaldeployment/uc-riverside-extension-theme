import $ from 'jquery'
import arrayShuffle from 'array-shuffle'
import Typewriter from 'typewriter-effect/dist/core'

const selectOptions = {
  theme: 'bootstrap4',
  placeholder: 'Get Started Here',
}

const typeOptions = {
  loop: true,
  cursor: '',
  autoStart: true,
  wrapperClassName: 'word',
  cursorClassName: 'cursor'
}

export default class Hero {
  constructor(element) {
    this.element = element;
    this.addTypewriter();
    this.addSelect();
    this.element.classList.add('ready');
  }

  addSelect() {
    $(this.select).select2({
      width: this.select.parentNode,
      dropdownParent: $(this.select.parentNode),
      ...selectOptions,
    });
  }

  addTypewriter() {
    const words = this.element.getAttribute('data-words').split('|');
    const strings = arrayShuffle(words);
    const shell = document.createElement('span');
    this.heading.appendChild(shell);
    this.Typewriter = new Typewriter(shell, {
      ...typeOptions,
      strings,
    });
  }

  get select() {
    return this.element.querySelector('select');
  }

  get heading() {
    return this.element.querySelector('.heading');
  }
}
