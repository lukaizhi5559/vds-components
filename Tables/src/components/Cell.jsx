import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { Fonts } from '@vds-core/typography';

const propTypes = {
  /**
   * The Cell allows Any types as children.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * Allows extend the cell columns based on given number value.
   */
  colSpan: PropTypes.number,
  /**
   * Allows extend the cell row based on given number value.
   */
  rowSpan: PropTypes.number,
  /**
   * Allows to pass id of related TableHeaders
   */
  headers: PropTypes.string,
  /**
   * Allows to pass test id of Table cell
   */
  'data-testid': PropTypes.string,
  /**
   * Allows an id to be passed to the cell of a table
   */
  id: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  className: undefined,
  viewport: 'desktop',
};

const StyledCell = styled.td`
  font-size: ${({ viewport }) =>
    viewport === 'mobile'
      ? TypographyTokens.fontsize.body[12].value
      : TypographyTokens.fontsize.body[16].value};
  line-height: ${({ viewport }) =>
    viewport === 'mobile'
      ? TypographyTokens.lineheight.body[16].value
      : TypographyTokens.lineheight.body[20].value};
  letter-spacing: ${({ viewport }) =>
    viewport === 'mobile' ? 0 : TypographyTokens.letterspacing.wide.value};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  font-family: ${({ viewport }) =>
    viewport === 'mobile' ? Fonts.VerizonNHGeTX : Fonts.VerizonNHGeDS};
  color: ${ColorTokens.elements.primary.onlight.value};
  text-align: left;
  vertical-align: top;
  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;

const Cell = props => {
  const {
    children,
    viewport,
    className,
    rowSpan,
    colSpan,
    headers,
    'data-testid': testId,
  } = props;

  return (
    <StyledCell
      viewport={viewport}
      className={className}
      rowSpan={rowSpan}
      colSpan={colSpan}
      headers={headers}
      data-testid={testId}
    >
      {children}
    </StyledCell>
  );
};

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

export default withVDSManager(Cell);
