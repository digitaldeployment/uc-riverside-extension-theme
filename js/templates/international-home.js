import 'popper.js'
import $ from 'jquery'
import SliderVideos from '../components/SliderVideos'
import SliderExperiences from '../components/SliderExperiences'

export default () => {
  // Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderExperiences(element);
    }
  });

  // Videos Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.videos .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderVideos(element);
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
