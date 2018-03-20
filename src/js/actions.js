import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';

import UrlHandler from './UrlHandler';
import ApplicationState, { EDITING, ERROR, PLAYING, LOADING } from './ApplicationState';
import { loadKey } from './api';

export const setEditMode = (props = {}) => {
  ApplicationState.setState(EDITING, props);
};

const _apiError = (message, reloadPage) => {
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
    setEditMode();
  });
};

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  try {
    const opening = await loadKey(key);

    if (!opening) {
      setEditMode();
      swal('ops...', `The introduction with the key "${key}" was not found.`, 'error');
      return;
    }

    ApplicationState.setState(PLAYING, { opening, key });
  } catch (error) {
    ApplicationState.setState(ERROR);
    _apiError(`We could not load the introduction "${key}"`, true);
    throw error;
  }
};

export const _openingIsValid = (opening) => {
  const introLines = opening.intro.split('\n');
  if (introLines.length > 2) {
    swal('ops...', "The blue introduction text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  const logoLines = opening.logo.split('\n');
  if (logoLines.length > 2) {
    swal('ops...', "The Star Wars logo text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  return true;
};

export const playButton = (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const lastKey = ApplicationState.state.key;

  const isOpeningChanged = !isEqual(lastOpening, opening);
  if (!isOpeningChanged) {
    UrlHandler.setKeyToPlay(lastKey);
    return;
  }

  if (!_openingIsValid(opening)) {
    return;
  }

  ApplicationState.setState(LOADING);
  // TODO submit new intro
};

export const downloadButton = () => {
  console.log("downloadButton");
};
