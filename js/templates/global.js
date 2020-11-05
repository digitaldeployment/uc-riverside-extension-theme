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
import Toggle from '../components/Toggle'
import Videos from '../components/Videos'
import VideoModal from '../components/VideoModal'
import InfoPopupButton from '../components/InfoPopupButton'
import MainNavigation from '../navigation/MainNavigation'
import TermNavigation from '../navigation/TermNavigation'
import SliderRelated from '../components/SliderRelated'
import SliderSpotlights from '../components/SliderSpotlights'
import SliderExperiences from '../components/SliderExperiences'
import SliderTestimonials from '../components/SliderTestimonials'
import SliderFeaturedStories from '../components/SliderFeaturedStories'
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
    // Add info modal logic.
    if (!document.body.InfoModal) {
      document.body.InfoModal = new InfoModal(infoModal);
    }

    // Add infoPopup button logic.
    document.querySelectorAll('[data-target="#modal-info-popup"]').forEach(element => {
      if (!element.InfoPopupButton) {
        element.InfoPopupButton = new InfoPopupButton(element, infoModal);
      }
    });
  }

  // Collapsible powered accordions
  // ---------------------------------------------------------------------------
  $('.accordion.collapsible').collapsible();

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
  
  // Related Slider(s)
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__related-slider .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderRelated(element);
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

  // Featured Stories Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.section__featured-stories .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderFeaturedStories(element);
    }
  });

  // What's Your Dream - Full Desc Toggle
  // ---------------------------------------------------------------------------

  document.querySelectorAll('button.program-desc-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.parentNode.classList.toggle('show-full-desc')
    })
  })

  // Filters Toggles
  // ---------------------------------------------------------------------------

  document.querySelectorAll('#filters').forEach(element => {
    // Dropdown Filters Toggle
    if (!element.Toggle) {
      element.Toggle = new Toggle(element, {
        button: '.filters-toggle',
        menu: '.filters-group',
      })
      Breakpoints.on('mobile', {
        enter: () => { element.Toggle.collapse() },
      })
      Breakpoints.on('desktop', {
        enter: () => { element.Toggle.expand() },
      })
    }

    // Search Form Toggle
    if (!element.FormToggle) {
      element.FormToggle = new Toggle(element, {
        button: '.filters-search-toggle',
        menu: '.filters-search-components',
      })
      Breakpoints.on('mobile', {
        enter: () => { element.FormToggle.expand() },
      })
      Breakpoints.on('desktop', {
        enter: () => { element.FormToggle.collapse() },
      })
    }
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

    Breakpoints.on('mobile', {
      enter: () => {
        $groups.each((i, group) => {
          $(group).data('collapsible').collapse();
        });
      }
    });
    Breakpoints.on('desktop', {
      enter: () => {
        $groups.each((i, group) => {
          $(group).data('collapsible').expand();
        });
      }
    });
  }
}
