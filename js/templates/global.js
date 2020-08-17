import 'jquery'
import 'select2'
import 'popper.js'
import 'bootstrap'
import Flyout from '../components/Flyout'
import MainNavigation from '../navigation/MainNavigation'

export default () => {
  // Flyout toggle functionality
  // ---------------------------------------------------------------------------
  document.body.Flyout = new Flyout();

  // Accessible Menu Example
  // ---------------------------------------------------------------------------
  document.querySelectorAll('#main-navigation').forEach(element => {
    element.MainNavigation = new MainNavigation({
      menuElement: element,
    });
  });
}
