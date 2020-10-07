export default class PageAnchors {
  constructor(element) {
    this.element = element;
    this.listen();
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
  }

  get anchors() {
    return this.element.querySelectorAll('a[href*="#"]');
  }
}
