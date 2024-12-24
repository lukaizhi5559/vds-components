import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  calculateRem,
  withVDSManager,
  hexToRgba,
  generateUUID,
} from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { BadgeIndicator } from '@vds-core/badges';
import badgeIndictorOffSetConfig from '../util/badgeIndictorOffSetConfig';

// Style properties
const focusInset = '1px';
const focusOffset = AccessibilityTokens.focusring.space.offset.value;
const focusringWidth = AccessibilityTokens.focusring.borderwidth.value;
const focusringStyle = AccessibilityTokens.focusring.borderstyle.value;

const propTypes = {
  /**
   * Determines the type of button based on the contrast
   */
  kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
  /**
   * sets the size of button icon and icon
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['large', 'small']),
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * This prop is to provide the surface that the icon button will be placed on.
   * This helps maintain proper color contrast ratio.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Applies background inside icon button determining the surface type
   */
  surfaceType: PropTypes.oneOf(['colorFill', 'media']),
  /**
   * If set to true, the button icon will not have a border
   */
  hideBorder: PropTypes.bool,
  /**
   * Applies focus ring border on recieving focus
   */
  focusBorderPosition: PropTypes.oneOf(['inside', 'outside']),
  /**
   * If provided, the button icon will have a box shadow
   */
  floating: PropTypes.bool,
  /**
   * Used to move the icon inside the button in both x and y axis
   */
  iconOffset: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  /**
   * If true, container shrinks to fit the size of the icon for kind === 'ghost'.
   */
  fitToIcon: PropTypes.bool,
  /**
   * If true, icon button will render as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Button icon can no longer receive tab navigation focus if -1 is passed.
   */
  tabIndex: PropTypes.number,
  /**
   * Aria label used for the button.
   */
  ariaLabel: PropTypes.string,
  /**
   * Hides content from assistive technology when set to true
   */
  ariaHidden: PropTypes.bool,
  /**
   * If provided, used as string that defines the element's aria role for accessibility.
   */
  role: PropTypes.string,
  /**
   * If provided, button icon primitive becomes an anchor, with the given href attribute.
   */
  href: PropTypes.string,
  /**
   * Renders VDS icon inside the button
   */
  renderIcon: PropTypes.func.isRequired,
  /**
   * Renders seleted state icon inside the button, when it is selectable.
   */
  renderSelectedIcon: PropTypes.func,
  /**
   * Callback function executed when button icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * If selectable is true, callback function executed on toggle of button icon.
   */
  onChange: PropTypes.func,
  /**
   * If passed, callback function executed on keyDown of button icon.
   */
  onKeyDown: PropTypes.func,
  /**
   * If set to on, the button is selectable.
   */
  selectable: PropTypes.bool,
  /**
   * If true, button will be rendered as selected, when it is selectable.
   */
  selected: PropTypes.bool,
  /**
   * Allows a unique ID to be passed to the input element, when it is selectable..
   */
  inputId: PropTypes.string,
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * If true, button icon will render with badge indicator.
   */
  showBadgeIndicator: PropTypes.bool,
  /**
   * Config object for badge indicator.
   */
  badgeIndicator: PropTypes.shape({
    kind: PropTypes.oneOf(['simple', 'numbered']),
    fillColor: PropTypes.oneOf([
      'red',
      'yellow',
      'green',
      'orange',
      'blue',
      'grayHighContrast',
      'grayLowContrast',
      'black',
      'white',
    ]),
    borderColor: PropTypes.shape({
      onlight: PropTypes.string,
      ondark: PropTypes.string,
    }),
    hideBorder: PropTypes.bool,
    hideDot: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    containerSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dotSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'XLarge', '2XLarge']),
    padding: PropTypes.shape({
      vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    id: PropTypes.string,
    maximumDigits: PropTypes.oneOf([
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'none',
    ]),
    leadingCharacter: PropTypes.string,
    trailingText: PropTypes.string,
    offset: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    expandDirection: PropTypes.oneOf(['right', 'center', 'left']),
  }),
};

const defaultProps = {
  kind: 'ghost',
  size: 'large',
  surface: 'light',
  surfaceType: 'colorFill',
  hideBorder: true,
  focusBorderPosition: 'outside',
  floating: false,
  disabled: false,
  onClick: undefined,
  onChange: undefined,
  onKeyDown: undefined,
  iconOffset: { x: 0, y: 0 },
  selectable: false,
  fitToIcon: false,
  ariaHidden: false,
  showBadgeIndicator: false,
};

const buttonIconStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  position: relative;
  touch-action: ${({ disabled }) => (disabled ? 'none' : 'manipulation')};
  pointer-events: auto; // To ensure proper functions when used on TileContainer
  pointer-events: ${({ disabled }) => disabled && 'none'};
  vertical-align: middle;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: ${({ kind, surface, surfaceType, floating }) =>
    getBackgroundColor(kind, surface, surfaceType, floating)};
  border-radius: 50%;
  border: ${({ kind, surface, surfaceType, floating, hideBorder }) =>
    getBorder(kind, surface, surfaceType, floating, hideBorder)};
  ${({ kind, floating, surface }) =>
    kind !== 'ghost' &&
    floating &&
    `
      &:not(:hover)::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        margin: -1px;
        box-shadow: ${getDropShadow(kind, surface)};
        border-radius: 50%;
        z-index: -1;
      }

      &:hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        margin: -1px;
        box-shadow: ${getDropShadowOnHover(kind, surface)};
        border-radius: 50%;
        z-index: -1;
      }
    `};

  ${({
    disabled,
    surface,
    kind,
    focusBorderPosition,
    floating,
    surfaceType,
    hideBorder,
    selected,
    fitToIcon,
    size,
    selectable,
  }) =>
    !disabled &&
    ` 
      ${selectable ? `&:focus-within:not(:hover)` : `&:focus:not(:hover)`} {
        outline: none;
        &::before {
            content: '';
            ${
              focusBorderPosition === 'inside' || (floating && kind !== 'ghost')
                ? `box-sizing: border-box;`
                : ``
            }
            border: ${calculateRem(focusringWidth)} ${focusringStyle} 
            ${
              AccessibilityTokens.color.focusring[
                kind === 'highContrast' &&
                focusBorderPosition === 'inside' &&
                surface === 'light'
                  ? `ondark`
                  : kind === 'highContrast' &&
                    focusBorderPosition === 'inside' &&
                    surface === 'dark'
                  ? 'onlight'
                  : kind === 'highContrast' && floating && surface === 'dark'
                  ? `onlight`
                  : kind === 'highContrast' && floating && surface === 'light'
                  ? `ondark`
                  : `on${surface}`
              ].value
            };
            border-radius: 50%;
            position: absolute;
            width: ${getFocusRingSize(
              focusBorderPosition,
              floating,
              kind,
              fitToIcon,
              size
            )};
            height: ${getFocusRingSize(
              focusBorderPosition,
              floating,
              kind,
              fitToIcon,
              size
            )};
           
          }
        &:focus:not(:focus-visible) {
            &::before { border: none  }
          }
      }
      &:hover {
        outline: none;
        box-shadow: 0 0 0 ${calculateRem(
          `${getSpreadRadiusValue(kind, fitToIcon, size)}`
        )} ${getAdditionalBorderColor(
      kind,
      floating,
      surface,
      surfaceType,
      false
    )};
        ${
          kind === 'ghost'
            ? `background-color: ${hexToRgba(
                ColorTokens.palette.gray44.value,
                surface == 'dark' ? 0.26 : 0.06
              )}`
            : ``
        };
      };
      ${`&:hover:active {
          box-shadow: 0 0 0 ${calculateRem(
            `${getSpreadRadiusValue(kind, fitToIcon, size)}`
          )} ${getAdditionalBorderColor(
        kind,
        floating,
        surface,
        surfaceType,
        true
      )};
        };`}
      
        -webkit-background-clip: padding-box; /* for Safari */
        background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
        transition: ease-out 0.1s;

      &:active {
          ${
            kind === 'highContrast'
              ? `
                  background-color:  ${ColorTokens.interactive.active[`on${surface}`].value};
              `
              : ``
          }

          svg path, svg polygon { fill: ${
            kind === 'highContrast'
              ? ColorTokens.elements.primary[
                  `on${surface === 'dark' ? 'light' : 'dark'}`
                ].value
              : ColorTokens.interactive.active[`on${surface}`].value
          }; 
            }
      }
      &:focus:active:not(:hover) {box-shadow: none;}
    `};
  ${({ disabled, kind, surface, floating, surfaceType, hideBorder }) =>
    disabled &&
    `
  ${
    kind === 'highContrast'
      ? `
        background-color: ${ColorTokens.interactive.disabled[`on${surface}`].value};
      `
      : ``
  }
    svg path, svg polygon { fill: 
          ${
            disabled && kind === 'highContrast'
              ? ColorTokens.elements.primary[
                  `on${surface === 'dark' ? 'light' : 'dark'}`
                ].value
              : disabled && kind === 'lowContrast'
              ? surface === 'dark' && surfaceType === 'colorFill'
                ? hexToRgba(ColorTokens.palette.black.value, 0.7)
                : surface === 'dark' && surfaceType === 'media' && floating
                ? hexToRgba(ColorTokens.palette.black.value, 0.7)
                : ColorTokens.interactive.disabled[`on${surface}`].value
              : disabled
              ? ColorTokens.interactive.disabled[`on${surface}`].value
              : ColorTokens.elements.primary[`on${surface}`].value
          };
    }`};
`;

const ButtonIconContainer = styled.div`
  position: relative;
  width: ${({ size, kind, fitToIcon }) =>
    getContainerSize(size, kind, fitToIcon)};
  height: ${({ size, kind, fitToIcon }) =>
    getContainerSize(size, kind, fitToIcon)};
  ${({ floating }) => (floating ? `z-index: 0` : ``)};
`;

const BadgeIndicatorContainer = styled.div`
  position: absolute;
  z-index: 1;
  height: ${({ size }) => calculateRem(size)};
  width: ${({ size }) => calculateRem(size)};
  ${({ badgeIndicatorOffset }) => `
      left: calc(50% + ${
        badgeIndicatorOffset.x === 0 || badgeIndicatorOffset.x === '0'
          ? '0px'
          : calculateRem(badgeIndicatorOffset.x)
      });
      bottom: calc(50% + ${
        badgeIndicatorOffset.y === 0 || badgeIndicatorOffset.y === '0'
          ? '0px'
          : calculateRem(badgeIndicatorOffset.y)
      });
    `};
  display: flex;
  justify-content: ${({ expandDirection }) =>
    expandDirection === 'center'
      ? 'center'
      : expandDirection === 'left'
      ? 'end'
      : 'start'};
`;

const StyledButton = styled.button`
  ${buttonIconStyles};
`;

const StyledAnchor = styled.a`
  ${buttonIconStyles};
`;

const StyledLabel = styled.label`
  ${buttonIconStyles};
`;

const IconContainer = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ iconOffset }) => `
    left: ${isNaN(iconOffset.x) ? iconOffset.x : calculateRem(iconOffset.x)};
    bottom: ${
      isNaN(iconOffset.y) ? iconOffset.y : calculateRem(iconOffset.y)
    }`};
  pointer-events: none; /* pointer-events is added here to ensure the correct item is returned by the onclick handler */
  &:focus {
    outline: none;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  pointer-events: ${({ disabled }) =>
    disabled
      ? 'none'
      : 'auto'}; // pointer-events: auto; To ensure proper functions when used on TileContainer
  &:hover {
    cursor: pointer;
  }
`;

const HitArea = styled.span`
  height: ${calculateRem(44)};
  width: ${calculateRem(44)};
  display: inline-block;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
`;

const getBorder = (kind, surface, surfaceType, floating, hideBorder) => {
  let borderColor = 'none';
  if (!hideBorder && kind === 'lowContrast') {
    if (surfaceType === 'media' && !floating) {
      borderColor = `${calculateRem(1)} solid ${
        ColorTokens.elements.lowcontrast[`on${surface}`].value
      }`;
    }
  }
  return borderColor;
};

const getBackgroundColor = (kind, surface, surfaceType, floating) => {
  let bgColor;
  switch (kind) {
    case 'ghost':
      bgColor = 'transparent';
      break;
    case 'lowContrast':
      if (surfaceType === 'colorFill') {
        bgColor = floating
          ? surface === 'dark'
            ? ColorTokens.palette.gray20.value
            : ColorTokens.background.primary[`${surface}`].value
          : hexToRgba(
              ColorTokens.palette.gray44.value,
              surface === 'dark' ? 0.26 : 0.06
            );
      } else if (surfaceType === 'media') {
        bgColor =
          floating && surface === 'dark'
            ? ColorTokens.palette.gray20.value
            : ColorTokens.background.primary[`${surface}`].value;
      }
      break;
    case 'highContrast':
      bgColor =
        floating && surface === 'light'
          ? ColorTokens.palette.gray20.value
          : ColorTokens.elements.primary[`on${surface}`].value;
      break;
  }
  return bgColor;
};

const getContainerSize = (size, kind, fitToIcon) => {
  let sizeArray = ['large', 'small'];
  let customSize = size.length > 0 && !sizeArray.includes(size);
  let containerSize = customSize
    ? calculateRem(parseInt(size))
    : size === 'small'
    ? calculateRem(32)
    : calculateRem(44);
  if (fitToIcon && kind === 'ghost') {
    containerSize = customSize
      ? calculateRem(parseInt(size))
      : size === 'small'
      ? calculateRem(20)
      : calculateRem(24);
  }
  return containerSize;
};

const getIconColor = (kind, surface) => {
  if (['ghost', 'lowContrast'].includes(kind)) {
    return ColorTokens.elements.primary[`on${surface}`].value;
  } else {
    return surface === 'dark'
      ? ColorTokens.elements.primary.onlight.value
      : ColorTokens.elements.primary.ondark.value;
  }
};

const getSelectedIconColor = (kind, surface) => {
  if (['ghost', 'lowContrast'].includes(kind)) {
    if (surface === 'light') {
      return ColorTokens.elements.brandhighlight.value;
    } else {
      return ColorTokens.elements.primary.ondark.value;
    }
  } else {
    if (surface === 'dark') {
      return ColorTokens.elements.brandhighlight.value;
    } else {
      return ColorTokens.elements.primary.ondark.value;
    }
  }
};

const getIconSize = (kind, size) => {
  if (kind === 'ghost') {
    return size === 'small' ? 'medium' : 'large';
  } else {
    return size === 'small' ? 'small' : 'medium';
  }
};

const getFocusRingSize = (
  focusBorderPosition,
  floating,
  kind,
  fitToIcon,
  size
) => {
  let sizeArray = ['large', 'small'];
  let customSize = size.length > 0 && !sizeArray.includes(size);
  let additionalBorderSize;
  if (!customSize && fitToIcon && kind === 'ghost') {
    additionalBorderSize = size === 'small' ? 12 : 20;
  }
  const focusRingOutside = additionalBorderSize
    ? `calc(100% + ${calculateRem(parseInt(focusOffset) * 2)} + ${calculateRem(
        additionalBorderSize
      )})`
    : `calc(100% + ${calculateRem(parseInt(focusOffset) * 2)})`;

  const focusRingInside = additionalBorderSize
    ? `calc(100% - ${calculateRem(parseInt(focusInset) * 2)} + ${calculateRem(
        additionalBorderSize
      )})`
    : `calc(100% - ${calculateRem(parseInt(focusInset) * 2)})`;

  let focusRingSize =
    focusBorderPosition === 'inside' || (floating && kind !== 'ghost')
      ? focusRingInside
      : focusRingOutside;

  return focusRingSize;
};

const getSpreadRadiusValue = (kind, fitToIcon, size) => {
  let spreadRadius = 1;
  let sizeArray = ['large', 'small'];
  let customSize = size.length > 0 && !sizeArray.includes(size);
  if (!customSize && fitToIcon && kind === 'ghost') {
    spreadRadius = size === 'small' ? 7 : 11;
  }
  return spreadRadius;
};

const getAdditionalBorderColor = (
  kind,
  floating,
  surface,
  surfaceType,
  isActive
) => {
  let additionalBorderColor = '';

  switch (kind) {
    case 'ghost':
      additionalBorderColor = hexToRgba(
        ColorTokens.palette.gray44.value,
        surface == 'dark' ? 0.26 : 0.06
      );
      break;
    case 'lowContrast':
      additionalBorderColor = floating
        ? surface === 'light'
          ? ColorTokens.elements.primary.ondark.value
          : ColorTokens.palette.gray20.value
        : surfaceType === 'media'
        ? ColorTokens.elements.lowcontrast[`on${surface}`].value
        : hexToRgba(
            ColorTokens.palette.gray44.value,
            surface == 'dark' ? 0.26 : 0.06
          );
      break;
    case 'highContrast':
      additionalBorderColor = floating
        ? !isActive
          ? surface === 'light'
            ? ColorTokens.palette.gray20.value
            : ColorTokens.elements.primary[`on${surface}`].value
          : ColorTokens.interactive.active[`on${surface}`].value
        : isActive
        ? ColorTokens.interactive.active[`on${surface}`].value
        : ColorTokens.elements.primary[`on${surface}`].value;
      break;
  }
  return additionalBorderColor;
};

const getDropShadow = (kind, surface) => {
  let boxShadow = `0px 1px 10px ${hexToRgba(
    ColorTokens.palette.black.value,
    0.12
  )}, 0px 2px 4px ${hexToRgba(ColorTokens.palette.black.value, 0.05)};`;
  if (
    (kind === 'lowContrast' && surface === 'dark') ||
    (kind === 'highContrast' && surface === 'light')
  ) {
    boxShadow = `0px 1px 12px ${hexToRgba(
      ColorTokens.palette.black.value,
      0.22
    )}, 0px 2px 6px ${hexToRgba(ColorTokens.palette.black.value, 0.15)};`;
  }
  return boxShadow;
};

const getDropShadowOnHover = (kind, surface) => {
  let boxShadow = `0px 1px 11px ${hexToRgba(
    ColorTokens.palette.black.value,
    0.12
  )}, 0px 3px 5px ${hexToRgba(ColorTokens.palette.black.value, 0.05)}`;

  // for dark surface
  if (
    (kind === 'lowContrast' && surface === 'dark') ||
    (kind === 'highContrast' && surface === 'light')
  ) {
    boxShadow = `0px 1px 13px ${hexToRgba(
      ColorTokens.palette.black.value,
      0.22
    )}, 0px 3px 7px ${hexToRgba(ColorTokens.palette.black.value, 0.15)}`;
  }
  return boxShadow;
};

class ButtonIcon extends React.Component {
  state = {
    selected: this.props.selected || false,
    hovered: false, //hover state is use to check if clicking on the selectable is a real mouse event. screen readers read key events as mouse events, so if its hovered we will know if its really a click.
  };

  componentDidMount = () => {
    const { inputId, name, selected } = this.props;
    this.isControlled = selected !== undefined;
    this.checkboxId = this.inputId ? inputId : name ? name : generateUUID();
  };

  componentDidUpdate = prevProps => {
    if (prevProps && prevProps.selected !== this.props.selected) {
      this.setState(prevProps => ({ selected: !prevProps.selected }));
    }
  };

  _onClick = e => {
    e.stopPropagation();
    //reassign the target due to the hit area propogation
    let newEvent = e;
    newEvent.target = e.currentTarget;
    if (this.props.onClick) return this.props.onClick(newEvent);
  };

  _onKeyDown = e => {
    let keySelected = e.keyCode;
    let enterOrSpace = keySelected === 13 || keySelected === 32;
    if (enterOrSpace) {
      e.stopPropagation(); // need to stop propogation here because youre handling the click event.
    }
    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  handleSelect = e => {
    e.stopPropagation(); // need to stop propogation here because youre handling the click event.

    let keySelected = e.keyCode;
    let enterOrSpace = keySelected === 13 || keySelected === 32;

    if (enterOrSpace) {
      e.preventDefault();
      this.props.onKeyDown && this.props.onKeyDown(e);
    }

    if ((keySelected && enterOrSpace) || !keySelected) {
      // to return correct e.target.checked value when using enter/space keys
      if (keySelected && enterOrSpace) e.target.checked = !this.state.selected;

      this.props.onChange &&
        this.props.onChange(e, {
          name: this.props.name,
          value: this.props.value,
          selected: !this.state.selected,
        });
      !this.isControlled &&
        this.setState(prevState => ({ selected: !prevState.selected }));
    }
  };

  handleInputClick = e => {
    e.stopPropagation();
    if (this.props.disabled) return;
    if (e.type === 'click' && this.state.hovered)
      typeof document !== 'undefined' && document.activeElement.blur(); //to prevent showing focus ring when click
  };

  _renderIcon = () => {
    const { renderIcon, kind, size, surface, selectable } = this.props;

    if (!renderIcon) {
      return null;
    }
    const IconComponent = renderIcon({
      size: getIconSize(kind, size),
      color: getIconColor(kind, surface),
    });

    return IconComponent &&
      IconComponent.type &&
      (IconComponent.type.displayName === 'VDS_Icon' ||
        IconComponent.type === 'svg')
      ? IconComponent
      : null;
  };

  _renderSelectedIcon = () => {
    const { renderSelectedIcon, kind, size, surface, selectable } = this.props;

    if (!renderSelectedIcon) {
      return this._renderIcon();
    }
    const IconComponent = renderSelectedIcon({
      size: getIconSize(kind, size),
      color: getSelectedIconColor(kind, surface),
    });

    return IconComponent &&
      IconComponent.type &&
      (IconComponent.type.displayName === 'VDS_Icon' ||
        IconComponent.type === 'svg')
      ? IconComponent
      : null;
  };

  setHoverTrue = e => this.setState({ hovered: true });
  setHoverFalse = e => this.setState({ hovered: false });

  render() {
    const {
      iconOffset,
      href,
      ariaLabel,
      tabIndex,
      disabled,
      onClick,
      onKeyDown,
      renderIcon,
      renderSelectedIcon,
      kind,
      selectable,
      fitToIcon,
      size,
      surface,
      name,
      inputId,
      role,
      ariaHidden,
      showBadgeIndicator,
      badgeIndicator,
      floating,
      ...rest
    } = this.props;
    const { selected } = this.state;

    const _calculateSize = () => {
      const havingVerticalPadding =
        badgeIndicator &&
        badgeIndicator.padding &&
        badgeIndicator.padding.vertical;
      const sizeMap = {
        small: havingVerticalPadding
          ? 12 + 2 * parseInt(havingVerticalPadding)
          : 16,
        medium: havingVerticalPadding
          ? 14 + 2 * parseInt(havingVerticalPadding)
          : 18,
        large: havingVerticalPadding
          ? 16 + 2 * parseInt(havingVerticalPadding)
          : 20,
        XLarge: havingVerticalPadding
          ? 20 + 2 * parseInt(havingVerticalPadding)
          : 24,
        '2XLarge': havingVerticalPadding
          ? 24 + 2 * parseInt(havingVerticalPadding)
          : 28,
      };

      if (badgeIndicator && badgeIndicator.kind === 'simple') {
        return badgeIndicator && badgeIndicator.containerSize
          ? badgeIndicator.containerSize
          : 16;
      } else if (badgeIndicator && badgeIndicator.kind === 'simple') {
        return badgeIndicator && badgeIndicator.size
          ? sizeMap[badgeIndicator.size]
          : 16;
      } else return 16;
    };

    const ButtonIconBase = href ? StyledAnchor : StyledButton;

    return (
      <ButtonIconContainer
        kind={kind}
        fitToIcon={fitToIcon}
        size={size}
        onMouseOver={this.setHoverTrue}
        onMouseLeave={this.setHoverFalse}
        floating={floating}
      >
        {showBadgeIndicator && (
          <BadgeIndicatorContainer
            badgeIndicatorOffset={badgeIndictorOffSetConfig.getOffset(
              kind,
              size,
              badgeIndicator && badgeIndicator.offset
            )}
            size={_calculateSize()}
            expandDirection={badgeIndicator && badgeIndicator.expandDirection}
          >
            <BadgeIndicator
              surface={surface}
              {...badgeIndicator}
              ariaHidden={true}
              hideBorder={
                badgeIndicator && badgeIndicator.hideBorder !== undefined
                  ? badgeIndicator.hideBorder
                  : kind !== 'ghost'
                  ? true
                  : undefined
              }
            />
          </BadgeIndicatorContainer>
        )}
        {selectable ? (
          <StyledLabel
            {...rest}
            kind={kind}
            surface={surface}
            iconOffset={iconOffset}
            fitToIcon={fitToIcon}
            size={size}
            disabled={disabled}
            aria-label={ariaLabel ? ariaLabel : 'selectable button icon'}
            htmlFor={this.checkboxId}
            selected={selected}
            selectable={selectable}
            floating={floating}
          >
            <ToggleInput
              data-testid="test-selectable"
              type="checkbox"
              disabled={disabled}
              aria-disabled={disabled}
              checked={selected}
              aria-checked={selected}
              name={name}
              id={this.checkboxId}
              tabIndex={tabIndex ? tabIndex : 0}
              onChange={this.handleSelect}
              onKeyDown={this.handleSelect}
              onClick={this.handleInputClick}
            />
            {!disabled && <HitArea />}
            <IconContainer iconOffset={iconOffset}>
              {selected ? this._renderSelectedIcon() : this._renderIcon()}
            </IconContainer>
          </StyledLabel>
        ) : (
          <ButtonIconBase
            {...rest}
            kind={kind}
            surface={surface}
            iconOffset={iconOffset}
            fitToIcon={fitToIcon}
            size={size}
            href={href}
            role={role ? role : href ? 'link' : 'button'}
            disabled={disabled}
            tabIndex={tabIndex ? tabIndex : 0}
            aria-label={ariaLabel ? ariaLabel : 'icon'}
            aria-disabled={disabled}
            aria-hidden={ariaHidden}
            selectable={selectable}
            floating={floating}
            onKeyDown={this._onKeyDown}
            onClick={this._onClick}
          >
            {!disabled && <HitArea />}
            <IconContainer iconOffset={iconOffset}>
              {this._renderIcon()}
            </IconContainer>
          </ButtonIconBase>
        )}
      </ButtonIconContainer>
    );
  }
}

ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = defaultProps;

export default withVDSManager(ButtonIcon);
