// Styles
import '../scss/theme.scss'

// Scripts
let global, home;

if (typeof document !== 'undefined') {
  require('jquery');
  global = require('./templates/global').default;
  home = require('./templates/home').default;

  window.setTimeout(() => {
    global();
    home();
  }, 1000);
}
