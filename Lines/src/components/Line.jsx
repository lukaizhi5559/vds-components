import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';
import { withVDSManager, calculateRem } from '@vds-core/utilities';

function _calculateLineColor(type, surface) {
  let lineColor = ColorTokens.elements.primary.onlight.value;
  if (type === 'accent') lineColor = '#d52b1e';
  else if (surface !== 'dark' && (type === 'xLight' || type === 'secondary'))
    lineColor = ColorTokens.elements.lowcontrast.onlight.value;
  else if (surface === 'dark' && (type === 'xLight' || type === 'secondary'))
    lineColor = ColorTokens.elements.lowcontrast.ondark.value;
  else if (surface === 'dark')
    lineColor = ColorTokens.elements.primary.ondark.value;
  return lineColor;
}

const propTypes = {
  /**
   * @ignore Type of the line that will be displayed.
   */
  type: PropTypes.oneOf([
    'heavy',
    'light',
    'xLight',
    'accent',
    'primary',
    'secondary',
  ]),
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   * Option to render the line horizontally or vertically
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

const defaultProps = {
  type: 'primary',
  surface: 'light',
  orientation: 'horizontal',
};

const StyledLine = styled.div`
  height: ${({ orientation, size }) =>
    orientation === 'vertical' ? 'unset' : size};
  width: ${({ orientation, size }) =>
    orientation === 'vertical' ? size : '100%'};
  background-color: ${({ type, surface }) =>
    _calculateLineColor(type, surface)};
`;

const Line = props => {
  const { type, surface, id, orientation } = props;
  const size = calculateRem(type === 'heavy' || type === 'accent' ? 4 : 1);
  return (
    <StyledLine
      {...props}
      id={id}
      type={type}
      surface={surface}
      size={size}
      orientaton={orientation}
    />
  );
};

Line.propTypes = propTypes;
Line.defaultProps = defaultProps;

export default withVDSManager(Line);
