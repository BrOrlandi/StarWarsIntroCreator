import { h } from 'preact';

const ContactButton = ({ customText }) => {
  const text = customText ||
    'If you have any questions, please contact us via email:';

  return (
    <p className="contactButton">
      {text}&nbsp;
      <a href="mailto:kassellabs+starwars@gmail.com" rel="noopener noreferrer" target="_blank">
        kassellabs@gmail.com
      </a>.
    </p>
  );
};

export default ContactButton;
