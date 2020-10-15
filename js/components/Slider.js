import merge from 'deepmerge'
import Flickity from 'flickity'
import Breakpoints from '../utils/Breakpoints'
import { breakpoints } from '../config'

const defaults = {
  responsive: false,
};

export default class Slider {
  constructor(element, options = {}) {
    this.element = element;
    this.settings = merge(defaults, options);

    // Exit if we don't have more than one slide.
    if (!this.shouldBuildSlider) {
      return;
    }

    if (this.settings.responsive) {
      // Add responsive listeners
      this.addResponsiveSupport();
      return;
    }

    // If our slider isn't built yet, and isn't disabled,
    // default to building one with the base settings.
    this.update(this.settings);
  }

  build(settings) {
    // Return the new slider instance.
    return new Flickity(this.element, settings);
  }

  restore() {
    // Destroys existing slider if one exists.
    return new Promise((resolve) => {
      if (this.slider) {
        this.slider.destroy();
      }

      // Resolve response after slider is removed.
      resolve();
    });
  }

  update(data) {
    this.restore().then(() => {
      // Do not build a new slider if set to 'disable'.
      if (data.disabled) {
        return;
      }

      // Build a new slider based on the passed settings.
      this.slider = this.build(data);
    });
  }

  // Adds responsive support which allows custom settings based on
  // the current viewport.
  addResponsiveSupport() {
    const { responsive } = this.settings;

    // Iterate through the provided breakpoints...
    Object.keys(breakpoints).forEach((bp) => {
      // Merges the baseSettings with the custom responsive settings.
      const bpSettings = merge(this.baseSettings, responsive[bp] || {});

      // Adds breakpoint listener for when this viewport is entered.
      Breakpoints.on(bp, 'enter', bpSettings, this.update.bind(this));
    });
  }

  // Only builds slider if there are enought slides.
  get shouldBuildSlider() {
    return this.slides.length > 1;
  }

  // Returns reference to the available slides within this slider.
  get slides() {
    return this.element.children;
  }

  // Extracts the base settings while stripping the responsive subset.
  get baseSettings() {
    const baseSettings = this.settings;
    if ('responsive' in baseSettings) {
      delete baseSettings.responsive;
    }
    return baseSettings;
  }
}
