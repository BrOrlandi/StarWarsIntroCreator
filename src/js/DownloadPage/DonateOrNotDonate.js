import { h } from 'preact';

const DonateOrNotDonate = ({ yesDonateHandle, noDonateHandle, hideNoDonateOption = false }) => (
  <div className="donateOrNotDonateButtons">
    <button onClick={yesDonateHandle}>Yes, donate!</button>
    {!hideNoDonateOption &&
      <button onClick={noDonateHandle}>
        No, I&apos;ll get in the queue!
      </button>
    }
  </div>
);

export default DonateOrNotDonate;
