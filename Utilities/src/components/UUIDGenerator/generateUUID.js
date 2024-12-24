/**
 *
 * @returns a UUID to spec version 4
 */

const generateUUID = () => {
  let uuid = '';
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else if (i === 19) {
      //eslint-disable-line no-bitwise
      uuid += hexDigits[(Math.random() * 4) | 8];
    } else {
      uuid += hexDigits[Math.floor(Math.random() * 16)];
    }
  }
  return uuid;
};

export default generateUUID;
