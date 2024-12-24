import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { ScrollWrapper } from '@vds-core/scrollbars';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
  generateUUID,
} from '@vds-core/utilities';
import ModalBase from './ModalBase';
import ModalPortal from './ModalPortal';
import ModalCloseButton from './ModalCloseButton';

const animationDistance =
  typeof window !== 'undefined' &&
  0.08 * Math.min(window && window.innerWidth, window && window.innerHeight);

class Modal extends React.Component {
  static propTypes = {
    /**
     * A label describing the Modal's current content
     * @note This will be prepended to the close button when the modal instantiates as it is the first actionable element of modal.
     */
    ariaLabel: PropTypes.string,
    /**
     *	String, React components or HTML elements that will be rendered in the Modal.
     */
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]).isRequired,
    /**
     * If provided, this will replace the modal's built in close button with a custom component.
     */
    closeButton: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * If true, clicking outside of the Modal (the overlay) will not close the modal.
     */
    disableOutsideClick: PropTypes.bool,
    /**
     * Boolean or a Function that returns true or false. This property can be used instead of the toggleButton to show or hide the Modal.
     * @note Either the toggleButton or the opened should be used, but not both. Using both will result in unexpected behavior.
     */
    opened: PropTypes.bool,
    /**
     * If you provide a Function to this Property, it will be called whenever the opened state changes in Modal. It fires after the state changes in the Modal, and it provides the new state of the opened.
     * @note This is provided so that you can maintain the visible status of the Modal externally. It would typically be used in conjunction with the opened attribute.
     */
    onOpenedChange: PropTypes.func,
    /**
     * @ignore
     * */
    title: PropTypes.element,
    /**
     * React component or HTML element that can be used to toggle Modal.
     */
    toggleButton: PropTypes.element,
    /**
     * z index value for modal.
     */
    zIndex: PropTypes.number,
    /**
     * @ignore
     */
    modalHeight: PropTypes.string,
    /**
     * This will set the width of the modal container - up to 70vw.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Viewport to configure how the modal will be rendered.
     */
    viewport: PropTypes.oneOf(['mobile', 'desktop', 'tablet']),
    /**
     * If provided, the Modal Dialog will render at full screen.
     * @note This prop is only available for desktop and tablet viewports. Mobile viewport is always full screen.
     */
    fullScreenDialog: PropTypes.bool,
    /**
     * Allows a string to be provided for analytics.
     */
    'data-analyticstrack': PropTypes.string,
    /**
     * Allows a string to be provided for analytics.
     */
    'data-track': PropTypes.string,
    /**
     * Allows a string to be provided for ignoring analytics.
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
     * Allows a unique ID to be passed to the component.
     */
    id: PropTypes.string,
    /**
     * Allows a unique ID to be passed to the ModalDialogWrapper.
     * @note This is useful when used with modals that contain a tooltip so the tooltip respects the edge of the modal in regards to positioning.
     */
    contentContainer: PropTypes.string,
    /**
     * Allows a unique ID to be passed to the Modal close button.
     */
    closeButtonId: PropTypes.string,
    /**
     * @ignore
     */
    disableFocusLock: PropTypes.bool,
    /**
     * If true, this will turn off the built in modal entrance animation.
     */
    disableAnimation: PropTypes.bool,
    /**
     * @ignore
     */
    surface: PropTypes.oneOf(['light', 'dark']),
    /**
     *  @ignore
     */
    borderRadius: PropTypes.string,
    /**
     *  @ignore
     */
    closeButtonFocusBorderRadius: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     *  @ignore
     */
    scrollThumbBorderRadius: PropTypes.string,
    /**
     * @ignore
     */
    ScrollWrapper: PropTypes.func,
    /**
     * @ignore
     * DO NOT EXPOSE. For internal projects only. Will display modal content edge to edge
     */
    fullWidthContent: PropTypes.bool,
    /**
     * If true, Browser back button will close the modal and navigate back to the previous page
     */
    enableBackButton: PropTypes.bool,
    /**
     * @ignore
     */
    ModalCloseButton: PropTypes.func,
  };

  static defaultProps = {
    title: null,
    toggleButton: null,
    closeButton: undefined,
    showCloseButton: undefined,
    opened: undefined,
    onOpenedChange: undefined,
    disableOutsideClick: false,
    modalHeight: undefined,
    width: undefined,
    zIndex: 999,
    disableFocusLock: false,
    borderRadius: calculateRem(8),
    scrollThumbBorderRadius: calculateRem(2),
    viewport: 'desktop',
    fullScreenDialog: false,
    disableAnimation: false,
    surface: 'light',
    ScrollWrapper: ScrollWrapper,
    closeButtonFocusBorderRadius: calculateRem(2),
    closeButtonId: 'close-button',
    className: null,
    fullWidthContent: false,
    enableBackButton: false,
    ModalCloseButton: ModalCloseButton,
  };

  state = {
    modalOpened: false,
    unmounted: false,
    hovered: false,
    isKeyboardInteraction: true,
  };

  componentDidMount = () => {
    if (this.props.opened) {
      //Disable browser back button when the modal is launched on load
      this.registerOverride();
      this.setState({ modalOpened: true, unmounted: false });
      this.handelShowChanged();
    }
    typeof document !== 'undefined' &&
      document.addEventListener('keyup', this._isKeyboardInteraction);
    typeof document !== 'undefined' &&
      document.addEventListener('mousedown', this._isKeyboardInteraction);
    // Hooray for iOS13 that it doesn't decipher between iPad Safari and Desktop Safari by default
    let isIPAD =
      typeof navigator !== 'undefined' &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1 &&
      !window.MSStream;
    let isMobileDevice = checkIfMobileDevice();
    this.isAppleDevice = /iPhone|iPad/i.test(navigator.userAgent);
    this.isMobileDevice = isIPAD || isMobileDevice;
    this.toggleId = `toggle-${generateUUID()}`;
    this.scrollbarId = generateUUID();
  };

  componentWillUnmount = () => {
    clearTimeout(this.unMountTimer);
    clearTimeout(this.historyBackTimer);
    this.unRegisterOverride();
    typeof document !== 'undefined' &&
      document.removeEventListener('keyup', this._isKeyboardInteraction);
    typeof document !== 'undefined' &&
      document.removeEventListener('mousedown', this._isKeyboardInteraction);
  };

  componentDidUpdate = prevProps => {
    if (
      typeof this.props.opened !== 'undefined' &&
      this.props.opened !== prevProps.opened
    ) {
      if (this.props.opened !== this.state.modalOpened) {
        this.toggleModal();
      }
    }
  };

  onUnload = () => {
    if (this.state.modalOpened) {
      this.setState({ modalOpened: false });
      // trigger onOpenedChange when modal is closed using browser back button click
      if (!this.props.enableBackButton && this.props.onOpenedChange) {
        this.props.onOpenedChange(this.state.modalOpened);
      }
      typeof window !== 'undefined' &&
        window.removeEventListener('popstate', this.onUnload);
    }
  };

  _isKeyboardInteraction = e => {
    if (e.keyCode) {
      this.setState({ isKeyboardInteraction: true });
    } else {
      this.setState({ isKeyboardInteraction: false });
    }
  };

  getCloseButton(props) {
    const closeButtonConfig = {
      top: '0px',
      right: '0px',
      height: '48px',
      width: '48px',
      interactiveStates: true,
      backgroundColor:
        props.surface === 'dark'
          ? ColorTokens.background.primary.dark.value
          : ColorTokens.background.primary.light.value,
      size: 'large',
    };

    let closeButton = props.closeButton;

    if (closeButton === null) {
      return null;
    }

    // Check for no Header Close Button
    if (typeof closeButton === 'undefined') {
      return undefined;
    }

    // Check for Custom Header Close Button with NO onClick function
    if (closeButton && typeof closeButton.props.onClick === 'undefined') {
      return React.cloneElement(closeButton, {
        onClick: this.toggleModal,
        styleConfig: closeButtonConfig,
      });
    } else {
      return React.cloneElement(closeButton, {
        styleConfig: closeButtonConfig,
      });
    }
  }

  registerOverride = () => {
    // if enableBackButton is true, browser back will close the modal and navigate to the previous page
    !this.props.enableBackButton && history.pushState(null, null);
    typeof window !== 'undefined' &&
      window.addEventListener('popstate', this.onUnload);
  };

  unRegisterOverride = () => {
    typeof window !== 'undefined' &&
      window.removeEventListener('popstate', this.onUnload);
  };

  toggleModal = event => {
    const { modalOpened } = this.state;
    const { toggleButton } = this.props;

    this.handelShowChanged();
    clearTimeout(this.historyBackTimer);
    if (modalOpened) {
      this.setState({ unmounted: true });
      this.unMountTimer = setTimeout(
        () => {
          this.setState({ modalOpened: false });
          toggleButton &&
            typeof document !== 'undefined' &&
            document.getElementById(this.toggleId) &&
            document.getElementById(this.toggleId).focus();
        },
        this.props.disableAnimation ? 0 : 390
      );
      this.unRegisterOverride();
      this.historyBackTimer = setTimeout(
        () => {
          // if enableBackButton is true and null is added to browser history, history.back will skip the null value added on opening of the modal.
          !this.props.enableBackButton && history.back();
        },
        this.props.disableAnimation ? 0 : 390
      );
      return;
    }
    this.registerOverride();
    this.setState({ modalOpened: true, unmounted: false });
  };

  handelShowChanged = () => {
    const modalOpened = !this.state.modalOpened;

    if (this.props.onOpenedChange) {
      this.props.onOpenedChange(modalOpened);
    }
  };

  handleClick = (e, toggleButton) => {
    this.toggleModal();
    toggleButton.props.onClick && toggleButton.props.onClick(e);
  };
  onKeyDown = (e, toggleButton) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      e.stopPropagation();
      toggleButton.props.onKeyDown && toggleButton.props.onKeyDown(e);
      this.handleClick(e, toggleButton);
      this.setState({ hovered: false });
    }
  };
  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };
  renderToggle = () => {
    // Check if a Toggle Element was passed in
    if (!this.props.toggleButton) {
      return null;
    }

    return React.cloneElement(this.props.toggleButton, {
      onClick: e => this.handleClick(e, this.props.toggleButton),
      onKeyDown: e => this.onKeyDown(e, this.props.toggleButton),
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      id: this.toggleId,
    });
  };

  render() {
    const { unmounted } = this.state;
    const {
      ariaLabel,
      disableOutsideClick,
      onOpenedChange,
      toggleButton,
      viewport,
      fullScreenDialog,
      zIndex,
      disableFocusLock,
      id,
      className,
      disableAnimation,
      surface,
      closeButtonId,
      borderRadius,
      scrollThumbBorderRadius,
      ScrollWrapper,
      ModalCloseButton,
      closeButtonFocusBorderRadius,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': ignoreTrack,
      'data-clickstream': clickStream,
      'data-sitecat-cta': cta,
      'data-sitecat-datatrack': dataTrack,
      'data-sitecat-position': position,
      'data-sitecat-level': level,
      closeButton,
      fullWidthContent,
    } = this.props;

    let footerIndex = -1;
    const children = React.Children.map(this.props.children, (child, index) => {
      if (
        child &&
        React.isValidElement(child) &&
        child.type &&
        child.type.displayName === 'ModalFooter'
      ) {
        footerIndex = index;
        return React.cloneElement(child, {
          toggleModal: this.toggleModal,
          key: index + 1,
          fullWidthContent,
        });
      } else {
        return child;
      }
    });
    if (footerIndex >= 0 && closeButton === null && this.isMobileDevice) {
      children.unshift(children.pop());
    }
    return (
      <Fragment>
        {toggleButton && this.renderToggle()}
        {this.state.modalOpened && (
          <ModalPortal>
            <ModalBase
              id={id}
              disableFocusLock={disableFocusLock}
              zIndex={zIndex}
              tabIndex={0}
              ariaLabel={ariaLabel}
              ModalCloseButton={this.props.ModalCloseButton}
              closeButton={this.getCloseButton(this.props)}
              disableOutsideClick={disableOutsideClick}
              modalOpened={this.state.modalOpened}
              opened={true}
              handleKeypress={this.handleKeypress}
              onOpenedChange={onOpenedChange}
              toggleModal={this.toggleModal}
              unmounted={unmounted}
              modalHeight={this.props.modalHeight}
              modalWidth={this.props.width}
              isMobileDevice={this.isMobileDevice}
              isAppleDevice={this.isAppleDevice}
              viewport={viewport}
              fullScreenDialog={fullScreenDialog}
              animationDistance={animationDistance}
              analyticsTrack={analyticsTrack}
              track={track}
              ignoreTrack={ignoreTrack}
              clickStream={clickStream}
              cta={cta}
              dataTrack={dataTrack}
              position={position}
              level={level}
              hovered={this.state.hovered}
              isKeyboardInteraction={this.state.isKeyboardInteraction}
              contentContainer={this.props.contentContainer}
              toggleButton={this.props.toggleButton}
              disableAnimation={disableAnimation}
              surface={surface}
              scrollbarId={this.scrollbarId}
              borderRadius={borderRadius}
              scrollThumbBorderRadius={scrollThumbBorderRadius}
              ScrollWrapper={ScrollWrapper}
              closeButtonFocusBorderRadius={closeButtonFocusBorderRadius}
              closeButtonId={closeButtonId}
              className={className}
              footerIndex={footerIndex}
              fullWidthContent={fullWidthContent}
            >
              {children}
            </ModalBase>
          </ModalPortal>
        )}
      </Fragment>
    );
  }
}

/** @component */
export default withVDSManager(Modal);
