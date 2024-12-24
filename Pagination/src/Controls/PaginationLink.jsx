import React from 'react';
import PropTypes from 'prop-types';
import { sharedDefaultProps, sharedPropTypes } from '../utilities';
import styled, { css } from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { TypographyTokens } from '@vds-tokens/typography';
import { Fonts } from '@vds-core/typography';
import { calculateRem } from '@vds-core/utilities';

const propTypes = {
  /**
   * @ignore
   */
  ...sharedPropTypes,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  linkStyles: PropTypes.object,
  /**
   * Border radius for focus ring
   */
  focusBorderRadius: PropTypes.string,
};

const defaultProps = {
  ...sharedDefaultProps,
  children: null,
  className: null,
  linkStyles: null,
};

const colorLink = ColorTokens.elements.primary.onlight.value;
const colorLinkInverted = ColorTokens.elements.primary.ondark.value;
const fontWeightBold = TypographyTokens.fontweight.bold.value;
const fontFamily = Fonts.VerizonNHGeTX;
const fontSizeDesktop = TypographyTokens.fontsize.body[12].value;
const lineHeightDesktop = TypographyTokens.lineheight.body[16].value;

const buttonStyles = css`
  background-color: transparent;
  border: none;
  color: ${({ surface }) =>
    surface === 'dark' ? colorLinkInverted : colorLink};
  cursor: pointer;
  display: block;
  font-family: ${fontFamily};
  font-size: ${fontSizeDesktop}; // TODO: Viewport awareness?
  line-height: ${lineHeightDesktop};
  text-decoration: none;
  width: 100%;
  position: relative;
  ${({ focusBorderRadius, surface, active }) =>
    `
    &:focus:not(:hover) {
        outline: none;
        span {
          &::after {
            border: ${calculateRem(
              AccessibilityTokens.focusring.borderwidth.value
            )} ${AccessibilityTokens.focusring.borderstyle.value};
            border-color: ${
              surface === 'dark'
                ? AccessibilityTokens.color.focusring.ondark.value
                : AccessibilityTokens.color.focusring.onlight.value
            };
            border-radius: ${focusBorderRadius};
            content: '';
            position: absolute;
            height: 20px;
            width: calc(100% + ${calculateRem(
              parseInt(AccessibilityTokens.focusring.space.offset.value) +
                parseInt(AccessibilityTokens.focusring.borderwidth.value)
            )});
          }
        }
      }
  `}

  &:active,
  &:hover {
    outline: none;
    span {
      outline: none;
    }
  }

  ${({ active }) =>
    active &&
    `
    cursor: auto;
    outline: none;
    font-weight: ${fontWeightBold};
  `};
`;

const StyledLink = styled.a`
  ${buttonStyles};
`;

const StyledButton = styled.button`
  ${buttonStyles};
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

/**
 * @ignore
 */
const PaginationLink = props => {
  const {
    baseUrl,
    children,
    className,
    selectedPage,
    linkStyles,
    onClick,
    pageNumber: pageNumberProp,
    cta,
    position,
    level,
    dataTrack,
    surface,
    focusBorderRadius,
    total,
  } = props;

  function _onClick(e) {
    if (e.key === 'Enter' || e.type === 'click' || e.key === ' ') {
      e.preventDefault();
      onClick(pageNumberProp, e);
    }
  }

  let isActive = selectedPage === pageNumberProp;

  const baseUrlString =
    baseUrl && pageNumberProp && !isActive
      ? baseUrl(pageNumberProp)
      : undefined;
  //there is only a predefined aria label on first and last elements
  let ButtonBase = baseUrl ? StyledLink : StyledButton;
  return (
    <ButtonBase
      active={isActive}
      surface={surface}
      focusBorderRadius={focusBorderRadius}
      aria-label={
        props['aria-label']
          ? props['aria-label']
          : isActive
          ? `Page ${pageNumberProp} of ${total}`
          : `Go to Page ${pageNumberProp} of ${total}`
      }
      className={className}
      href={baseUrlString}
      role={isActive ? 'none' : baseUrl ? 'link' : 'button'}
      style={linkStyles}
      onClick={isActive ? undefined : !baseUrlString ? _onClick : baseUrl}
      onKeyDown={isActive ? undefined : !baseUrlString ? _onClick : baseUrl}
      tabIndex={0}
      aria-current={isActive}
      data-sitecat-cta={cta}
      data-sitecat-position={position}
      data-sitecat-level={level}
      data-sitecat-datatrack={dataTrack}
    >
      {children}
      <ScreenReaderText aria-live={isActive && 'assertive'}>
        {isActive && `Page ${pageNumberProp} selected`}
      </ScreenReaderText>
    </ButtonBase>
  );
};

PaginationLink.propTypes = propTypes;
PaginationLink.defaultProps = defaultProps;

export default PaginationLink;
