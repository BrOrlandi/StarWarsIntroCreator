import swal from 'sweetalert2';
import { usingIE } from './auxiliar';
import { documentReady, urlHashChange } from './utils';

import UrlHandler from './UrlHandler';

import { loadAndPlay, setEditMode } from './actions';

const startApplication = () => {
  urlHashChange(() => {
    swal.close();

    const { key, mode } = UrlHandler.getParams();
    if (key) {
      if (!mode) {
        loadAndPlay(key);
        return;
      }
      console.log(mode);
    }
    setEditMode();
  });


  documentReady(() => {
    if (usingIE()) {
      swal(
        'internet explorer detected',
        'This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.',
        'error',
      );
    }
    window.dispatchEvent(new Event('hashchange'));
  });
};

export default startApplication;
