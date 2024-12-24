import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';
import { calculateRem } from '@vds-core/utilities';

const propTypes = {
  /**
   * @ignore
   * Options to render the bottom line of the the Table Header
   */
  bottomLine: PropTypes.oneOf(['primary', 'secondary', 'none']),
  /**
   * TableHead requires TableHeader components as children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  bottomLine: 'primary',
};

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

const TableTR = styled.tr`
  ${({ bottomLine }) =>
    !!bottomLine &&
    css`
      border-bottom: ${_calculateLine(bottomLine)} !important;
    `}
`;

const TableHead = props => {
  const { children, className, bottomLine } = props;

  /**
   * NOTE:
   * Surface dark is applied on Table and will override the border-bottom of the header there.
   * via className applied on <thead> tag below.
   *
   * For example: Look for .thead-primary-line-override
   */
  return (
    <thead
      className={!!bottomLine ? `thead-${bottomLine}-line-override` : className}
    >
      <TableTR bottomLine={bottomLine}>{children}</TableTR>
    </thead>
  );
};

TableHead.propTypes = propTypes;
TableHead.defaultProps = defaultProps;

export default TableHead;
