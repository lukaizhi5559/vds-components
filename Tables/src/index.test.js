import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Table, TableHead, TableHeader, TableBody, TableRow, Cell } from '.';
import { calculateRem } from '../../Utilities/src';
import Icon from '../../Icons/src';
function getStyles(typescale, viewport, typeSize) {
  return BodyConfig[typescale][viewport][typeSize];
}
const BodyConfig = {
  VDS: {
    mobile: {
      large: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.5,
        fontFamily: 'Verizon-NHG-eDS',
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
      small: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
    },
    desktop: {
      large: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.5,
        fontFamily: 'Verizon-NHG-eDS',
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
      small: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
    },
  },
  getStyles: getStyles,
};

let TypographyConfig = {
  typescale: 'VDS',
};

let typeScales = ['VDS'];

function settypescale(config) {
  if (!typeScales.includes(config)) return;
  TypographyConfig.typescale = config;
}

function getTypescale(path) {
  return TypographyConfig.typescale;
}

const VDSTypographyConfig = {
  getTypescale: getTypescale,
  settypescale: settypescale,
};

test('Table default styles', () => {
  const { container } = render(
    <Table>
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>
            <Icon name="checkmark" />
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  //Table Header bottomLine color
  const bLine = container.querySelector('thead');
  const bLineStyles = window.getComputedStyle(bLine.firstChild)._values;
  expect(bLineStyles['border-bottom']).toBe('0.0625rem solid #000000');
  //Table Header text color
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  expect(hText['color']).toBe('rgb(0, 0, 0)');
  //Table Row text color
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  expect(rText['color']).toBe('rgb(0, 0, 0)');
  //Icon color
  expect(document.querySelector('path[fill="#000000"]')).toBeTruthy();
  //Table Row bottomLine color
  const tr = tBody.querySelector('[class^="StyledTableRow"]');
  const rLine = window.getComputedStyle(tr)._values;
  expect(rLine['border-bottom']).toBe('0.0625rem solid #d8dada');
  //Padding: Standard (Default)
  expect(hText['padding']).toBe('2rem 2rem 2rem 0px');
  expect(rText['padding']).toBe('2rem 2rem 2rem 0px');
  //Table Header text style
  expect(hText['font-size']).toBe('20px');
  expect(hText['line-height']).toBe('24px');
  expect(hText['letter-spacing']).toBe('0');
  expect(hText['font-family']).toBe('Verizon-NHG-eDS');
  expect(hText['font-weight']).toBe('700');
  //Table Row text style
  expect(rText['font-size']).toBe('16px');
  expect(rText['line-height']).toBe('20px');
  expect(rText['letter-spacing']).toBe('0.5px');
  expect(rText['font-family']).toBe('Verizon-NHG-eDS');
  expect(rText['font-weight']).toBe('400');
  //Icon size (medium)
  const ic = container.querySelector('[class^="StyledSVG"]');
  const icSize = window.getComputedStyle(ic)._values;
  expect(icSize['height']).toBe('1.25rem');
  expect(icSize['width']).toBe('1.25rem');
  //Width
  const table = container.querySelector('table');
  const tWidth = window.getComputedStyle(table)._values;
  expect(tWidth['width']).toBe('100%');
});

test('Table default styles surface="dark"', () => {
  const { container } = render(
    <Table surface="dark">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>
            <Icon surface="dark" name="checkmark" />
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  //Table Header bottomLine color
  const bLine = container.querySelector(
    '[class^="thead-primary-line-override"]'
  );

  const bLineStyles = window.getComputedStyle(bLine.firstChild)._values;
  expect(bLineStyles['border-bottom']).toBe('0.0625rem solid #000000');
  expect(bLineStyles['border-color']).toBe('#ffffff'); // Only border-color is overridden so test for this additionally
  //Table Header text color
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  expect(hText['color']).toBe('rgb(0, 0, 0)');
  //Table Row text color
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  expect(rText['color']).toBe('rgb(0, 0, 0)');
  //Icon color
  expect(document.querySelector('path[fill="#ffffff"]')).toBeTruthy();
  //Table Row bottomLine color
  const tr = tBody.querySelector('[class^="StyledTableRow"]');
  const rLine = window.getComputedStyle(tr)._values;
  expect(rLine['border-bottom']).toBe('0.0625rem solid #333333');
  //Padding: Standard (Default)
  expect(hText['padding']).toBe('2rem 2rem 2rem 0px');
  expect(rText['padding']).toBe('2rem 2rem 2rem 0px');
  //Table Header text style
  expect(hText['font-size']).toBe('20px');
  expect(hText['line-height']).toBe('24px');
  expect(hText['letter-spacing']).toBe('0');
  expect(hText['font-family']).toBe('Verizon-NHG-eDS');
  expect(hText['font-weight']).toBe('700');
  //Table Row text style
  expect(rText['font-size']).toBe('16px');
  expect(rText['line-height']).toBe('20px');
  expect(rText['letter-spacing']).toBe('0.5px');
  expect(rText['font-family']).toBe('Verizon-NHG-eDS');
  expect(rText['font-weight']).toBe('400');
  //Icon size (medium)
  const ic = container.querySelector('[class^="StyledSVG"]');
  const icSize = window.getComputedStyle(ic)._values;
  expect(icSize['height']).toBe('1.25rem');
  expect(icSize['width']).toBe('1.25rem');
  //Width
  const table = container.querySelector('table');
  const tWidth = window.getComputedStyle(table)._values;
  expect(tWidth['width']).toBe('100%');
});

test('Table striped styles on Desktop/Tablet', () => {
  const { container } = render(
    <Table striped={true}>
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>
            <Icon name="checkmark" />
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  const tBg = window.getComputedStyle(tBody.firstChild)._values;
  //Padding: striped on Desktop/Tablet
  expect(hText['padding']).toBe('2rem 1rem 2rem 1rem');
  expect(rText['padding']).toBe('2rem 1rem 2rem 1rem');
  //Striped background color
  expect(tBg['background-color']).toBe('rgb(246, 246, 246)');
});

test('Table striped styles on Desktop/Tablet surface="dark"', () => {
  const { container } = render(
    <Table striped={true} surface="dark">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>
            <Icon name="checkmark" />
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const tBody = container.querySelector('tbody');
  const tBg = window.getComputedStyle(tBody.firstChild)._values;
  //Striped background color on surface="dark"
  expect(tBg['background-color']).toBe('rgb(27, 29, 31)');
});

test('Table Padding: Compact on Desktop/Tablet', () => {
  const { container } = render(
    <Table padding="compact">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  //Padding: Compact on Desktop/Tablet
  expect(hText['padding']).toBe('1rem 2rem 1rem 0px');
  expect(rText['padding']).toBe('1rem 2rem 1rem 0px');
});

test('Table Padding: Standard (Default) on Mobile viewport', () => {
  const { container } = render(
    <Table viewport="mobile">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  //Padding: Standard (Default) on Mobile
  expect(hText['padding']).toBe('1.5rem 1.5rem 1.5rem 0px');
  expect(rText['padding']).toBe('1.5rem 1.5rem 1.5rem 0px');
});

test('Table Padding: Compact on Mobile viewport', () => {
  const { container } = render(
    <Table padding="compact" viewport="mobile">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  //Padding: Compact on Mobile
  expect(hText['padding']).toBe('0.75rem 1.5rem 0.75rem 0px');
  expect(rText['padding']).toBe('0.75rem 1.5rem 0.75rem 0px');
});

test('Table Padding: Compact and striped on Mobile viewport', () => {
  const { container } = render(
    <Table padding="compact" striped={true} viewport="mobile">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  //Padding: Compact and striped on Mobile
  expect(hText['padding']).toBe('0.75rem 0.75rem 0.75rem 0.75rem');
  expect(rText['padding']).toBe('0.75rem 0.75rem 0.75rem 0.75rem');
});

test('Table striped on Mobile viewport', () => {
  const { container } = render(
    <Table striped={true} viewport="mobile">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const bLine = container.querySelector('thead');
  const hText = window.getComputedStyle(bLine.firstChild.firstChild)._values;
  const tBody = container.querySelector('tbody');
  const rText = window.getComputedStyle(tBody.firstChild.firstChild)._values;
  //Padding: striped on Mobile
  expect(hText['padding']).toBe('1.5rem 0.75rem 1.5rem 0.75rem');
  expect(rText['padding']).toBe('1.5rem 0.75rem 1.5rem 0.75rem');
});

test('Table headerBottomLine secondary & rowBottomLine primary styles', () => {
  const { container } = render(
    <Table bottomLine="primary">
      <TableHead bottomLine="secondary">
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  //Table Head bottomLine color secondary
  const bLine = container.querySelector('thead');
  const bLineStyles = window.getComputedStyle(bLine.firstChild)._values;
  expect(bLineStyles['border-bottom']).toBe('0.0625rem solid #d8dada');
  //Table Row bottomLine color primary
  const tBody = container.querySelector('tbody');
  const tr = tBody.querySelector('[class^="StyledTableRow"]');
  const rLine = window.getComputedStyle(tr)._values;
  expect(rLine['border-bottom']).toBe('0.0625rem solid #000000');
});

test('Table headerBottomLine secondary & rowBottomLine primary styles on surface="dark"', () => {
  const { container } = render(
    <Table surface="dark" bottomLine="primary">
      <TableHead bottomLine="secondary" surface="dark">
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  //Table Head bottomLine color
  const bLine = container.querySelector('thead');
  const bLineStyles = window.getComputedStyle(bLine.firstChild)._values;
  expect(bLineStyles['border-bottom']).toBe('0.0625rem solid #d8dada');
  expect(bLineStyles['border-color']).toBe('#333333'); // overridden so have to test this,
  //Table Row bottomLine color
  const tBody = container.querySelector('tbody');
  const tr = tBody.querySelector('[class^="StyledTableRow"]');
  const rLine = window.getComputedStyle(tr)._values;
  expect(rLine['border-bottom']).toBe('0.0625rem solid #ffffff');
});

test('Table headerBottomLine none & rowBottomLine none styles', () => {
  const { container } = render(
    <Table bottomLine="none">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
        <TableRow>
          <Cell>Content goes here...</Cell>
          <Cell>Lorem Ipsum on two lines to demonstrate how i behave</Cell>
          <Cell>Lorem</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  //Table Head bottomLine color
  const bLine = container.querySelector('[class^="TableTR"]');
  expect(bLine).toHaveStyleRule(`border-bottom', 'none`);
  //Table Row bottomLine color
  const tr = container.querySelector('[class^="StyledTableRow"]');
  expect(tr).toHaveStyle(`border-bottom: none`);
});

test('Table', () => {
  const { container, getByText } = render(
    <Table>
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
  expect(container.firstChild).toMatchSnapshot();

  // Expect table to exist
  expect(document.querySelector('table')).toBeTruthy();

  // Expect one 'Cell' aka 'td' and one 'TableHeader' aka 'th'
  expect(document.querySelectorAll('td').length).toBe(1);
  expect(document.querySelectorAll('th').length).toBe(1);

  expect(getByText('Header').tagName).toBe('TH');
  expect(getByText('Cell').tagName).toBe('TD');

  expect(document.querySelector('table').getAttribute('aria-label')).toBe(
    'Table'
  );
});

test('Table hover', () => {
  const { container } = render(
    <Table>
      <TableBody hover>
        <TableRow>
          <Cell cellPadding={calculateRem(8, 12, 16, 0)}>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(container.firstChild).toMatchSnapshot();
});

// test('Table striped', () => {
//   const { container, getByText } = render(
//     <Table striped>
//       <TableBody>
//         <TableRow>
//           <Cell>Row 1, Cell 1</Cell>
//         </TableRow>
//         <TableRow>
//           <Cell>Row 2, Cell 1</Cell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );

//   expect(getByText('Row 1, Cell 1')).toHaveStyle('background-color: #f6f6f6;');
//   expect(container.firstChild).toMatchSnapshot();
// });

test('Table topLine="heavy"', () => {
  const { container } = render(
    <Table topLine="heavy">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(document.querySelector('table')).toHaveStyle(
    'border-top: 0.25rem solid #000000;'
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Table topLine="light"', () => {
  const { container } = render(
    <Table topLine="light">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(document.querySelector('table')).toHaveStyle(
    'border-top: 0.0625rem solid #000000;'
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Table topLine="xLight"', () => {
  const { container } = render(
    <Table topLine="xLight">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(document.querySelector('table')).toHaveStyle(
    'border-top: 0.0625rem solid #d8dada;'
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Table with ariaLabel and indentedCells', () => {
  const { container } = render(
    <Table indentedCells ariaLabel="indented table">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(document.querySelector('table').getAttribute('aria-label')).toBe(
    'indented table'
  );
});

test('Table in mobile viewport', () => {
  const { container } = render(
    <Table viewport="mobile">
      <TableHead>
        <TableHeader viewport="mobile">Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell viewport="mobile">Cell </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Table in desktop viewport and VDS typescale', () => {
  const { container } = render(
    <Table
      viewport="desktop"
      typescale="VDS"
      bodyConfig={BodyConfig}
      TypographyConfig={VDSTypographyConfig}
    >
      <TableHead>
        <TableHeader
          viewport="desktop"
          typescale="VDS"
          bodyConfig={BodyConfig}
          TypographyConfig={VDSTypographyConfig}
        >
          Header
        </TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell
            viewport="desktop"
            typescale="VDS"
            bodyConfig={BodyConfig}
            TypographyConfig={VDSTypographyConfig}
          >
            Cell
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(container.querySelector('th')).toHaveStyle(
    'padding: 2rem 2rem 2rem 0px;'
  );
  expect(container.querySelector('td')).toHaveStyle(
    'padding: 2rem 2rem 2rem 0px;'
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Table in mobile viewport and VDS typescale', () => {
  const { container } = render(
    <Table viewport="mobile" typescale="VDS">
      <TableHead>
        <TableHeader viewport="mobile" typescale="VDS">
          Header
        </TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell viewport="mobile" typescale="VDS">
            Cell
          </Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(container.querySelector('th')).toHaveStyle(
    'padding: 1.5rem 1.5rem 1.5rem 0px'
  );
  expect(container.querySelector('td')).toHaveStyle(
    'padding: 1.5rem 1.5rem 1.5rem 0px'
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Table - surface="dark" style', () => {
  const { container } = render(
    <Table surface="dark">
      <TableHead>
        <TableHeader>Header</TableHeader>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell>Cell</Cell>
        </TableRow>
      </TableBody>
    </Table>
  );

  expect(getComputedStyle(document.querySelector('table td')).color).toBe(
    'rgb(0, 0, 0)'
  );
  expect(getComputedStyle(document.querySelector('table th')).color).toBe(
    'rgb(0, 0, 0)'
  );
  expect(document.querySelector('table')).toHaveStyle(
    'border-top: 0 solid #ffffff;'
  );
  expect(container).toMatchSnapshot();
});
