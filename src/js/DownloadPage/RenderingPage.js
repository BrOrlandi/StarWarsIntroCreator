import { h } from 'preact';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';

import { RENDERING } from './constants';

const RenderingPage = ({ statusType, openingKey, finishRequestHandle }) => {
  const text = RENDERING === statusType ?
    'Your donation has been verified, your video being rendered right now! ' :
    'Your donation has been verified, your video will be rendered soon. ';
  return (
    <div>
      <p>
        {text}
        You will receive your video by email in less than two hours.
        This page will be updated when the video is ready.
      </p>
      <ContactButton />
      <p>
        If you want, you can add more emails to receive the video in the form below.
      </p>
      <EmailRequestField
        buttonlabel="ADD EMAIL"
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
    </div>
  );
};

export default RenderingPage;
