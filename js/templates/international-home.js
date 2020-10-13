import Flickity from 'flickity';

export default () => {
  const flickityArrow = 'M50,0A50,50,0,1,1,0,50,50.06,50.06,0,0,1,50,0Zm0,95.91A45.91,45.91,0,1,0,4.09,50,46,46,0,0,0,50,95.91Zm1.45-25.28a2.05,2.05,0,0,0,0-2.9L33.71,50,51.45,32.26a2,2,0,1,0-2.9-2.89L29.37,48.55a2,2,0,0,0,0,2.89L48.55,70.63a2.05,2.05,0,0,0,2.9,0ZM71.23,50a2.05,2.05,0,0,0-2-2H30.82a2,2,0,1,0,0,4.09H69.18A2,2,0,0,0,71.23,50Z';

  // Experiences Slider
  // ---------------------------------------------------------------------------

  document.querySelectorAll('section.experiences .slider').forEach(element => {
    if (!element.Slider) {
      element.Slider = new Flickity(element, {
        arrowShape: flickityArrow,
        wrapAround: true,
      });
    }
  });
}
