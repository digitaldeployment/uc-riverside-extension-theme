import Navigation from './Navigation';

export default class MainNavigation {
  constructor(element) {
    this.element = element;

    if (this.menu) {
      this.Navigation = this.addNavigationLogic();
    }
  }

  addNavigationLogic() {
    return new Navigation({
      menuElement: this.menu,
    });
  }
  
  get menu() {
    return this.element.querySelector('#main-navigation');
  }
}