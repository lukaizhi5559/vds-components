import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { LayoutTokens } from '@vds-tokens/layout';
import RadioButtonIcon from './RadioButtonIcon';

//style properties
const fontSize = calculateRem(TypographyTokens.fontsize.body[16].value);
const lineHeight = calculateRem(TypographyTokens.lineheight.body[20].value);
const fontWeightBold = TypographyTokens.fontweight.bold.value;
const formsLabelSpaceStack = calculateRem(LayoutTokens.space['1X'].value);

const propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  /**
   * If provided, the Radio will be rendered with children.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If provided, the RadioButton will break into a new line at the given string value width.
   */
  maxLabelWidth: PropTypes.string,
  /**
   * If provided, the Radio will be rendered in the Selected State.
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  ariaLabel: PropTypes.string,
  /**
   * If provided, this prop will render the string in bold as a title in a two line radio button label
   */
  label: PropTypes.string,
  /**
   * Function that calculates letter spacing, receives font weight as input
   */
  calculateLetterSpacing: PropTypes.func,
  /**
   * @ignore
   * Determines viewport of button.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
};

const defaultProps = {
  disabled: false,
  surface: 'light',
};

const RadioLabel = styled.label`
  display: flex;
  line-height: ${lineHeight};
  font-size: ${fontSize};
  font-family: ${Fonts.VerizonNHGeDS};
  letter-spacing: ${({ calculateLetterSpacing, viewport }) =>
    calculateLetterSpacing('regular', viewport)};
  max-width: ${({ maxLabelWidth }) => maxLabelWidth};
  cursor: pointer;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  ${({ disabled, surface }) =>
    disabled &&
    `
    color: ${
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value
    };
    cursor: default;
  `};
`;

const ChildWrapper = styled.div``;

const LabelWrapper = styled.span`
  display: flex;
  flex: 1;
  margin-bottom: ${formsLabelSpaceStack};
  font-weight: ${fontWeightBold};
  letter-spacing: ${({ calculateLetterSpacing, viewport }) =>
    calculateLetterSpacing('bold', viewport)};
`;

const isAppleDevice = (function() {
  return (
    typeof navigator !== 'undefined' && /iPhone|iPad/i.test(navigator.userAgent)
  );
})();

const RadioButtonLabel = props => {
  const {
    maxLabelWidth,
    disabled,
    surface,
    children,
    selected,
    ariaLabel,
    label,
    radioId,
    calculateLetterSpacing,
    viewport,
  } = props;

  const useViewport = viewport === 'tablet' ? 'desktop' : viewport;

  return (
    <RadioLabel
      {...props}
      maxLabelWidth={maxLabelWidth}
      disabled={disabled}
      surface={surface}
      viewport={useViewport}
      calculateLetterSpacing={calculateLetterSpacing}
    >
      <RadioButtonIcon
        selected={selected}
        disabled={disabled}
        surface={surface}
      />
      <ChildWrapper
        role={isAppleDevice && ariaLabel ? 'text' : ''}
        id={`label-${radioId}`}
      >
        {label && (
          <LabelWrapper
            viewport={useViewport}
            calculateLetterSpacing={calculateLetterSpacing}
            aria-hidden={true}
          >
            {label}
          </LabelWrapper>
        )}
        <div aria-hidden={typeof children === 'string'}>{children}</div>
      </ChildWrapper>
    </RadioLabel>
  );
};

RadioButtonLabel.propTypes = propTypes;
RadioButtonLabel.defaultProps = defaultProps;

export default RadioButtonLabel;
