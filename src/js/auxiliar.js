import swal from 'sweetalert2';

import { getIEVersion } from './utils';
import ApplicationState, { CREATING } from './ApplicationState';

export const usingIE = () => -1 !== getIEVersion();

export const checkSWFontCompatibility = (title) => {
  const supportedChars = ' qwertyuiopasdfghjklzxcvbnm0123456789!$'.split(''); // all supported supported chars
  const chars = title.toLowerCase().split('');
  return chars.every(char => supportedChars.indexOf(char) !== -1);
};

export const apiError = (message, reloadPage = false, keepPage = false) => {
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
      window.open(`mailto:kassellabs+starwars@googlegroups.com?Subject=SWIC%20Error&Body=${bodyMessage}`);
    }
    if (result.dismiss === swal.DismissReason.cancel && reloadPage) {
      window.location.reload();
    }

    if (!keepPage) {
      ApplicationState.setState(CREATING);
    }
  });
};

export const calculateTimeToRender = (queuePosition) => {
  const totalMinutes = queuePosition * 30;
  const totalHours = Math.floor(totalMinutes / 60);
  const partialDays = Math.floor(totalHours / 24);
  const totalDays = Math.ceil(totalHours / 24);
  let time = '';

  if (queuePosition < 3) {
    return ' 1 hour';
  }
  if (partialDays >= 3) {
    return ` ${totalDays} days`;
  }
  if (partialDays > 0) {
    time += ` ${partialDays} day${1 !== partialDays ? 's' : ''}`;
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    time += `${partialDays ? ',' : ''} ${hours} hour${1 !== hours ? 's' : ''}`;
  }
  if (minutes > 0) {
    time += ` and ${minutes} minutes`;
  }
  return time;
};
