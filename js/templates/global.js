import 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import Flyout from '../components/Flyout'
import MainNavigation from '../navigation/MainNavigation'

export default () => {
  // Flyout toggle functionality
  // ---------------------------------------------------------------------------
  document.body.Flyout = new Flyout();

  // Accessible Menu Example
  // ---------------------------------------------------------------------------
  document.querySelectorAll('#main-navigation').forEach(element => {
    element.MainNavigation = new MainNavigation({
      menuElement: element,
    });
  });

  // Collapsible powered accordions
  // ---------------------------------------------------------------------------
  $('.accordions .collapsible').collapsible();

  // Collapsible powered tabs
  // ---------------------------------------------------------------------------
  $('.tabs .collapsible').collapsible();
}
