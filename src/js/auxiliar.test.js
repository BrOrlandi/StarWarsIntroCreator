import { checkSWFontCompatibility } from './auxiliar';

jest.mock('sweetalert2');

describe('auxiliar functions', () => {
  it('should validate for SWFont', () => {
    expect(checkSWFontCompatibility('THE FORCE AWAKENS')).toBeTruthy();
    expect(checkSWFontCompatibility('asdljkasdlk 5345 !!!')).toBeTruthy();
    expect(checkSWFontCompatibility('2343$$asd234!')).toBeTruthy();
  });

  it('should invalidate for SWFont', () => {
    expect(checkSWFontCompatibility('Não')).toBeFalsy();
    expect(checkSWFontCompatibility('çç asdas')).toBeFalsy();
    expect(checkSWFontCompatibility('Você')).toBeFalsy();
    expect(checkSWFontCompatibility('&&')).toBeFalsy();
    expect(checkSWFontCompatibility('asdjh#')).toBeFalsy();
    expect(checkSWFontCompatibility('@@@')).toBeFalsy();
    expect(checkSWFontCompatibility('dfgfg*')).toBeFalsy();
    expect(checkSWFontCompatibility('asdasd()')).toBeFalsy();
    expect(checkSWFontCompatibility('__')).toBeFalsy();
    expect(checkSWFontCompatibility('+++')).toBeFalsy();
    expect(checkSWFontCompatibility('test . asd')).toBeFalsy();
    expect(checkSWFontCompatibility('test , asd')).toBeFalsy();
  });
});
