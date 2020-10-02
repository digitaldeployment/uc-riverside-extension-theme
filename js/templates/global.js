import 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import Sticky from '../utils/Sticky'
import Flyout from '../components/Flyout'
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
  
  // Sticky sidebars
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.page-sidebar-inner').forEach((element) => {
    if (!element.Sticky) {
      element.Sticky = new Sticky(element);
    }
  });
}
