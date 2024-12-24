import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import styled from 'styled-components';
import AnchorIconBase from './AnchorIconBase';
import TooltipPopover from './TooltipPopover';
import AnchorIcon from '../utils/AnchorIcon';
import { ColorTokens } from '@vds-tokens/color';
import { ButtonIcon } from '@vds-core/button-icons';
import Info from '@vds-core/icons/info';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
  generateUUID,
} from '@vds-core/utilities';
import { getBrowser, getOS } from '@vds-core/utilities';
import TooltipDialog from './TooltipDialog';

const propTypes = {
  /**
   * String, React Component, or HTML to rendered as the body of the tooltip.
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
   * Size of icon
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * String, React Component, or HTML to rendered as the title of the tooltip.
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore
   * Option to render icon element in brand colors
   * @note Providing a custom HEX value is also possible. Brand highlight is recommended only for use on light surfaces.
   */
  iconFillColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  getIconColor: PropTypes.func,
  /**
   * A String label that is required for accessibility, the should be very terse description ot the tooltips content.
   */
  ariaLabel: PropTypes.string,
  /**
   * Function that returns an HTML element or React component to be used as a custom anchor for the tooltip. The function is called with a React ref, and an object that will pass back aria-describedby, aria-expanded, and aria-label that has to be passed to the returned anchor element/component.
   */
  renderAnchorElement: PropTypes.func,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * Boolean that activates disabled state
   */
  disabled: PropTypes.bool,
  /**
   * Allows a unique component ID to be passed to the component as a reference for positioning other than the window object.
   */
  containerId: PropTypes.string,
  /**
   *  @ignore
   * Scrollbar prop
   */
  calculateTrackColor: PropTypes.func,
  /**
   * @ignore
   * Scrollbar prop
   */
  calculateThumbColor: PropTypes.func,
  /**
   * @ignore
   * Scrollbar prop
   */
  scrollbarBorderRadius: PropTypes.string,
  /**
   * @ignore
   * Brand 3.0 only to render the dialog styling when on mobile devices
   */
  renderTooltipDialog: PropTypes.bool,
  /**
   * @ignore
   * Brand 3.0 only. For storybook purposes
   */
  fakeMobileDevice: PropTypes.bool,
  /**
   * @ignore 3.x only
   * If provided, will render the text of the close button when on mobile/touch devices
   */
  closeButtonText: PropTypes.string,
  /**
   * @ignore 4px for 3.x and none for 1.x
   */
  tooltipBorderRadius: PropTypes.string,
  /**
   * @ignore will fetch svg icon for tooltip
   */
  tooltipIcon: PropTypes.bool,
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
};

const defaultProps = {
  surface: 'light',
  size: 'medium',
  renderTooltipDialog: true,
  //added after renaming
  title: null,
  ariaLabel: 'More information',
  renderAnchorElement: null,
  disabled: false,
  fakeMobileDevice: false,
  closeButtonText: 'Close',
  tooltipBorderRadius: '4px',
  iconFillColor: 'primary',
  tooltipIcon: false,
};

const TooltipWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0;
  outline: none;
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    cursor: default;
  `};
  pointer-events: auto;
`;

const TooltipIconWrapper = styled.span`
  display: flex;
  flex-direction: column;
  outline: none;
  z-index: ${({ clicked, showDialog, hovered }) =>
    clicked || hovered || showDialog ? 6 : 0};
`;

const CustomAnchorElementWrapper = styled.span`
  display: inline-block;
  position: relative;
  z-index: ${({ clicked, showDialog, hovered }) =>
    clicked || hovered || showDialog ? 6 : 0};
`;

const HitArea = styled.span`
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 50%;
  height: ${calculateRem(44)};
  width: ${calculateRem(44)};
  z-index: 1;
  outline: none;
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

const AnchorIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  background: none;
  color: inherit;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition-delay: 0.2s;
  overflow: visible;
  left: ${calculateRem(4)};
  position: relative;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  button {
    ${({ surface }) =>
      surface === 'light'
        ? `&:hover {
        box-shadow: 0 0 0 0.188rem rgba(111, 113, 113, 0.06);
      }`
        : `&:hover {
        box-shadow: 0 0 0 0.188rem rgba(111, 113, 113, 0.26);
      }`}

    ${({ surface }) =>
      surface === 'light'
        ? `&:hover:active {
        box-shadow: 0 0 0 0.188rem rgba(111, 113, 113, 0.06);
      }`
        : `&:hover:active {
        box-shadow: 0 0 0 0.188rem rgba(111, 113, 113, 0.26);
      }`}
  }

  button:focus:not(:hover)::before {
    width: calc(100%);
    height: calc(100%);
  }

  button:active svg path {
    fill: ${({ iconActiveColor }) => iconActiveColor};
  }
`;

class Tooltip extends Component {
  state = {
    hovered: false, //tracks if the mouse has entered the boundries of the component
    keyboardFocused: false, // controls whether or not we should show the focus indicator (keyboard users)
    showDialog: false, // controls the state of the dialog
    clicked: false, // this is to tell if someone clicked the icon, in which case, the tooltip stays open
    active: false, // tracks if the mouse is down on the component
    customAnchorPresent: false,
    isIe: getBrowser() === 'ie',
    scrollPosition: null,
    tooltipAnchorCoordinates: {},
    hasScrollableContent: undefined,
    unmounted: undefined,
  };

  componentDidMount = () => {
    this._resize();
    typeof document !== 'undefined' &&
      document.addEventListener('click', this._onClickOutside);
    typeof window !== 'undefined' &&
      window.addEventListener(
        'scroll',
        this.setAnchorElementPositionProperties
      );
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this._resize);

    // this check is to see if a custom element is being used as an anchor
    // this flag will activate different styles for the dialog based on the boolean
    if (this.props.renderAnchorElement) {
      this.setState({ customAnchorPresent: true });
    }
    this.tooltipId = generateUUID();
    this.tooltipWrapperId = this.props.id || `${this.tooltipId}-tooltipWrapper`;
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.showDialog !== this.state.showDialog &&
      this.state.keyboardFocused
    ) {
      if (!this.state.showDialog)
        this.setState({ hasScrollableContent: undefined });
      typeof document !== 'undefined' &&
        document.getElementById(this.tooltipId).focus();
    }
  };

  componentWillUnmount = () => {
    !this.isMobileDevice &&
      typeof document !== 'undefined' &&
      document.removeEventListener('click', this._onClickOutside);
    typeof window !== 'undefined' &&
      window.removeEventListener(
        'scroll',
        this.setAnchorElementPositionProperties
      );
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this._resize);
  };

  setAnchorElementPositionProperties = () => {
    // get the reference to the current tooltipAnchor
    const tooltipAnchor = this.toolTipAnchorRef;
    const tooltipAnchorRef = tooltipAnchor;
    const tooltipAnchorCoordinates = tooltipAnchorRef.getBoundingClientRect();
    // assign tooltipAnchorCoordinates the value of the current anchor ref boundingClientRect
    this.setState({ tooltipAnchorCoordinates });
  };

  /* Open the tooltip dialog*/
  openDialog = () => {
    this.setState({ showDialog: true, unmounted: false });
  };

  /* Close the tooltip dialog */
  closeDialog = e => {
    if (this.isMobileDevice) {
      e.stopPropagation();
      this.setState({ unmounted: true });
      this.unMountTimer = setTimeout(() => {
        this.setState({ showDialog: false, unmounted: false });
      }, 100);
    } else {
      this.setState({ showDialog: false, unmounted: true });
    }
  };

  setHasScrollableContent = value => {
    this.setState({ hasScrollableContent: value });
  };

  _resize = () => {
    this.setAnchorElementPositionProperties();
    this.isMobileDevice = checkIfMobileDevice();
  };

  _onKeyDown = (e, focused) => {
    const { showDialog, keyboardFocused, unmounted } = this.state;
    const key = e.keyCode;
    const spacebar = key === 32;
    const enter = key === 13;
    const esc = key === 27;
    const tab = key === 9;
    const shift = e.shiftKey;

    /* dont scroll page when pressing space */
    if (spacebar) e.preventDefault();

    /* This will toggle the dialog/focused state based on interaction */
    if (enter || spacebar || (esc && showDialog)) {
      this.setState({
        showDialog: !showDialog,
      });
    } else if (((shift && tab) || tab) && showDialog) {
      this.closeDialog();
    }
    if (
      this.anchorWithRef !== null &&
      this.anchorElementProps.props.onKeyDown
    ) {
      this.anchorElementProps.props.onKeyDown(e);
    }

    if (this.anchorWithRef !== null && this.anchorElementProps.props.onBlur) {
      this.anchorElementProps.props.onBlur(e);
    }
  };

  scrollbarId = generateUUID();

  _onClickOutside = e => {
    // check if current event contains ref if not close dialog
    let toolTipAnchorRef = this.toolTipAnchorRef;
    if (
      toolTipAnchorRef &&
      !toolTipAnchorRef.contains(e.target) &&
      e.target &&
      e.target.tagName !== 'HTML' &&
      e.target.getAttribute('data-tooltip') !== this.ariaId &&
      e.target.parentNode &&
      e.target.parentNode.getAttribute('data-tooltip') !== this.ariaId &&
      e.target.parentNode.id !== this.ariaId &&
      e.target.parentNode.id !== `scrollbar-view-${this.scrollbarId}` &&
      e.target.id !== `scrollbar-view-${this.scrollbarId}`
    ) {
      this.setState({
        scrollPosition: 0,
        keyboardFocused: false,
        clicked: false,
        showDialog: false,
        active: false,
        hovered: false,
      });
    }
  };

  _onMouseEnter = e => {
    if (this.isMobileDevice) return;
    if (e.target.parentNode.id !== `scrollbar-view-${this.scrollbarId}`) {
      const { keyboardFocused } = this.state;
      if (keyboardFocused) {
        this.setState({
          keyboardFocused: false,
        });
      }

      this.openTooltipTimeout = setTimeout(() => {
        this.setState({
          showDialog: true,
          unmounted: false,
          hovered: true,
        });
      }, 200);

      if (
        this.anchorWithRef !== null &&
        this.anchorElementProps.props.onMouseEnter
      ) {
        this.anchorElementProps.props.onMouseEnter(e);
      }
    }
  };

  _onMouseExit = e => {
    if (this.isMobileDevice) return;
    const { clicked, showDialog } = this.state;
    if (clicked && showDialog) {
      return;
    }
    // clear time out to prevent showDialog being set to true unintentionally
    clearTimeout(this.openTooltipTimeout);

    this.setState({
      hovered: false,
      showDialog: false,
      keyboardFocused: false,
      // unmounted: true
    });

    if (
      this.anchorWithRef !== null &&
      this.anchorElementProps.props.onMouseLeave
    ) {
      this.anchorElementProps.props.onMouseLeave(e);
    }
  };

  _onClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const { clicked, hovered, showDialog } = this.state;
    this.props.onClick && this.props.onClick(e);

    /* when using JAWS + keyboard interactions are handled by
    the onClick event. If this is the case, it wont be hovered, so show the dialog. */
    const tooltipDialog =
      typeof document !== 'undefined' &&
      document.getElementById(`${this.tooltipId}-dialog`);
    if (hovered) {
      clicked
        ? this.setState({ clicked: false, showDialog: false })
        : this.setState({ clicked: true });
      return;

      /**
       * if youre clicking on the tooltip dialog (mobile device dialog), dont do anything.
       * this shouldnt dismiss the tooltip
       */
    } else if (tooltipDialog && tooltipDialog.contains(e.target)) {
      return;

      /**
       * if this is a mobile device and the dialog is open we need to wait for the animation to close.
       * so first, animate out, then remove the dialog from the DOM.
       */
    } else if (this.isMobileDevice && showDialog) {
      this.setState({
        unmounted: true,
      });
      this.animationDelay = setTimeout(() => {
        this.setState({
          showDialog: false,
          unmounted: false,
        });
      }, 100);

      /**
       * treat this as a desktop dialog. when clicking the dialog,
       */
    } else this.setState({ clicked: false, showDialog: !showDialog });
  };

  /* show active styles when activating tooltip */
  _onMouseDown = e => {
    this.setState({
      active: true,
    });
  };

  _onMouseUp = e => {
    this.setState({
      active: false,
    });
  };

  _onFocus = e => {
    e.stopPropagation();
    e.preventDefault();
    const { hovered, keyboardFocused } = this.state;
    /*  if the focus came from keyboard set it true, 
  if it came from mouse click, it will be set to false in _onClick */

    if (!hovered && !keyboardFocused) {
      this.setState({
        keyboardFocused: true,
      });
    }
  };

  _getIconColor(iconFillColor, surface) {
    const isBrandColor =
      iconFillColor === 'primary' ||
      iconFillColor === 'secondary' ||
      iconFillColor === 'brandHighlight';

    if (isBrandColor) {
      return iconFillColor === 'brandHighlight'
        ? ColorTokens.elements.brandhighlight.value
        : ColorTokens.elements[iconFillColor][`on${surface}`].value;
    } else if (!isBrandColor) {
      return iconFillColor;
    }
  }

  _getActiveIconColor(iconFillColor, surface) {
    return iconFillColor === 'secondary'
      ? surface === 'light'
        ? ColorTokens.palette.gray65.value
        : ColorTokens.palette.gray44.value
      : ColorTokens.interactive.active[`on${surface}`].value;
  }

  setAnchorElement = () => {
    const { renderAnchorElement } = this.props;
    const { showDialog, ariaLabel } = this.state;

    const computedProps = {
      ariaExpanded: showDialog,
      ariaLabel: ariaLabel,
      ...{ [this.refKey]: elem => (this.toolTipAnchorRef = elem) },
    };

    if (renderAnchorElement) {
      return renderAnchorElement(computedProps);
    }
    return null;
  };

  _setScrollPosition = y => {
    this.setState({ scrollPosition: y });
  };

  refKey = UNSAFE_SetEnvRef();

  ariaId = `tooltip-${generateUUID()}`;

  // callback to render prop with tooltipAnchorRef
  anchorWithRef = this.setAnchorElement();
  // use to reference to the anchorWithRef so that in the event we were passed any props
  // we can invoke those props
  anchorElementProps = this.anchorWithRef;

  isAppleDevice = getOS() === 'osx' || getOS() === 'ios';

  isOsx = getOS() === 'osx';

  isAndroidDevice = getOS() === 'android';

  isFirefox = getBrowser() === 'firefox';

  _setDialogRef = elem => {
    this.tooltipDialogRef = elem;
    if (elem && elem.offsetHeight - 1 > 202) {
      this.setState({ scrollable: true });
    } else {
      this.setState({ scrollable: false });
    }
  };

  _dialogOnKeyDown = (e, show) => {
    // Close dialog and refocus anchor on esc space or enter key press
    if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ showDialog: show });
      this.toolTipAnchorRef.focus();
    }
  };

  renderTooltipPopover = () => {
    const {
      scrollPosition,
      clicked,
      customAnchorPresent,
      isIe,
      tooltipAnchorCoordinates,
      showDialog,
      keyboardFocused,
      hasScrollableContent,
    } = this.state;

    const {
      disabled,
      children,
      title,
      surface,
      size,
      containerId,
      calculateTrackColor,
      calculateThumbColor,
      scrollbarBorderRadius,
      tooltipBorderRadius,
    } = this.props;

    const hasAnchorElement = this.props.renderAnchorElement ? true : false;

    if (showDialog && !disabled) {
      return (
        <TooltipPopover
          data-testid="dialog"
          scrollPosition={scrollPosition}
          setScrollPosition={this._setScrollPosition}
          clicked={clicked}
          customAnchorElement={this.toolTipAnchorRef}
          customAnchorPresent={customAnchorPresent}
          content={children}
          deactivateDialogState={this.closeDialog}
          title={title}
          ariaId={this.ariaId}
          tooltipId={this.tooltipId}
          keyboardFocused={keyboardFocused}
          keepDialogActiveOnMouseEnter={
            !keyboardFocused ? this.openDialog : null
          }
          toolTipAnchorRef={this.toolTipAnchorRef}
          showDialog={showDialog}
          surface={surface}
          size={size}
          isIe={isIe}
          containerId={containerId}
          tooltipWrapperId={this.tooltipWrapperId}
          tooltipAnchorCoordinates={tooltipAnchorCoordinates}
          isIOS={this.isAppleDevice}
          onKeyDown={this._dialogOnKeyDown}
          setRef={this._setDialogRef}
          setHasScrollableContent={this.setHasScrollableContent}
          hasScrollableContent={hasScrollableContent}
          hasAnchorElement={hasAnchorElement}
          isFirefox={this.isFirefox}
          handleTabKeyPress={this.closeDialog}
          scrollbarId={this.scrollbarId}
          scrollbarBorderRadius={scrollbarBorderRadius}
          calculateThumbColor={calculateThumbColor}
          calculateTrackColor={calculateTrackColor}
          tooltipBorderRadius={tooltipBorderRadius}
        />
      );
    }
    return null;
  };

  renderMobileTooltipDialog = () => {
    const { showDialog, unmounted } = this.state;

    const { disabled, surface, children, closeButtonText } = this.props;

    if (showDialog && !disabled) {
      return (
        <TooltipDialog
          {...this.props}
          closeButtonText={closeButtonText}
          dialogId={`${this.tooltipId}-dialog`}
          dialogOpened={showDialog}
          surface={surface}
          body={children}
          onClick={this.closeDialog}
          unmounted={unmounted}
          isAndroidDevice={this.isAndroidDevice}
        />
      );
    }
    return null;
  };

  renderIconAnchorElement = () => {
    const {
      colorConfig,
      disabled,
      ariaLabel,
      size,
      surface,
      iconFillColor,
      getIconColor,
      renderTooltipDialog,
      fakeMobileDevice,
      tooltipIcon,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      'data-analyticstrack': analyticsTrack,
    } = this.props;

    const {
      clicked,
      showDialog,
      hovered,
      isIe,
      keyboardFocused,
      active,
      hasScrollableContent,
    } = this.state;

    const tooltipDialogComponent =
      renderTooltipDialog && (this.isMobileDevice || fakeMobileDevice)
        ? this.renderMobileTooltipDialog()
        : this.renderTooltipPopover();

    return (
      <TooltipIconWrapper
        tabIndex={this.isAndroidDevice ? undefined : -1}
        importantForAccessibility="no"
        clicked={clicked}
        showDialog={showDialog}
        hovered={hovered}
        onMouseLeave={disabled ? undefined : this._onMouseExit}
        onMouseEnter={disabled ? undefined : this._onMouseEnter}
      >
        {tooltipIcon ? (
          <AnchorIconBase
            mobile={this.isMobileDevice}
            tabIndex={0}
            data-testid="tooltip"
            data-track={track}
            data-track-ignore={trackIgnore}
            data-clickstream={clickStream}
            data-analyticstrack={analyticsTrack}
            id={this.tooltipId}
            colorConfig={colorConfig}
            aria-expanded={
              !this.isMobileDevice && hasScrollableContent === undefined
                ? false
                : (this.isMobileDevice && showDialog) ||
                  (hasScrollableContent && !this.isFirefox && !isIe)
                ? undefined
                : showDialog
            }
            aria-label={isIe || this.isAndroidDevice ? undefined : ariaLabel}
            hovered={hovered}
            clicked={clicked}
            onFocus={!disabled ? this._onFocus : undefined}
            onMouseDown={disabled ? undefined : this._onMouseDown}
            onMouseUp={disabled ? undefined : this._onMouseUp}
            onClick={disabled ? undefined : this._onClick}
            showDialog={showDialog}
            size={size}
            surface={surface}
            keyboardFocused={keyboardFocused}
            disabled={disabled}
            {...{ [this.refKey]: elem => (this.toolTipAnchorRef = elem) }}
          >
            {isIe ||
              (this.isAndroidDevice && (
                <ScreenReaderText>{ariaLabel}</ScreenReaderText>
              ))}

            {/* aria-expanded is not announced when the tooltip is refocused after the tooltip collapse */}
            {this.isOsx && hasScrollableContent && !showDialog && (
              <ScreenReaderText aria-live="assertive">
                collapsed
              </ScreenReaderText>
            )}
            {!this.isOsx && (
              <ScreenReaderText aria-live="assertive">
                {hasScrollableContent &&
                  !isIe &&
                  `${
                    showDialog
                      ? this.isFirefox
                        ? ''
                        : 'expanded'
                      : 'collapsed'
                  }`}
              </ScreenReaderText>
            )}
            <span
              tabIndex={-1}
              style={{
                outline: 'none',
                display: 'inline-flex',
              }}
            >
              <AnchorIcon
                tabIndex={-1}
                iconFillColor={iconFillColor}
                getIconColor={getIconColor}
                colorConfig={colorConfig}
                disabled={disabled}
                onClick={this._onclick}
                importantForAccessibility="no"
                size={size}
                showDialog={showDialog}
                surface={surface}
                clicked={clicked}
                hovered={hovered}
                keyboardFocused={keyboardFocused}
                active={active}
              />
              {!this.props.disabled && (
                <HitArea
                  tabIndex={-1}
                  aria-hidden={true}
                  importantForAccessibility="no"
                  data-testid="hit-area"
                />
              )}
            </span>
          </AnchorIconBase>
        ) : (
          <AnchorIconWrapper
            mobile={this.isMobileDevice}
            data-testid="tooltip"
            id={this.tooltipId}
            colorConfig={colorConfig}
            aria-expanded={
              !this.isMobileDevice && hasScrollableContent === undefined
                ? false
                : (this.isMobileDevice && showDialog) ||
                  (hasScrollableContent && !this.isFirefox && !isIe)
                ? undefined
                : showDialog
            }
            aria-label={isIe || this.isAndroidDevice ? undefined : ariaLabel}
            showDialog={showDialog}
            size={size}
            surface={surface}
            iconActiveColor={this._getActiveIconColor(iconFillColor, surface)}
            disabled={disabled}
            {...{ [this.refKey]: elem => (this.toolTipAnchorRef = elem) }}
          >
            {isIe && <ScreenReaderText>{ariaLabel}</ScreenReaderText>}

            {/* aria-expanded is not announced when the tooltip is refocused after the tooltip collapse */}
            {this.isOsx && hasScrollableContent && !showDialog && (
              <ScreenReaderText aria-live="assertive">
                collapsed
              </ScreenReaderText>
            )}

            <span
              style={{
                outline: 'none',
                display: 'inline-flex',
              }}
            >
              <ButtonIcon
                kind="ghost"
                size={size === 'small' ? '16px' : '20px'}
                surface={surface}
                surfaceType="colorFill"
                disabled={disabled}
                focusBorderPosition="outside"
                ariaLabel={ariaLabel ? ariaLabel : 'tooltip'}
                iconOffset={{
                  x: 0,
                  y: 0,
                }}
                renderIcon={props => (
                  <Info
                    {...props}
                    color={this._getIconColor(iconFillColor, surface)}
                    size={size}
                  />
                )}
                aria-expanded={
                  !this.isMobileDevice && hasScrollableContent === undefined
                    ? false
                    : this.isMobileDevice && showDialog
                    ? undefined
                    : showDialog
                }
                onClick={disabled ? undefined : this._onClick}
                data-track={track}
                data-track-ignore={trackIgnore}
                data-clickstream={clickStream}
                data-analyticstrack={analyticsTrack}
              />
            </span>
          </AnchorIconWrapper>
        )}
        <span
          aria-live={!this.isMobileDevice ? 'assertive' : undefined}
          aria-relevant="all"
        >
          {/* {this.renderMobileTooltipDialog()} */}
          {tooltipDialogComponent}
        </span>
      </TooltipIconWrapper>
    );
  };
  renderCustomAnchorElement = () => {
    const anchorWithRef = this.setAnchorElement();
    const {
      disabled,
      ariaLabel,
      renderTooltipDialog,
      viewport,
      fakeMobileDevice,
      'data-track': track,
      'data-track-ignore': trackIgnore,
    } = this.props;

    const {
      clicked,
      showDialog,
      hovered,
      isIe,
      hasScrollableContent,
    } = this.state;

    const tooltipDialogComponent =
      renderTooltipDialog && (this.isMobileDevice || fakeMobileDevice)
        ? this.renderMobileTooltipDialog()
        : this.renderTooltipPopover();

    return (
      <>
        <CustomAnchorElementWrapper
          {...{ [this.refKey]: elem => (this.toolTipAnchorRef = elem) }}
          aria-label={isIe ? undefined : ariaLabel}
          onMouseEnter={disabled ? undefined : this._onMouseEnter}
          onMouseDown={disabled ? undefined : this._onMouseDown}
          onMouseLeave={disabled ? undefined : this._onMouseExit}
          onMouseUp={disabled ? undefined : this._onMouseUp}
          onClick={disabled ? undefined : this._onClick}
          onFocus={!disabled ? this._onFocus : undefined}
          aria-expanded={
            this.isMobileDevice && showDialog ? undefined : showDialog
          }
          clicked={clicked}
          showDialog={showDialog}
          hovered={hovered}
        >
          {this.isOsx && hasScrollableContent && !showDialog && (
            <ScreenReaderText aria-live="assertive">collapsed</ScreenReaderText>
          )}
          {!this.isOsx && (
            <ScreenReaderText aria-live="assertive">
              {hasScrollableContent &&
                !isIe &&
                `${
                  showDialog ? (this.isFirefox ? '' : 'expanded') : 'collapsed'
                }`}
            </ScreenReaderText>
          )}
          <div tabIndex={-1}>
            {React.cloneElement(anchorWithRef, {
              onKeyDown: !disabled ? this._onKeyDown : undefined,
              id: this.tooltipId,
              'aria-expanded': showDialog,
              'data-track': track,
              'data-track-ignore': trackIgnore,
            })}
          </div>
        </CustomAnchorElementWrapper>
        <span
          aria-live={!this.isMobileDevice ? 'assertive' : undefined}
          aria-relevant="all"
        >
          {/* {this.renderTooltipPopover()} */}
          {tooltipDialogComponent}
        </span>
      </>
    );
  };

  render() {
    const { className } = this.props;
    return (
      <TooltipWrapper
        id={this.tooltipWrapperId}
        className={className}
        trailing={this.props.trailing}
        tabIndex={this.isAndroidDevice ? undefined : -1}
      >
        {this.props.renderAnchorElement
          ? this.renderCustomAnchorElement()
          : this.renderIconAnchorElement()}
      </TooltipWrapper>
    );
  }
}

Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes;

export default withVDSManager(Tooltip);
