import Breakpoints from 'breakpoints-js/dist/breakpoints';

const settings = {
  mobile:  {
    min: 0,
    max: 991,
  },
  desktop: {
    min: 992,
    max: Infinity,
  },
};

Breakpoints(settings);

export default Breakpoints;
