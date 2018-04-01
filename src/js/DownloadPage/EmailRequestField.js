import { h, Component } from 'preact';
import swal from 'sweetalert2';
import { requestIntroDownload } from '../actions';

class EmailRequestField extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const { openingKey, finishRequestHandle } = this.props;
    const emailField = document.querySelector('#emailRequestField input');
    const email = emailField.value;

    let requestDownloadStatus;

    await swal({
      title: 'download request',
      text: `Requestion download for intro "${openingKey}"...`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onOpen: async () => {
        swal.showLoading();
        requestDownloadStatus = await requestIntroDownload(openingKey, email);
        if (requestDownloadStatus) {
          swal.hideLoading();
          swal.clickConfirm();
        }
      },
    });

    if (requestDownloadStatus) {
      finishRequestHandle(requestDownloadStatus, email);
    }
  }

  render() {
    const { buttonlabel = 'SUBMIT REQUEST' } = this.props;
    return (
      <div id="emailRequestField">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insert your email here..."
            required
          />
          <button>{buttonlabel}</button>
        </form>
      </div>
    );
  }
}

export default EmailRequestField;

