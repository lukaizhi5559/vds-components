import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * TableBody requires TableRow components as children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   * BottomLine used to control tableRow
   */
  bottomLine: PropTypes.bool,
  /**
   * @ignore
   * If provided, rows inside the Table component will have alternating stripes.
   */
  striped: PropTypes.bool,
  /**
   * @ignore
   */
  stripePattern: PropTypes.oneOf(['even', 'odd']),
  /**
   * @ignore
   */
  className: PropTypes.string,
};

const defaultProps = {
  bottomLine: true, // always true for 3.0
  striped: false,
  stripePattern: 'odd', // 3.0 prop
  className: undefined,
};

const StyledTableBody = styled.tbody`
  ${({ bottomLine }) =>
    !bottomLine &&
    `
    tr {
      border: none !important;
    }
  `};
  ${({ striped, stripePattern }) =>
    striped &&
    `
    tr:nth-child(${stripePattern}) {
      background-color: ${ColorTokens.background.secondary.light.value} !important;
    }
  `}
`;

const TableBody = props => {
  const { bottomLine, striped, children, stripePattern, className } = props;

  return (
    <StyledTableBody
      className={striped ? `tbody-striped-override` : null} // Control striped in surface dark. Handled in Table
      bottomLine={bottomLine}
      striped={striped}
      stripePattern={stripePattern}
    >
      {children}
    </StyledTableBody>
  );
};

TableBody.defaultProps = defaultProps;
TableBody.propTypes = propTypes;
TableBody.displayName = TableBody;

/**
 * @component
 */
export default TableBody;
