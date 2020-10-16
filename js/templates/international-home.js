import 'popper.js'
import $ from 'jquery'
import SliderExperiences from '../components/SliderExperiences'

export default () => {
  // Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderExperiences(element);
    }
  });

  // What's Your Dream - Popup Descriptions
  // ---------------------------------------------------------------------------

  $('.program-desc-btn[data-toggle="popover"]').popover({
    animation: true,
    trigger: 'focus',
    offset: '0, 5px',
    placement: 'bottom',
  })
}
