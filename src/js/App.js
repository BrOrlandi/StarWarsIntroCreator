import swal from 'sweetalert2';

import UrlHandler from './UrlHandler';
import { usingIE } from './auxiliar';
import { defaultOpening, defaultKey } from './config';
import { documentReady, urlHashChange } from './utils';
import { loadAndPlay, setEditMode } from './actions';
import { sendGAPageView } from './googleanalytics';

const startApplication = () => {
  urlHashChange(() => {
    sendGAPageView();
    swal.close();

    const { key, mode } = UrlHandler.getParams();
    if (key) {
      if (!mode) {
        loadAndPlay(key);
        return;
      }
      console.log(mode);
    }
    setEditMode(defaultOpening, defaultKey);
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
