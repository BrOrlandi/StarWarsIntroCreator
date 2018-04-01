import swal from 'sweetalert2';

import UrlHandler from './UrlHandler';
import AudioController from './AudioController';
import { usingIE } from './auxiliar';
import { documentReady, urlHashChange } from './utils';
import { loadAndPlay, loadDownloadPage, setCreateMode, loadAndEdit } from './actions';
import { sendGAPageView } from './googleanalytics';
import { defaultOpening, defaultKey } from './config';
import ApplicationState, { PLAYING, EDITING } from './ApplicationState';

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
          ApplicationState.setState(EDITING, { interruptAnimation });
          return;
        }

        loadAndEdit(key);
        return;
      }

      if ('download' === page) {
        loadDownloadPage(key);
        return;
      }
    }

    if (ApplicationState.state.page === PLAYING) {
      setCreateMode({ interruptAnimation: true });
      return;
    }

    setCreateMode({
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
