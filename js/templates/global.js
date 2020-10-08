import $ from 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import Sticky from '../utils/Sticky'
import Flyout from '../components/Flyout'
import SmoothScroll from 'smooth-scroll'
import PageAnchors from '../navigation/PageAnchors'
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

  // Page anchors — active state management
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.page__anchors').forEach((element) => {
    if (!element.PageAnchors) {
      element.PageAnchors = new PageAnchors(element);
    }
  });

  // Smooth scroll control of all anchor links
  // ---------------------------------------------------------------------------

  if (!document.body.SmoothScroll) {
    document.body.SmoothScroll = new SmoothScroll('a[href*="#"]', {
      header: '.page__header',
      updateURL: false,
      popstate: false,
      offset: 40,
    });
  }
}
