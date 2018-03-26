import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';

const RequestDownloadPage = ({
  donate,
  openingKey,
  finishRequestHandle,
  ...props
}) => {
  const iframe = document.querySelector('#paypalDonateIframe');

  const donateScreen = (
    <div>
      <p>
        Great choice! You can donate how much you want but there is a minimum to receive the video.
        <ul>
          <li>At least 5 dollars for HD video (1280x720).</li>
          <li>At least 10 dollars for Full HD video (1920x1080)</li>
        </ul>
        Click on the following PayPal button to donate:
      </p>
      <iframe
        title="PayPal Donation Buttons"
        src={`${iframe.src}#!/${openingKey}`}
        className={iframe.classList.toString()}
        height="33px"
      />
    </div>
  );

  const paypalEmail = donate ?
    'Please, use the same email from your PayPal account.' :
    '';

  return (
    <div className="requestDownloadPage">
      {donate && donateScreen}
      {!donate && <DonateOrNotDonate {...props} hideNoDonateOption />}
      <p>
        Fill your email below and when your video is ready
        you will receive a message with the link to download it.
        We promise not to send spam!&nbsp;
        {paypalEmail}
      </p>
      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
    </div>
  );
};

export default RequestDownloadPage;
