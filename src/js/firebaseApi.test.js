import { _parseFirebasekey, _parseSpecialKeys, _generateUrlWithKey } from './firebaseApi';

jest.mock('./config');

describe('firebaseApi.js', () => {
  it('should parse special keys', () => {
    const key1 = 'Episode7';
    expect(_parseSpecialKeys(key1)).toBe('AKcKeYMPogupSU_r1I_g');
    const key2 = 'Episode8';
    expect(_parseSpecialKeys(key2)).toBe('AL6yNfOxCGkHKBUi54xp');
  });

  it('should return the same key', () => {
    const key1 = 'xasdasd';
    expect(_parseSpecialKeys(key1)).toBe('xasdasd');
  });

  it('should parse Firebase key', () => {
    expect(_parseFirebasekey()).toEqual({
      baseURL: 'https://firebaseB',
    });

    expect(_parseFirebasekey('asdasdasd')).toEqual({
      baseURL: 'https://firebaseINITIAL',
      key: 'asdasdasd',
    });

    expect(_parseFirebasekey('AL6yNfOxCGkHKBUi54xp')).toEqual({
      baseURL: 'https://firebaseA',
      key: 'L6yNfOxCGkHKBUi54xp',
    });

    expect(_parseFirebasekey('BL6yNfOxCGkHKBUi54xp')).toEqual({
      baseURL: 'https://firebaseB',
      key: 'L6yNfOxCGkHKBUi54xp',
    });

    expect(_parseFirebasekey('CL6yNfOxCGkHKBUi54xp')).toEqual({
      baseURL: 'https://firebaseINITIAL',
      key: 'CL6yNfOxCGkHKBUi54xp',
    });
  });

  it('should get Url with key', () => {
    expect(_generateUrlWithKey('foo')).toBe('/openings/-foo.json');
  });
});
