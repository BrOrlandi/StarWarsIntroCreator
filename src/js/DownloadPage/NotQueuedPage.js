import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import { calculateTimeToRender } from '../auxiliar';

const NotQueuedPage = ({ status, ...props }) => {
  const { queueSize } = status;
  const timeToRender = calculateTimeToRender(queueSize);
  return (
    <div>
      <p>
        You can now request a download of your creation as a video,
        which you can play anywhere, put it in a slideshow or
        edit it in a movie editor, for instance.
        The video will be rendered on our servers and it&apos;s ready,
        it will be sent to your email.
        We want to provide the video for free, but we have costs with the servers.
      </p>
      <p>
        There are <b>{queueSize} videos</b> in front of you to be rendered and
        may take up to<b>{timeToRender}</b> to send your video.
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
        <b>Attention!</b> Make sure there are no typos in your text
        to grant that your video will be with the right text.
      </p>
      <p>You want to receive your video faster by donating or wait in the queue?</p>
      <DonateOrNotDonate {...props} />
    </div>
  );
};

export default NotQueuedPage;
