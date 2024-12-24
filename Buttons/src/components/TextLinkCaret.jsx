import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Fonts } from '@vds-core/typography';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';

// Use left-caret-bold.svg
const LeftCaretBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M14.1,20.7l-9.9-9.9l9.9-9.9l2.5,2.5l-7.3,7.3l7.3,7.3L14.1,20.7z" />
  </svg>
);

// Use right-caret-bold.svg
const RightCaretBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M7.6,20.7L5,18.1l7.3-7.3L5,3.5l2.5-2.5l9.9,9.9L7.6,20.7z" />
  </svg>
);

// Style properties
const colorDefault = ColorTokens.elements.primary.onlight.value;
const colorInverted = ColorTokens.elements.primary.ondark.value;
const colorDisabled = ColorTokens.interactive.disabled.onlight.value;
const colorDisabledInverted = ColorTokens.interactive.disabled.ondark.value;
const colorFocusRing = AccessibilityTokens.color.focusring.onlight.value;
const colorFocusRingInverted = AccessibilityTokens.color.focusring.ondark.value;

const fontweightBold = TypographyTokens.fontweight.bold.value;

const fontsizeDesktop = TypographyTokens.fontsize.body[16].value;
const fontsizeMobile = TypographyTokens.fontsize.body[16].value;
const lineheightDesktop = TypographyTokens.lineheight.body[20].value;
const lineheightMobile = TypographyTokens.lineheight.body[20].value;

const transitionDuration = '0.35s';
const transitionTimingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1.0)';
const hoverTransitionIconDistance = '4px';

const heightHitArea = calculateRem(44);
const iconPadding = calculateRem(LayoutTokens.space['1X'].value);
const iconSize = 12; // custom size type number to match specs

const positionTopIconLeft = '4px';
const positionTopIconRight = '5px';

const widthFocusRing = AccessibilityTokens.focusring.borderwidth.value;
const offsetFocusRing = AccessibilityTokens.focusring.space.offset.value;
const minwidthIconWrapper = calculateRem(12);

const focusRingSize = `calc(100% + ${calculateRem(parseInt(offsetFocusRing))})`;

const propTypes = {
  /**
   * @ignore
   * Determines viewport of button. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * Determines icon position of Caret.
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /**
   *  This function will be called when the TextLinkCaret is clicked. It will return an event.
   */
  onClick: PropTypes.func,
  /**
   *	This function will be called when keydown event fires on TextLinkCaret. It will return an event.
   */
  onKeyDown: PropTypes.func,
  /**
   *  This string will be applied to the href attribute.
   */
  href: PropTypes.string,
  /**
   *  TextLinkCaret can no longer receive tab navigation focus if -1 is passed.
   */
  tabIndex: PropTypes.number,
  /**
   * This will be applied to the role attribute for screen reading capabilities
   */
  role: PropTypes.oneOf(['link', 'button']),
  /**
   *  TextLinkCaret will be disabled if disabled prop is passed.
   */
  disabled: PropTypes.bool,
  /**
   * Item to render as text link.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   */
  calculateActiveColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateLetterSpacing: PropTypes.func,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
  /**
   * @ignore
   */
  dataLoc: PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-level': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-position': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-datatrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-cta': PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  focusRingBorderRadius: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const _calculateActiveColor = surface => {
  return surface === 'dark'
    ? ColorTokens.interactive.active.ondark.value
    : ColorTokens.interactive.active.onlight.value;
};

const _calculateLetterSpacing = viewport => {
  return calculateRem(TypographyTokens.letterspacing.wide.value);
};

const defaultProps = {
  viewport: 'desktop',
  iconPosition: 'right',
  disabled: false,
  surface: 'light',
  role: 'link',
  onClick: () => {},
  onKeyDown: () => {},
  calculateActiveColor: _calculateActiveColor,
  calculateLetterSpacing: _calculateLetterSpacing,
  focusRingBorderRadius: '2px',
};

const Wrapper = styled.span`
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-flex;
  &:focus {
    outline: none;
  }
`;

const StyledAnchor = styled.a`
  align-content: center;
  align-items: ${({ iconPosition }) =>
    iconPosition && iconPosition === 'right' ? 'center' : 'flex-start'};
  background-color: transparent;
  background-image: none;
  border: 0;
  color: ${colorDefault};
  cursor: pointer;
  display: flex;
  font-size: ${({ viewport }) =>
    viewport === 'desktop' ? fontsizeDesktop : fontsizeMobile};
  font-family: ${Fonts.VerizonNHGeDS};
  font-style: normal;
  font-weight: ${fontweightBold};
  letter-spacing: ${({ viewport, calculateLetterSpacing }) =>
    calculateLetterSpacing(viewport)};
  line-height: ${({ viewport }) =>
    viewport === 'desktop' ? lineheightDesktop : lineheightMobile};
  position: relative;
  text-decoration: none;
  touch-action: manipulation;
  width: fit-content;
  pointer-events: auto; /* to ensure this click event works when used in a TileContainer */

  * {
    pointer-events: none; /* pointer-events is added here to ensure the correct item is returned by the onclick handler */
    outline: none;
  }

  &:active {
    outline: none;
    color: ${({ colorActive }) => colorActive};
  }

  &:active svg path {
    fill: ${({ colorActive }) => colorActive};
  }

  ${({ surface, colorActiveInverted }) =>
    surface === 'dark' &&
    `
    color: ${colorInverted};
    &:active {
      color: ${colorActiveInverted};
    }

    &:active svg path {
      fill: ${colorActiveInverted};
    }
  `};

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    cursor: not-allowed;
    color: ${colorDisabled};
  `};

  ${({ disabled, surface }) =>
    disabled &&
    surface === 'dark' &&
    `
    color: ${colorDisabledInverted};
  `};

  ${({ surface, focusRingBorderRadius }) =>
    `
     &:focus:not(:hover)  {
      outline: none;
      &::before {
        border: ${calculateRem(widthFocusRing)} ${
      AccessibilityTokens.focusring.borderstyle.value
    } ${surface === 'dark' ? colorFocusRingInverted : colorFocusRing};
        content: '';
        height: ${focusRingSize};
        border-radius: ${focusRingBorderRadius};
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: ${focusRingSize};
      }
    }
    &:focus:not(:hover):not(:focus-visible) {
      &:before {
        display: none; // Only display focus state on keyboard focus, not when radio button is clicked
      }
    }
    &:focus {
      outline: none;
    }
  `};

  ${({ iconPosition }) =>
    ` 
      svg {
        transform: translateX(0);
        transition: transform ${transitionTimingFunction} ${transitionDuration};
      }
      &:hover {
        outline: none;
      }
      &:hover svg {
        position: relative;
        transform: ${
          iconPosition === 'right'
            ? `translateX(${hoverTransitionIconDistance})`
            : `translateX(-${hoverTransitionIconDistance})`
        };
        transition: transform ${transitionDuration} ${transitionTimingFunction};
      }

  `};
`;

const HitArea = styled.span`
  cursor: pointer;
  display: inline-block;
  height: ${heightHitArea};
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const AnchorContentWrapper = styled.span`
  display: inline-block;
  pointer-events: none;
`;

const TextWrapper = styled.span`
  display: inline-flex;
  pointer-events: none;
`;

const InlineWrapper = styled.span`
  display: inline-flex;
`;

const IconWrapper = styled.span`
  pointer-events: none;
  display: inline-flex;
  position: relative;
  height: ${lineheightDesktop};
  min-width: ${minwidthIconWrapper};
  padding-left: ${iconPadding};
  padding-right: ${iconPadding};
  svg {
    position: relative;
    top: ${({ iconPosition }) =>
      iconPosition === 'right' ? positionTopIconRight : positionTopIconLeft};
  }
`;

const IconSVGWrapper = styled.div`
  display: flex;
  min-width: ${({ iconSize }) => calculateRem(iconSize)};
  min-height: ${({ iconSize }) => calculateRem(iconSize)};
  width: ${({ iconSize }) => calculateRem(iconSize)};
  height: ${({ iconSize }) => calculateRem(iconSize)};
  ${({ tabIndex }) =>
    tabIndex < 0 &&
    `
  outline: none;
  pointer-events: none;
`};
  &:active,
  &:focus {
    outline: none;
  }
  ${({ iconColor }) => css`
    svg {
      width: ${({ iconSize }) => calculateRem(iconSize)};
      height: ${({ iconSize }) => calculateRem(iconSize)};
      path {
        fill: ${iconColor};
      }
    }
  `}
`;

function iconColor(disabled, surface) {
  let iconColor = surface === 'dark' ? colorInverted : colorDefault;
  if (disabled) {
    iconColor = surface === 'dark' ? colorDisabledInverted : colorDisabled;
  }
  return iconColor;
}

function _formatChildren(childArray) {
  let textWithoutCaret = '';
  childArray.map((item, index) => {
    if (index !== childArray.length - 1) {
      textWithoutCaret += item + ' ';
    }
  });
  return textWithoutCaret;
}

function checkForNode(children) {
  let lastIndex = children.length - 1, //number of last index in child array
    lastChild = children[lastIndex], //last child in child array
    isNode = typeof children[lastIndex] !== 'string', //if last child is node
    isString = typeof children === 'string', //if children are a string
    firstNodes = [];

  if (children.length === undefined || children.length <= 1)
    return { childArray: [], textWithCaret: children }; //if only one child put with caret and return

  if (isNode || !isString) {
    //if the last child is node or mixture put last with the caret
    children.map((child, index) => {
      //add all children to first nodes except the last one
      if (index !== lastIndex) firstNodes[index] = child;
    });
    return { childArray: firstNodes, textWithCaret: lastChild };
  }

  // To account for trailing space in the last word breaking the styling of caretand filter our all extra spaces in the textLink
  let trimmed = children.trim();
  // If all children are "strings", put last word with caret
  let childArray = trimmed.split(' ');
  let textWithCaret = childArray[childArray.length - 1];
  return {
    childArray: _formatChildren(childArray),
    textWithCaret: textWithCaret,
  };
}

function _renderWithIcon(props, iconColor) {
  const { iconPosition, children } = props;
  let childArray = children ? checkForNode(children).childArray : [];
  let textWithCaret = children ? checkForNode(children).textWithCaret : '';
  return (
    <Fragment>
      <InlineWrapper role="text">
        {iconPosition === 'left' && (
          <IconWrapper
            tabIndex={-1}
            iconPosition={iconPosition}
            aria-hidden={true}
          >
            <IconSVGWrapper
              tabIndex={-1}
              aria-hidden={true}
              aria-label="left-caret-bold icon"
              iconColor={iconColor}
              iconSize={iconSize}
            >
              {LeftCaretBoldIcon}
            </IconSVGWrapper>
          </IconWrapper>
        )}
        <AnchorContentWrapper tabIndex={-1} aria-hidden={true}>
          {childArray}
          <TextWrapper>
            {textWithCaret}
            {iconPosition === 'right' && (
              <IconWrapper
                tabIndex={-1}
                iconPosition={iconPosition}
                aria-hidden={true}
              >
                <IconSVGWrapper
                  tabIndex={-1}
                  aria-hidden={true}
                  iconColor={iconColor}
                  iconSize={iconSize}
                  aria-label="right-caret-bold icon"
                >
                  {RightCaretBoldIcon}
                </IconSVGWrapper>
              </IconWrapper>
            )}
          </TextWrapper>
        </AnchorContentWrapper>
      </InlineWrapper>
    </Fragment>
  );
}

const TextLinkCaret = props => {
  const {
    iconPosition,
    dataLoc,
    viewport,
    calculateActiveColor,
    calculateLetterSpacing,
    focusRingBorderRadius,
    disabled,
    tabIndex,
    role,
  } = props;

  const colorActive = calculateActiveColor(false);
  const colorActiveInverted = calculateActiveColor(true);
  const viewportToUse = viewport === 'tablet' ? 'desktop' : viewport;

  const handleKeyDown = e => {
    props.onKeyDown && props.onKeyDown(e);
    if (e.key === 'Enter' || e.key === ' ') {
      props.onClick && props.onClick();
    }
  };

  return (
    <StyledAnchor
      {...props}
      data-testid="TextLinkCaret"
      data-loc={dataLoc}
      href={props.href}
      disabled={props.disabled}
      surface={props.surface}
      viewport={viewportToUse}
      role={role}
      aria-disabled={props.disabled}
      aria-label={
        props.ariaLabel
          ? props.ariaLabel
          : props.children && typeof props.children === 'string'
          ? props.children
          : 'Text Link Caret'
      }
      iconPosition={iconPosition}
      tabIndex={disabled ? -1 : tabIndex ? tabIndex : 0}
      colorActive={colorActive}
      colorActiveInverted={colorActiveInverted}
      calculateLetterSpacing={calculateLetterSpacing}
      focusRingBorderRadius={focusRingBorderRadius}
      onKeyDown={handleKeyDown}
    >
      <HitArea tabIndex={-1} aria-hidden={true} />
      <Wrapper tabIndex={-1} aria-hidden={true}>
        {_renderWithIcon(props, iconColor(props.disabled, props.surface))}
      </Wrapper>
    </StyledAnchor>
  );
};

TextLinkCaret.defaultProps = defaultProps;
TextLinkCaret.propTypes = propTypes;

export default withVDSManager(TextLinkCaret);
