import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';

const SPACE3 = LayoutTokens.space['3X'].value; // 12px
const SPACE4 = LayoutTokens.space['4X'].value; // 16px
const SPACE6 = LayoutTokens.space['6X'].value; // 24px
const SPACE8 = LayoutTokens.space['8X'].value; // 32px

const propTypes = {
  /**
   * Table requires TableHead or TableBody components as children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   * 1.0 prop only
   */
  topLine: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'heavy',
    'light',
    'xLight',
    'none',
  ]),
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   * Boolean used to invert table color
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If provided, rows inside the Table component will have alternating stripes.
   */
  striped: PropTypes.bool,
  /**
   * @ignore
   * Options to render the bottom line of the rows in the Table
   */
  bottomLine: PropTypes.oneOf(['primary', 'secondary', 'none']),
  /**
   * @ignore
   * Option to start stripe
   */
  stripePattern: PropTypes.oneOf(['even', 'odd']),
  /**
   * @ignore
   */
  padding: PropTypes.oneOf(['standard', 'compact']),
  /**
   * @ignore
   * Function to determine padding for table header
   */
  calcPaddingHeader: PropTypes.func,
  /**
   * @ignore
   * Function to determine padding for table cells
   */
  calcPaddingCells: PropTypes.func,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   * Allows to pass test id of Table
   */
  'data-testid': PropTypes.string,
};

const defaultProps = {
  //added after renaming
  topLine: 'none',
  surface: 'light',
  bottomLine: 'secondary',
  stripePattern: 'odd',
  padding: 'standard',
  calcPaddingHeader: null,
  calcPaddingCells: null,
  className: undefined,
};

const _calculateLine = (bottomLine, surface) => {
  switch (bottomLine) {
    case 'primary':
      return `${calculateRem(1)} solid ${
        ColorTokens.elements.primary[`on${surface}`].value
      }`;
    case 'secondary':
      return `${calculateRem(1)} solid ${
        surface === 'dark'
          ? ColorTokens.elements.lowcontrast.ondark.value
          : ColorTokens.elements.lowcontrast.onlight.value
      }`;
    case 'none':
      return 'none';
  }
};

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  text-align: left;
  width: 100%;
  font-size: ${calculateRem(14)};
  margin-bottom: ${calculateRem(LayoutTokens.space['8X'].value)};
  padding-top: ${calculateRem(18)};
  ${({ paddingHeader, paddingCells }) => css`
    td {
      padding: ${paddingCells};
    }
    th {
      padding: ${paddingHeader};
    }
  `};
  ${({ bottomLine, surface }) => css`
    thead {
      tr {
        border-bottom: ${_calculateLine(bottomLine, surface)};
      }
    }
  `};
  ${({ bottomLine, surface, striped, stripePattern }) => css`
    tbody {
      tr {
        border-bottom: ${_calculateLine(bottomLine, surface)};
        ${striped &&
          `
          &:nth-child(${stripePattern}) {
            background-color: ${ColorTokens.background.secondary[surface].value};
          }
        `}
      }
    }
  `}
  ${({ surface, stripePattern }) =>
    surface === 'dark' &&
    css`
      td,
      th {
        color: ${ColorTokens.elements.primary.ondark.value};
      }

      // Overriding tableHead bottomLine when surface is dark
      .thead-primary-line-override {
        tr {
          border-color: ${ColorTokens.elements.primary.ondark.value} !important;
        }
      }
      .thead-secondary-line-override {
        tr {
          border-color: ${ColorTokens.elements.lowcontrast.ondark
            .value} !important;
        }
      }
      .thead-none-line-override {
        tr {
          border: none !important;
        }
      }

      // Overriding boder-color color on any tableRow if bottomLine prop is passed
      tbody {
        .tr-primary-line-override {
          border-color: ${ColorTokens.elements.primary.ondark.value} !important;
        }
        .tr-secondary-line-override {
          border-color: ${ColorTokens.elements.lowcontrast.ondark
            .value} !important;
        }
        .tr-none-line-override {
          border: none !important;
        }
      }
      .tbody-striped-override {
        tr:nth-child(${stripePattern}) {
          background-color: ${ColorTokens.background.secondary.dark
            .value} !important;
        }
      }
    `};
  ${({ striped }) =>
    striped &&
    css`
      thead {
        tr {
          border-bottom: none !important;
        }
      }
    `}

  border-top: ${({ topLine }) => {
    if (topLine === 'none') {
      return 0;
    }
    return topLine === 'primary' || topLine === 'heavy'
      ? calculateRem(4)
      : calculateRem(1);
  }}
    solid
    ${({ topLine, surface }) =>
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : topLine === 'tertiary' || topLine === 'xLight'
        ? ColorTokens.elements.lowcontrast.onlight.value
        : ColorTokens.elements.primary.onlight.value};

  &:focus {
    outline: none;
  }
`;

const Table = props => {
  const {
    ariaLabel,
    children,
    tabIndex,
    id,
    surface,
    striped,
    bottomLine,
    stripePattern,
    calcPaddingHeader,
    calcPaddingCells,
    viewport,
    padding,
    topLine,
    className,
    role,
    'data-testid': testId,
  } = props;

  const _calcPaddingHeader = () => {
    if (calcPaddingHeader) return calcPaddingHeader(viewport);

    switch (padding) {
      case 'compact':
        return viewport === 'mobile'
          ? calculateRem(
              SPACE3,
              striped ? SPACE3 : SPACE6,
              SPACE3,
              striped ? SPACE3 : 0
            )
          : calculateRem(
              SPACE4,
              striped ? SPACE4 : SPACE8,
              SPACE4,
              striped ? SPACE4 : 0
            );
      case 'standard':
      default:
        return viewport === 'mobile'
          ? calculateRem(
              SPACE6,
              striped ? SPACE3 : SPACE6,
              SPACE6,
              striped ? SPACE3 : 0
            )
          : calculateRem(
              SPACE8,
              striped ? SPACE4 : SPACE8,
              SPACE8,
              striped ? SPACE4 : 0
            );
    }
  };

  const _calcPaddingCells = () => {
    if (calcPaddingCells) return calcPaddingCells(viewport);

    switch (padding) {
      case 'compact':
        return viewport === 'mobile'
          ? calculateRem(
              SPACE3,
              striped ? SPACE3 : SPACE6,
              SPACE3,
              striped ? SPACE3 : 0
            )
          : calculateRem(
              SPACE4,
              striped ? SPACE4 : SPACE8,
              SPACE4,
              striped ? SPACE4 : 0
            );
      case 'standard':
      default:
        return viewport === 'mobile'
          ? calculateRem(
              SPACE6,
              striped ? SPACE3 : SPACE6,
              SPACE6,
              striped ? SPACE3 : 0
            )
          : calculateRem(
              SPACE8,
              striped ? SPACE4 : SPACE8,
              SPACE8,
              striped ? SPACE4 : 0
            );
    }
  };

  return (
    <StyledTable
      id={id}
      aria-label={ariaLabel ? ariaLabel : 'Table'}
      tabIndex={tabIndex}
      surface={surface}
      striped={striped}
      bottomLine={bottomLine}
      stripePattern={stripePattern}
      paddingHeader={_calcPaddingHeader()}
      paddingCells={_calcPaddingCells()}
      topLine={topLine}
      className={className}
      data-testid={testId}
      role={role}
    >
      {children}
    </StyledTable>
  );
};

Table.defaultProps = defaultProps;
Table.propTypes = propTypes;

export default withVDSManager(Table);
