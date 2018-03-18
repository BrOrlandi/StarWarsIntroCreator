import swal from 'sweetalert2';

import ApplicationState, { EDITING, ERROR, DOWNLOAD, PLAYING, LOADING } from './ApplicationState';
import { loadKey } from './api';

export const setEditMode = () => {
  ApplicationState.setState(EDITING);
};

const _apiError = (message) => {
  const bodyMessage = encodeURI(`Hi, the SWIC website didn't work as expected.
The following error message is showed:

${message}

I want to provide the following details:

  `);
  swal({
    title: 'an unexpected error occured',
    text: `${message}.
    The empire may have intercepted our transmission.
    The alliance has already been informed and is working on correcting this.
    Please try again and if the problem persists, contact us to give more details clicking on the button below.`,
    type: 'error',
    showCancelButton: true,
    cancelButtonText: 'CLOSE',
    confirmButtonText: 'CONTACT SUPPORT',
  }).then((result) => {
    if (result.value) {
      window.open(`mailto:kassellabs+starwars@gmail.com?Subject=SWIC%20Error&Body=${bodyMessage}`);
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
      swal('ops...', `The introdution with the key "${key}" was not found.`, 'error');
      return;
    }

    ApplicationState.setState(PLAYING, { opening, key });
  } catch (error) {
    ApplicationState.setState(ERROR);
    _apiError(`We could not load the introduction "${key}"`);
  }
};
