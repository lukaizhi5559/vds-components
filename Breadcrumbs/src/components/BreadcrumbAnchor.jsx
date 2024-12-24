import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';

const propTypes = {
  children: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  target: PropTypes.oneOf(['', '_blank', '_self', '_parent', '_top']),
  /**
   * @ignore
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  hoverState: PropTypes.bool,
  /**
   * @ignore
   */
  focusRingBorderRadius: PropTypes.string,
};

const defaultProps = {
  target: '_self',
  hoverState: true,
  focusRingBorderRadius: '2px',
};

const anchorStyles = css`
  text-decoration: none;
  transition: color 0.15s ease-out;
  position: relative;
  cursor: pointer;
  font-family: ${Fonts.VerizonNHGeTX};
  font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
  color: ${({ color }) => color};
  text-decoration: none;
  outline: none;
  ${({ focusRingBorderRadius, surface }) =>
    `
      &:focus:not(:hover) {
        outline: none;
        &::before {
          border: ${calculateRem(
            AccessibilityTokens.focusring.borderwidth.value
          )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
          border-radius: ${focusRingBorderRadius};
          content: '';
          height: calc(100% + ${calculateRem(
            parseInt(AccessibilityTokens.focusring.space.offset.value) +
              parseInt(AccessibilityTokens.focusring.borderwidth.value)
          )});
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + ${calculateRem(4)});
        }
      }
  `};
  &:active {
    color: ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.interactive.active.ondark.value
        : ColorTokens.interactive.active.onlight.value};
  }
  box-sizing: border-box;
  ${({ hoverState, surface }) =>
    hoverState &&
    `
    &:hover:not(:active) {
      &::before {
        background: ${
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : ColorTokens.elements.primary.onlight.value
        };
        position: absolute;
        box-shadow: none;
        content: '';
        height: 1px;
        bottom: 0;
        width: 100%;
        z-index: 1;
      }
    }
  `};
`;

const StyledAnchor = styled.a`
  ${anchorStyles};
`;

const StyledButton = styled.button`
  ${anchorStyles};
  background: transparent;
  border: none;
  padding: 0;
`;

/**
 * @ignore
 */
const BreadcrumbAnchor = props => {
  const {
    href,
    target,
    children,
    ariaLabel,
    surface,
    color,
    hoverState,
    'data-analyticstrack': analyticsTrack,
    'data-track': track,
    'data-track-ignore': trackIgnore,
    'data-clickstream': clickStream,
    focusRingBorderRadius,
  } = props;

  const _renderColor = () => {
    if (color) return color;
    else if (surface === 'dark') {
      return ColorTokens.elements.primary.ondark.value;
    } else return ColorTokens.elements.primary.onlight.value;
  };

  function _onClick(e) {
    if (e.type === 'click') {
      e.currentTarget.blur();
    }
    props.onClick && props.onClick(e);
  }

  let StyledBreadcrumbAnchor = href ? StyledAnchor : StyledButton;

  return (
    <StyledBreadcrumbAnchor
      href={href}
      target={target}
      aria-label={ariaLabel}
      role={href ? 'link' : 'button'}
      tabIndex={0}
      onClick={_onClick}
      color={_renderColor()}
      surface={surface}
      hoverState={hoverState}
      data-analyticstrack={analyticsTrack}
      data-track={track}
      data-track-ignore={trackIgnore}
      data-clickstream={clickStream}
      focusRingBorderRadius={focusRingBorderRadius}
    >
      {children}
    </StyledBreadcrumbAnchor>
  );
};

BreadcrumbAnchor.propTypes = propTypes;
BreadcrumbAnchor.defaultProps = defaultProps;

export default BreadcrumbAnchor;
