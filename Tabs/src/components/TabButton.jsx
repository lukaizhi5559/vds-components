import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';

const _calculateIndicatorColor = surface => {
  return {
    selectedColor:
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.palette.red.value,
    hoverColor: 'transparent',
  };
};

const propTypes = {
  /**
   * @ignore
   */
  label: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  indicatorFillTab: PropTypes.bool,
  /**
   * @ignore
   */
  indicatorPosition: PropTypes.oneOf(['bottom', 'top']),
  /**
   * @ignore
   */
  uniqueId: PropTypes.string,
  /**
   * @ignore
   */
  calculateIndicatorColor: PropTypes.func,
  /**
   * @ignore
   */
  focusRingRadius: PropTypes.string,
  /**
   * @ignore
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  selected: false,
  indicatorFillTab: false,
  indicatorPosition: 'bottom',
  uniqueId: undefined,
  calculateIndicatorColor: _calculateIndicatorColor,
};

const buildAccentStyles = props => {
  const { indicatorFillTab } = props;

  let styles = '';
  if (indicatorFillTab) {
    styles += `
      width: ${calculateRem(80)};
      padding-right: 1rem;
      margin-right: 0;
    `;
  } else {
    styles += `
      padding-right: 0;
    `;
  }

  return styles;
};

const StyledTabButton = styled.button`
  position: relative;
  padding: 0px;
  border: 0;
  display: inline-block;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  appearance: none;
  border-radius: 0;
  min-height: ${({ size }) => (size === 'medium' ? '44px' : '56px')};
  min-width: ${({ minWidth }) => minWidth};
  width: ${({ width }) => width};

  &:active,
  &:visited,
  &:hover {
    outline: none;
  }
  > * {
    outline: none;
  }

  > * {
    text-align: left;
    display: inline-block;
  }

  ${({ surface, focusRingRadius }) =>
    `
  &:focus:not(:hover) {
    outline: none;
    span {
      position: relative;
      height: auto;
      width: auto;
      overflow: visible;
      &::after {
        border: ${calculateRem(
          AccessibilityTokens.focusring.borderwidth.value
        )} 
          ${AccessibilityTokens.focusring.borderstyle.value}
          ${
            surface === 'dark'
              ? AccessibilityTokens.color.focusring.ondark.value
              : AccessibilityTokens.color.focusring.onlight.value
          };
        border-radius: ${calculateRem(focusRingRadius)};
        content: '';
        top: ${calculateRem(-2)};
        bottom: ${calculateRem(-3)};
        left: ${calculateRem(-3)};
        width: calc(100% + ${calculateRem(
          parseInt(AccessibilityTokens.focusring.space.offset.value) * 2
        )});
        position: absolute;
      }
    }
  }
  &:focus:not(:hover):not(:focus-visible) {
    span {
      &::after {
        display: none;
      }
    }
  }
  &::-moz-focus-inner, 
  ::-moz-focus-inner {
    border: 0;
  }
  &:focus:hover {
    outline:none;
  }
  `};
  ${({ selected, position, indicatorColor }) =>
    `
    &:hover {
      &::before {
        display: block;
        background:  ${
          selected ? indicatorColor.selectedColor : indicatorColor.hoverColor
        };
        box-shadow: none;
        content: '';
        width: 100%;
        position: absolute;
        ${position}: -5px;
        height: 4px;
        z-index: 1;
      }
    }
  `}
  ${({ selected, position, indicatorColor }) =>
    `
    &::before {
      display: block;
      background:  ${selected ? indicatorColor.selectedColor : 'none'};
      box-shadow: none;
      content: '';
      width: 100%;
      position: absolute;
      ${position}: -5px;
      height: 4px;
      z-index: 1;
    }
  `};
  border-${({ position }) => position}: 4px transparent solid;
  ${props => buildAccentStyles(props)};
`;

/**
 * @ignore
 */
const TabButton = ({
  indicatorFillTab,
  indicatorPosition,
  selected,
  label,
  children,
  uniqueId,
  minWidth,
  width,
  fillContainer,
  size,
  analyticsTrack,
  track,
  ignoreTrack,
  clickStream,
  dataTrack,
  position,
  cta,
  level,
  surface,
  calculateIndicatorColor,
  focusRingRadius,
  ariaLabel,
}) => {
  return (
    <StyledTabButton
      id={uniqueId}
      role="tab"
      aria-selected={selected}
      aria-label={ariaLabel}
      aria-controls={`tabpanel-${uniqueId}`}
      tabIndex={selected ? 0 : -1}
      indicatorFillTab={indicatorFillTab}
      position={indicatorPosition}
      selected={selected}
      minWidth={minWidth}
      width={width}
      fillContainer={fillContainer}
      size={size}
      indicatorColor={calculateIndicatorColor(surface)}
      focusRingRadius={focusRingRadius}
      surface={surface}
      data-clickstream={clickStream}
      data-analyticstrack={analyticsTrack}
      data-track={track}
      data-track-ignore={ignoreTrack}
      data-sitecat-datatrack={dataTrack}
      data-sitecat-position={position}
      data-sitecat-level={level}
      data-sitecat-cta={cta}
    >
      {children}
    </StyledTabButton>
  );
};

TabButton.propTypes = propTypes;
TabButton.defaultProps = defaultProps;

export default TabButton;
