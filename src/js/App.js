import swal from 'sweetalert2';

import UrlHandler from './UrlHandler';
import { usingIE } from './auxiliar';
import { documentReady, urlHashChange } from './utils';
import { loadAndPlay, setEditMode } from './actions';
import { sendGAPageView } from './googleanalytics';
import { defaultOpening, defaultKey } from './config';
import ApplicationState, { PLAYING } from './ApplicationState';

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

    if (ApplicationState.state.page === PLAYING) {
      setEditMode({ interruptAnimation: true });
      return;
    }

    setEditMode({
      opening: defaultOpening,
      key: defaultKey,
    });
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
