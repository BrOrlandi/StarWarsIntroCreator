import ViewControl from './ViewControl';

export const EDITING = 'EDITING';
export const LOADING = 'LOADING';
export const PLAYING = 'PLAYING';
export const DOWNLOAD = 'DOWNLOAD';

class ApplicationState {
  constructor() {
    this.state = {
      page: LOADING,
    };

    this.renderState();
  }

  setState(page, props) {
    // previous state undo changes
    switch (this.state.page) {
      case LOADING:
        ViewControl.unsetLoading();
        break;

      default:
        ViewControl.unsetLoading();
    }

    this.state = {
      ...this.state,
      page,
      ...props,
    };
    console.log(this.state);
    this.renderState();
  }

  renderState() {
    const { opening } = this.state;

    // next state changes
    switch (this.state.page) {
      case LOADING:
        ViewControl.setLoading();
        break;

      case PLAYING:
        ViewControl.playOpening(opening);
        break;


      default:
        ViewControl.unsetLoading();
    }
  }
}

export default new ApplicationState();
