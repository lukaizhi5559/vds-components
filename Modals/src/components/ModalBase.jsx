import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import FocusLock from 'react-focus-lock';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import { calculateRem } from '@vds-core/utilities';
import ModalContainer from './ModalContainer';
import ModalOverlay from './ModalOverlay';
import ModalDialog from './ModalDialog';
import scroll from './util/scroll-lock';
import screenReader from './util/screen-reader';

const _calcWrapperPadding = (viewport, fullWidthContent = false) => {
  if (viewport === 'mobile') {
    return fullWidthContent ? '16px 0px' : '16px 16px 16px 4px';
  } else {
    return fullWidthContent ? '0px' : '0px 0px 0px 4px';
  }
};

const propTypes = {
  /**
   * @ignore
   */
  ariaLabel: PropTypes.string,
  /**
   * String, React components or HTML elements that will be rendered in the Modal.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  closeButton: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  /**
   * @ignore
   */
  disableOutsideClick: PropTypes.bool,
  /**
   * @ignore
   */
  modalOpened: PropTypes.bool,
  /**
   * @ignore
   */
  opened: PropTypes.bool,
  /**
   * @ignore
   */
  toggleModal: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  unmounted: PropTypes.bool,
  /**
   * @ignore
   */
  modalHeight: PropTypes.string,
  /**
   * @ignore
   */
  modalWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   */
  viewport: PropTypes.oneOf(['mobile', 'desktop', 'tablet']),
  /**
   * @ignore
   */
  fullScreenDialog: PropTypes.bool,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  disableFocusLock: PropTypes.bool,
};

const defaultProps = {
  className: null,
  closeButton: undefined,
  customScroll: false,
  disableOutsideClick: false,
  modalOpened: false,
  opened: false,
  unmounted: false,
  modalHeight: undefined,
  modalWidth: undefined,
  disableFocusLock: false,
  //1.0 Props
  viewport: 'desktop',
  fullScreenDialog: false,
};

const _getCloseButton = props => {
  const { ModalCloseButton, closeButton } = props;
  // If no closeButton passed at all, show Default Header Close Button
  if (typeof closeButton === 'undefined') {
    return (
      <ModalCloseButton
        toggleButton={props.toggleButton}
        onClick={props.toggleModal}
        isAppleDevice={props.isAppleDevice}
        unmounted={props.unmounted}
        hovered={props.hovered}
        isKeyboardInteraction={props.isKeyboardInteraction}
        ariaLabel={props.ariaLabel}
        data-analyticstrack={props.analyticsTrack}
        data-track={props.track}
        data-track-ignore={props.ignoreTrack}
        data-clickstream={props.clickStream}
        data-sitecat-cta={props.cta}
        data-sitecat-level={props.level}
        data-sitecat-position={props.position}
        data-sitecat-datatrack={props.dataTrack}
        surface={props.surface}
        scrollbarId={props.scrollbarId}
        borderRadius={props.borderRadius}
        closeButtonFocusBorderRadius={props.closeButtonFocusBorderRadius}
        id={props.closeButtonId}
      />
    );
  }

  if (props.closeButton === null) {
    return null;
  }

  // If closeButton is anything else, show it as the Header Close Button
  return props.closeButton;
};

const ModalDialogWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: ${({ viewport }) => (viewport !== 'mobile' ? 'hidden' : 'auto')};
  min-height: ${calculateRem(136)};
  padding: ${({ viewport, fullWidthContent }) =>
    _calcWrapperPadding(viewport, fullWidthContent)};

  @media (max-width: 767px) {
    padding: ${({ fullWidthContent }) =>
      _calcWrapperPadding('mobile', fullWidthContent)};
  }
  *::-webkit-scrollbar {
    display: none;
  }
  *:not(select) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  @media only screen and (min-width: 767px) {
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  @media only screen and (max-width: 767px) {
    &::-webkit-scrollbar {
      display: ${({ viewport, scrollPos }) =>
        viewport === 'mobile' && scrollPos <= 0 ? 'none' : 'auto'};
    }
    scrollbar-width: auto;
    -ms-overflow-style: auto;
  }
`;

const ChildWrapper = styled.span`
  padding-right: ${({ renderScrollview, viewport, fullWidthContent }) =>
    renderScrollview || viewport === 'mobile' || fullWidthContent
      ? '0px'
      : '48px'};
  padding-left: ${({ fullWidthContent }) => !fullWidthContent && '2px'};
  @media (max-width: 767px) {
    padding: 0;
  }
  display: flex;
  flex-direction: column;
`;

class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.dialogContainerRef = null;
    this.childrenContainer = null;
    this.state = {
      modalHeight: 0,
      renderScrollview: false,
      childContainerHeight: 0,
      modalScrollHeight: 0,
      scrollTop: 0,
    };
  }

  childContentObs =
    typeof window !== 'undefined' &&
    new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        const childHeight = this.childrenContainer.getBoundingClientRect()
          .height;
        if (childHeight >= this.state.childContainerHeight) {
          this.setState({
            childContainerHeight: childHeight,
            renderScrollview: true,
          });
        }
        // Max content area height for modal(70% of viewport height - 96px for padding top & bottom)
        const maxHeightContentArea =
          typeof document !== 'undefined' &&
          document.documentElement.clientHeight * 0.7 - 96;
        this.setState({
          modalScrollHeight:
            this.childrenContainer.clientHeight <= maxHeightContentArea
              ? calculateRem(parseInt(this.childrenContainer.clientHeight))
              : 0, // reset scroll height to zero on exceeding max content area
        });
      });
    });

  componentDidMount() {
    if (this.childrenContainer && this.dialogContainerRef) {
      //if refs are mounted, then check for scrollview
      this.setState({
        childContainerHeight: this.childrenContainer.getBoundingClientRect()
          .height,
      });
      this.updatePredicate();
      this.childContentObs &&
        this.childContentObs.observe(this.childrenContainer);
      this.dialogContainerRef.addEventListener('scroll', this.handleScroll);
    }

    typeof window !== 'undefined' &&
      window.addEventListener('resize', this.updatePredicate);

    //Enables body scroll locking for mobile devices
    scroll.enable();
    // Fix talkback on Android devices
    this.props.isMobileDevice &&
      !this.props.isAppleDevice &&
      screenReader.OpenDialog();
  }

  componentDidUpdate(prevProps, prevState) {
    const { childContainerHeight } = this.state;
    if (
      prevProps.modalOpened !== this.props.modalOpened ||
      childContainerHeight !== prevState.childContainerHeight
    ) {
      this.updatePredicate();
    }
    if (this.state.renderScrollview !== prevState.renderScrollview) {
      this.childContentObs.observe(this.childrenContainer);
    }
  }

  componentWillUnmount() {
    scroll.disable();
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this.updatePredicate);
    this.dialogContainerRef &&
      this.dialogContainerRef.removeEventListener('scroll', this.handleScroll);

    // Fix talkback on Android devices
    this.props.isMobileDevice &&
      !this.props.isAppleDevice &&
      screenReader.CloseDialog();

    this.childContentObs.unobserve(this.childrenContainer);
  }

  _renderScrollview = (childHeight, dialogHeight) => {
    if (childHeight > dialogHeight) {
      this.setState({
        renderScrollview: true,
        childContainerHeight: childHeight,
      });
    } else {
      this.setState({
        renderScrollview: false,
        childContainerHeight: childHeight,
      });
    }
  };

  updatePredicate = () => {
    const { childContainerHeight } = this.state;
    let childHeight = this.childrenContainer.getBoundingClientRect().height;
    let dialogHeight = this.dialogContainerRef.getBoundingClientRect().height;
    if (childContainerHeight !== childHeight) {
      //if height is changed
      this._renderScrollview(childHeight, dialogHeight);
    }
  };

  handleScroll = () => {
    this.setState({ scrollTop: this.dialogContainerRef.scrollTop });
  };

  refPath = UNSAFE_SetEnvRef(); // use it to set either ref or innerRef prop

  render() {
    const {
      children,
      className,
      disableOutsideClick,
      modalOpened,
      opened,
      toggleModal,
      unmounted,
      modalHeight,
      modalWidth,
      isMobileDevice,
      viewport,
      fullScreenDialog,
      animationDistance,
      clickStream,
      analyticsTrack,
      track,
      ignoreTrack,
      zIndex,
      disableFocusLock,
      id,
      disableAnimation,
      surface,
      borderRadius,
      scrollThumbBorderRadius,
      ScrollWrapper,
      closeButton,
      footerIndex,
      isAppleDevice,
      fullWidthContent,
    } = this.props;

    let showScrollview = viewport !== 'mobile' && this.state.renderScrollview;
    return (
      <ModalContainer id={id} isMobileDevice={isMobileDevice} zIndex={zIndex}>
        <FocusLock
          noFocusGuards={isMobileDevice && !isAppleDevice}
          disabled={disableFocusLock}
          returnFocus
        >
          <ModalOverlay
            disableOutsideClick={disableOutsideClick}
            onDismiss={toggleModal}
            modalOpened={modalOpened}
            opened={opened}
            unmounted={unmounted}
            fullScreenDialog={fullScreenDialog}
            viewport={viewport}
            surface={surface}
          >
            <ModalDialog
              modalHeight={modalHeight}
              modalWidth={modalWidth}
              className={className}
              unmounted={unmounted}
              modalOpened={modalOpened}
              opened={opened}
              role="dialog"
              aria-modal="true"
              viewport={viewport}
              fullScreenDialog={fullScreenDialog}
              animationDistance={animationDistance}
              data-analyticstrack={analyticsTrack}
              data-track={track}
              data-track-ignore={ignoreTrack}
              data-clickstream={clickStream}
              disableAnimation={disableAnimation}
              mobileHeight={typeof window !== 'undefined' && window.innerHeight}
              surface={surface}
              borderRadius={borderRadius}
              fullWidthContent={fullWidthContent}
            >
              {_getCloseButton(this.props)}
              <ModalDialogWrapper
                viewport={viewport}
                fullScreenDialog={fullScreenDialog}
                isMobileDevice={isMobileDevice}
                id={!showScrollview ? this.props.contentContainer : null}
                {...{
                  [this.refPath]: elem => (this.dialogContainerRef = elem),
                }}
                scrollbarId={this.props.scrollbarId}
                fullWidthContent={fullWidthContent}
                scrollPos={this.state.scrollTop}
              >
                {showScrollview ? (
                  <ScrollWrapper
                    height={
                      fullScreenDialog
                        ? 'calc(100vh - 94px)'
                        : this.state.modalScrollHeight
                        ? this.state.modalScrollHeight
                        : 'calc(70vh - 96px)' // 96px to account for 48px padding-top + bottom
                    }
                    width={fullWidthContent ? '100%' : 'calc(100% - 11px)'}
                    contentStyle={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: fullWidthContent ? 6 : 26,
                    }}
                    id={this.props.contentContainer}
                    surface={surface}
                    scrollbarId={this.props.scrollbarId}
                    borderRadius={scrollThumbBorderRadius}
                  >
                    <ChildWrapper
                      renderScrollview={this.state.renderScrollview}
                      viewport={viewport}
                      {...{
                        [this.refPath]: elem => (this.childrenContainer = elem),
                      }}
                      fullWidthContent={fullWidthContent}
                    >
                      {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                          ...child.props,
                          surface: surface,
                          viewport: viewport,
                          closeButton: { closeButton },
                          footerIndex: { footerIndex },
                          isMobileDevice: { isMobileDevice },
                        })
                      )}
                    </ChildWrapper>
                  </ScrollWrapper>
                ) : (
                  <ChildWrapper
                    renderScrollview={this.state.renderScrollview}
                    fullWidthContent={fullWidthContent}
                    viewport={viewport}
                    {...{
                      [this.refPath]: elem => (this.childrenContainer = elem),
                    }}
                  >
                    {React.Children.map(children, (child, index) =>
                      React.cloneElement(child, {
                        ...child.props,
                        surface: surface,
                        viewport: viewport,
                        closeButton: { closeButton },
                        footerIndex: { footerIndex },
                        isMobileDevice: { isMobileDevice },
                      })
                    )}
                  </ChildWrapper>
                )}
              </ModalDialogWrapper>
            </ModalDialog>
          </ModalOverlay>
        </FocusLock>
      </ModalContainer>
    );
  }
}

ModalBase.defaultProps = defaultProps;
ModalBase.propTypes = propTypes;

/** @component */
export default ModalBase;
