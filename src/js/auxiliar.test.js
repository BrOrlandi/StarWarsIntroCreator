import { checkSWFontCompatibility, calculateTimeToRender } from './auxiliar';

jest.mock('sweetalert2');
jest.mock('./ApplicationState');

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

  it('should validate all calculateTimeToRender tests', () => {
    expect(calculateTimeToRender(0)).toBe(' 1 hour');
    expect(calculateTimeToRender(1)).toBe(' 1 hour');
    expect(calculateTimeToRender(2)).toBe(' 1 hour');
    expect(calculateTimeToRender(24)).toBe(' 12 hours');
    expect(calculateTimeToRender(31)).toBe(' 15 hours and 30 minutes');
    expect(calculateTimeToRender(48)).toBe(' 1 day');
    expect(calculateTimeToRender(50)).toBe(' 1 day, 1 hour');
    expect(calculateTimeToRender(53)).toBe(' 1 day, 2 hours and 30 minutes');
    expect(calculateTimeToRender(96)).toBe(' 2 days');
    expect(calculateTimeToRender(100)).toBe(' 2 days, 2 hours');
    expect(calculateTimeToRender(103)).toBe(' 2 days, 3 hours and 30 minutes');
    expect(calculateTimeToRender(200)).toBe(' 5 days');
    expect(calculateTimeToRender(1000)).toBe(' 21 days');
    expect(calculateTimeToRender(10000)).toBe(' 209 days');
  });
});
