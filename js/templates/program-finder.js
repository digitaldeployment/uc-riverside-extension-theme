import $ from 'jquery'
import 'jquery-bonsai'
import 'fg-collapsible/src/collapsible'
import Checkboxes from '../components/Checkboxes'
import Breakpoints from '../utils/Breakpoints'

export default () => {
  // Program Finder Filters powered by Jquery Bonsai
  // ---------------------------------------------------------------------------

  $('.program-finder__filters ul.filters').bonsai({
    createInputs: 'checkbox',
    checkboxes: true,
  });

  // Add a bit of a11y support to thumb components added by bonsai.
  // ---------------------------------------------------------------------------

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

  // Program Finder — Expandable Filter Groups
  // ---------------------------------------------------------------------------

  const programFinderFilters = document.querySelector('.program-finder__filters');
 
  if (programFinderFilters && !programFinderFilters.processed) {
    programFinderFilters.processed = true;

    // Create expandable filter groups with the collapsible library.
    // -------------------------------------------------------------------------
    const $groups = $(programFinderFilters).find('.filters-group').collapsible();

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
