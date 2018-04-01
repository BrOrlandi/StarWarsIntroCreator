import { h, Component } from 'preact';

import { calculateTimeToRender } from '../auxiliar';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import UrlHandler from '../UrlHandler';

class VideoRequestSent extends Component {
  handleOkButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToEditPage(openingKey);
  }

  renderEmail() {
    const { requestEmail } = this.props;

    return (
      <p className="email">
        {requestEmail}
      </p>
    );
  }

  renderDidNotDonate() {
    const { requestStatus } = this.props;
    const { queuePosition } = requestStatus;
    const timeToRender = calculateTimeToRender(queuePosition);

    return (
      <p>
        Your video request has been queued!
        Your current position on the queue is <b>{queuePosition}</b>,
        and may take up to {timeToRender} to send your video.
        The link to download the video will be sent to the email:
        {this.renderEmail()}
        You can add more emails to receive the video if you want,
        just go back and request it for another email.
        The link to download will also be available on this page when it&apos;s ready.
      </p>
    );
  }

  renderDonate() {
    return (
      <div>
        <p>
          Your video will be rendered soon!
          Thank you so much for supporting us!
          You should receive the confirmation message from us within a few minutes
          in your PayPal account email.
          Don&apos;t forget to check your spam box.
          If you don&apos;t receive it, please contact us:&nbsp;
          <ContactButton customText="" />
        </p>
        <p>
          The link to download the video will be sent to the email:
          {this.renderEmail()}
          You can add more emails to receive the video if you want,
          just go back and request it for another email.
          The link to download will also be available on this page when it&apos;s ready.
        </p>
      </div>
    );
  }

  render() {
    const { donate } = this.props;
    return (
      <div>
        {donate ? this.renderDonate() : this.renderDidNotDonate() }
        <TermsOfServiceAcceptance />
        <div className="center">
          <button onClick={this.handleOkButton}>OK</button>
        </div>
      </div>
    );
  }
}

export default VideoRequestSent;
