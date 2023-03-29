import {decimalToHexadecimalForRefNumber} from './Utils';

export const REF_NO_RANGE_START = 0;
export const REF_NO_RANGE_END = 65535;

/**
 * generate incrementally cyclically from
 * 0x0000 to 0xffff from local management.
 */
class RefNumberGenerator {
  previousGeneratedNumber = 1;

  setPreviousGeneratedNumber(number: number) {
    this.previousGeneratedNumber = number;
  }

  geRefNumber(): string {
    let randomNumber = 1;
    if (this.previousGeneratedNumber < REF_NO_RANGE_END) {
      randomNumber = this.previousGeneratedNumber += 1;
    }
    this.setPreviousGeneratedNumber(randomNumber);
    return decimalToHexadecimalForRefNumber(randomNumber, 1);
  }
}

export const refNumberGenerator = new RefNumberGenerator();
