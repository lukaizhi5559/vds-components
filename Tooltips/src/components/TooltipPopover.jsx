import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import styled from 'styled-components';
import { ScrollWrapper } from '@vds-core/scrollbars';
import { calculateRem, getOS } from '@vds-core/utilities';
import { updateDialogPosition } from '../utils/position-util';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { Fonts } from '@vds-core/typography';
import TooltipPortal from './TooltipPortal';
import { TypographyTokens } from '@vds-tokens/typography';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

const _calculateTrackColor = surface => {
  let trackColor;
  if (surface === 'dark') {
    trackColor = ColorTokens.interactive.scrolltrack.ondark.value;
  } else {
    trackColor = ColorTokens.interactive.scrolltrack.onlight.value;
  }
  return trackColor;
};

const _calculateThumbColor = (surface, hover) => {
  let thumbColor;
  if (surface === 'dark' && !hover) {
    thumbColor = ColorTokens.interactive.scrollthumb.ondark.value;
  } else if (hover && surface !== 'dark') {
    thumbColor = ColorTokens.interactive.scrollthumb.hover.onlight.value;
  } else if (hover && surface === 'dark') {
    thumbColor = ColorTokens.interactive.scrollthumb.hover.ondark.value;
  } else {
    thumbColor = ColorTokens.interactive.scrollthumb.onlight.value;
  }
  return thumbColor;
};

const propTypes = {
  /** String or function value for inner tooltip content . */
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /** Boolean value to know if anchor has been clicked open . */
  clicked: PropTypes.bool,
  /** React Ref of tooltip anchor when custom anchor prop has been used */
  customAnchorElement: PropTypes.instanceOf(
    typeof Element === 'undefined' ? any : Element
  ),
  /** Boolean to adjust dialog spacing based on if a custom anchor element has been passed */
  customAnchorPresent: PropTypes.bool,
  /** Method closes dialog active on mouseLeave. */
  deactivateDialogState: PropTypes.func,
  /** id is a unique string for aria-labelledby */
  ariaId: PropTypes.string,
  /** Method keeps dialog active on mouseEnter. */
  keepDialogActiveOnMouseEnter: PropTypes.func,
  /** Boolean to track if keyboard has created focus. */
  keyboardFocused: PropTypes.bool,
  /** React Ref of tooltip anchor */
  toolTipAnchorRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? any : Element
  ),
  /** String to check what size anchor element is being used */
  size: PropTypes.string,
  /** Boolean when true shows tooltip. */
  showDialog: PropTypes.bool,

  //added after renaming
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   *
   *@ignore Prop to change the border colors
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a unique component ID to be passed to the component as a reference for positioning other than the window object.
   */
  containerId: PropTypes.string,
  /** scrollbarId is a suffix string for scrollbar ids */
  scrollbarId: PropTypes.string,
  /**
   *
   *@ignore
   */
  calculateTrackColor: PropTypes.func,
  /**
   *
   *@ignore
   */
  calculateThumbColor: PropTypes.func,
  /**
   *
   *@ignore
   */
  scrollbarBorderRadius: PropTypes.string,
  /**
   * @ignore
   */
  tooltipBorderRadius: PropTypes.string,
};

const defaultProps = {
  content: null,
  showDialog: false,
  clicked: false,
  // customAnchorElement: () => {},
  customAnchorPresent: false,
  deactivateDialogState: false,
  ariaId: null,
  keepDialogActiveOnMouseEnter: false,
  keyboardFocused: false,
  toolTipAnchorRef: null,
  size: null,

  //added after rename
  title: null,
  surface: 'light',
  calculateTrackColor: _calculateTrackColor,
  calculateThumbColor: _calculateThumbColor,
  scrollbarBorderRadius: calculateRem(2),
  tooltipBorderRadius: '4px',
};

/*
fontWeightBold represents the font weight found in 
typography used when the component is bolded. Font weight is
not exported by typography configs due to the fact that 
typography components may have multiple font weight options
*/

const DialogWrapper = styled.span`
  box-sizing: border-box;
  border-radius: ${({ tooltipBorderRadius }) => tooltipBorderRadius};
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
  border: ${({ surface }) =>
    `solid ${calculateRem(1)} ${
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value
    }`};
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  left: ${({ positionDialog }) => positionDialog()};
  position: absolute;
  overflow: visible;
  padding: ${calculateRem(
    LayoutTokens.space['3X'].value,
    0,
    LayoutTokens.space['3X'].value,
    LayoutTokens.space['3X'].value
  )};
  min-height: ${calculateRem(40)};
  max-height: ${calculateRem(204)};
  max-width: ${calculateRem(224)};
  -ms-overflow-style: none; /* disable scroll bar ie11*/
  text-align: left;
  transform: translateX(-50%);
  visibility: ${({ showDialog }) => (showDialog ? 'visible' : 'hidden')};
  width: ${calculateRem(224)};
  will-change: transform, left;
  z-index: ${({ clicked }) => (clicked ? 998 : 999)};
  outline: none;
  &::before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border-right: ${calculateRem(1)} solid
      ${({ surface }) =>
        surface === 'dark'
          ? ColorTokens.elements.primary.ondark.value
          : ColorTokens.elements.primary.onlight.value};
    border-bottom: ${calculateRem(1)} solid
      ${({ surface }) =>
        surface === 'dark'
          ? ColorTokens.elements.primary.ondark.value
          : ColorTokens.elements.primary.onlight.value};
    width: ${calculateRem(8.5)};
    height: ${calculateRem(8.5)};
    bottom: ${calculateRem(-4.5)};
    background: ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.background.primary.dark.value
        : ColorTokens.background.primary.light.value};
    left: ${({ positionCaret }) => positionCaret()};
    transform: translate(-50%) rotate(45deg);
    will-change: transform, left;
    z-index: -1;

    /* position fix for safari browsers */
    @media not all and (min-resolution:.001dpcm) { 
      @supports (-webkit-appearance:none) {
        width: ${calculateRem(9)};
        height: ${calculateRem(9)};
        bottom: ${calculateRem(-5)};
      }
    }
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
      width: ${calculateRem(8.5)};
      height: ${calculateRem(8.5)};
      bottom: ${calculateRem(-4.5)};
    }
    /* position fix for FF browsers */
    @-moz-document url-prefix() { 
      bottom: ${calculateRem(-5)};
    }
    };
  }

  ${props => updateDialogPosition(props)};

  * ::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  left: ${({ portalPositionLeft }) => calculateRem(portalPositionLeft)};
  top: ${({
    isDialogOnTop,
    portalPositionTop,
    containerHeight,
    tooltipIconHeight,
    getPortalPosition,
  }) =>
    getPortalPosition(
      isDialogOnTop,
      portalPositionTop,
      containerHeight,
      tooltipIconHeight
    )};
`;

const HoverZone = styled.span`
  cursor: pointer;
  position: absolute;
  box-sizing: border-box;
  left: -1px;
  height: ${calculateRem(44)};
  width: ${calculateRem(224)};
  z-index: 1;
  ${({ isDialogOnTop }) =>
    isDialogOnTop &&
    `
    bottom: ${calculateRem(-44)};
    `};
  ${({ isDialogOnTop }) =>
    !isDialogOnTop &&
    `
    top: ${calculateRem(-44)};
    `};
`;

const sizeMap = {
  medium: 13,
  large: 13,
  small: 12,
};

const InnerDialogWithScroll = styled.span`
  display: block;
  overflow: visible; /* necessary for ie11 support to show focus-state */
  position: relative;
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

// focus state for inner dialog content
const InnerDialogWithScrollContentWrapper = styled.span`
  display: block;
  width: auto;
  padding-right: ${LayoutTokens.space['1X'].value};
  &:focus,
  &.js-focus-visible :focus:not(.focus-visible) {
    outline: none;

    &::after {
      content: '';
      border: ${({ keyboardFocused }) =>
        keyboardFocused
          ? `${calculateRem(1)} dotted ${
              AccessibilityTokens.color.focusring.onlight.value
            }`
          : ''};
      height: calc(100% - 28px);
      left: ${calculateRem(12)};
      position: absolute;
      width: ${calculateRem(198)};
      top: ${calculateRem(12)};
    }
  }

  span {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  span ::-webkit-scrollbar {
    /* Safari and Chrome */
    -webkit-appearance: none;
    width: 0px;
  }
`;

const InnerDialogWithoutScroll = styled.span`
  display: block;
  width: 100%;
  outline: none;
  padding-right: ${LayoutTokens.space['3X'].value};
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const TextWrapper = styled.span`
  ${({ isIe }) =>
    !isIe &&
    `
    flex-direction: column;
  `};
  display: inline;
  width: 100%;
`;

const StyledHeading = styled.span`
  display: flex;
  width: 100%;
  font-family: ${Fonts.VerizonNHGeTX};
  font-size: ${TypographyTokens.fontsize.body[12].value};
  line-height: ${TypographyTokens.lineheight.body[16].value};
  font-weight: ${TypographyTokens.fontweight.bold.value};
  margin: 0;
  margin-bottom: ${LayoutTokens.space['1X'].value};
`;

const StyledContent = styled.span`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  font-family: ${Fonts.VerizonNHGeTX};
  font-size: ${TypographyTokens.fontsize.body[12].value};
  line-height: ${TypographyTokens.lineheight.body[16].value};
  margin: 0;
  word-break: break-word;
`;

/**
 * @ignore
 */
class TooltipPopover extends Component {
  state = {
    isDialogOnTop: true,
    dialogHorizontalPosition: 0,
    dialogElementCoordinates: {},
    size: this.props.size,
    delayTime: false,
  };

  componentDidMount = () => {
    this.doUpdatedCoordinates = true;
    const dialogWrapper =
      typeof document !== 'undefined'
        ? document.getElementById(this.props.tooltipId)
        : null;
    typeof window !== 'undefined' &&
      window.addEventListener('scroll', this.positionDialogContentHorizontal);
    typeof window !== 'undefined' &&
      window.addEventListener('scroll', this.positionDialogContentVertical);
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this.positionDialogContentHorizontal);
    dialogWrapper.addEventListener('keydown', this._trackKeys);
    this.setDialogElementPositionProperties();
    this.tooltipDialogContentHeight();
    this.positionDialogContentVertical();
    if (this.props.keyboardFocused) {
      setTimeout(() => {
        let scrollView =
          typeof document !== 'undefined'
            ? document.getElementById(
                `scrollbar-view-${this.props.scrollbarId}`
              )
            : null;
        let scrollTrack =
          typeof document !== 'undefined'
            ? document.getElementById(
                `scrollbar-track-${this.props.scrollbarId}`
              )
            : null;
        // firefox needs aria-describedby to read the scrollable tooltip content
        if (
          !this.props.hasAnchorElement &&
          this.props.isFirefox &&
          scrollView
        ) {
          let scrollViewContent =
            typeof document !== 'undefined'
              ? document.querySelectorAll(
                  `#scrollbar-view-${this.props.scrollbarId} span`
                )
              : null;
          /* istanbul ignore else  */
          if (scrollViewContent.length > 1) {
            scrollViewContent[0].setAttribute('id', 'scrollbar-view-header');
            scrollViewContent[1].setAttribute('id', 'scrollbar-view-content');
            /* scrollView.setAttribute(
              'aria-describedby',
              'scrollbar-view-header scrollbar-view-content'
            ); */
          } else {
            scrollViewContent[0].setAttribute('id', 'scrollbar-view-content');
            /* scrollView.setAttribute(
              'aria-describedby',
              'scrollbar-view-content'
            ); */
          }
        }

        if (scrollView) {
          scrollView.setAttribute('tabIndex', '0');
          //scrollView.focus();
          scrollTrack.setAttribute('aria-hidden', true);
          scrollView.style.outline = 'none';
          scrollView.style.border = 'none';
        }
      }, 200);
    }
    this.parentScrollableContainer = this.getScrollParent(
      document.getElementById(this.props.tooltipWrapperId)
    );

    if (this.parentScrollableContainer) {
      this.parentScrollableContainer.addEventListener('scroll', () => {
        this.tooltipContentRef && this.positionDialogContentVertical();
      });
    }
    this.delayTimer = setTimeout(
      () => {
        this.delayTimer = null;
        this.setState({ delayTime: true });
      },
      this.isOsx ? 300 : 10
    );
  };

  getScrollParent = node => {
    if (node == null || node == document.body) {
      return document;
    }
    if (
      node.scrollHeight > node.clientHeight &&
      node !== document.getElementById(this.props.tooltipWrapperId)
    ) {
      return node;
    } else {
      return this.getScrollParent(node.parentNode);
    }
  };

  componentDidUpdate = () => {
    if (this.doUpdatedCoordinates) {
      this.setDialogElementPositionProperties();
      this.positionDialogContentHorizontal();
      // toggle doUpdateCoordinates flag to protect against infinite re-renders
      this.doUpdatedCoordinates = false;
    }
  };

  refKey = UNSAFE_SetEnvRef();
  isOsx = getOS() === 'osx';
  delayTimer = null;

  componentWillUnmount = () => {
    const dialogWrapper =
      typeof document !== 'undefined'
        ? document.getElementById(this.props.tooltipId)
        : null;
    typeof window !== 'undefined' &&
      window.removeEventListener(
        'scroll',
        this.positionDialogContentHorizontal
      );
    typeof window !== 'undefined' &&
      window.removeEventListener('scroll', this.positionDialogContentVertical);
    typeof window !== 'undefined' &&
      window.removeEventListener(
        'resize',
        this.positionDialogContentHorizontal
      );
    dialogWrapper.removeEventListener('keydown', this._trackKeys);
    if (this.parentScrollableContainer) {
      this.parentScrollableContainer.removeEventListener(
        'scroll',
        this.positionDialogContentVertical
      );
    }
    clearTimeout(this.delayTimer);
  };

  _trackKeys = e => {
    if (
      e.target.id === `scrollbar-view-${this.props.scrollbarId}` &&
      (e.keyCode === 13 || e.keyCode === 32)
    ) {
      this.props.onKeyDown(e, false);
      return;
    }
    /* close dialog on tab key press */
    if (e.keyCode === 9 || e.keyCode === 27) {
      e.stopPropagation();
      this.props.handleTabKeyPress(e);
      return;
    }
    if (
      this.props.showDialog &&
      this.props.hasScrollableContent &&
      e.keyCode === 40
    ) {
      e.preventDefault();
      document.getElementById(
        `scrollbar-view-${this.props.scrollbarId}`
      ).scrollTop += 16; //16 px is the line height of the tooltip content
    }
    if (
      this.props.showDialog &&
      this.props.hasScrollableContent &&
      e.keyCode === 38
    ) {
      e.preventDefault();
      document.getElementById(
        `scrollbar-view-${this.props.scrollbarId}`
      ).scrollTop -= 16;
    }
  };

  setDialogElementPositionProperties = () => {
    /**
     * getBoundingRect of the tooltip dialog if coords have been updated
     * if no update take from state
     */
    const dialogElementRef = this.tooltipContentRef;

    const dialogElementCoordinates = dialogElementRef.getBoundingClientRect();

    this.setState({ dialogElementCoordinates });
  };

  positionDialogContentVertical = () => {
    const currentAnchorCoordinates = this.props.toolTipAnchorRef.getBoundingClientRect();
    const tooltipContentWithGutter =
      this.tooltipContentRef && this.tooltipContentRef.offsetHeight;
    const containerNode =
      this.props.containerId &&
      typeof document !== 'undefined' &&
      document.getElementById(this.props.containerId);
    let contentOverflowsTop = false;

    if (containerNode) {
      const parentDistanceFromTop = containerNode.getBoundingClientRect().top;
      contentOverflowsTop =
        (currentAnchorCoordinates.top &&
          currentAnchorCoordinates.top - tooltipContentWithGutter) <
        parentDistanceFromTop;
    }

    const roomForDialogAboveAnchor =
      currentAnchorCoordinates.top &&
      currentAnchorCoordinates.top > tooltipContentWithGutter;

    if (!roomForDialogAboveAnchor || contentOverflowsTop) {
      this.setState({ isDialogOnTop: false });
    } else {
      this.setState({ isDialogOnTop: true });
    }
  };

  positionDialogContentHorizontal = () => {
    const gutter = 20;
    const {
      left: anchorDistanceFromLeft,
      right: anchorDistanceFromRight,
    } = this.props.tooltipAnchorCoordinates;
    const {
      width: dialogElementWidth,
      left: dialogDistaceFromLeft,
      right: dialogDistanceFromRight,
    } = this.state.dialogElementCoordinates;

    const halfDialogWidth = dialogElementWidth / 2;
    const dialogNearRight =
      typeof window !== 'undefined' &&
      window.innerWidth - gutter - dialogDistaceFromLeft - halfDialogWidth;
    const maxPos = halfDialogWidth - gutter + 4;
    const offset = this.state.size ? sizeMap[this.state.size] : 0;
    const containerNode =
      this.props.containerId &&
      typeof document !== 'undefined' &&
      document.getElementById(this.props.containerId);

    if (containerNode) {
      const containerRect = containerNode.getBoundingClientRect();
      const moveLeft =
        dialogDistanceFromRight + gutter > containerRect.right ? true : false;
      const moveRight =
        dialogDistaceFromLeft - gutter < containerRect.left ? true : false;
      let dialogHorizontalPosition = 0;

      if (moveRight) {
        dialogHorizontalPosition =
          containerRect.left - dialogDistaceFromLeft + gutter;
      }
      if (moveLeft) {
        dialogHorizontalPosition =
          containerRect.right - dialogDistanceFromRight - gutter;
      }

      this.setState({ dialogHorizontalPosition });
      return;
    }

    if (halfDialogWidth > anchorDistanceFromLeft) {
      // if the anchorElement is <= 20px from left set both the arrow and
      // dialog to current position
      const dialogHorizontalPosition =
        anchorDistanceFromLeft <= gutter
          ? halfDialogWidth - gutter + offset
          : halfDialogWidth - anchorDistanceFromLeft + offset;

      this.setState({ dialogHorizontalPosition });
    } else if (
      typeof window !== 'undefined' &&
      window.innerWidth - halfDialogWidth > anchorDistanceFromRight
    ) {
      this.setState({ dialogHorizontalPosition: 0 });
    } else {
      const dialogHorizontalPosition =
        Math.abs(anchorDistanceFromRight - halfDialogWidth) > maxPos
          ? -1 * maxPos + offset
          : dialogNearRight - halfDialogWidth + offset;
      this.setState({ dialogHorizontalPosition });
    }
  };

  tooltipDialogContentHeight = () => {
    // get the height of dialog content, allows scroll bar to render if height is > 212px
    let tooltipDialogContentHeight = this.tooltipContentRef.offsetHeight - 1;
    // using >= to solve scrollable tooltip content overflow on zoom
    this.props.setHasScrollableContent(tooltipDialogContentHeight >= 202);
  };

  _positionCaret = () => {
    const { customAnchorPresent, tooltipAnchorCoordinates } = this.props;

    let position = this.state.dialogHorizontalPosition;
    let leftOffset = position;

    if (position > 93) leftOffset = 94;
    if (position < -93) leftOffset = -94;

    if (customAnchorPresent) {
      if (
        tooltipAnchorCoordinates.width >
        this.state.dialogElementCoordinates.width
      ) {
        return `50%`;
      }
      return `calc(50% - ${leftOffset}px);`;
    }
    return `calc(50% - ${leftOffset - 2}px);`; //106 is each edge - include this a scrollable div
  };

  _positionDialog = () => {
    const { customAnchorPresent, tooltipAnchorCoordinates } = this.props;

    let position = this.state.dialogHorizontalPosition;
    let leftOffset = position;

    if (position > 93) leftOffset = 94;
    if (position < -93) leftOffset = -94;

    if (customAnchorPresent) {
      if (
        tooltipAnchorCoordinates.width >
        this.state.dialogElementCoordinates.width
      ) {
        return `50%`;
      }
      return `calc(50% + ${leftOffset}px);`;
    }
    return `calc(50% + ${leftOffset + 2}px);`; //106 is each edge - include this a scrollable div
  };

  /* _onScroll = event => {
    this.props.setScrollPosition(event.currentTarget.scrollTop);
  }; */

  // flag for componentDidUpdate to update current position coords of anchor and dialog
  doUpdatedCoordinates = true;

  renderTooltipPopoverWithScroll = e => {
    return (
      <InnerDialogWithScroll>
        <InnerDialogWithScrollContentWrapper
          id={this.props.ariaId}
          colorConfig={this.props.colorConfig}
          // unset focus state so user can close dialog with keyboard
          // user can can scroll || leave with keyboard
          keyboardFocused={this.props.keyboardFocused}
          aria-hidden={this.props.isIe ? true : undefined}
        >
          <ScrollWrapper
            height="178px"
            width="100%"
            contentStyle={{
              display: 'flex',
              flexDirection: 'column',
              paddingRight: LayoutTokens.space['2X'].value,
              margin: 0,
            }}
            surface={this.props.surface}
            scrollbarId={this.props.scrollbarId}
            calculateTrackColor={this.props.calculateTrackColor}
            calculateThumbColor={this.props.calculateThumbColor}
            borderRadius={this.props.scrollbarBorderRadius}
          >
            {this.isOsx && (
              <ScreenReaderText aria-hidden={this.state.delayTime}>
                Expanded.
              </ScreenReaderText>
            )}
            {this.props.title && (
              <StyledHeading>{this.props.title}</StyledHeading>
            )}
            {this.props.content && (
              <StyledContent>{this.props.content}</StyledContent>
            )}
          </ScrollWrapper>
        </InnerDialogWithScrollContentWrapper>
      </InnerDialogWithScroll>
    );
  };

  renderDialogWithoutScroll = () => {
    const { isIe } = this.props;

    return (
      <InnerDialogWithoutScroll
        onKeyDown={this.handleDialogUnFocus}
        tabIndex={-1}
        id={this.props.ariaId}
      >
        {this.isOsx && (
          <ScreenReaderText aria-hidden={this.state.delayTime}>
            Expanded.
          </ScreenReaderText>
        )}
        <TextWrapper isIe={isIe}>
          {this.props.title && (
            <StyledHeading>{this.props.title}</StyledHeading>
          )}
          {this.props.content && (
            <StyledContent>{this.props.content}</StyledContent>
          )}
        </TextWrapper>
      </InnerDialogWithoutScroll>
    );
  };

  _setRef = elem => {
    this.props.setRef && this.props.setRef(elem);
    this.tooltipContentRef = elem;
  };

  render() {
    const { dialogElementCoordinates, delayTime } = this.state;
    const {
      tooltipAnchorCoordinates,
      hasScrollableContent,
      isIOS,
      tooltipBorderRadius,
      size,
    } = this.props;
    return (
      <DialogWrapper
        tooltipBorderRadius={tooltipBorderRadius}
        positionCaret={this._positionCaret}
        positionDialog={this._positionDialog}
        anchorElemTop={tooltipAnchorCoordinates.top}
        anchorElemWidth={tooltipAnchorCoordinates.width}
        className="persistentScrollbar"
        customAnchorElement={this.props.customAnchorElement}
        customAnchorPresent={this.props.customAnchorPresent}
        clicked={this.props.clicked}
        data-testid="dialog"
        dialogElementBottom={dialogElementCoordinates.bottom}
        dialogElementTop={dialogElementCoordinates.top}
        dialogElementWidth={dialogElementCoordinates.width}
        dialogHorizontalPosition={this.state.dialogHorizontalPosition}
        isDialogOnTop={this.state.isDialogOnTop}
        onKeyDown={this.props.onKeyDown}
        onMouseEnter={this.props.keepDialogActiveOnMouseEnter}
        aria-hidden={this.isOsx ? undefined : !delayTime}
        // dialog has been clicked don't close dialog on mouse out
        onMouseLeave={
          this.props.clicked ? null : this.props.deactivateDialogState
        }
        // eslint-disable-next-line no-return-assign
        {...{ [this.refKey]: this._setRef }}
        role="text"
        showDialog={this.props.showDialog}
        colorConfig={this.props.colorConfig}
        surface={this.props.surface}
        {...this.props}
        // title is a html attribute that was causing Jaws to read the title
        title={undefined}
        data-tooltip={this.props.ariaId}
      >
        {hasScrollableContent
          ? this.renderTooltipPopoverWithScroll()
          : this.renderDialogWithoutScroll()}
        {/* <HoverZone
          isDialogOnTop={this.state.isDialogOnTop}
          importantForAccessibility="no"
          data-testid="hover-zone"
        /> */}
      </DialogWrapper>
    );
  }
}

TooltipPopover.defaultProps = defaultProps;
TooltipPopover.propTypes = propTypes;

export default TooltipPopover;
