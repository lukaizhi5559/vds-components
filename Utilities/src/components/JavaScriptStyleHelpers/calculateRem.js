const htmlElem =
  typeof document !== 'undefined' && document.querySelector('html');
const computedFontSize =
  typeof window !== 'undefined'
    ? window.getComputedStyle(htmlElem, null).getPropertyValue('font-size')
    : '';
export const remBase = 16;

const setComputedFontSize =
  computedFontSize !== '' ? parseFloat(computedFontSize) : remBase;

const calculatedRemValue = (setComputedFontSize / remBase) * remBase;

// Separate the number from the units
const splitUnits = value => {
  const number = parseFloat(value);
  const units = String(value).replace(/^[\d.-]+/, '');

  return { number, units };
};

const calculateRem = (...args) => {
  let result = '';

  for (let ii = 0; ii < args.length; ++ii) {
    let arg = args[ii];

    if (result !== '') {
      result += ' ';
    }

    let numberUnits = splitUnits(arg);

    // Check if Units were px or rem, default to px
    if (numberUnits.units !== 'rem') {
      result += numberUnits.number / calculatedRemValue;
    }
    // Assume units was px or had no units
    else {
      result += numberUnits.number;
    }

    // Always return in units of rem
    if (numberUnits.number != 0) {
      result += 'rem';
    }
  }

  return result;
};

export default calculateRem;
