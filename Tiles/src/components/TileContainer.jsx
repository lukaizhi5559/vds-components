import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import {
  calculateRem,
  checkIfMobileDevice,
  generateUUID,
  aspectRatioPolyfill,
  getOS,
  getBrowser,
} from '@vds-core/utilities';

const propTypes = {
  /**
   * Sets the inside padding for the component.
   */
  padding: PropTypes.string,
  /**
   * Sets the background color for the component.
   */
  backgroundColor: PropTypes.string,
  /**
   * Sets the height of the component.
   * @note Can not be used in conjunction with aspect ratio.
   */
  height: PropTypes.string,
  /**
   * Sets the width for the component. Accepts a pixel value.
   */
  width: PropTypes.string,
  /**
   * This controls the aspect ratio for the component.
   * @note If a height is defined, this property is ignored.
   */
  aspectRatio: PropTypes.string,
  /**
   * If true, a border is rendered around the container.
   */
  showBorder: PropTypes.bool,
  /**
   * Accepts a node value to render the children.
   */
  children: PropTypes.node,
  /**
   * Callback function executed when TileContainer is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Tells the component the tone of the surface on which it lives.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Applies a background color if backgroundImage prop fails or has trouble loading.
   */
  imageFallbackColor: PropTypes.oneOf(['light', 'dark']),
  /**
   * Determines if there is a drop shadow or not.
   */
  showDropShadow: PropTypes.bool,
  /**
   * This takes an image source url and applies it as a background image.
   */
  backgroundImage: PropTypes.string,
  /**
   * Allows to specify the background for the component.
   */
  background: PropTypes.string,
  /**
   * ID of component.
   */
  id: PropTypes.string,
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
   * Link to redirect to when the tilelet is clicked on. If provided, will render the tile as an anchor tag
   */
  href: PropTypes.string,
  /**
   * If provided, will specify where to open the link
   * @note href must be provided in order to use this prop
   */
  target: PropTypes.string,
  /**
   * If provided, will allow the screenreader to read tilelet
   * Currently only used for Tilelet
   */
  ariaLabel: PropTypes.string,
  /**
   * If provided, will override the role of tileContainer
   */
  role: PropTypes.string,
  /**
   * If provided, will specify the tabIndex for tileContainer
   */
  tabIndex: PropTypes.number,
};

const defaultProps = {
  backgroundColor: 'gray',
  imageFallbackColor: 'light',
  surface: 'light',
  width: '100%',
  onClick: undefined,
  showDropShadow: false,
  showBorder: false,
  padding: '30px',
  backgroundImage: undefined,
  background: undefined,
  aspectRatio: '1:1',
  tabIndex: 0,
  target: '_self',
};

const _calculateRatio = aspectRatio =>
  aspectRatio ? aspectRatio.replace(':', '/') : undefined;

const _backgroundColor = (backgroundColor, surface) => {
  if (backgroundColor === 'white') {
    return ColorTokens.background.primary.light.value;
  } else if (backgroundColor === 'black') {
    return ColorTokens.background.primary.dark.value;
  } else if (
    (backgroundColor === 'gray' ||
      backgroundColor === ColorTokens.background.secondary.light.value) &&
    surface === 'light'
  ) {
    return ColorTokens.background.secondary.light.value;
  } else if (
    (backgroundColor === 'gray' ||
      backgroundColor === ColorTokens.background.secondary.dark.value) &&
    surface === 'dark'
  ) {
    return ColorTokens.background.secondary.dark.value;
  } else {
    return backgroundColor;
  }
};

const OuterButton = styled.div`
  outline: none;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: transparent;
  ${({ isInteractive, surface, hovered }) =>
    isInteractive &&
    !hovered &&
    `
  &:focus-visible:not(:active, :hover) {
    &::before { 
      border: ${calculateRem(
        AccessibilityTokens.focusring.borderwidth.value
      )} ${AccessibilityTokens.focusring.borderstyle.value};
      border-color: ${
        surface === 'light'
          ? AccessibilityTokens.color.focusring.onlight.value
          : AccessibilityTokens.color.focusring.ondark.value
      };
      border-radius: 10px;
      content: '';
      left: 50%; 
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 6px);
      height: calc(100% + 6px);
    }
    }
`}
  &:active {
    ${({ isInteractive }) => isInteractive && `cursor: pointer;`}
    &::before {
      ${({ mobile, isInteractive, surface, active }) =>
        isInteractive &&
        !mobile &&
        active &&
        `
        content: '';
        left: 50%; 
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: ${
          surface === 'light'
            ? `${ColorTokens.palette.white.value}`
            : `${ColorTokens.palette.black.value}`
        };
        opacity: 30%;
        z-index: 1;
      `}
    }
  }
`;

const OuterMostWrapper = styled.div`
  outline: none;
  position: relative;
  transition: 0.2s;
  width: ${({ width }) => width};
  ${({ height }) => (height === '100%' ? 'height: 100%' : '')};
  ${({ isInteractive, mobile, surface, showBorder, hovered, showDropShadow }) =>
    isInteractive &&
    hovered &&
    !mobile &&
    `
      transform: scale(1.02) translate(0, 0) perspective(1px);
      cursor: pointer;
      z-index: 2;
      ${
        surface === 'light' && showDropShadow
          ? css`
              > div:last-of-type {
                box-shadow: 0 16px 24px rgba(0, 0, 0, 0.04);
              }
            `
          : ''
      }
      
  `}
`;

const InnerTileContainer = styled.div`
  outline: none;
  display: flex;
  width: ${({ width }) => width};
  ${({ padding, showBorder, isSafari, grouped }) =>
    grouped &&
    isSafari &&
    `
      height: calc(100% - ${padding} - ${padding} - ${
      showBorder ? '2px' : '0px'
    })
  `};
`;

const OuterTileContainerStyles = css`
  display: flex;
  ${({ backgroundImage }) =>
    backgroundImage !== undefined && backgroundImage !== ''
      ? `background-image: ${
          backgroundImage === 'none' ? 'none' : `url(${backgroundImage})`
        };`
      : ``}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: unset;
  background-color: ${({
    backgroundColor,
    surface,
    imageFallbackColor,
    backgroundImage,
  }) =>
    backgroundImage
      ? imageFallbackColor === 'light'
        ? ColorTokens.background.primary.light.value
        : ColorTokens.background.primary.dark.value
      : _backgroundColor(backgroundColor, surface)};
  border: ${({ surface, showBorder }) =>
    showBorder
      ? surface === 'light'
        ? `1px solid ${ColorTokens.elements.lowcontrast.onlight.value}`
        : `1px solid ${ColorTokens.elements.lowcontrast.ondark.value}`
      : 'none'};
  background: ${({ background }) => background};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  ${({ aspectRatio, height }) =>
    !height &&
    `
      aspect-ratio: ${_calculateRatio(aspectRatio)};
      ${aspectRatioPolyfill(_calculateRatio(aspectRatio))};
    `};

  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  outline: none;
  box-shadow: ${({ surface, showBorder, showDropShadow }) =>
    showDropShadow && surface === 'light'
      ? '0 16px 24px rgba(0, 0, 0, 0.02)'
      : undefined};
`;

const OuterTileContainer = styled.div`
  ${OuterTileContainerStyles};
  text-align: left;
  pointer-events: none; // Have to set none here so the tile is clickable
`;
class TileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      hovered: null,
    };
    this.tileContainerId = props.id ? props.id : generateUUID();
  }

  isSafari = getBrowser() === 'safari';

  _setHovered = state => this.setState({ hovered: state });

  _onKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      let tc =
        document &&
        document.getElementById(`OuterButton-${this.tileContainerId}`);
      if (tc === e.target) this._onClick(e);
    }
  };

  _onMouseDown = e => {
    const element =
      document &&
      document.getElementById(`OuterButton-${this.tileContainerId}`);

    if (!element) return;
    if (e.target === element && !this.state.active) {
      this.setState({ active: true });
    }
  };
  _onMouseUp = () => {
    if (this.state.active) this.setState({ active: false });
  };

  _onClick = e => {
    const { onClick, href, target } = this.props;
    if (onClick) {
      onClick(e);
    } else if (href) {
      window.open(href, target);
    }
  };

  render() {
    const {
      backgroundColor,
      imageFallbackColor,
      background,
      height,
      width,
      aspectRatio,
      children,
      surface,
      onClick,
      padding,
      backgroundImage,
      showBorder,
      showDropShadow,
      tabIndex,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
      href,
      target,
      ariaLabel,
      role,
      grouped,
    } = this.props;

    const mobile = checkIfMobileDevice();
    const isAndroidDevice = getOS() === 'android';
    const isInteractive = onClick || href;
    let _tabIndex;

    if (isInteractive) {
      _tabIndex = tabIndex;
    } else {
      _tabIndex = isAndroidDevice ? undefined : -1; // Has to be undefined for android so it doesn't have the focus on the tile
    }

    return (
      <OuterMostWrapper
        showBorder={showBorder}
        surface={surface}
        active={this.state.active}
        mobile={mobile}
        isInteractive={isInteractive}
        width={width}
        {...(!mobile && {
          onMouseEnter: () => this._setHovered(true),
          onMouseLeave: () => this._setHovered(false),
        })}
        hovered={this.state.hovered}
        showDropShadow={showDropShadow}
        height={height}
      >
        {/**
         * Note: have to render outerTileContainer and InnerTileContainer as siblings to account for nested interactive elements
         * Since they are siblings, accessibility guidlines are met regarding no nested interactive elements
         */}
        <OuterButton
          role={role ? role : onClick ? 'button' : href ? 'link' : undefined}
          onClick={onClick ? this._onClick : undefined}
          aria-label={ariaLabel}
          tabIndex={_tabIndex}
          href={href}
          {...(!!href && { target: target })}
          onKeyDown={this._onKeyDown}
          surface={surface}
          isInteractive={isInteractive}
          active={this.state.active}
          mobile={mobile}
          id={`OuterButton-${this.tileContainerId}`}
          data-track={track}
          data-track-ignore={trackIgnore}
          data-analyticstrack={analyticsTrack}
          data-clickstream={clickStream}
          onMouseDown={this._onMouseDown}
          onMouseUp={this._onMouseUp}
          hovered={this.state.hovered}
        >
          {!onClick && ariaLabel ? ariaLabel : ''}
        </OuterButton>
        <OuterTileContainer
          active={this.state.active}
          isInteractive={isInteractive}
          id={this.tileContainerId}
          mobile={mobile}
          backgroundColor={backgroundColor}
          imageFallbackColor={imageFallbackColor}
          height={height}
          width={width}
          aspectRatio={aspectRatio ? aspectRatio : '1:1'}
          padding={padding}
          surface={surface}
          backgroundImage={backgroundImage}
          background={background}
          showBorder={showBorder}
          showDropShadow={showDropShadow}
        >
          <InnerTileContainer
            id={`inner-${this.tileContainerId}`}
            width={width}
            showBorder={showBorder}
            padding={padding}
            isSafari={this.isSafari}
            grouped={grouped}
          >
            {children}
          </InnerTileContainer>
        </OuterTileContainer>
      </OuterMostWrapper>
    );
  }
}

TileContainer.propTypes = propTypes;
TileContainer.defaultProps = defaultProps;

export default TileContainer;
