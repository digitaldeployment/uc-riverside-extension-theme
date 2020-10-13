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
import VideoModal from '../components/VideoModal'
import VideoButton from '../components/VideoButton'
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

  // Modal Video Buttons - Launch a remote video iframe'd in a modal
  // ---------------------------------------------------------------------------
  const videoModal = document.querySelector('#modal-video');
  if (videoModal) {
    document.querySelectorAll('[data-target="#modal-video"]').forEach(element => {
      // Add video button logic.
      if (!element.VideoButton) {
        element.VideoButton = new VideoButton(element, videoModal);
      }
      // Add video modal logic.
      if (!document.body.VideoModal) {
        document.body.VideoModal = new VideoModal(videoModal);
      }
    });
  }

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

  document.querySelectorAll('.certificate .section__related-programs .slider').forEach(element => {
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
  
  // Course Testimonials Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.course .section__testimonials .slider').forEach(element => {
    if (!element.Slider) {
      const defaults = {
        wrapAround: true,
        autoPlay: false,
        adaptiveHeight: false,
        arrowShape: 'M24.5,51.6v-3.2l19.6-19.6l3.2,3.2L31.5,47.8h44.1v4.5H31.5L47.2,68l-3.2,3.2L24.5,51.6z',
        groupCells: '1',
        pageDots: true,
      }

      if (window.matchMedia("(max-width: 992px)").matches) {
        defaults['prevNextButtons'] = false;
      } else {
        defaults['prevNextButtons'] = true;
      }
      element.Slider = new Flickity(element, defaults);
    }
  });
}
