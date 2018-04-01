import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';

import UrlHandler from './UrlHandler';
import ViewController from './ViewController';
import ApplicationState, { CREATING, PLAYING, EDITING, LOADING, DOWNLOAD } from './ApplicationState';
import { fetchKey, saveOpening } from './firebaseApi';
import { fetchStatus, requestDownload } from './serverApi';
import { apiError } from './auxiliar';

export const setCreateMode = (props = {}) => {
  ApplicationState.setState(CREATING, props);
};

const _loadOpening = async (key) => {
  let opening;
  try {
    opening = await fetchKey(key);
  } catch (error) {
    apiError(`We could not load the introduction "${key}"`, true);
  }

  if (!opening) {
    setCreateMode();
    swal('ops...', `The introduction with the key "${key}" was not found.`, 'error');
  }

  return opening;
};

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await _loadOpening(key);
  if (opening) {
    ApplicationState.setState(PLAYING, { opening, key });
  }
};

export const loadAndEdit = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await _loadOpening(key);
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

export const playButtonHandler = async (opening) => {
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
    apiError('There was an error creating your intro.');
  }

  UrlHandler.setKeyToPlay(key);
};

export const downloadButtonHandler = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const { key } = ApplicationState.state;
  if (!isEqual(lastOpening, opening)) {
    swal({
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
        playButtonHandler(opening);
      }
    });
    return;
  }
  UrlHandler.goToDownloadPage(key);
};

const _loadStatus = async (key) => {
  let statusObject;
  try {
    const response = await fetchStatus(key);

    // TODO remove for new API
    const { url } = response;
    if (url) {
      statusObject = {
        status: 'rendered',
        downloadUrl: url,
      };

      return statusObject;
    }

    const queuePosition = response.queue;
    const responseFake = await fetchStatus('x');
    const queueSize = responseFake.queue;
    statusObject = {
      queueSize,
      queuePosition,
    };

    let statusType = queuePosition === queueSize ?
      'not_queued' :
      'queued';

    statusType = queuePosition < 20 ? 'bumped' : statusType;
    statusType = 0 === queuePosition ? 'rendering' : statusType;

    statusObject.status = statusType;
    // end TODO
  } catch (error) {
    apiError(`We could not contact our servers for the download of ID: "${key}"`, true);
  }
  return statusObject;
};

export const loadDownloadPage = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await _loadOpening(key);
  if (!opening) {
    return;
  }

  const downloadStatus = await _loadStatus(key);
  ApplicationState.setState(DOWNLOAD, { opening, key, downloadStatus });
};

export const requestIntroDownload = async (key, email) => {
  let statusObject = null;
  try {
    // TODO with new api
    // statusObject = await requestDownload(key, email);

    // TODO remove for new api
    const responseFake = await requestDownload(key, email);
    const queuePosition = responseFake.queue;
    statusObject = {
      queuePosition,
    };

    statusObject.status = 'queued';
    // end TODO
  } catch (error) {
    apiError('We could not contact our servers to request the download your intro', false, true);
  }
  return statusObject;
};
