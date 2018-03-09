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
    switch (this.state.page) {
      case LOADING:
        ViewControl.unsetLoading();
        break;

      default:
        ViewControl.unsetLoading();
    }

    this.state = {
      page,
      ...props,
    };

    this.renderState();
  }

  renderState() {
    switch (this.state.page) {
      case LOADING:
        ViewControl.setLoading();
        break;

      default:
        ViewControl.unsetLoading();
    }
  }
}

export default new ApplicationState();
