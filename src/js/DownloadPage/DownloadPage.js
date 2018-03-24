import { h, Component } from 'preact';
import { INITIAL_PAGE, NOT_QUEUED } from './constants';
import NotQueuedPage from './NotQueuedPage';

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    const { status } = props;

    this.state = {
      status,
      page: INITIAL_PAGE,
    };
  }

  yesDonateHandle = () => {
    console.log('donate');
  };

  noDonateHandle = () => {
    console.log('no donate');
  };

  renderInitialPage() {
    const { status } = this.state;
    const statusType = status.status;
    switch (statusType) {
      default:
      case NOT_QUEUED:
        return (
          <NotQueuedPage
            status={status}
            yesDonateHandle={this.yesDonateHandle}
            noDonateHandle={this.noDonateHandle}
          />
        );
    }
  }

  render() {
    const { page } = this.state;
    switch (page) {
      default:
      case INITIAL_PAGE:
        return this.renderInitialPage();
    }
  }
}

export default DownloadPage;
