import { getIEVersion } from './utils';

export const usingIE = () => -1 !== getIEVersion();

export const checkSWFontCompatibility = (title) => {
  const supportedChars = ' qwertyuiopasdfghjklzxcvbnm0123456789!$'.split(''); // all supported supported chars
  const chars = title.toLowerCase().split('');
  return chars.every(char => supportedChars.indexOf(char) !== -1);
};
