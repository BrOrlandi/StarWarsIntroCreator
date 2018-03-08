
import swal from 'sweetalert2';
import { getIEVersion } from './utils';

export const verifyIE = () => {
  const isUsingIE = -1 !== getIEVersion();
  if (isUsingIE) {
    swal(
      'internet explorer detected',
      'This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.',
      'error',
    );
    return true;
  }
  return false;
};