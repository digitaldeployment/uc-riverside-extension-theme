import 'flickity-fade';
import Hero from '../components/Hero';
import Videos from '../components/Videos';
import SliderExperiences from '../components/SliderExperiences';

export default () => {
  // Home Hero
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.homepage section.hero').forEach(element => {
    if (!element.Hero) {
      element.Hero = new Hero(element);
    }
  });

  // Home Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.homepage section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new SliderExperiences(element);
    }
  });

  // Home Videos
  // ---------------------------------------------------------------------------

  document.querySelectorAll('.homepage section.videos').forEach(element => {
    if (!element.Videos) {
      element.Videos = new Videos(element);
    }
  });
}
