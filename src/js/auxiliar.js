import swal from 'sweetalert2';

import { getIEVersion } from './utils';
import ApplicationState, { CREATING } from './ApplicationState';

export const usingIE = () => -1 !== getIEVersion();

export const checkSWFontCompatibility = (title) => {
  const supportedChars = ' qwertyuiopasdfghjklzxcvbnm0123456789!$'.split(''); // all supported supported chars
  const chars = title.toLowerCase().split('');
  return chars.every(char => supportedChars.indexOf(char) !== -1);
};

export const apiError = (message, reloadPage = false) => {
  const bodyMessage = encodeURI(`Hi, the SWIC website didn't work as expected.
The following error message is showed:

${message}

I want to provide the following details:

  `);

  const cancelButtonText = reloadPage ? 'RELOAD PAGE' : 'CLOSE';

  swal({
    title: 'an unexpected error occured',
    text: `${message}.
    The empire may have intercepted our transmission.
    The alliance has already been informed and is working on correcting this.
    Please try again and if the problem persists, contact us to give more details clicking on the button below.`,
    type: 'error',
    showCancelButton: true,
    cancelButtonText,
    confirmButtonText: 'CONTACT SUPPORT',
  }).then((result) => {
    if (result.value) {
      window.open(`mailto:kassellabs+starwars@gmail.com?Subject=SWIC%20Error&Body=${bodyMessage}`);
    }
    if (result.dismiss === swal.DismissReason.cancel && reloadPage) {
      window.location.reload();
    }
    ApplicationState.setState(CREATING);
  });
};
