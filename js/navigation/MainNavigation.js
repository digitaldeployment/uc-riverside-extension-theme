import Navigation from '../components/Navigation';

const settings = {
  menuBlock: 'main-navigation',
  expandActiveMenus: true,
  closeUnnestedMenus: false,
  focusout: false,
  hover: false,
};

export default class MainNavigation {
  constructor(element) {
    this.element = element;

    if (this.menu) {
      this.Navigation = this.addNavigationLogic();
    }
  }

  addNavigationLogic() {
    return new Navigation(this.menu, settings);
  }
  
  get menu() {
    return this.element.querySelector('#main-navigation');
  }
}