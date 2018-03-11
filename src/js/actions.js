import ApplicationState, { EDITING, DOWNLOAD, PLAYING, LOADING } from './ApplicationState';

import { loadKey } from './api';

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadKey(key);
  ApplicationState.setState(PLAYING, { opening });
};


export const setEditMode = () => {
  ApplicationState.setState(EDITING);
};
