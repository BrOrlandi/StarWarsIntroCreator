import { h, Component } from 'preact';

class DownloadPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.status,
    };
  }

  render(props, { status }) {
    return (
      <div>
        {JSON.stringify(status)}
      </div>
    );
  }
}

export default DownloadPage;
