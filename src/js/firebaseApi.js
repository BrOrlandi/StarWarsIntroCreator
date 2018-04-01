import { firebases, defaultFirebase, defaultFirebasePrefix } from './config';
import Http from './Http';

export const _parseFirebasekey = (key) => {
  const result = {
    baseURL: defaultFirebase,
  };

  // is creating a new opening
  if (!key) {
    return result;
  }

  const { initial, ...alternatives } = firebases;

  const prefix = key[0];
  const alternativeDb = alternatives[prefix];

  result.baseURL = alternativeDb || initial;
  result.key = alternativeDb ? key.substr(1) : key;

  return result;
};

export const _parseSpecialKeys = (key) => {
  switch (key) {
    case 'Episode7':
      return 'AKcKeYMPogupSU_r1I_g';
    case 'Episode8':
      return 'AL6yNfOxCGkHKBUi54xp';
    // TODO other eps
    default:
      return key;
  }
};

const openingsCache = {};

export const _generateUrlWithKey = (key) => {
  const openingPrefix = '/openings/';
  return `${openingPrefix}-${key}.json`;
};


export const fetchKey = async (initialKey) => {
  const openingFromCache = openingsCache[initialKey];
  if (openingFromCache) {
    Raven.captureBreadcrumb({
      message: 'Getting intro from cache.',
      category: 'info',
      data: openingFromCache,
    });
    return openingFromCache;
  }

  const rawkey = _parseSpecialKeys(initialKey);
  const { baseURL, key } = _parseFirebasekey(rawkey);
  const http = Http(baseURL);

  const url = _generateUrlWithKey(key);

  Raven.captureBreadcrumb({
    message: 'Loading intro from Firebase.',
    category: 'info',
    data: { initialKey },
  });
  const response = await http.get(url);
  const opening = response.data;
  // const opening = {"center":true,"episode":"Episode VIII","intro":"Kassel Labs","logo":"kassel\nlabs","text":"Kassel Labs\n\nkassel\nlabs\n\nKASSEL LABS\n\nKASSEL\nLABS\n\nkassel labs","title":"KASSEL LABS"};
  if (!opening) {
    const error = new Error(`Opening not found: ${initialKey}`);
    Raven.captureException(error);
  }
  openingsCache[initialKey] = opening;
  return opening;
};


export const saveOpening = async (opening) => {
  const http = Http(defaultFirebase);

  const response = await http.post('/openings.json', opening);
  const key = `${defaultFirebasePrefix}${response.data.name.substr(1)}`;
  return key;
};
