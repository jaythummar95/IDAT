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

  geRefNumber(): number {
    let randomNumber = 1;
    if (this.previousGeneratedNumber < REF_NO_RANGE_END) {
      randomNumber = this.previousGeneratedNumber += 1;
    }
    this.setPreviousGeneratedNumber(randomNumber);
    return randomNumber;
  }
}

export const refNumberGenerator = new RefNumberGenerator();
