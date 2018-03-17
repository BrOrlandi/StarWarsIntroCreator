export const documentReady = (handler) => {
  if (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
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

export const urlHashChange = (handler) => {
  window.addEventListener('hashchange', handler);
};


export const callOnFocus = (callback) => {
  const listener = () => {
    window.removeEventListener('focus', listener, true);
    return callback();
  };

  if (document.hasFocus()) {
    listener();
    return;
  }

  window.addEventListener('focus', listener, true);
};
