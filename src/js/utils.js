export const documentReady = (callback) => {
  if (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

export const getIEVersion = () => {
  let rv = -1;
  if ('Microsoft Internet Explorer' === navigator.appName) {
    const ua = navigator.userAgent;
    /* eslint-disable-next-line */
    const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1);
    }
  } else if ('Netscape' === navigator.appName) {
    const ua = navigator.userAgent;
    /* eslint-disable-next-line */
    const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1);
    }
  }
  return rv;
};
