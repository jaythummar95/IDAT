import moment from 'moment/moment';

export const calculateByteLengthOfHex = (hex: string): number => {
  let bytes = new Uint8Array(
    hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)),
  );
  return bytes.length;
};

export const hex2bin = (hex: string): string => {
  return parseInt(hex, 16).toString(2).padStart(8, '0');
};

export const dec2Hex = (dec: number): string => {
  return Math.abs(dec).toString(16);
};

export const decimalToHexadecimalForRefNumber = (
  decimal: number,
  numDigits: number,
): string => {
  // convert decimal to hexadecimal string
  let hex = decimal.toString(16);

  // pad with leading zeros to get desired number of digits
  while (hex.length < Math.ceil(numDigits / 4)) {
    hex = '0' + hex;
  }

  // pad each hexadecimal digit with leading zeros to get exactly 4 bits
  let paddedHex = '';
  if (hex.length >= 4) {
    paddedHex = hex;
  } else if (hex.length === 3) {
    paddedHex = `0${hex}`;
  } else if (hex.length === 2) {
    paddedHex = `00${hex}`;
  } else if (hex.length === 1) {
    paddedHex = `000${hex}`;
  }

  return paddedHex;
};

export const getTimeZoneOffset = () => {
  const timeZoneOffset = moment().utcOffset();
  const sign = timeZoneOffset > 0 ? '+' : '-';
  const hours = Math.abs(Math.floor(timeZoneOffset / 60));
  const minutes = Math.abs(timeZoneOffset % 60);
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

export const decimalToBinary = (decimal: number, numBits: number): string => {
  const binary = decimal.toString(2);
  const padding = '0'.repeat(numBits - binary.length);
  return padding + binary;
};

export const binaryToHex = (binary: string): string => {
  // First, pad the binary string with zeroes until its length is a multiple of 4
  while (binary.length % 4 !== 0) {
    binary = '0' + binary;
  }

  // Split the binary string into groups of 4 digits
  const groups = binary.match(/.{4}/g) || [];

  // Map each group to its corresponding hexadecimal digit
  const hexDigits = groups.map(group => {
    const decimalValue = parseInt(group, 2);
    return decimalValue.toString(16);
  });

  // Join the hexadecimal digits together into a string
  return hexDigits.join('')?.toUpperCase();
};

export const decimalToHex4Bytes = (num: number): string => {
  // Convert decimal number to a 32-bit unsigned integer
  const unsignedInt = num >>> 0;

  // Convert unsigned integer to hexadecimal string
  let hexString = unsignedInt.toString(16).toUpperCase();

  // Pad the hexadecimal string with leading zeros to ensure 8 characters (4 bytes)
  while (hexString.length < 8) {
    hexString = '0' + hexString;
  }

  return hexString;
};
