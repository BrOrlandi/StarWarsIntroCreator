import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';
import '../../.env';

import './facebooksdk';
import './googleanalytics';

import startApplication from './App';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});


(function _() {
  if ('development' === process.env.NODE_ENV) {
    startApplication();
    return;
  }

  Raven.config(process.env.RAVEN, {
    release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572',
  }).install();
  Raven.context(() => {
    startApplication();
  });
}());

