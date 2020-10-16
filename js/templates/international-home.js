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

  // What's Your Dream - Full Desc Toggle
  // ---------------------------------------------------------------------------

  document.querySelectorAll('button.program-desc-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.parentNode.classList.toggle('show-full-desc')
    })
  })
}
