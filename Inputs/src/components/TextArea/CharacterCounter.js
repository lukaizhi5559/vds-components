import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';

const propTypes = {
  /**
   *  sets Max character length for input field
   */
  maxLength: PropTypes.number,
  /**
   * @ignore If passed, new Body component will render
   */
  Body: PropTypes.func,
  /**
   * @ignore - text color
   */
  color: PropTypes.string,
  /**
   * value of input
   */
  value: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  color: ColorTokens.elements.primary.onlight.value,
  Body: Body,
};

const CounterWrapper = styled.div`
  padding: ${LayoutTokens.space['2X'].value} 0 0
    ${LayoutTokens.space['4X'].value};
`;

const CharacterCounter = ({ maxLength, Body, color, value }) => {
  const valueLength = value.length;
  return (
    <CounterWrapper>
      <Body color={color} tabIndex={-1}>
        {valueLength <= maxLength
          ? `${valueLength}/${maxLength}`
          : `${maxLength - valueLength}`}
      </Body>
    </CounterWrapper>
  );
};

CharacterCounter.propTypes = propTypes;
CharacterCounter.defaultProps = defaultProps;

export default CharacterCounter;
