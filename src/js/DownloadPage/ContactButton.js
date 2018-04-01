import { h } from 'preact';

const ContactButton = ({ customText = 'If you have any questions, please contact us via email:' }) => {
  const link = (
    <a className="contactButton" href="mailto:kassellabs+starwars@googlegroups.com" rel="noopener noreferrer" target="_blank">
      kassellabs@googlegroups.com
    </a>);

  if (customText) {
    return (
      <p>
        {customText}&nbsp;
        {link}
      </p>
    );
  }

  return link;
};

export default ContactButton;
