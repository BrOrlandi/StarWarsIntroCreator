import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';

import UrlHandler from './UrlHandler';
import ViewController from './ViewController';
import ApplicationState, { CREATING, PLAYING, EDITING, LOADING } from './ApplicationState';
import { loadKey, saveOpening } from './firebaseApi';

export const setCreateMode = (props = {}) => {
  ApplicationState.setState(CREATING, props);
};

const _apiError = (message, reloadPage = false) => {
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
    setCreateMode();
  });
};

const loadOpening = async (key) => {
  let opening;
  try {
    opening = await loadKey(key);
  } catch (error) {
    _apiError(`We could not load the introduction "${key}"`, true);
  }

  if (!opening) {
    setCreateMode();
    swal('ops...', `The introduction with the key "${key}" was not found.`, 'error');
  }

  return opening;
};

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadOpening(key);
  if (opening) {
    ApplicationState.setState(PLAYING, { opening, key });
  }
};

export const loadAndEdit = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadOpening(key);
  if (opening) {
    ApplicationState.setState(EDITING, { opening, key });
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

export const playButton = async (opening) => {
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

  Raven.captureBreadcrumb({
    message: 'Saving new intro',
    category: 'action',
    data: opening,
  });

  let key;
  try {
    key = await saveOpening(opening);
  } catch (error) {
    _apiError('There was an error creating your intro.');
  }

  UrlHandler.setKeyToPlay(key);
};

export const downloadButton = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  if (!isEqual(lastOpening, opening)) {
    return swal({
      title: 'Text was modified',
      text: 'You have changed some of the text fields. You need to play the your new intro to save and request a download. Do you want to restore your intro or play the new one?',
      showCancelButton: true,
      cancelButtonText: 'PLAY IT',
      confirmButtonText: 'RESTORE MY INTRO',
      animation: 'slide-from-top',
    }).then((response) => {
      if (response.value) {
        ViewController.setFormValues(lastOpening);
        return;
      }
      if (response.dismiss === swal.DismissReason.cancel) {
        playButton(opening);
        return;
      }
    });
  }
};
