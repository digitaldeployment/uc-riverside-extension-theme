class Change {
  constructor() {
    this.ticking = false;
    this.callbacks = [];
    this.listen();
  }

  update() {
    this.ticking = false;
    this.callbacks.forEach(callback => {
      callback.call();
    })
  }

  change() {
    this.request();
  }

  request() {
    if (!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  onChange(callback) {
    this.callbacks.push(callback);
    return this;
  }

  listen() {
    window.addEventListener('resize', this.change.bind(this));
    window.addEventListener('orientationchange', this.change.bind(this));
  }
}

export default new Change();
