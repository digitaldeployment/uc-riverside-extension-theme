import 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'jquery-qubit'
import 'jquery-bonsai'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import Sticky from '../utils/Sticky'
import Flyout from '../components/Flyout'
import Checkboxes from '../components/Checkboxes'
import MainNavigation from '../navigation/MainNavigation'
import TermNavigation from '../navigation/TermNavigation'

export default () => {
  // Flyout toggle functionality
  // ---------------------------------------------------------------------------
  document.body.Flyout = new Flyout();

  // Main Navigation Menu
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.main-navigation').forEach(element => {
    if (!element.MainNavigation) {
      element.MainNavigation = new MainNavigation(element);
    }
  });

  // Term Navigation Menu
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.term-navigation').forEach(element => {
    if (!element.TermNavigation) {
      element.TermNavigation = new TermNavigation(element);
    }
  });

  // Collapsible powered accordions
  // ---------------------------------------------------------------------------
  $('.accordions .collapsible').collapsible();

  // Collapsible powered tabs
  // ---------------------------------------------------------------------------
  $('.tabs .collapsible').collapsible();

  // Program Finder Filters powered by Jquery Bonsai
  // ---------------------------------------------------------------------------

  $('.program-finder__filters ul.filters').bonsai({
    createInputs: 'checkbox',
    checkboxes: true,
  });

  // Add a bit of a11y support to thumb components added by bonsai.
  document.querySelectorAll('.program-finder__filters .thumb').forEach((element) => {
    element.setAttribute('aria-label', 'Toggle visibility of nested filters');
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', 0);
  });

  // Program Finder Filters - Checkbox Management
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.program-finder__filters').forEach((element) => {
    if (!element.Checkboxes) {
      element.Checkboxes = new Checkboxes(element);
    }
  });

  // Sticky sidebars
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.page-sidebar-inner').forEach((element) => {
    if (!element.Sticky) {
      element.Sticky = new Sticky(element);
    }
  });
}
