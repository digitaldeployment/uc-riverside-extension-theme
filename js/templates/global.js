import $ from 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import 'jquery-bonsai'
import 'fg-collapsible/src/collapsible'
import 'fg-collapsible/src/collapsible.set'
import 'fg-collapsible/src/collapsible.tab'
import 'flickity-fade';
import Sticky from '../utils/Sticky'
import Flyout from '../components/Flyout'
import SmoothScroll from 'smooth-scroll'
import Breakpoints from '../utils/Breakpoints'
import Checkboxes from '../components/Checkboxes'
import PageAnchors from '../navigation/PageAnchors'
import InfoModal from '../components/InfoModal'
import Hero from '../components/Hero'
import Videos from '../components/Videos'
import VideoModal from '../components/VideoModal'
import InfoPopupButton from '../components/InfoPopupButton'
import MainNavigation from '../navigation/MainNavigation'
import TermNavigation from '../navigation/TermNavigation'
import SliderSpotlights from '../components/SliderSpotlights'
import SliderExperiences from '../components/SliderExperiences'
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

  // Modal Video Functionality
  // ---------------------------------------------------------------------------
  const videoModal = document.querySelector('#modal-video');
  if (videoModal && !document.body.VideoModal) {
    document.body.VideoModal = new VideoModal(videoModal);
  }

  // Video(s) Slider
  // ---------------------------------------------------------------------------
  document.querySelectorAll('section.videos').forEach(element => {
    if (!element.Videos) {
      element.Videos = new Videos(element, videoModal);
    }
  });

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

  // Hero
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.hero').forEach(element => {
    if (!element.Hero) {
      element.Hero = new Hero(element);
    }
  });

  // Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderExperiences(element);
    }
  });

  // What's Your Dream - Full Desc Toggle
  // ---------------------------------------------------------------------------

  document.querySelectorAll('button.program-desc-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.parentNode.classList.toggle('show-full-desc')
    })
  })

  // Content Filtering powered by Jquery Bonsai
  // ---------------------------------------------------------------------------

  $('.content-filters ul.filters').bonsai({
    createInputs: 'checkbox',
    checkboxes: true,
  });

  // Add a bit of a11y support to thumb components added by bonsai.
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.content-filters .thumb').forEach((element) => {
    element.setAttribute('aria-label', 'Toggle visibility of nested filters');
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', 0);
  });

  // Checkbox Management
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.content-filters').forEach((element) => {
    if (!element.Checkboxes) {
      element.Checkboxes = new Checkboxes(element);
    }
  });

  // Expandable Filter Groups
  // ---------------------------------------------------------------------------

  const contentFilters = document.querySelector('.content-filters');
 
  if (contentFilters && !contentFilters.processed) {
    contentFilters.processed = true;

    // Create expandable filter groups with the collapsible library.
    // -------------------------------------------------------------------------
    const $groups = $(contentFilters).find('.filters-group').collapsible();

    // Automatically collapse/expand filter groups based on breakpoints.
    // -------------------------------------------------------------------------

    Breakpoints.on('desktop', {
      enter: () => {
        $groups.each((i, group) => {
          $(group).data('collapsible').expand();
        });
      },
      leave: () => {
        $groups.each((i, group) => {
          $(group).data('collapsible').collapse();
        });
      },
    });
  }
}
