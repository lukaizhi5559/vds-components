import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body } from '@vds-core/typography';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
  getOS,
} from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { Tooltip as CoreTooltip } from '@vds-core/tooltips';

function _calculateLabelColor(disabled, surface) {
  let labelColor;
  if (disabled) {
    surface === 'dark'
      ? (labelColor = ColorTokens.interactive.disabled.ondark.value)
      : (labelColor = ColorTokens.interactive.disabled.onlight.value);
  } else if (surface === 'dark') {
    labelColor = ColorTokens.elements.primary.ondark.value;
  } else {
    labelColor = ColorTokens.elements.primary.onlight.value;
  }
  return labelColor;
}

function _calculateOptionalLabelColor(disabled, surface) {
  return disabled && surface !== 'dark'
    ? ColorTokens.interactive.disabled.onlight.value
    : disabled && surface === 'dark'
    ? ColorTokens.interactive.disabled.ondark.value
    : !disabled && surface === 'dark'
    ? ColorTokens.elements.secondary.ondark.value
    : ColorTokens.elements.secondary.onlight.value;
}

function _calculateCVVTooltipWrapperHeight(cardType, isTooltipDialog) {
  if (isTooltipDialog) {
    return cardType !== 'other' && cardType !== undefined ? '148px' : '184px';
  } else {
    return cardType !== 'other' && cardType !== undefined ? '124px' : '160px';
  }
}

const propTypes = {
  /**
   * If provided, will provide the id of the input the label focuses to onClick
   */
  htmlFor: PropTypes.string,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If provided, will provide the context for the 'label' on the input field.
   */
  label: PropTypes.string,

  /**
   * When true, will add the required attribute to the input element, if false, a string of 'Optional' next to the label
   */
  required: PropTypes.bool,

  /**
   * If provided, the Label will be rendered in the inverted state.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore - spacing between the label and the input field
   */
  labelMarginBottom: PropTypes.string,

  /**
   * @ignore - defines whether text trancates with ellipsis or not
   */
  overflowEllipsis: PropTypes.bool,

  /**
   * @ignore string representing the type of input
   */
  type: PropTypes.string,
  /**
   * @ignore If passed, the Tooltip will render
   */
  Tooltip: PropTypes.func,
  /**
   * @ignore String, array or node containing the title of the TooltipDialog
   */
  tooltipTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore String, array or node containing the body content of the TooltipDialog
   */
  tooltipContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore - 3.x only
   * If provided, will render the text for Close button for tooltip dialog when on mobile/touch devices
   */
  tooltipCloseButtonText: PropTypes.string,
  /**
   * String, array or node containing the title of the Tooltip for Input label
   * @ignore Config object for tooltip option
   */
  tooltip: PropTypes.shape({
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    closeButtonText: PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
  }),
  /**
   * @ignore
   */
  calculateLabelColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateOptionalLabelColor: PropTypes.func,
  /**
   * @ignore
   * For Brand3.0 only
   */
  renderSecurityCodeTooltipDialog: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  label: undefined,
  required: true,
  labelMarginBottom: calculateRem(1),
  overflowEllipsis: false,
  type: undefined,
  Tooltip: CoreTooltip,
  tooltipTitle: undefined,
  tooltipContent: undefined,
  tooltipCloseButtonText: undefined,
  surface: 'light',
  calculateLabelColor: _calculateLabelColor,
  calculateOptionalLabelColor: _calculateOptionalLabelColor,
  renderSecurityCodeTooltipDialog: true,
};

const LabelWrapper = styled.label`
  display: inline-flex;
  margin-bottom: ${({ labelMarginBottom, label }) =>
    label ? labelMarginBottom : 0};
  width: ${({ helperText, helperTextPlacement }) =>
    helperText && helperTextPlacement === 'right' ? '50%' : '100%'};
  > * {
    white-space: ${({ overflowEllipsis }) =>
      overflowEllipsis ? 'normal' : 'nowrap'};
    text-overflow: ${({ overflowEllipsis }) =>
      overflowEllipsis ? null : 'ellipsis'};
    overflow: ${({ overflowEllipsis }) => (overflowEllipsis ? null : 'hidden')};
  }

  ${({ focusState }) =>
    focusState &&
    `
    &:focus,
    &:active {
      outline: none;
    }
  `};
`;

const OptionalLabel = styled.span`
  margin: 0;
  outline: none;
  &::after {
    color: ${({ color }) => color};
    content: ' Optional';
    display: inline;
  }
`;

const CVVTooltipWrapper = styled.span`
  display: flex;
  flex: 1;
  flex-direction: ${({ cardType }) =>
    cardType !== 'other' && cardType !== undefined ? 'column' : 'row'};
  height: ${({ cardType, isTooltipDialog }) =>
    _calculateCVVTooltipWrapperHeight(cardType, isTooltipDialog)};
`;

const CVVIconWrapper = styled.span`
  display: inline-block;
  width: ${({ isTooltipDialog }) =>
    isTooltipDialog ? calculateRem(126) : calculateRem(96)};
  height: ${({ isTooltipDialog }) =>
    isTooltipDialog ? calculateRem(94) : calculateRem(71)};
  padding-bottom: ${({ isTooltipDialog }) =>
    isTooltipDialog
      ? calculateRem(LayoutTokens.space['3X'].value)
      : calculateRem(LayoutTokens.space['2X'].value)};
`;

const ColumnWrapper = styled.span`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-right: ${({ secondCol, isTooltipDialog }) =>
    secondCol
      ? 0
      : isTooltipDialog
      ? calculateRem(LayoutTokens.space['3X'].value)
      : calculateRem(LayoutTokens.space['2X'].value)};
`;

/* Height is 15px due to tooltip increasing height*/
const AlignTooltip = styled.span`
  display: inline-flex;
  vertical-align: text-bottom;
  height: ${calculateRem(15)};
`;

const Label = props => {
  const {
    id,
    width,
    disabled,
    required,
    label,
    tooltip,
    Tooltip,
    tooltipTitle,
    tooltipContent,
    tooltipCloseButtonText,
    type,
    labelMarginBottom,
    helperText,
    helperTextPlacement,
    overflowEllipsis,
    focusState,
    htmlFor,
    surface,
    calculateLabelColor,
    calculateOptionalLabelColor,
    renderSecurityCodeTooltipDialog,
  } = props;

  const _isMobileDevice = checkIfMobileDevice();

  function _renderSecurityCodeTooltip() {
    const { cardType, CreditCardIcon } = props;

    const name = cardType === 'amex' ? 'securityCodeAmex' : 'securityCode';
    const textColor =
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value;
    const regularDescription = `Most credit or debit cards have a 3-digit security code on the
    back.`;
    const AMEXDescription = `American Express cards have a 4-digit code on the front.`;

    // Brand 3.0
    const isTooltipDialog = _isMobileDevice && renderSecurityCodeTooltipDialog;

    if (cardType !== 'other' && cardType !== undefined) {
      return (
        <CVVTooltipWrapper
          cardType={cardType}
          isTooltipDialog={isTooltipDialog}
        >
          <CVVIconWrapper isTooltipDialog={isTooltipDialog}>
            <CreditCardIcon surface={surface} name={name} />
          </CVVIconWrapper>
          <Body
            color={textColor}
            size={isTooltipDialog ? 'large' : 'small'}
            primitive="span"
          >
            {cardType === 'amex' ? AMEXDescription : regularDescription}
          </Body>
        </CVVTooltipWrapper>
      );
    } else {
      return (
        <CVVTooltipWrapper
          cardType={cardType}
          isTooltipDialog={isTooltipDialog}
        >
          <ColumnWrapper isTooltipDialog={isTooltipDialog}>
            <CVVIconWrapper isTooltipDialog={isTooltipDialog}>
              <CreditCardIcon surface={surface} name="securityCode" />
            </CVVIconWrapper>
            <Body
              color={textColor}
              primitive="span"
              size={isTooltipDialog ? 'large' : 'small'}
            >
              {regularDescription}
            </Body>
          </ColumnWrapper>
          <ColumnWrapper secondCol isTooltipDialog={isTooltipDialog}>
            <CVVIconWrapper isTooltipDialog={isTooltipDialog}>
              <CreditCardIcon surface={surface} name="securityCodeAmex" />
            </CVVIconWrapper>
            <Body
              color={textColor}
              primitive="span"
              size={isTooltipDialog ? 'large' : 'small'}
            >
              {AMEXDescription}
            </Body>
          </ColumnWrapper>
        </CVVTooltipWrapper>
      );
    }
  }

  let hasTooltip =
    (tooltip && tooltip.title) ||
    tooltipTitle ||
    (tooltip && tooltip.children) ||
    tooltipContent ||
    type === 'securityCode';

  const isAndroidDevice = getOS() === 'android';
  const isAppleDevice = getOS() === 'ios';

  return (
    <LabelWrapper
      data-testid="test-label"
      id={id}
      width={width}
      focusState={focusState}
      labelMarginBottom={labelMarginBottom}
      label={label}
      overflowEllipsis={overflowEllipsis}
      helperTextPlacement={helperTextPlacement}
      helperText={helperText}
      htmlFor={htmlFor}
    >
      <Body
        id={id + '-text'}
        size="small"
        disabled={disabled}
        primitive={'p'}
        color={calculateLabelColor(disabled, surface)}
      >
        {label}
        {!required && (
          <OptionalLabel
            id={id}
            aria-label={isAndroidDevice || isAppleDevice ? 'Optional' : label}
            required={required}
            color={calculateOptionalLabelColor(disabled, surface)}
          />
        )}
        {hasTooltip && (
          <AlignTooltip>
            <Tooltip
              size="small"
              disabled={disabled}
              title={
                type === 'securityCode'
                  ? null
                  : tooltip && tooltip.title
                  ? tooltip.title
                  : tooltipTitle && tooltipTitle
              }
              surface={surface}
              ariaLabel={label + ' tooltip'}
              closeButtonText={
                tooltip && tooltip.closeButtonText
                  ? tooltip.closeButtonText
                  : tooltipCloseButtonText
                  ? tooltipCloseButtonText
                  : 'Close'
              }
              data-track={tooltip && tooltip['data-track']}
              data-track-ignore={tooltip && tooltip['data-track-ignore']}
              data-analyticstrack={tooltip && tooltip['data-analyticstrack']}
              data-clickstream={tooltip && tooltip['data-clickstream']}
            >
              {type === 'securityCode'
                ? _renderSecurityCodeTooltip()
                : tooltip && tooltip.children
                ? tooltip.children
                : tooltipContent && tooltipContent}
            </Tooltip>
          </AlignTooltip>
        )}
      </Body>
    </LabelWrapper>
  );
};

Label.defaultProps = defaultProps;
Label.propTypes = propTypes;

export default withVDSManager(Label);
