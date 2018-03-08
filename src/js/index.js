import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';

import { documentReady } from './utils';
import { verifyIE } from './auxiliar';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});


documentReady(() => {
  if(verifyIE()){
    // unsetLoading();
    return;
  }
});
