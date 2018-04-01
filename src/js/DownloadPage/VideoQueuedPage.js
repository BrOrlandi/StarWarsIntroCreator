import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import { calculateTimeToRender } from '../auxiliar';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';

const VideoQueuedPage = ({ status, openingKey, ...props }) => {
  const { queuePosition } = status;
  const timeToRender = calculateTimeToRender(queuePosition);

  return (
    <div>
      <p>
        This video is already in the queue to be rendered.
        This page will be updated when the video is ready.
        You can add more emails to receive the video,
        just follow the next page and add submit the request again with the new email.
      </p>
      <p>
        There are <b>{queuePosition} videos</b> in front of this request to be rendered and
        may take up to<b>{timeToRender}</b> to send the video.
        Can&apos;t wait for it? Donate at least <b>5 US Dollars</b> and
        your video will be ready in few hours.
        Your video will be rendered in HD Quality and MP4 file.&nbsp;
        <br /><br />
        <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/iYKU4pNy034">
          Check a sample video how your video will look like here.
        </a>
      </p>
      <p>
        Donate at least <b>10 US Dollars</b> and you will get the in <b>Full HD Quality</b>.<br />
        The donation is made via PayPal and it&apos;s safe.
        If you don&apos;t receive the video that we promise, you can request a refund on PayPal.
      </p>
      <TermsOfServiceAcceptance />
      <ContactButton />
      <p>You want to receive your video faster by donating or wait in the queue?</p>
      <DonateOrNotDonate {...props} />
    </div>
  );
};

export default VideoQueuedPage;
