import { tabbable } from 'tabbable';
import TickTock from 'tick-tock';
import Keyboard from 'keyboard-key';

/**
 * @file Navigation
 *
 * Transforms an existing HTML list into an accessible navigation menu w/dropdowns.
 *
 * @constructor
 * @param element {HTML element} Menu list
 * @param options {object} Custom options to override the defaults of this instance.
 *
 * @constant defaults {object} Default options of this module
 * @param menuBlock {string} Namespace to be used for this instance
 * @param menuParent {string} DOM selector of the list items which contain a submenu
 * @param activeClass {string} Classname to be used to reference a active element
 * @param activeTrailClass {string} Classname to be used to reference a active element ancestor
 * @param expandActiveMenus {boolean} Whether or not to open active menus in the active trail
 * @param closeUnnestedMenus {boolean} Whether or not to close menus that are not
 *    decendents of the currently interacted menu tree
 * @param focusout {boolean} Whether or not to close open menus when the block has lost focus
 * @param hover {boolean} Whether or not to control menu display based on mouse interaction
 * @var delay {object}
 * @param in {int} Hover delay on mouse over
 * @param out {int} Hover delay on mouse out
 *
 */

const defaults = {
  menuBlock: 'navigation',
  menuParent: '.subnav-item',
  activeClass: 'active',
  activeTrailClass: 'active-trail',
  expandActiveMenus: false,
  closeUnnestedMenus: true,
  mobileBreakpoint: 992,
  focusout: true,
  hover: true,
  delay: {
    in: 150,
    out: 250,
  },
};

export default class Navigation {
  constructor(element, options) {
    this.menu = element;
    this.settings = { ...defaults, ...options };
    this.preprocess();
    this.listen();
  }

  // Add appropriate accessibility attributes to existing markup
  // and the toggle button which manages the submenu display.

  preprocess() {
    this.menuParents.forEach((element, index) => {
      // Set unique ID to link the button to the submenu.
      const id = `${this.components.submenu}-${index}`;

      // Link
      const link = element.firstElementChild;
      link.setAttribute('aria-label', `${link.textContent}, tab to the next button to expand the submenu`);
      link.setAttribute('aria-haspopup', true);
      link.setAttribute('aria-controls', id);

      // Toggle button
      const button = link.nextSibling;
      button.classList.add(this.components.button);
      button.setAttribute('aria-label', `Toggle the submenu`);
      button.setAttribute('aria-haspopup', true);
      button.setAttribute('aria-controls', id);

      // Submenu
      const submenu = element.lastElementChild;
      submenu.id = id;
      submenu.classList.add(this.components.submenu);
      submenu.Timer = new TickTock();
      submenu.Tabbable = tabbable(submenu);

      // Add each reference within the parent.
      element.link = link;
      element.button = button;
      element.submenu = submenu;

      // Set initial state of components
      this.collapse(element);

      // Manage display of the active trail, if configured.
      if (this.settings.expandActiveMenus) {
        const isActiveTrail = element.classList.contains(this.settings.activeTrailClass);
        if (isActiveTrail) {
          this.expand(element, false);
        }
      }
    });
  }

  mobileState() {
    return window.outerWidth < this.settings.mobileBreakpoint;
  }

  // Update submenu display based on user interaction.

  userInteractionHandler(event) {
    // Grab closest list item to the target.
    const parentNode = event.target.closest('li');

    // Cancel if a parentNode list item isn't found or
    // if the target was a hyperlink tag.
    if (!parentNode || event.target.tagName === 'A') return;

    // Grab reference to the assigned button and submenu of this list item.
    const { button, submenu } = parentNode;

    // If there isn't a submenu and button, quit.
    if (!submenu && !button) return;

    // Set expand state based on current aria-expanded attribute set on the button.
    const expand = button.getAttribute('aria-expanded') === 'false';

    // Set the current state of the associate submenu and button.
    if (expand) {
      this.expand(parentNode, true);
    } else {
      this.collapse(parentNode);
    }

    // Only continue to close unnested expanded submenus if the setting is true and
    // we're not viewing in a mobile state.
    if (!this.settings.closeUnnestedMenus || this.mobileState) return;

    // Loop thru each open submenu
    this.openSubmenus.forEach((openSubmenu) => {
      // If the button interacted with is not within this subtree, collapse it.
      if (!openSubmenu.parentNode.contains(button)) {
        this.collapse(openSubmenu.parentNode);
      }
    });
  }

  // Sets the expanded state of the passed in components.

  expand(parentNode, focus) {
    const { link, button, submenu } = parentNode;
    this.expandElement(link);
    this.expandElement(button);
    this.expandSubmenu(submenu, focus);
  }

  // Sets the collapsed state of the passed in components.

  collapse(parentNode) {
    const { link, button, submenu } = parentNode;
    this.collapseElement(link);
    this.collapseElement(button);
    this.collapseSubmenu(submenu);
  }

  // Sets the expanded state of the passed in element.

  /* eslint-disable-next-line */
  expandElement(element) {
    element.setAttribute('aria-expanded', true);
  }

  // Sets the collapsed state of the passed in element.

  /* eslint-disable-next-line */
  collapseElement(element) {
    element.setAttribute('aria-expanded', false);
  }

  // Sets the expanded state of the submenu.

  expandSubmenu(submenu, focus) {
    submenu.parentNode.classList.add(this.states.active);
    submenu.classList.add(this.states.open);
    submenu.removeAttribute('aria-hidden');
    submenu.expanded = true;

    // Don't focus if it's not set to.
    if (!focus) return;

    // Only continue if this submenu has tabbable elements.
    if (!submenu.Tabbable.length) return;

    // Focus the first tabbable element after submenu is expanded.
    submenu.Timer.setTimeout('focus', () => {
      submenu.Tabbable[0].focus();
    }, 100);
  }

  // Sets the collapsed state of the submenu.

  collapseSubmenu(submenu) {
    submenu.parentNode.classList.remove(this.states.active);
    submenu.classList.remove(this.states.open);
    submenu.setAttribute('aria-hidden', true);
    submenu.expanded = false;
  }

  // Completely reset the state of the menu

  clearAll() {
    this.openSubmenus.forEach((openSubmenu) => {
      this.collapse(openSubmenu.parentNode);
    });
  }

  // Add event listeners to the array of event types.

  listen() {
    this.menu.addEventListener('keydown', this.keyDownEventDispatcher.bind(this));
    this.menu.addEventListener('mousedown', this.mouseDownEventDispatcher.bind(this));

    // Whether or not to close open menus if the block loses focus.
    if (this.settings.focusout) {
      this.menu.addEventListener('focusout', this.focusOutEventDispatcher.bind(this));
    }

    // Whether or not to activate menus on a mouseover event.
    if (this.settings.hover) {
      this.menuParents.forEach((menuParent) => {
        menuParent.addEventListener('mouseover', this.mouseOverHandler.bind(this));
        menuParent.addEventListener('mouseout', this.mouseOutHandler.bind(this));
      });
    }
  }

  // Dispatch events for the keydown event type.

  keyDownEventDispatcher(event) {
    const keyCode = Keyboard.getCode(event);
    switch (keyCode) {
      case Keyboard.Enter:
        // if the keydown is caused by the return key, it should be a click
        this.userInteractionHandler(event);
        break;
      case Keyboard.Escape:
        // if the keydown is caused by the escape key, close the menus
        this.clearAll();
        break;
      default: break;
    }
  }

  // Dispatch events for the mousedown event type.

  mouseDownEventDispatcher(event) {
    this.userInteractionHandler(event);
  }

  // Attach a listener to close everything when a user
  // interacts outside of the menu.

  focusOutEventDispatcher(event) {
    if (!this.menu.contains(event.relatedTarget) && !this.mobileState) {
      this.clearAll();
    }
  }

  // Manages menu states on a mouse over event.

  mouseOverHandler(event) {
    const { submenu } = event.currentTarget;
    submenu.Timer.clear('collapse');

    // Stop mouse actions on smaller devices.
    if (this.mobileState) return;

    // Quit if the menu is already expanded.
    if (submenu.expanded) return;

    // Stage menu to be expanded.
    submenu.Timer.setTimeout('expand', () => {
      this.expand(submenu.parentNode, false);
    }, this.settings.delay.in);
  }

  // Manages menu states on a mouse out event.

  mouseOutHandler(event) {
    const { submenu } = event.currentTarget;
    submenu.Timer.clear('expand');

    // Stop mouse actions on smaller devices.
    if (this.mobileState) return;

    // Quit if the menu is already collapsed.
    if (!submenu.expanded) return;

    // Stage menu to be collapsed.
    submenu.Timer.setTimeout('collapse', () => {
      this.collapse(submenu.parentNode);
    }, this.settings.delay.out);
  }

  // BEM conventions using the passed in `menuBlock` namespace for all states.

  get states() {
    return {
      active: `${this.settings.menuBlock}--active`,
      open: `${this.settings.menuBlock}__submenu--open`,
    };
  }

  // BEM conventions using the passed in `menuBlock` namespace for all components.

  get components() {
    return {
      button: `${this.settings.menuBlock}__toggle`,
      submenu: `${this.settings.menuBlock}__submenu`,
    };
  }

  // Getters for obtaining NodeLists of various elements.

  get menuParents() {
    return this.menu.querySelectorAll(this.settings.menuParent);
  }

  get buttons() {
    return this.menu.querySelectorAll(`.${this.components.button}`);
  }

  get submenus() {
    return this.menu.querySelectorAll(`.${this.components.submenu}`);
  }

  get openSubmenus() {
    return this.menu.querySelectorAll(`.${this.states.open}`);
  }
}
