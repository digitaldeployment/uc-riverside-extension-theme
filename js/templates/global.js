import $ from 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import 'flickity-fade';
import Sticky from '../utils/Sticky'
import Flyout from '../components/Flyout'
import SmoothScroll from 'smooth-scroll'
import PageAnchors from '../navigation/PageAnchors'
import InfoModal from '../components/InfoModal'
import VideoModal from '../components/VideoModal'
import VideoButton from '../components/VideoButton'
import InfoPopupButton from '../components/InfoPopupButton'
import MainNavigation from '../navigation/MainNavigation'
import TermNavigation from '../navigation/TermNavigation'
import SliderSpotlights from '../components/SliderSpotlights'
import SliderTestimonials from '../components/SliderTestimonials'
import SliderRelatedPrograms from '../components/SliderRelatedPrograms'
import SliderCareerOpportunities from '../components/SliderCareerOpportunites'

export default () => {
  // Grab helpful reference to the page header
  // ---------------------------------------------------------------------------
  const header = document.querySelector('.page__header');

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

  // Modal InfoPopup Buttons - Launch content within a modal
  // ---------------------------------------------------------------------------
  const infoModal = document.querySelector('#modal-info-popup');
  if (infoModal) {
    document.querySelectorAll('[data-target="#modal-info-popup"]').forEach(element => {
      // Add infoPopup button logic.
      if (!element.InfoPopupButton) {
        element.InfoPopupButton = new InfoPopupButton(element, infoModal);
      }
      // Add info modal logic.
      if (!document.body.InfoModal) {
        document.body.InfoModal = new InfoModal(infoModal);
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

  if (!document.body.SmoothScroll && header) {
    document.body.SmoothScroll = new SmoothScroll('a[href*="#"]', {
      updateURL: false,
      popstate: false,
      offset: () => header.clientHeight + 40,
    });
  }
  
  // Certificate Career Opportunities Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__career-opportunities .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderCareerOpportunities(element);
    }
  });
  
  // Related Programs Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__related-programs .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderRelatedPrograms(element);
    }
  });
  
  // Testimonials Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__testimonials .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderTestimonials(element);
    }
  });
  
  // Spotlights Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__spotlight-teasers .spotlight-teasers').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderSpotlights(element);
    }
  });
}
