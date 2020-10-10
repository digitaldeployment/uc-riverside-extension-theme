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

const flickityArrow = 'M50,0A50,50,0,1,1,0,50,50.06,50.06,0,0,1,50,0Zm0,95.91A45.91,45.91,0,1,0,4.09,50,46,46,0,0,0,50,95.91Zm1.45-25.28a2.05,2.05,0,0,0,0-2.9L33.71,50,51.45,32.26a2,2,0,1,0-2.9-2.89L29.37,48.55a2,2,0,0,0,0,2.89L48.55,70.63a2.05,2.05,0,0,0,2.9,0ZM71.23,50a2.05,2.05,0,0,0-2-2H30.82a2,2,0,1,0,0,4.09H69.18A2,2,0,0,0,71.23,50Z';

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
      element.Slider = new Flickity(element, {
        arrowShape: flickityArrow,
        wrapAround: true,
      });
    }
  });

}
