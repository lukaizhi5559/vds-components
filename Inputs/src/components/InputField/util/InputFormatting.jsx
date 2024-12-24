import React, { Fragment } from 'react';

export const determineMaxLength = (
  cardType,
  type,
  dateFormat,
  cardBrand,
  maxLength
) => {
  switch (type) {
    case 'creditCard':
      return _calculateCCMaxLength(cardType);
    case 'tel':
      return 12;
    case 'date':
      return _calculateDateMaxLength(dateFormat);
    /* case 'taxID':
      return hidden ? '9' : format === 'ssn' ? '11' : '10'; */
    case 'securityCode':
      if (
        cardBrand !== undefined &&
        cardBrand !== 'amex' &&
        cardBrand !== 'other'
      ) {
        return 3;
      } else {
        return 4;
      }
    default:
      return maxLength ? maxLength : 'none';
  }
};

export const _ignoreAlpha = e => {
  let cursor = e.target.selectionStart;
  let match = e.target.value.match(/[^0-9/\s/-]*/g);

  match.map((item, index) => {
    if (item !== '') {
      e.target.value =
        e.target.value.substring(0, index) +
        e.target.value.substring(index + 1, e.target.value.length);
      e.target.setSelectionRange(cursor - 1, cursor - 1);
    }
  });

  return e.target.value;
};

export const _maskValue = (value, cardType) => {
  if (!value) return;
  let last = value.substring(value.length - 4);
  let dots = '';
  let dotLength = value.replace(/\D/g, '').length - 4;
  if (value.length > 13) {
    while (dots.length < dotLength * 2) {
      dots += '• ';
    }
    dots += last;
  }
  return dots;
};

export const _calculateCCMaxLength = cardType => {
  if (cardType === 'amex') {
    return '17';
  } else if (cardType === 'dinersClub') {
    return '16';
  } else if (cardType === 'unionPay') {
    return '20';
  } else {
    return '19';
  }
};

const ccFormat = clean => {
  let match;
  if (clean.length < 5) {
    match = clean.match(/^(\d{1,4})$/);
  } else if (clean.length < 9) {
    match = clean.match(/^(\d{4})(\d{1,4})$/);
  } else if (clean.length < 13) {
    match = clean.match(/^(\d{4})(\d{4})(\d{1,4})$/);
  } else {
    match = clean.match(/^(\d{4})(\d{4})(\d{4})(\d{1,4})$/);
  }
  return match;
};

export const _determineCard = (e, clean) => {
  let cardType,
    match,
    firstNum = parseInt(clean.substring(0, 1)),
    twoChar = parseInt(clean.substring(0, 2)),
    threeChar = parseInt(clean.substring(0, 3)),
    fourChar = parseInt(clean.substring(0, 4)),
    sixChar = parseInt(clean.substring(0, 6));
  if (firstNum === 4) {
    if (clean.length < 5) {
      match = clean.match(/^(\d{1,4})$/);
    } else if (clean.length < 9) {
      match = clean.match(/^(\d{4})(\d{1,4})$/);
    } else if (clean.length < 13) {
      match = clean.match(/^(\d{4})(\d{4})(\d{1,4})$/);
    } else {
      match = clean.match(/^(\d{4})(\d{4})(\d{4})(\d{1,7})$/);
    }
    cardType = 'visa';
  } else if (twoChar === 34 || twoChar === 37) {
    if (clean.length < 5) {
      match = clean.match(/^(\d{1,4})$/);
    } else if (clean.length < 11) {
      match = clean.match(/^(\d{4})(\d{1,6})$/);
    } else {
      match = clean.match(/^(\d{4})(\d{6})(\d{1,5})$/);
    }
    cardType = 'amex';
  } else if (
    // twoChar === 62 ||
    (twoChar === 62 && !(sixChar >= 622126 && sixChar <= 622925)) ||
    twoChar === 81 ||
    (twoChar === 60 && fourChar !== 6011)
  ) {
    if (clean.length < 5) {
      match = clean.match(/^(\d{1,4})$/);
    } else if (clean.length < 9) {
      match = clean.match(/^(\d{4})(\d{1,4})$/);
    } else if (clean.length < 13) {
      match = clean.match(/^(\d{4})(\d{4})(\d{1,4})$/);
    } else if (clean.length < 17) {
      match = clean.match(/^(\d{4})(\d{4})(\d{4})(\d{1,4})$/);
    } else if (clean.length === 17 || clean.length === 18) {
      match = clean.match(/^(\d{1,18})$/);
    } else if (clean.length === 19) {
      match = clean.match(/^(\d{6})(\d{1,13})$/);
    }
    cardType = 'unionPay';
  } else if (
    (threeChar > 299 && threeChar <= 305) ||
    threeChar === 309 ||
    twoChar === 36 ||
    twoChar === 38 ||
    twoChar === 39
  ) {
    if (clean.length < 5) {
      match = clean.match(/^(\d{1,4})$/);
    } else if (clean.length < 11) {
      match = clean.match(/^(\d{4})(\d{1,6})$/);
    } else {
      match = clean.match(/^(\d{4})(\d{6})(\d{1,4})$/);
    }
    cardType = 'dinersClub';
  } else if (
    fourChar === 6011 ||
    (sixChar >= 622126 && sixChar <= 622925) ||
    (threeChar >= 644 && threeChar <= 649) ||
    twoChar === 65
  ) {
    match = ccFormat(clean);
    cardType = 'discover';
  } else if (fourChar >= 3528 && fourChar <= 3589) {
    match = ccFormat(clean);
    cardType = 'jcb';
  } else if (
    (twoChar >= 51 && twoChar <= 55) ||
    (sixChar >= 222100 && sixChar <= 272099)
  ) {
    match = ccFormat(clean);
    cardType = 'mastercard';
  } else if (clean.length < 6) {
    match = ccFormat(clean);
    cardType = 'placeholder';
  } else {
    match = ccFormat(clean);
    cardType = 'generic';
  }
  return { match: match, cardType: cardType };
};

export const creditCardOnChange = (e, stateValue, stateCard) => {
  let targetValue = e.target.value,
    start = e.target.selectionStart,
    end = e.target.selectionEnd,
    clean = targetValue.replace(/\D/g, ''),
    obj = _determineCard(e, clean);
  let { cardType } = obj;
  let current = targetValue[start - 1];
  if (current === ' ' && start < targetValue.length) {
    //prevents space keypress from moving the cursor
    start -= 1;
    end -= 1;
  } else if (
    stateValue === undefined ||
    stateValue.length < targetValue.length
  ) {
    //move cursor forward when coming across a space
    if (cardType === 'amex' || cardType === 'dinersClub') {
      if (start === 5 || start === 12) {
        start += 1;
        end += 1;
      }
    } else if (start % 5 === 0 && start < 16) {
      start += 1;
      end += 1;
    }
  } else if (
    stateValue.length > targetValue.length &&
    stateValue[start] === ' '
  ) {
    //remove leading number when backspacing over a space
    targetValue =
      targetValue.slice(0, start - 1) +
      targetValue.slice(start, targetValue.length);
    start -= 1;
    end -= 1;
  }
  clean = targetValue.replace(/\D/g, '');
  obj = _determineCard(e, clean);
  let { match } = obj;

  if (match && match[4]) {
    e.target.value = `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  } else if (match && match[3]) {
    e.target.value = `${match[1]} ${match[2]} ${match[3]}`;
  } else if (match && match[2]) {
    e.target.value = `${match[1]} ${match[2]}`;
  } else if (match && match[1]) {
    e.target.value = match[1];
  } else {
    cardType = 'placeholder';
  }

  return {
    value: e.target.value.replace(/[^0-9\s]*/g, ''),
    cardType: cardType,
  };
};

/* const _ssnMatchPattern = clean => {
  let match;
  if (clean.length < 4) {
    match = clean.match(/^(\d{1,3})$/);
  } else if (clean.length < 6) {
    match = clean.match(/^(\d{3})(\d{1,2})$/);
  } else {
    match = clean.match(/^(\d{3})(\d{2})(\d{1,4})$/);
  }
  return match;
};

export const _taxIDMatchPattern = (e, clean, hidden, format) => {
  let match,
    pattern = '';
  if (format === 'ssn') {
    if (clean.length < 4) {
      match = clean.match(/^(\d{1,3})$/);
    } else if (clean.length < 6) {
      match = clean.match(/^(\d{3})(\d{1,2})$/);
    } else {
      match = clean.match(/^(\d{3})(\d{2})(\d{1,4})$/);
    }

    if (match && match[3]) {
      pattern = `${match[1]}-${match[2]}-${match[3]}`;
    } else if (match && match[2]) {
      if (match[2].length === 2) {
        pattern = `${match[1]}-${match[2]}-`;
      } else {
        pattern = `${match[1]}-${match[2]}`;
      }
    } else if (match && match[1]) {
      if (match[1].length === 3) {
        pattern = `${match[1]}-`;
      } else {
        pattern = match[1];
      }
    }
  } else {
    if (clean.length < 3) {
      match = clean.match(/^(\d{1,2})$/);
    } else {
      match = clean.match(/^(\d{2})(\d{1,7})$/);
    }

    if (match && match[2]) {
      pattern = `${match[1]}-${match[2]}`;
    } else if (match && match[1]) {
      if (match[1].length === 2) {
        pattern = `${match[1]}-`;
      } else {
        pattern = match[1];
      }
    }
  }

  return pattern;
};

export const _taxIDOnChange = (e, stateValue, hidden, format) => {
  let start = e.target.selectionStart;
  let end = e.target.selectionEnd;
  let formatted = '';
  let clean = e.target.value.replace(/\D/g, '');
  let match,
    targetValue = e.target.value;
  if (!hidden) {
    e.target.value = _taxIDMatchPattern(e, clean, hidden, format);
    if (stateValue.length > targetValue.length && stateValue[start] === '-') {
      //remove leading number when backspacing over a space
      targetValue =
        targetValue.slice(0, start - 1) +
        targetValue.slice(start, targetValue.length);
      start -= 1;
      end -= 1;
    } else if (format === 'ssn') {
      if (start === 3 || start === 6) {
        start += 1;
        end += 1;
      }
    } else if (format === 'ein') {
      if (start === 2) {
        start += 1;
        end += 1;
      }
    }
    clean = targetValue.replace(/\D/g, '');
    e.target.value = _taxIDMatchPattern(e, clean, hidden, format);
    e.target.setSelectionRange(start, end);
  }
  formatted = _taxIDMatchPattern(e, clean, hidden, format);
  return { formattedValue: formatted, value: e.target.value };
}; */

const phoneMatchPattern = clean => {
  let match;
  if (clean.length > 6) {
    match = clean.match(/^(\d{3})(\d{3})(\d{1,4})$/);
  } else if (clean.length > 3) {
    match = clean.match(/^(\d{3})(\d{1,3})$/);
  } else if (clean.length > 0) {
    match = clean.match(/^\d{1,3}$/);
  }
  return match;
};

const defaultPhoneFormat = (target, match) => {
  if (match && match[3]) {
    target.value = match[1] + '.' + match[2] + '.' + match[3];
  } else if (match && match[2]) {
    match[2].length === 3
      ? (target.value = match[1] + '.' + match[2] + '.')
      : (target.value = match[1] + '.' + match[2]);
  } else if (match) {
    match[0].length === 3
      ? (target.value = match[0] + '.')
      : (target.value = match[0]);
  } else {
    target.value = '';
  }
};

const dashPhoneFormat = (target, match) => {
  if (match && match[3]) {
    target.value = match[1] + '-' + match[2] + '-' + match[3];
  } else if (match && match[2]) {
    match[2].length === 3
      ? (target.value = match[1] + '-' + match[2] + '-')
      : (target.value = match[1] + '-' + match[2]);
  } else if (match) {
    match[0].length === 3
      ? (target.value = match[0] + '-')
      : (target.value = match[0]);
  } else {
    target.value = '';
  }
};

const addToCursor = (start, end) => {
  start += 1;
  end += 1;
  return [start, end];
};

const subtractToCursor = (start, end) => {
  start -= 1;
  end -= 1;
  return [start, end];
};

export const _formatToPhone = (e, stateValue) => {
  const target = e.target,
    clean = target.value.replace(/\D/g, ''),
    cleanStateValue = stateValue.replace(/\D/g, '');
  let match,
    start = target.selectionStart,
    end = target.selectionEnd;
  if (stateValue.length > target.value.length && stateValue[start] === '.') {
    target.value =
      target.value.slice(0, start - 1) +
      target.value.slice(start, target.value.length);
    let s = target.value.replace(/\D/g, '');
    match = phoneMatchPattern(s);
    [start, end] = subtractToCursor(start, end);
    defaultPhoneFormat(target, match);
  } else if (clean.length < cleanStateValue.length) {
    let s =
      target.value.substring(0, target.selectionStart) +
      target.value.slice(target.selectionStart, target.value.length);
    s = s.replace(/\D/g, '');
    match = phoneMatchPattern(s);
    defaultPhoneFormat(target, match);
  } else if (clean.length > cleanStateValue.length) {
    match = phoneMatchPattern(clean);
    if (match && match[3]) {
      target.value = match[1] + '.' + match[2] + '.' + match[3];
      if (start === 4 || start === 8) {
        [start, end] = addToCursor(start, end);
      }
    } else if (match && match[2]) {
      target.value.length >= 7
        ? (target.value = match[1] + '.' + match[2] + '.')
        : (target.value = match[1] + '.' + match[2]);
      if (start === 4 || start === 7) {
        [start, end] = addToCursor(start, end);
      }
    } else if (match) {
      target.value.length >= 3
        ? (target.value = match[0] + '.')
        : (target.value = match[0]);
      if (start === 3) {
        [start, end] = addToCursor(start, end);
      }
    } else {
      target.value = '';
    }
  } else {
    match = phoneMatchPattern(cleanStateValue);
    defaultPhoneFormat(target, match);
    [start, end] = subtractToCursor(start, end);
  }
  target.setSelectionRange(start, end);
  return {
    value: target.value,
  };
};

export const _formatToPhoneDash = (e, stateValue) => {
  const target = e.target,
    clean = target.value.replace(/\D/g, ''),
    cleanStateValue = stateValue.replace(/\D/g, '');
  let match,
    start = target.selectionStart,
    end = target.selectionEnd;
  if (stateValue.length > target.value.length && stateValue[start] === '-') {
    target.value =
      target.value.slice(0, start - 1) +
      target.value.slice(start, target.value.length);
    let s = target.value.replace(/\D/g, '');
    match = phoneMatchPattern(s);
    [start, end] = subtractToCursor(start, end);
    dashPhoneFormat(target, match);
  } else if (clean.length < cleanStateValue.length) {
    let s =
      target.value.substring(0, target.selectionStart) +
      target.value.slice(target.selectionStart, target.value.length);
    s = s.replace(/\D/g, '');
    match = phoneMatchPattern(s);
    dashPhoneFormat(target, match);
  } else if (clean.length > cleanStateValue.length) {
    match = phoneMatchPattern(clean);
    if (match && match[3]) {
      target.value = match[1] + '-' + match[2] + '-' + match[3];
      if (start === 4 || start === 8) {
        [start, end] = addToCursor(start, end);
      }
    } else if (match && match[2]) {
      target.value.length >= 7
        ? (target.value = match[1] + '-' + match[2] + '-')
        : (target.value = match[1] + '-' + match[2]);
      if (start === 4 || start === 7) {
        [start, end] = addToCursor(start, end);
      }
    } else if (match) {
      target.value.length >= 3
        ? (target.value = match[0] + '-')
        : (target.value = match[0]);
      if (start === 3) {
        [start, end] = addToCursor(start, end);
      }
    } else {
      target.value = '';
    }
  } else {
    match = phoneMatchPattern(cleanStateValue);
    dashPhoneFormat(target, match);
    [start, end] = subtractToCursor(start, end);
  }
  target.setSelectionRange(start, end);
  return {
    value: target.value,
  };
};

/* For telephone default value */
export const _formatOnLoad = value => {
  let numericString = value.toString().replace(/[^0-9]+/g, ''); // removing non numeric characters
  let firstTenDigitString = numericString.slice(0, 10); // removing digits if more than 10
  let formattedNumber;
  if (firstTenDigitString.length > 6) {
    formattedNumber = firstTenDigitString.replace(
      /^(\d{3})(\d{3})(\d{1,4})$/,
      '$1-$2-$3'
    );
  } else if (firstTenDigitString.length == 6) {
    formattedNumber = firstTenDigitString.replace(
      /^(\d{3})(\d{1,3})$/,
      '$1-$2-'
    );
  } else if (firstTenDigitString.length < 6 && firstTenDigitString.length > 0) {
    formattedNumber = firstTenDigitString.replace(
      /^(\d{3})(\d{1,3})$/,
      '$1-$2-'
    );
  }

  return formattedNumber;
};
/* For Date Field */

export const _calculateDateMaxLength = dateFormat => {
  if (dateFormat === 'mmyy') {
    return '5';
  } else if (dateFormat === 'mmddyy') {
    return '8';
  } else {
    return '10';
  }
};

export const _handleDate = (e, clean, dateFormat) => {
  let match;

  if (dateFormat === 'mmddyy') {
    if (clean.length < 3) {
      match = clean.match(/^(\d{1,2})$/);
    } else if (clean.length < 5) {
      match = clean.match(/^(\d{2})(\d{1,2})$/);
    } else {
      match = clean.match(/^(\d{2})(\d{2})(\d{1,2})$/);
    }
  } else if (dateFormat === 'mmddyyyy') {
    if (clean.length < 3) {
      match = clean.match(/^(\d{1,2})$/);
    } else if (clean.length < 5) {
      match = clean.match(/^(\d{2})(\d{1,2})$/);
    } else {
      match = clean.match(/^(\d{2})(\d{2})(\d{1,4})$/);
    }
  } else {
    // fallback to mmyy
    if (clean.length < 3) {
      match = clean.match(/^(\d{1,2})$/);
    } else {
      match = clean.match(/^(\d{2})(\d{1,2})$/);
    }
  }

  return { match };
};

export const _checkMonthValue = m => {
  let monthValue = '';
  if (m.length === 1) {
    monthValue = /^([01])$/.test(m) ? m : '';
  } else if (m.length === 2) {
    monthValue = /^(0[1-9]|1[0-2])$/.test(m) ? m : m[0];
  }

  return monthValue;
};

export const _checkDateValue = d => {
  let dateValue = '';
  if (d.length === 1) {
    dateValue = /^([0-3])$/.test(d) ? d : '';
  } else if (d.length === 2) {
    dateValue = /^(0[1-9]|[12][0-9]|3[01])$/.test(d) ? d : d[0];
  }

  return dateValue;
};

export const dateOnChange = (e, stateValue, dateFormat) => {
  let clean = e.target.value.replace(/\D/g, '');
  let end = e.target.selectionEnd;
  let start = e.target.selectionStart;
  let cleanState = stateValue.replace(/\D/g, '');
  if (cleanState.length < clean.length) {
    if (start === 3 || start === 6) {
      start += 1;
      end += 1;
    }
  } else {
    if (start === 2 || start === 5) {
      e.target.value =
        e.target.value.slice(0, start - 1) +
        e.target.value.slice(start, e.target.value.length);
      start -= 1;
      end -= 1;
    }
  }
  clean = e.target.value.replace(/\D/g, '');
  let obj = _handleDate(e, clean, dateFormat);
  let { match } = obj;
  if (dateFormat === 'mmddyy' || dateFormat === 'mmddyyyy') {
    if (match && match[3]) {
      e.target.value = `${match[1]}/${match[2]}/${match[3]}`;
    } else if (match && match[2]) {
      e.target.value = `${match[1]}/${_checkDateValue(match[2])}`;
    } else if (match && match[1]) {
      e.target.value = _checkMonthValue(match[1]);
    }
  } else {
    if (match && match[2]) {
      e.target.value = `${match[1]}/${match[2]}`;
    } else if (match && match[1]) {
      e.target.value = _checkMonthValue(match[1]);
    }
  }

  e.target.setSelectionRange(start, end);

  return {
    value: e.target.value.replace(/[^0-9/\s]*/g, ''),
  };
};

export const stickyPlaceholderHTML = (dateFormat, value) => {
  let clean = value.replace(/\D/g, '');
  let firstNum = clean.charAt(0);
  let secondNum = clean.charAt(1);
  let thirdNum = clean.charAt(2);
  let fourthNum = clean.charAt(3);
  let fifthNum = clean.charAt(4);
  let sixthNum = clean.charAt(5);
  let seventhNum = clean.charAt(6);
  let eigthNum = clean.charAt(7);

  switch (dateFormat) {
    case 'mmyy':
      if (fourthNum) {
        return (
          <span>
            {firstNum}
            {secondNum}/{thirdNum}
            {fourthNum}
          </span>
        );
      } else if (thirdNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
            </span>
            Y
          </Fragment>
        );
      } else if (secondNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}
            </span>
            <span className="slash">/</span>YY
          </Fragment>
        );
      } else if (firstNum) {
        return (
          <Fragment>
            <span>{firstNum}</span>M/YY
          </Fragment>
        );
      } else {
        return 'MM/YY';
      }
    case 'mmddyy':
      if (sixthNum) {
        return (
          <span>
            {firstNum}
            {secondNum}/{thirdNum}
            {fourthNum}/{fifthNum}
            {sixthNum}
          </span>
        );
      } else if (fifthNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}/{fifthNum}
            </span>
            Y
          </Fragment>
        );
      } else if (fourthNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}
            </span>
            <span className="slash">/</span>YY
          </Fragment>
        );
      } else if (thirdNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
            </span>
            D/YY
          </Fragment>
        );
      } else if (secondNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}
            </span>
            <span className="slash">/</span>DD/YY
          </Fragment>
        );
      } else if (firstNum) {
        return (
          <Fragment>
            <span>{firstNum}</span>M/DD/YY
          </Fragment>
        );
      } else {
        return 'MM/DD/YY';
      }
    default:
      // Default for 'MM/DD/YYYY';
      if (eigthNum) {
        return (
          <span>
            {firstNum}
            {secondNum}/{thirdNum}
            {fourthNum}/{fifthNum}
            {sixthNum}
            {seventhNum}
            {eigthNum}
          </span>
        );
      } else if (seventhNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}/{fifthNum}
              {sixthNum}
              {seventhNum}
            </span>
            Y
          </Fragment>
        );
      } else if (sixthNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}/{fifthNum}
              {sixthNum}
            </span>
            YY
          </Fragment>
        );
      } else if (fifthNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}/{fifthNum}
            </span>
            YYY
          </Fragment>
        );
      } else if (fourthNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
              {fourthNum}
            </span>
            <span className="slash">/</span>YYYY
          </Fragment>
        );
      } else if (thirdNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}/{thirdNum}
            </span>
            D/YYYY
          </Fragment>
        );
      } else if (secondNum) {
        return (
          <Fragment>
            <span>
              {firstNum}
              {secondNum}
            </span>
            <span className="slash">/</span>DD/YYYY
          </Fragment>
        );
      } else if (firstNum) {
        return (
          <Fragment>
            <span>{firstNum}</span>M/DD/YYYY
          </Fragment>
        );
      } else {
        return 'MM/DD/YYYY';
      }
  }
};
