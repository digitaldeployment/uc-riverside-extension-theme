import SliderVideos from '../components/SliderVideos'
import SliderExperiences from '../components/SliderExperiences'

export default () => {
  // Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.international-homepage section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderExperiences(element);
    }
  });

  // Videos Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.international-homepage section.videos .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderVideos(element);
    }
  });

  // What's Your Dream - Full Desc Toggle
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.international-homepage button.program-desc-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.parentNode.classList.toggle('show-full-desc')
    })
  })
}
