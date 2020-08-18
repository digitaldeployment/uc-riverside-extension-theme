import AccessibleMenu from '@digitaldeployment/accessible-menu';

const defaults = {
  menuElement: null,
  submenuItemSelector: '.subnav-item',
  submenuToggleSelector: '.subnav-toggle',
  submenuSelector: '.subnav-menu',
}

export default class MainNavigation {
  constructor(options = {}) {
    this.settings = { ...defaults, ...options };
    this.a11yMenu = this.create();
  }

  create() {
    return new AccessibleMenu.DisclosureMenu(this.settings);
  }
}
