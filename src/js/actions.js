import swal from 'sweetalert2';

import ApplicationState, { EDITING, DOWNLOAD, PLAYING, LOADING } from './ApplicationState';
import { loadKey } from './api';

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadKey(key);

  if (!opening) {
    ApplicationState.setState(EDITING);
    swal('ops...', 'Introduction not found!', 'error');
    return;
  }

  ApplicationState.setState(PLAYING, { opening, key });
};

export const setEditMode = () => {
  ApplicationState.setState(EDITING);
};
