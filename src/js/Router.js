import { urlHashChange } from './utils';

import ApplicationState, { EDITING } from './ApplicationState';

urlHashChange(() => {
  // TODO Handle URL
  ApplicationState.setState(EDITING);
});
