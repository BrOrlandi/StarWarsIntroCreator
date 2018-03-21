import swal from 'sweetalert2';

import UrlHandler from './UrlHandler';
import AudioController from './AudioController';
import { usingIE } from './auxiliar';
import { documentReady, urlHashChange } from './utils';
import { loadAndPlay, setEditMode, loadAndDownload } from './actions';
import { sendGAPageView } from './googleanalytics';
import { defaultOpening, defaultKey } from './config';
import ApplicationState, { PLAYING, DOWNLOAD } from './ApplicationState';

const startApplication = () => {
  urlHashChange(() => {
    sendGAPageView();
    swal.close();

    const { key, page } = UrlHandler.getParams();
    if (key) {
      if (!page) {
        loadAndPlay(key);
        return;
      }
      if ('edit' === page) {
        if (ApplicationState.state.key === key) {
          // interrupt animation if it's playing
          const interruptAnimation = !AudioController.audio.paused;
          ApplicationState.setState(DOWNLOAD, { interruptAnimation });
          return;
        }

        loadAndDownload(key);
        return;
      }
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
