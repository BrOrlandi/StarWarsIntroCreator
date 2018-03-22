import ViewController from './ViewController';
import AudioController from './AudioController';
import UrlHandler from './UrlHandler';
import { setPaypalKey } from './paypal';

export const CREATING = 'CREATING';
export const LOADING = 'LOADING';
export const PLAYING = 'PLAYING';
export const EDITING = 'EDITING';
export const ERROR = 'ERROR';

class ApplicationState {
  constructor() {
    this.state = {
      page: LOADING,
    };

    AudioController.loadAudio();
    this.renderState();
  }

  setState(page, props = {}) {
    // previous state undo changes
    if (this.state.page !== page) {
      switch (this.state.page) {
        case LOADING:
          ViewController.unsetLoading();
          break;

        case ERROR:
          ViewController.unsetError();
          break;

        case PLAYING:
          ViewController.stopPlaying(props.interruptAnimation);
          break;

        case EDITING:
          ViewController.hideDownloadButton();
          break;

        default:
          ViewController.unsetLoading();
      }
    }

    this.state = {
      ...this.state,
      page,
      ...props,
    };
    console.log(this.state);
    this.renderState();
  }

  renderState = async () => {
    const { opening, key } = this.state;

    // next state changes
    switch (this.state.page) {
      case LOADING:
        ViewController.setLoading();
        break;

      case PLAYING:
        setPaypalKey(key);
        await ViewController.playOpening(opening);
        UrlHandler.goToDownloadPage(key);
        break;

      case EDITING:
        ViewController.setFormValues(opening);
        ViewController.showDownloadButton();
        break;

      case ERROR:
        ViewController.setError();
        break;


      default:
        ViewController.unsetLoading();
    }
  }
}

export default new ApplicationState();
