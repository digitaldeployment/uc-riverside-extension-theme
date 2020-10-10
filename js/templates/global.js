import $ from 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import 'flickity-fade';
import Flickity from 'flickity';
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
  
  // Certificate Career Opportunities Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__career-opportunities .slider').forEach(element => {
    if (!element.Slider) {
      const defaults = {
        wrapAround: true,
        pageDots: true,
        autoPlay: false,
        adaptiveHeight: false,
        arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
        defaults: 1,
      }
      
      element.Slider = new Flickity(element, defaults);
    }
  });
  
  // Certificate Related Programs Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__related-programs .slider').forEach(element => {
    if (!element.Slider) {
      const defaults = {
        wrapAround: true,
        autoPlay: false,
        adaptiveHeight: false,
        arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
      }

      if (window.matchMedia("(max-width: 992px)").matches) {
        defaults['groupCells'] = 1;
        defaults['prevNextButtons'] = false;
        defaults['pageDots'] = true;
      } else {
        defaults['groupCells'] = 4;
        defaults['prevNextButtons'] = true;
        defaults['pageDots'] = false;

      }
      element.Slider = new Flickity(element, defaults);
    }
  });
}
