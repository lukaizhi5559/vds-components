import { render } from '@testing-library/react';
import React from 'react';
import {
  dateOnChange,
  creditCardOnChange,
  _formatToPhone,
  stickyPlaceholderHTML,
  _calculateDateMaxLength,
  _calculateCCMaxLength,
} from './InputFormatting';

describe('InputCreditCardFieldFormatting', () => {
  const CreditCardFormat = props => {
    const creditCardObj = creditCardOnChange(
        props.evt,
        props.stateValue,
        props.stateCard
      ),
      ccLength = _calculateCCMaxLength(creditCardObj.cardType);
    return (
      <div>
        <span>{creditCardObj.value}</span>
        <span>
          {creditCardObj.cardType} - {ccLength}
        </span>
      </div>
    );
  };

  test('creditCardOnChange', () => {
    const { rerender, getByText } = render(
      <CreditCardFormat
        evt={{
          target: {
            value: '42',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('42')).toBeTruthy();
    expect(getByText('visa - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '4242424242',
            selectionStart: 4,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('4242 4242 42')).toBeTruthy();
    expect(getByText('visa - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '4111 111 ',
            selectionStart: 8,
            selectionEnd: 8,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'4111 111'}
        stateCard={''}
      />
    );
    expect(getByText('4111 111')).toBeTruthy();
    expect(getByText('visa - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '4242424242424242',
            selectionStart: 20,
            selectionEnd: 20,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('4242 4242 4242 4242')).toBeTruthy();
    expect(getByText('visa - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '3782822',
            selectionStart: 7,
            selectionEnd: 7,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('3782 822')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '371446',
            selectionStart: 5,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={undefined}
        stateCard={''}
      />
    );
    expect(getByText('3714 46')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();
    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '3714 4',
            selectionStart: 5,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={undefined}
        stateCard={''}
      />
    );
    expect(getByText('3714 4')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '3714 496356',
            selectionStart: 10,
            selectionEnd: 10,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3714 49635'}
        stateCard={''}
      />
    );
    expect(getByText('3714 496356')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '3714 496356 98431',
            selectionStart: 16,
            selectionEnd: 16,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3714 496356 9843'}
        stateCard={''}
      />
    );
    expect(getByText('3714 496356 98431')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '34',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'345'}
        stateCard={''}
      />
    );
    expect(getByText('34')).toBeTruthy();
    expect(getByText('amex - 17')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '309',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'30'}
        stateCard={''}
      />
    );
    expect(getByText('309')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '30569309025904',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'056 930902 590'}
        stateCard={''}
      />
    );
    expect(getByText('3056 930902 5904')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '30569309025904',
            selectionStart: 12,
            selectionEnd: 12,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3056 930902 590'}
        stateCard={''}
      />
    );
    expect(getByText('3056 930902 5904')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '365693090',
            selectionStart: 8,
            selectionEnd: 8,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3656 9309'}
        stateCard={''}
      />
    );
    expect(getByText('3656 93090')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '38',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3'}
        stateCard={''}
      />
    );
    expect(getByText('38')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '392',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3924'}
        stateCard={''}
      />
    );
    expect(getByText('392')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '392',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'3924'}
        stateCard={''}
      />
    );
    expect(getByText('392')).toBeTruthy();
    expect(getByText('dinersClub - 16')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '6011',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'601'}
        stateCard={''}
      />
    );
    expect(getByText('6011')).toBeTruthy();
    expect(getByText('discover - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '622800',
            selectionStart: 6,
            selectionEnd: 6,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'62280'}
        stateCard={''}
      />
    );
    expect(getByText('6228 00')).toBeTruthy();
    expect(getByText('discover - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '646',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'64'}
        stateCard={''}
      />
    );
    expect(getByText('646')).toBeTruthy();
    expect(getByText('discover - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '65',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'6'}
        stateCard={''}
      />
    );
    expect(getByText('65')).toBeTruthy();
    expect(getByText('discover - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '62',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'6'}
        stateCard={''}
      />
    );
    expect(getByText('62')).toBeTruthy();
    expect(getByText('unionPay - 20')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '60',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'6'}
        stateCard={''}
      />
    );
    expect(getByText('60')).toBeTruthy();
    expect(getByText('unionPay - 20')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '81',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'8'}
        stateCard={''}
      />
    );
    expect(getByText('81')).toBeTruthy();
    expect(getByText('unionPay - 20')).toBeTruthy();
    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '3557',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'355'}
        stateCard={''}
      />
    );
    expect(getByText('3557')).toBeTruthy();
    expect(getByText('jcb - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '52',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'5'}
        stateCard={''}
      />
    );
    expect(getByText('52')).toBeTruthy();
    expect(getByText('mastercard - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '222101',
            selectionStart: 6,
            selectionEnd: 6,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'22210'}
        stateCard={''}
      />
    );
    expect(getByText('2221 01')).toBeTruthy();
    expect(getByText('mastercard - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '12210',
            selectionStart: 5,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('1221 0')).toBeTruthy();
    expect(getByText('placeholder - 19')).toBeTruthy();

    rerender(
      <CreditCardFormat
        evt={{
          target: {
            value: '1221122112211221',
            selectionStart: 5,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
        stateCard={''}
      />
    );
    expect(getByText('1221 1221 1221 1221')).toBeTruthy();
    expect(getByText('generic - 19')).toBeTruthy();
  });
});

describe('InputTelFieldFormatting', () => {
  const TelFormat = props => {
    const TelObj = _formatToPhone(props.evt, props.stateValue);
    return <div>{TelObj.value}</div>;
  };

  test('Format Telephone', () => {
    const { rerender, getByText } = render(
      <TelFormat
        evt={{
          target: {
            value: '98765',
            selectionStart: 5,
            selectionEnd: 5,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
      />
    );
    expect(getByText('987.65')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '987',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'987.'}
      />
    );
    expect(getByText('98')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '98',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'987'}
      />
    );
    expect(getByText('98')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '9',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={''}
      />
    );
    expect(getByText('9')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '9',
            selectionStart: 0,
            selectionEnd: 0,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'9'}
      />
    );
    expect(getByText('9')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '987.6',
            selectionStart: 4,
            selectionEnd: 4,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'987'}
      />
    );
    expect(getByText('987.6')).toBeTruthy();

    rerender(
      <TelFormat
        evt={{
          target: {
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue={'987.654.321'}
      />
    );
  });
});

describe('DateFormatting', () => {
  const DateFormat = props => {
    const dateObj = stickyPlaceholderHTML(props.format, props.value),
      id = `maxLength${_calculateDateMaxLength(props.format)}`;
    return <div id={id}>{dateObj}</div>;
  };

  test('Format Date', () => {
    const { container, rerender, getByText } = render(
      <DateFormat format="mmyy" value="1212" />
    );
    expect(getByText('12/12')).toBeTruthy();
    expect(container.querySelector('#maxLength5')).toBeTruthy();

    rerender(<DateFormat format="mmyy" value="121" />);
    expect(getByText('12/1')).toBeTruthy();
    expect(getByText('Y')).toBeTruthy();

    rerender(<DateFormat format="mmyy" value="12" />);
    expect(getByText('12')).toBeTruthy();
    expect(getByText('/')).toBeTruthy();
    expect(getByText('YY')).toBeTruthy();

    rerender(<DateFormat format="mmyy" value="1" />);
    expect(getByText('1')).toBeTruthy();

    rerender(<DateFormat format="mmyy" value="" />);
    expect(getByText('MM/YY')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="12122" />);
    expect(getByText('12/12/2')).toBeTruthy();
    expect(getByText('Y')).toBeTruthy();
    expect(container.querySelector('#maxLength8')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="1212" />);
    expect(getByText('12/12')).toBeTruthy();
    expect(getByText('/')).toBeTruthy();
    expect(getByText('YY')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="012" />);
    expect(getByText('01/2')).toBeTruthy();
    expect(getByText('D/YY')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="01" />);
    expect(getByText('01')).toBeTruthy();
    expect(getByText('DD/YY')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="1" />);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('M/DD/YY')).toBeTruthy();

    rerender(<DateFormat format="mmddyy" value="" />);
    expect(getByText('MM/DD/YY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="0212202" />);
    expect(getByText('02/12/202')).toBeTruthy();
    expect(getByText('Y')).toBeTruthy();
    expect(container.querySelector('#maxLength10')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="021220" />);
    expect(getByText('02/12/20')).toBeTruthy();
    expect(getByText('YY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="02122" />);
    expect(getByText('02/12/2')).toBeTruthy();
    expect(getByText('YYY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="0212" />);
    expect(getByText('02/12')).toBeTruthy();
    expect(getByText('YYYY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="021" />);
    expect(getByText('02/1')).toBeTruthy();
    expect(getByText('D/YYYY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="02" />);
    expect(getByText('DD/YYYY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="0" />);
    expect(getByText('M/DD/YYYY')).toBeTruthy();

    rerender(<DateFormat format="MM/DD/YYYY" value="" />);
    expect(getByText('MM/DD/YYYY')).toBeTruthy();
  });
});

describe('OnDateChange', () => {
  const DateChange = props => {
    const dateObj = dateOnChange(props.evt, props.stateValue, props.format);
    return <div>{dateObj.value}</div>;
  };

  test('Date on change', () => {
    const { rerender, getByText, getAllByText } = render(
      <DateChange
        evt={{
          target: {
            value: '1111',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue="111"
        format="mmddyy"
      />
    );

    expect(getByText('11/11')).toBeTruthy();

    rerender(
      <DateChange
        evt={{
          target: {
            value: '1111',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue="11/11/22"
        format="mmddyy"
      />
    );

    expect(getByText('11/11')).toBeTruthy();

    render(
      <DateChange
        evt={{
          target: {
            value: '111',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue="1111"
        format="mmddyy"
      />
    );

    expect(getByText('11/11')).toBeTruthy();

    render(
      <DateChange
        evt={{
          target: {
            value: '11',
            selectionStart: 2,
            selectionEnd: 2,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue=""
        format="mmddyyyy"
      />
    );

    expect(getAllByText('11')).toBeTruthy();

    render(
      <DateChange
        evt={{
          target: {
            value: '1212',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue=""
        format="mmddyyyy"
      />
    );

    expect(getAllByText('12/12')).toBeTruthy();

    render(
      <DateChange
        evt={{
          target: {
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue=""
        format="mmddyyyy"
      />
    );

    render(
      <DateChange
        evt={{
          target: {
            value: '1111',
            selectionStart: 3,
            selectionEnd: 3,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue="1111"
        format="mmyy"
      />
    );
    expect(getAllByText('11/11')).toBeTruthy();

    render(
      <DateChange
        evt={{
          target: {
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue=""
        format="mmyy"
      />
    );

    render(
      <DateChange
        evt={{
          target: {
            value: '08',
            selectionStart: 1,
            selectionEnd: 1,
            setSelectionRange: function(start, end) {},
          },
        }}
        stateValue=""
        format="mmyy"
      />
    );
    expect(getAllByText('08')).toBeTruthy();
  });
});
