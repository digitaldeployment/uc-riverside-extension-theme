export default class PageAnchors {
  constructor(element) {
    this.element = element;
    this.expanded = false;
    this.listen();
  }

  buttonClickHandler() {
    if (this.expanded) {
      this.element.classList.remove('anchor-menu--expanded');
      this.button.setAttribute('aria-expanded', false);
      this.expanded = false;
    } else {
      this.element.classList.add('anchor-menu--expanded');
      this.button.setAttribute('aria-expanded', true);
      this.expanded = true;
    }
  }

  clickHandler(event) {
    if (!event.currentTarget.classList.contains('active')) {
      event.currentTarget.classList.add('active');
      this.anchors.forEach(link => {
        if (link !== event.currentTarget) {
          link.classList.remove('active');
        }
      });
    }
  }

  listen() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener('click', this.clickHandler.bind(this));
    });
    this.button.addEventListener('click', this.buttonClickHandler.bind(this));
  }

  get menu() {
    return this.element.querySelector('ul.nav');
  }

  get button() {
    return this.element.querySelector('button.toggle-btn');
  }

  get anchors() {
    return this.element.querySelectorAll('a[href*="#"]');
  }
}
