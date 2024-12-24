import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * TableRow requires Cell components as children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   * If provided, will override the border configuration for a single row
   * @note If rowBottomLine is 'none' in Table and bottomLine is provided, this will render the border bottom for this specific row
   * @note surface prop will also have to be passed to this component to achieve full border bottom behavior
   */
  bottomLine: PropTypes.oneOf(['primary', 'secondary', 'none']),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * Allows to pass test id of Table row
   */
  'data-testid': PropTypes.string,
};

const defaultProps = {
  className: undefined,
  id: undefined,
};

// Use default surface light colors ONLY
// Colors when surface is dark is handled in Table
const _calculateLine = bottomLine => {
  switch (bottomLine) {
    case 'primary':
      return `${calculateRem(1)} solid ${
        ColorTokens.elements.primary.onlight.value
      }`;
    case 'secondary':
      return `${calculateRem(1)} solid ${
        ColorTokens.elements.lowcontrast.onlight.value
      }`;
    case 'none':
      return 'none';
  }
};

// If pass bottomLine prop on row, will override the border config defined in Table
const StyledTableRow = styled.tr`
  ${({ bottomLine }) =>
    !!bottomLine &&
    css`
      border-bottom: ${_calculateLine(bottomLine)} !important;
    `}
`;

const TableRow = props => {
  const { bottomLine, children, className, id, 'data-testid': testId } = props;

  /**
   * NOTE:
   * Surface dark is applied on Table and will override the border-bottom of the row there.
   * via className applied on the <tr> tag below.
   *
   * For example: Look for .tr-primary-line-override if bottomLine of 'primary' is passed on this TableRow
   */
  return (
    <StyledTableRow
      className={!!bottomLine ? `tr-${bottomLine}-line-override` : className} // To specifically target rows when surface changes
      bottomLine={bottomLine}
      id={id}
      data-testid={testId}
    >
      {children}
    </StyledTableRow>
  );
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

/**
 * @component
 */
export default TableRow;
