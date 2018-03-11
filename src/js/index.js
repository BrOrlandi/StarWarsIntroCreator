import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';
import '../../.env';

import startApplication from './App';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});


(function _() {
  if ('development' === process.env.NODE_ENV) {
    startApplication();
    return;
  }

  Raven.config(process.env.RAVEN).install();
  Raven.context(() => {
    startApplication();
  });
}());

