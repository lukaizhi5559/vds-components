import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import {
  withVDSManager,
  calculateRem,
  generateUUID,
} from '@vds-core/utilities';
import {
  RadioBoxLabelWrapper,
  RadioBoxLabel,
  SubLabel,
  StackedLabel,
} from './RadioBoxElements';

const propTypes = {
  /**
   * If provided, the RadioBox will be rendered with children.
   */
  children: PropTypes.node,
  /**
   * If provided, the RadioBox will be rendered in the Disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * If provided, the RadioBox will be rendered with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   * If provided, will set a custom width for the radiobox label wrapper.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The prop for the HTML name Attribute. This is used to specify a name for an input element. It is used to reference the form-data after submitting the form or to reference the element.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback function that returns the value of the RadioBox when it's selected state changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * If provided, the RadioBox will be rendered in the Selected State.
   */
  selected: PropTypes.bool,
  /**
   * If provided, the RadioBox text will be rendered.
   */
  text: PropTypes.string,
  /**
   * If provided, the RadioBox subtext will be rendered.
   */
  subtext: PropTypes.string,
  /**
   * @ignore
   */
  subtextRight: PropTypes.string,
  /**
   * This prop is returned by the onChange function when the radiobox selected state is true.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * @ignore
   * 1.x only
   */
  uniqueId: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   * Orientation of the radiobox from the group (controls indicator position)
   */
  orientation: PropTypes.string,
  /**
   * If provided, the radio box will be rendered to show that the option is out of stock.
   */
  outOfStock: PropTypes.bool,
  /**
   * @ignore
   * Outline when radio box is active. Used to determine between 3.x and 1.x
   */
  borderActiveIndicator: PropTypes.oneOf(['outline', 'highlight']),
  /**
   * @ignore
   * Default border color
   */
  borderColor: PropTypes.string,
  /**
   * @ignore
   * Default border color active
   */
  borderColorActive: PropTypes.string,
  /**
   * @ignore
   * Default border color active
   */
  borderColorSelected: PropTypes.string,
  /**
   * @ignore
   * Default border radius
   */
  borderRadius: PropTypes.string,
  /**
   * @ignore
   * Default font size
   */
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * Default letter spacing
   */
  letterSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * Default line height
   */
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
  /**
   * Allows a unique ID to be passed to the input element.
   */
  inputId: PropTypes.string,
  /**
   * Allows an aria-label to be passed to the radio box.
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   * inverted
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * Only expose in RadioBoxGroup for 3.x
   */
  height: PropTypes.string,
};

const defaultProps = {
  children: null,
  disabled: false,
  transparentBackground: false,
  onChange: () => {},
  selected: false,
  uniqueId: '',
  subtext: '',
  subtextRight: '',
  text: '',
  outOfStock: false,
  borderActiveIndicator: 'outline',
  borderColor: FormControlsTokens.color.border.onlight.value,
  borderRadius: FormControlsTokens.border.radius.value,
  borderColorActive: ColorTokens.elements.primary.onlight.value,
  borderColorSelected: ColorTokens.elements.primary.onlight.value,
  fontSize: TypographyTokens.fontsize.body[16].value,
  letterSpacing: TypographyTokens.letterspacing.wide.value,
  lineHeight: TypographyTokens.lineheight.body[20].value,
  surface: 'light',
};

const StyledDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  height: ${({ height }) =>
    height
      ? height
      : '100%'}; // When childHeight passed from Group, this allows for the entire box to be clickable
  z-index: 1;
`;

const StyledInput = styled.input`
  visibility: visible !important;
  opacity: 0 !important;
  clip: rect(0 0 0 0);
  position: absolute;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  border: 0;
  white-space: nowrap;
  height: 100%;
  width: 100%;
  margin: 0;
  pointer-events: auto;

  ${({ checked, borderRadius, surface }) => `
  &:focus:not(:hover) + label {
    &:after {
      content: '';
      position: absolute;
      left: ${checked ? '-5px' : '-4px'};
      top: ${checked ? '-5px' : '-4px'};
      right: ${checked ? '-5px' : '-4px'};
      bottom: ${checked ? '-5px' : '-4px'};
      border-radius: ${
        parseInt(borderRadius) === 0
          ? 0
          : checked
          ? calculateRem(
              parseInt(borderRadius) +
                parseInt(AccessibilityTokens.focusring.space.offset.value) +
                1
            )
          : calculateRem(
              parseInt(borderRadius) +
                parseInt(AccessibilityTokens.focusring.space.offset.value)
            )
      };
      border: ${AccessibilityTokens.focusring.borderwidth.value} ${
    AccessibilityTokens.focusring.borderstyle.value
  } ${
    surface === 'dark'
      ? AccessibilityTokens.color.focusring.ondark.value
      : AccessibilityTokens.color.focusring.onlight.value
  };
        }
      }
      &:focus:not(:hover):not(:focus-visible) + label {
        &:after {
          display: none; // Only display focus state on keyboard focus, not when radio button is clicked
        }
      }
  `};
`;

const ChildWrapper = styled.span`
  pointer-events: auto;
`;

const FlexWrapper = styled.span`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const StrikethroughWrapper = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  pointer-events: none;
`;

const Line = styled.line`
  stroke: ${({ borderColor }) => borderColor};
`;

const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

class RadioBox extends React.Component {
  state = {
    active: false,
    hovered: false,
  };

  componentDidMount = () => {
    this.isAndroidDevice = (() =>
      navigator.userAgent.toLowerCase().indexOf('android') > -1)();
    this.radioId = this.props.inputId ? this.props.inputId : generateUUID();
  };

  _hovered = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }));
  };

  _onMouseDown = e => {
    //keeps IE happy
    this.setState({ active: true });
  };
  _onMouseUp = e => {
    this.setState({ active: false });
  };

  render() {
    const {
      children,
      disabled,
      name,
      onChange,
      selected: selectedProp,
      subtext,
      subtextRight,
      id,
      className,
      text,
      uniqueId,
      value,
      width,
      orientation,
      height,
      outOfStock,
      borderActiveIndicator,
      borderColor,
      borderRadius,
      borderColorActive,
      borderColorSelected,
      fontSize,
      lineHeight,
      letterSpacing,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
      surface,
      transparentBackground,
    } = this.props;

    const ariaLabel =
      this.props.ariaLabel && outOfStock
        ? `${this.props.ariaLabel} out of stock`
        : this.props.ariaLabel;

    const Label = subtext || subtextRight ? StackedLabel : RadioBoxLabel,
      unique_id = id || uniqueId,
      selected = selectedProp;

    let outOfStockLineColor =
      surface === 'dark'
        ? FormControlsTokens.color.border.ondark.value
        : borderColor;
    if (this.state.active || selected) {
      outOfStockLineColor =
        surface === 'dark'
          ? ColorTokens.elements.primary.ondark.value
          : borderColorActive;
    }
    if (disabled) {
      outOfStockLineColor =
        surface === 'dark'
          ? ColorTokens.interactive.disabled.ondark.value
          : ColorTokens.interactive.disabled.onlight.value;
    }

    return (
      <RadioBoxLabelWrapper
        active={this.state.active}
        checked={selected}
        disabled={disabled}
        orientation={orientation}
        outOfStock={outOfStock}
        borderActiveIndicator={borderActiveIndicator}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderColorActive={borderColorActive}
        borderColorSelected={borderColorSelected}
        fontSize={fontSize}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        hovered={this.state.hovered}
        className={className}
        id={id}
        surface={surface}
        width={width}
        transparentBackground={transparentBackground}
        height={height}
      >
        {outOfStock && (
          <StrikethroughWrapper
            onMouseEnter={this._hovered}
            onMouseLeave={this._hovered}
          >
            <Line
              borderColor={outOfStockLineColor}
              x1="0"
              y1="100%"
              x2="100%"
              y2="0"
            />
          </StrikethroughWrapper>
        )}
        <StyledDiv
          onMouseDown={this._onMouseDown}
          onMouseUp={this._onMouseUp}
          onMouseEnter={this._hovered}
          onMouseLeave={this._hovered}
          height={height}
        >
          <StyledInput
            aria-checked={selected}
            aria-label={ariaLabel}
            type="radio"
            checked={!disabled && selected}
            disabled={disabled}
            id={this.radioId}
            value={value}
            name={name}
            onClick={this._onClick}
            onChange={e => onChange(e)}
            tabIndex={disabled ? -1 : 0}
            data-track={track}
            data-track-ignore={trackIgnore}
            data-analyticstrack={analyticsTrack}
            data-clickstream={clickStream}
            borderRadius={borderRadius}
            surface={surface}
          />
          <Label
            outOfStock={outOfStock}
            disabled={disabled}
            htmlFor={this.radioId}
            aria-labelledby={`label-${this.radioId}`}
            aria-hidden={this.isAndroidDevice ? true : false}
            fontSize={fontSize}
            fontWeight={
              subtext
                ? TypographyTokens.fontweight.bold.value
                : TypographyTokens.fontweight.regular.value
            }
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            <FlexWrapper id={`label-${this.radioId}`} aria-hidden={true}>
              <ChildWrapper>
                {text && !children && (
                  <ChildWrapper className="LabelContent">{text}</ChildWrapper>
                )}
                {subtext && !children && (
                  <SubLabel
                    className="SubLabel"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    letterSpacing={letterSpacing}
                  >
                    {subtext}
                  </SubLabel>
                )}
                {children && children}
                {outOfStock && (
                  <ScreenReaderText>Out of stock</ScreenReaderText>
                )}
              </ChildWrapper>
              {subtextRight && !children && (
                <SubLabel
                  className="SubLabelRight"
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  letterSpacing={letterSpacing}
                >
                  {subtextRight}
                </SubLabel>
              )}
            </FlexWrapper>
          </Label>
        </StyledDiv>
      </RadioBoxLabelWrapper>
    );
  }
}

RadioBox.propTypes = propTypes;
RadioBox.defaultProps = defaultProps;

export default withVDSManager(RadioBox);
