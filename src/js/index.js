import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';

import { documentReady } from './utils';
import { verifyIE } from './auxiliar';

import './Router';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});

documentReady(() => {
  verifyIE();
  window.dispatchEvent(new Event('hashchange'));
});
