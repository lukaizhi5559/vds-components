import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import {
  withVDSManager,
  getBrowser,
  checkIfMobileDevice,
  generateUUID,
  getOS,
  getNodeText,
} from '@vds-core/utilities';
import CarouselScrollbar from './CarouselScrollbar';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { LayoutTokens } from '@vds-tokens/layout';
import PaginationControlsButton from './PaginationControl';

// Brand3.0 grid margin of 20px.
const GRID_MARGIN = 20;

const propTypes = {
  /**
   * Function called when moving the carousel. Returns event object and seletedGroupIndex
   */
  onChange: PropTypes.func,
  /**
   * Render item function. This will pass the data array and expects a react component in return.
   */
  renderItem: PropTypes.func.isRequired,
  /**
   * Viewport options
   */
  viewport: PropTypes.oneOf([
    'desktopXLarge',
    'desktopLarge',
    'desktop',
    'tablet',
    'tabletLarge',
    'mobile',
    'mobileLarge',
  ]),
  /**
   * The amount of slides visible in the carousel container at one time. The default value will be 3UP in desktop/tablet and 1UP in mobile
   */
  layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Options for user to configure the partially-visible tile in group.
   * Setting peek to 'none' will display arrow navigation icons on mobile devices.
   */
  peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
  /**
   * Space between each tile. The default value will be 24px in desktop/tablet and 12px in mobile.
   */
  gutter: PropTypes.string,
  /**
   * Aspect-ratio options for tilelet in the carousel. If 'none' is passed, the tilelet will take the height of the tallest item in the carousel
   */
  aspectRatio: PropTypes.string,
  /**
   * Surface
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @deprecated
   * Pagination fill color for pagination arrows
   */
  paginationFill: PropTypes.oneOf(['light', 'dark']),
  /**
   * If provided, will apply margin to pagination arrows. Can be set to either positive or negative values. The default value will be 12px in desktop/tablet and 8px in mobile
   */
  paginationInset: PropTypes.string,
  /**
   * If provided, will determine the conditions to render the pagination arrows.
   */
  paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
  /**
   * @deprecated
   * If provided, will hide border of pagination controls icons
   */
  hidePaginationBorder: PropTypes.bool,
  /**
   * Config object for pagination.
   */
  pagination: PropTypes.shape({
    kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
    hideBorder: PropTypes.bool,
    floating: PropTypes.bool,
  }),
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
   * Allows props to be overridden at specific viewports.
   */
  viewportOverride: PropTypes.shape({
    mobile: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    mobileLarge: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    tablet: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    tabletLarge: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    desktop: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    desktopLarge: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
    desktopXLarge: PropTypes.shape({
      layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      peek: PropTypes.oneOf(['standard', 'minimum', 'none']),
      gutter: PropTypes.string,
      aspectRatio: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      paginationFill: PropTypes.oneOf(['light', 'dark']),
      pagination: PropTypes.shape({
        kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
        hideBorder: PropTypes.bool,
        floating: PropTypes.bool,
      }),
      paginationInset: PropTypes.string,
      paginationDisplay: PropTypes.oneOf(['onHover', 'persistent', 'none']),
      hidePaginationBorder: PropTypes.bool,
      selectedIndex: PropTypes.number,
    }),
  }),
  /**
   * Data used to render the tilelets in the carousel
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      backgroundImage: PropTypes.string,
      background: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
      aspectRatio: PropTypes.string,
      showBorder: PropTypes.bool,
      showDropShadow: PropTypes.bool,
      onClick: PropTypes.func,
      href: PropTypes.string,
      target: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
      imageFallbackColor: PropTypes.oneOf(['light', 'dark']),
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.oneOf(['top', 'middle', 'bottom']),
      textWidth: PropTypes.string,
      innerPadding: PropTypes.string,
      id: PropTypes.string,
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
      eyebrow: PropTypes.shape({
        size: PropTypes.oneOf([
          'bodySmall',
          'bodyMedium',
          'bodyLarge',
          'titleSmall',
          'titleMedium',
        ]),
        primitive: PropTypes.oneOf([
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'span',
          'p',
        ]),
        children: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.node,
        ]),
        bold: PropTypes.bool,
        surface: PropTypes.oneOf(['light', 'dark']),
        tooltip: PropTypes.shape({
          renderAnchorElement: PropTypes.func,
          id: PropTypes.string,
          disabled: PropTypes.bool,
          containerId: PropTypes.string,
          ariaLabel: PropTypes.string,
          size: PropTypes.oneOf(['small', 'medium']),
          iconFillColor: PropTypes.oneOfType([
            PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
            PropTypes.string,
          ]),
          children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          closeButtonText: PropTypes.string,
          'data-track': PropTypes.string,
          'data-track-ignore': PropTypes.string,
          'data-analyticstrack': PropTypes.string,
          'data-clickstream': PropTypes.string,
        }),
      }),
      title: PropTypes.shape({
        bold: PropTypes.bool,
        size: PropTypes.oneOf([
          'bodySmall',
          'bodyMedium',
          'bodyLarge',
          'titleSmall',
          'titleMedium',
          'titleLarge',
          'titleXLarge',
        ]),
        primitive: PropTypes.oneOf([
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'span',
          'p',
        ]),
        children: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.node,
        ]),
        text: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.node,
        ]),
        surface: PropTypes.oneOf(['light', 'dark']),
        tooltip: PropTypes.shape({
          id: PropTypes.string,
          disabled: PropTypes.bool,
          containerId: PropTypes.string,
          ariaLabel: PropTypes.string,
          size: PropTypes.oneOf(['small', 'medium']),
          iconFillColor: PropTypes.oneOfType([
            PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
            PropTypes.string,
          ]),
          children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          closeButtonText: PropTypes.string,
          'data-track': PropTypes.string,
          'data-track-ignore': PropTypes.string,
          'data-analyticstrack': PropTypes.string,
          'data-clickstream': PropTypes.string,
        }),
      }),
      subtitle: PropTypes.shape({
        size: PropTypes.oneOf([
          'bodySmall',
          'bodyMedium',
          'bodyLarge',
          'titleSmall',
          'titleMedium',
        ]),
        primitive: PropTypes.oneOf([
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'span',
          'p',
        ]),
        children: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.node,
        ]),

        text: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.node,
        ]),
        surface: PropTypes.oneOf(['light', 'dark']),
        color: PropTypes.oneOf(['primary', 'secondary']),
        tooltip: PropTypes.shape({
          renderAnchorElement: PropTypes.func,
          id: PropTypes.string,
          disabled: PropTypes.bool,
          containerId: PropTypes.string,
          ariaLabel: PropTypes.string,
          size: PropTypes.oneOf(['small', 'medium']),
          iconFillColor: PropTypes.oneOfType([
            PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
            PropTypes.string,
          ]),
          children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.node,
          ]),
          closeButtonText: PropTypes.string,
          'data-track': PropTypes.string,
          'data-track-ignore': PropTypes.string,
          'data-analyticstrack': PropTypes.string,
          'data-clickstream': PropTypes.string,
        }),
      }),
      descriptiveIcon: PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['small', 'medium', 'large', 'XLarge']),
          PropTypes.string,
          PropTypes.number,
        ]),
        surface: PropTypes.oneOf(['light', 'dark']),
      }),
      directionalIcon: PropTypes.shape({
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        surface: PropTypes.oneOf(['light', 'dark']),
      }),
      badge: PropTypes.shape({
        fillColor: PropTypes.oneOf([
          'red',
          'yellow',
          'green',
          'orange',
          'blue',
          'black',
          'white',
        ]),
        surface: PropTypes.oneOf(['light', 'dark']),
        children: PropTypes.string,
        numberOfLines: PropTypes.number,
        id: PropTypes.string,
        maxWidth: PropTypes.string,
      }),
      ariaLabel: PropTypes.string,
    })
  ),
  /**
   * The initial visible slide's index in the carousel.
   */
  selectedIndex: PropTypes.number,
  /**
   * If provided, will set the alignment for slot content when the slots has different heights.
   */
  slotAlignment: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'middle', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};

const defaultProps = {
  peek: 'standard',
  aspectRatio: '2:3',
  paginationDisplay: 'onHover',
  surface: 'light',
  hidePaginationBorder: false,
  selectedIndex: 0,
  slotAlignment: {
    vertical: 'top',
    horizontal: 'left',
  },
  pagination: {
    kind: 'lowContrast',
    hideBorder: true,
    floating: true,
  },
};

// Padding-right for last tile.
const _getPaddingRightLastChild = (
  leftOffset,
  gutter,
  peek,
  isTouchDevice,
  layout
) => {
  const parsedGutter = parseInt(gutter);
  switch (peek) {
    case 'none':
      return isTouchDevice
        ? parsedGutter < 16
          ? 16 - parsedGutter
          : parsedGutter - 16
        : parsedGutter < GRID_MARGIN
        ? GRID_MARGIN - parsedGutter
        : parsedGutter - GRID_MARGIN;
    case 'minimum': // Only available on mobile or touch device. If passed on desktop/tablet, do the same calculations for peek standard
      if (isTouchDevice) {
        return parsedGutter < 16 ? 16 - parsedGutter : 0;
      } else {
        return parsedGutter < 24
          ? leftOffset + (parsedGutter - 4)
          : leftOffset - (parsedGutter - GRID_MARGIN);
      }
    case 'standard':
    default:
      if (isTouchDevice) {
        return parsedGutter < 16 ? 16 - parsedGutter : 0;
      }
      return parsedGutter < 24
        ? leftOffset + (parsedGutter - 4) // Deduct 4px to achieve the correct padding. 20px for desktop/tablet and
        : leftOffset - (parsedGutter - GRID_MARGIN);
  }
};

// Split peek
const _getScrollPadding = (leftOffset, gutter, peek) => {
  const parsedGutter = parseInt(gutter);
  const _diff =
    parsedGutter > 24
      ? parsedGutter - GRID_MARGIN
      : parsedGutter < 20
      ? parsedGutter - GRID_MARGIN
      : GRID_MARGIN - parsedGutter;

  const _padding =
    parsedGutter > 12
      ? Math.ceil(leftOffset) + GRID_MARGIN * 2 + _diff
      : Math.ceil(leftOffset) + parsedGutter * 2 + _diff;

  switch (peek) {
    case 'standard':
    default:
      return _padding;
  }
};

const _getSlotAlignmentStyles = ({ vertical, horizontal }) => {
  return `
    align-items: ${
      vertical === 'middle' ? 'center' : vertical === 'bottom' ? 'end' : 'start'
    };
    justify-content: ${
      horizontal === 'center'
        ? 'center'
        : horizontal === 'right'
        ? 'end'
        : 'start'
    };
    ${vertical !== 'top' ? `height: 100%;` : ''}
  `;
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  ${({ iconVisible, paginationDisplay, peek, isKeyboardInteraction }) =>
    !iconVisible &&
    (paginationDisplay !== 'persistent' && peek !== 'none') &&
    css`
      ${isKeyboardInteraction &&
        `
        &:focus-within:not(:hover) {
        .left-pagination-control,
        .right-pagination-control,
        .left-pagination-control:focus-visible,
        .right-pagination-control:focus-visible {
          z-index: 2;
          opacity: 1;
          pointer-events: auto;
          }
        }
      `};
      &:not(:hover) {
        .left-pagination-control,
        .right-pagination-control,
        .left-pagination-control:focus:not(:focus-visible),
        .right-pagination-control:focus:not(:focus-visible) {
          z-index: -1;
          opacity: 0;
          pointer-events: none;
        }
      }
    `};
`;

const ScrollbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-top: ${({ paddingTop }) => paddingTop};
  z-index: 2;
  height: 8px;
  ${({ showDropShadow }) => showDropShadow && 'margin-top: -10px'};
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${({ isTouchDevice }) =>
    !isTouchDevice &&
    css`
      padding-top: ${LayoutTokens.space['2X']
        .value}; // TO allow tilelet to scale out of parent container due to being cut off by overflow properties applied here
    `};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom}; // Space for scrubber and to preserve space for tile hovering effects
  padding-left: ${({ paddingLeft }) =>
    paddingLeft}; // Align with grid specs. 20px for desktop/tablet and 16px for mobile (1UP layout only) when peek is standard
  > div > div > .slot {
    width: ${({ width }) => width}px;
  }
  will-change: scroll-position;
  width: ${({ carouselWidth }) => carouselWidth};
  overflow-y: hidden;
  overflow-x: scroll;
  box-sizing: border-box;
  ${({ peek, leftOffset, isTouchDevice, gutter, layout }) =>
    peek !== 'none' &&
    css`
      margin-left: 50%;
      transform: translateX(-50%);

      // ESSENTIAL FOR BLEED
      & .slotContainer:first-child {
        padding-left: ${leftOffset}px;
      }
      // ESSENTIAL FOR BLEED
      & .slotContainer:last-child {
        margin-right: 0;
        padding-right: ${_getPaddingRightLastChild(
          leftOffset,
          gutter,
          peek,
          isTouchDevice,
          layout
        )}px;
      }
    `};
  ${({ peek, leftOffset, gutter, paddingLeft }) =>
    peek === 'none'
      ? `scroll-padding: 0 ${paddingLeft};`
      : `scroll-padding: 0 ${_getScrollPadding(leftOffset, gutter, peek)}px;`};
  ${({ isCarouselMounted, scrollSnapType }) =>
    isCarouselMounted &&
    `
		scroll-snap-type: ${scrollSnapType};
	`};
  scroll-behavior: ${({ scrollSnapType }) =>
    scrollSnapType === 'none' ? 'none' : 'smooth'};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  // Prevent focusing on the container when tabbing in firefox
  &:focus-visible {
    outline: none;
  }

  ${({ onlyOneChild, paddingLeft, gutter, isTouchDevice }) =>
    !onlyOneChild &&
    gutter > paddingLeft &&
    css`
      & .slotContainer:last-child .slot {
        margin-right: ${paddingLeft};
      }
    `}

  ${({ onlyOneChild, isTouchDevice }) =>
    onlyOneChild &&
    css`
      padding-left: 0px;
      & .slotContainer:last-child {
        padding: 0px;
        margin-left: auto;
        margin-right: auto;
        width: ${isTouchDevice
          ? 'calc(100% - 32px)'
          : 'calc(100% - 40px)'}; // 1232 = 1270 - 40 (grid's padding 20px each)
        flex: 0 0 ${isTouchDevice ? 'calc(100% - 32px)' : 'calc(100% - 40px)'}; // Mobile: 100% - 32px because of grid's padding 16px each
      }
      & .slot {
        margin-right: 0px;
      }
    `}
`;

const SlotContainer = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  box-sizing: content-box;
  ${({ aspectRatio }) =>
    aspectRatio === 'none' &&
    css`
      display: flex; // MUST SET FOR CONTENT-DRIVEN HEIGHT
    `}
    flex: 0 0 ${({ width }) => width}px; 

`;

const Slot = styled.div`
  display: flex;
  ${({ slotAlignment }) => _getSlotAlignmentStyles(slotAlignment)};
  margin-right: ${({ gutter }) => gutter};
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  position: relative;
  ${({ aspectRatio, onlyOneChild, gutter }) =>
    aspectRatio === 'none' &&
    css`
      width: ${onlyOneChild
        ? `100%`
        : `calc(100% - ${gutter})`}; // MUST SET FOR CONTENT-DRIVEN HEIGHT
    `};
    ${({ isTouchDevice }) =>
      isTouchDevice &&
      css`
        &:hover {
          transform: none;
        }
        &:active {
          opacity: 100%;
        }
      `}
  }
  ${({ shouldSnap, snapAlign, scrollMargin, scrollSnapType }) =>
    shouldSnap &&
    scrollSnapType !== 'none' &&
    css`
      scroll-snap-align: ${snapAlign};
      scroll-margin: ${scrollMargin}px;
    `};
  ${({ surface }) => css`
    &:focus:not(:hover) {
      &::before {
        border: 1px dashed
          ${AccessibilityTokens.color.focusring[`on${surface}`].value};
        border-radius: 8px;
        content: '';
        position: absolute;
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 6px);
        height: calc(100% + 6px);
      }
    }
  `}
`;

function _getViewport(viewport) {
  switch (viewport) {
    case 'mobile':
    case 'mobileLarge':
      return 'mobile';
    case 'tabletLarge':
    case 'tablet':
      return 'tablet';
    case 'desktop':
    default:
      return 'desktop';
  }
}

function _getViewportBasedDefaultProp(viewport, propName) {
  if (viewport === 'mobile' || viewport === 'mobileLarge') {
    switch (propName) {
      case 'layout':
        return '1UP';
      case 'paginationInset':
        return '8px';
      case 'gutter':
        return '12px';
    }
  } else {
    switch (propName) {
      case 'layout':
        return '3UP';
      case 'paginationInset':
        return '12px';
      case 'gutter':
        return '24px';
    }
  }
}

const isHovered = element =>
  element &&
  element.parentElement &&
  element.parentElement.querySelector(':hover') === element;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canFocus: false, // To track for first keydown event
      mobileFocus: false,
      carouselWidth: 0,
      slotSize: 0,
      peekNumber: 0,
      selectedGroupIndex: 0,
      focusTarget: null,
      showLeftArrow: false,
      showRightArrow: true,
      isCarouselMounted: false,
      scrubberProgressPercentage: 0,
      scrollSnapType: 'x mandatory',
      firstVisibleTileInGroup: 0,
      isKeyboardInteraction: false,
    };
    this.scrollTimer = null;
    this.showLeftArrowTimer = null;
    this.showRighttArrowTimer = null;
    this.isTouchDevice = false;
    this.tilesCount = this.props.data.length;
    this.carouselId = `${generateUUID()}`;
    this.carouselContainerId = `carousel-container-${this.carouselId}`;
    this.paginationControlRightId = `right-pagination-control-${this.carouselId}`;
    this.paginationControlLeftId = `left-pagination-control-${this.carouselId}`;
    this.carouselSlotId = `carousel-${this.carouselId}-slot`;
    this.scrubberId = `scrollbar-${this.carouselId}`;
    this.scrubberThumbId = `${this.scrubberId}-thumb`;
    this.componentWrapperId = `component-wrapper-${this.carouselId}`;
    this.layout = this.props.layout
      ? this.props.layout
      : _getViewportBasedDefaultProp(this.props.viewport, 'layout');
    this.gutter = this.props.gutter
      ? this.props.gutter
      : _getViewportBasedDefaultProp(this.props.viewport, 'gutter');
    this.paginationInset = this.props.paginationInset
      ? this.props.paginationInset
      : _getViewportBasedDefaultProp(this.props.viewport, 'paginationInset');
  }

  _browser = getBrowser();

  isTouchDevice = checkIfMobileDevice();

  componentDidMount() {
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this._resize);

    this._resize();
    this.carousel =
      typeof document !== 'undefined'
        ? document.getElementById(this.carouselContainerId)
        : null;

    if (this.carousel !== null || this.carousel !== undefined) {
      /**
       * SCROLL TO INITIAL INDEX
       * -----------------------
       * NOTE: have to nest everything in a timeout to account for use-cases where carousel is rendered inside a VDS Modal
       * Also for to get viewportOverride values
       */
      setTimeout(() => {
        const selectedIndex = parseInt(this.decidingValue('selectedIndex'));
        if (selectedIndex > 0) {
          const maxGroupIndex =
            Math.ceil(
              this.props.data.length / parseInt(this.decidingValue('layout'))
            ) - 1;

          const groupIndex =
            selectedIndex < maxGroupIndex ? selectedIndex : maxGroupIndex;

          const _calculatedScrollLeft = Math.floor(
            (this.carousel.scrollWidth / this.props.data.length) *
              parseInt(this.decidingValue('layout'))
          );

          /**
           * For screen > 1272px, have to subtract the difference
           */
          const _calcScrollLeftDesktop =
            this.carousel.offsetWidth > 1272
              ? ((this.carousel.scrollWidth -
                  (this.carousel.offsetWidth - 1272)) /
                  this.props.data.length) *
                parseInt(this.decidingValue('layout'))
              : _calculatedScrollLeft;

          const _scrollTo = this.isTouchDevice
            ? groupIndex * _calculatedScrollLeft
            : groupIndex * _calcScrollLeftDesktop;
          // Override scroll behavior to instant but preserving smooth scrolling
          this.carousel.scroll({
            left: _scrollTo,
            behavior: 'instant',
          });
          // Setting state after this to prevent onChange being fired on inital loading when props.selectedIndex is sepcified
          this.setState({ selectedGroupIndex: groupIndex });
        }
      });

      typeof document !== 'undefined' &&
        document.addEventListener(
          'click',
          event => {
            const rightIcon = document.getElementById(
              this.paginationControlRightId
            );
            const leftIcon = document.getElementById(
              this.paginationControlLeftId
            );
            const isRightArrow = rightIcon && rightIcon.contains(event.target);
            const isLeftArrow = leftIcon && leftIcon.contains(event.target);
            if (
              ((this.carousel !== null &&
                this.carousel !== undefined &&
                !this.carousel.contains(event.target)) ||
                !isRightArrow ||
                !isLeftArrow) &&
              (isHovered(rightIcon) || isHovered(leftIcon))
            ) {
              // reset TC tab index and visible icons when clicked away
              this.setState({
                prevVisibleTile: undefined,
                isKeyboardInteraction: false, // TESTING as of 4/28
              });
            }
            this.setState({
              canFocus: false,
              // isKeyboardInteraction: false, // TESTING as of 4/28
            });
          },
          { passive: true }
        );

      this.setState({ isCarouselMounted: true });

      // To detect when start keyboard
      if (this.carousel !== null && this.carousel !== undefined) {
        document.addEventListener('keydown', event => {
          this.setState({
            isKeyboardInteraction: true,
            canFocus: this.carousel.contains(event.target),
          });
        });
      }
    }
  }

  componentWillUnmount() {
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this._resize);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { peek, gutter, layout, viewport } = prevProps;
    const { prevVisibleTile } = prevState;
    const currentVisibleTileInGroup =
      parseInt(this.decidingValue('layout')) * this.state.selectedGroupIndex;

    if (
      peek !== this.props.peek ||
      gutter !== this.props.gutter ||
      (this.props.layout && parseInt(layout) !== parseInt(this.props.layout)) ||
      viewport !== this.props.viewport
    ) {
      this._getProps();
      this._resize();
    }

    // HAVE TO TRACK PREVIOUS VISIBLE TILE TO AVOID GLITCHING BETWEEN NEW VISIBLE TILE AND TAB NEXT TO NEXT TILE
    if (currentVisibleTileInGroup !== prevVisibleTile) {
      if (this.isTouchDevice ? this.state.mobileFocus : true) {
        const focusedSlot =
          typeof document !== 'undefined' &&
          document.getElementById(
            `${this.carouselSlotId}-${currentVisibleTileInGroup}`
          );
        const focusedTile = focusedSlot
          ? focusedSlot.querySelector('[tabindex]:not([tabindex="-1"])')
          : null;

        if ((this.state.canFocus || this.state.mobileFocus) && focusedTile) {
          if (getOS() === 'ios') {
            setTimeout(() => {
              focusedTile.focus();
            }, 300);
          } else {
            focusedTile.focus();
          }
        }
        this.setState({
          prevVisibleTile: currentVisibleTileInGroup,
          mobileFocus: false,
        });

        const compWrapper =
          typeof document !== 'undefined' &&
          document.getElementById(this.componentWrapperId);

        if (
          focusedTile === null &&
          compWrapper.parentElement.querySelector(':focus-within') ===
            compWrapper
        ) {
          const rightArrow =
            typeof document !== 'undefined' &&
            document.getElementById(`${this.paginationControlRightId}`);
          const leftArrow =
            typeof document !== 'undefined' &&
            document.getElementById(`${this.paginationControlLeftId}`);
          const lastGroupIndex =
            Math.ceil(
              this.props.data.length / parseInt(this.decidingValue('layout'))
            ) - 1;
          if (rightArrow && currentVisibleTileInGroup === 0) {
            rightArrow.focus();
          } else if (
            leftArrow &&
            this.state.selectedGroupIndex === lastGroupIndex
          ) {
            leftArrow.focus();
          }
        }
      }
    }

    if (this.state.focusTarget) {
      // force focus on focusTarget element
      typeof document !== 'undefined' &&
        document.getElementById(this.state.focusTarget).focus();
      this.setState({ focusTarget: null, prevVisibleTile: undefined }); // Rest prevVisibleTile to allow for refocus first tile
    }
  };

  /**
   * Function to check if there's a prop to be overridden by the viewportOverride prop
   */
  decidingValue = value => {
    const { viewport, viewportOverride } = this.props;
    const override = viewportOverride && viewportOverride[viewport];
    if (override && override[value] !== undefined) {
      return override[value];
    } else {
      switch (value) {
        case 'layout':
          return this.layout;
        case 'gutter':
          return this.gutter;
        case 'paginationInset':
          return this.paginationInset;
        default:
          return this.props[value];
      }
    }
  };

  // TO control scrolling margin
  _getSlotScrollMargin = () => {
    const { data, viewport } = this.props;
    const { carouselWidth, peekNumber, slotSize } = this.state;
    const gutterProp = this.decidingValue('gutter');
    const layoutProp = this.decidingValue('layout');
    const parseLayout = parseInt(layoutProp);
    const peekPropValue = this.decidingValue('peek');
    const peekProp =
      parseLayout !== 1 &&
      (viewport === 'mobile' || viewport === 'mobileLarge') &&
      peekPropValue === 'standard'
        ? 'minimum'
        : peekPropValue;
    const _isMobile =
      this.isTouchDevice &&
      (viewport === 'mobile' || viewport === 'mobileLarge');

    const isSpecialCase = data.length <= parseInt(layoutProp);
    let isWideScreen = carouselWidth > 1272;

    if (isSpecialCase) {
      return 0;
    } else {
      switch (peekProp) {
        case 'none':
          return 0;
        case 'minimum':
          return isWideScreen
            ? peekNumber - parseInt(gutterProp) * 2
            : _isMobile
            ? 0
            : parseInt(gutterProp) * 2 + 24; // Set to 0 for mobile
        case 'standard':
        default:
          return isWideScreen
            ? (peekNumber - parseInt(gutterProp) * 2) / 2
            : _isMobile
            ? 0
            : (slotSize - parseInt(gutterProp)) * 0.25; // Set 0 for mobile
      }
    }
  };

  _renderTiles = () => {
    const { data, viewport, slotAlignment } = this.props;
    const { selectedGroupIndex, slotSize } = this.state;

    let snapIndex = 0;
    const layoutProp = this.decidingValue('layout');
    const parseLayout = parseInt(layoutProp);
    const peekPropValue = this.decidingValue('peek');
    const peekProp =
      parseLayout !== 1 &&
      (viewport === 'mobile' || viewport === 'mobileLarge') &&
      peekPropValue === 'standard'
        ? 'minimum'
        : peekPropValue;
    const aspectRatioProp = this.decidingValue('aspectRatio');
    const paginationDisplayProp = this.decidingValue('paginationDisplay');

    return data.map((tile, i) => {
      const isVisibleIndex =
        i >= parseLayout * selectedGroupIndex &&
        i < selectedGroupIndex * parseLayout + parseLayout;
      const titleText = tile && tile.title && tile.title.children;
      const SubtitleText =
        tile && tile.subtitle && tile.subtitle.children
          ? tile.subtitle.children
          : tile.subtitle && tile.subtitle.text;

      let itemTabIndex;
      let ariaHidden;

      if (
        this.isTouchDevice &&
        (paginationDisplayProp === 'onHover' ||
          paginationDisplayProp === 'none') &&
        peekProp !== 'none'
      ) {
        itemTabIndex = 0;
        ariaHidden = false;
      } else {
        itemTabIndex = isVisibleIndex ? 0 : -1;
        ariaHidden = !isVisibleIndex;
      }

      if (i % parseLayout === 0) {
        snapIndex = i;
      }

      const {
        'data-analyticstrack': analyticsTrack,
        'data-track': track,
        'data-track-ignore': ignoreTrack,
        'data-clickstream': clickStream,
        ariaLabel,
      } = tile;

      const TitleNode = getNodeText(titleText);
      const SubtitleNode = getNodeText(SubtitleText);

      const calculateAriaLabel = () => {
        const labelText = ariaLabel
          ? ariaLabel
          : !titleText && !SubtitleText
          ? ''
          : `${
              tile && !!tile.badge && !!tile.badge.children
                ? tile.badge.children
                : ''
            } ${!!titleText ? TitleNode : ''}
                ${!!SubtitleText ? SubtitleNode : ''}`;

        return this.isTouchDevice || isVisibleIndex
          ? `Slide ${i + 1} of ${this.tilesCount} ${labelText}`
          : ' ';
      };

      return (
        <SlotContainer
          className="slotContainer"
          key={`slot-container-${i}`}
          width={slotSize}
          aspectRatio={aspectRatioProp}
        >
          <Slot
            scrollSnapType={this.state.scrollSnapType}
            className="slot"
            id={`${this.carouselSlotId}-${i}`}
            key={`Tile-${i}`}
            gutter={this.decidingValue('gutter')}
            onKeyDown={this._handleOnKeyDown}
            shouldSnap={parseLayout === 1 ? true : i === snapIndex}
            snapAlign={parseLayout === 1 ? 'center' : 'start'}
            aria-hidden={ariaHidden}
            aria-live={'off'}
            aria-atomic={false}
            isTouchDevice={this.isTouchDevice}
            scrollMargin={this._getSlotScrollMargin()}
            aspectRatio={aspectRatioProp}
            surface={this.decidingValue('surface')}
            slotAlignment={slotAlignment}
            onlyOneChild={parseLayout === 1 && this.tilesCount === 1}
          >
            {this.props.renderItem({
              ...tile,
              ariaLabel: calculateAriaLabel(),
              aspectRatio: !aspectRatioProp ? 'none' : aspectRatioProp, // Passing undefined will default to 1:1 per  component
              viewport: _getViewport(viewport),
              tabIndex: itemTabIndex,
              inView: ariaHidden ? false : true, // Pass this back to user so they can apply this to their interactive elements
              grouped: true, // To add fix height issue in safari when Tilelet grouped in Carousel
              surface: this.decidingValue('surface'),
              'data-analyticstrack': analyticsTrack,
              'data-track': track,
              'data-track-ignore': ignoreTrack,
              'data-clickstream': clickStream,
            })}
          </Slot>
        </SlotContainer>
      );
    });
  };

  _getIconButtonMargin = () => {
    // ensure that the icons will be aligned if the parent has a max-width above 1272px
    const compWrapper =
      typeof document !== 'undefined' &&
      document.getElementById(this.componentWrapperId);
    const wrapperWidth =
      compWrapper && compWrapper.getBoundingClientRect().width;

    const noWrapperBuffer = wrapperWidth > 1272 ? (wrapperWidth - 1272) / 2 : 0;

    const peekProp = this.decidingValue('peek');
    const paginationInsetProp = this.decidingValue('paginationInset');
    const parsePaginationInset =
      parseInt(paginationInsetProp) + noWrapperBuffer;

    switch (peekProp) {
      case 'none':
      case 'minimum':
      case 'standard':
      default:
        return parsePaginationInset;
    }
  };

  _renderButtonIconRight = () => {
    const {
      viewport,
      surface,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
    } = this.props;
    const paginationFillProp = this.decidingValue('paginationFill');
    const hidePaginationBorderProp = this.decidingValue('hidePaginationBorder');
    const paginationProp = this.decidingValue('pagination');

    return (
      <PaginationControlsButton
        id={this.paginationControlRightId}
        className="right-pagination-control"
        position="right"
        surface={surface}
        ariaHidden={false}
        tabIndex={0}
        paginationFill={paginationFillProp}
        pagination={paginationProp}
        hidePaginationBorder={hidePaginationBorderProp}
        viewport={viewport}
        getPaginationInset={this._getIconButtonMargin}
        onKeyDown={this._rightArrowKeyDown}
        onClick={e => {
          this._onMoveForward(e);
        }}
        data-track={track}
        data-track-ignore={trackIgnore}
        data-analyticstrack={analyticsTrack}
        data-clickstream={clickStream}
      />
    );
  };

  _renderButtonIconLeft = () => {
    const {
      viewport,
      surface,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
    } = this.props;
    const paginationFillProp = this.decidingValue('paginationFill');
    const paginationProp = this.decidingValue('pagination');
    const hidePaginationBorderProp = this.decidingValue('hidePaginationBorder');

    return (
      <PaginationControlsButton
        id={this.paginationControlLeftId}
        className="left-pagination-control"
        surface={surface}
        position="left"
        ariaHidden={false}
        tabIndex={0}
        paginationFill={paginationFillProp}
        pagination={paginationProp}
        hidePaginationBorder={hidePaginationBorderProp}
        viewport={viewport}
        getPaginationInset={this._getIconButtonMargin}
        onKeyDown={this._leftArrowKeyDown}
        onClick={e => {
          this._onMoveBackward(e);
        }}
        data-track={track}
        data-track-ignore={trackIgnore}
        data-analyticstrack={analyticsTrack}
        data-clickstream={clickStream}
      />
    );
  };

  _getProps = () => {
    this.layout = this.props.layout
      ? this.props.layout
      : _getViewportBasedDefaultProp(this.props.viewport, 'layout');
    this.gutter = this.props.gutter
      ? this.props.gutter
      : _getViewportBasedDefaultProp(this.props.viewport, 'gutter');
    this.paginationInset = this.props.paginationInset
      ? this.props.paginationInset
      : _getViewportBasedDefaultProp(this.props.viewport, 'paginationInset');
  };

  _resize = () => {
    const { data, viewport } = this.props;
    const gutterProp = this.decidingValue('gutter');
    const layoutProp = this.decidingValue('layout');
    const parseLayout = parseInt(layoutProp);
    const parseGutter = parseInt(gutterProp);
    const peekPropValue = this.decidingValue('peek');
    const peekProp =
      parseLayout !== 1 &&
      (viewport === 'mobile' || viewport === 'mobileLarge') &&
      peekPropValue === 'standard'
        ? 'minimum'
        : peekPropValue;
    this.carousel =
      typeof document !== 'undefined'
        ? document.getElementById(this.carouselContainerId)
        : null;
    const width = this.carousel && this.carousel.getBoundingClientRect()?.width;
    const isSpecialCase = data.length <= parseLayout;
    const _isMobile =
      this.isTouchDevice || viewport === 'mobile' || viewport === 'mobileLarge';

    let _carouselWidth;
    let _peekNumber;
    let _gridOffset;

    if (peekProp !== 'none' || isSpecialCase) {
      _carouselWidth = width > 1272 ? 1272 : width;
    } else {
      _carouselWidth = width;
    }

    this.setState({ carouselWidth: width });

    // IMPORTANT. TO calculate the offset based on gutter and grid_margin (20px) so that the last tile of set
    // aligns with one grid column + 20px per design.
    _gridOffset = parseGutter - 4 + GRID_MARGIN;

    if (isSpecialCase) {
      _peekNumber = 0;
    } else {
      switch (peekProp) {
        case 'none':
          _peekNumber = 0;
          break;
        case 'minimum':
          _peekNumber = _isMobile
            ? 24 * 2
            : (_carouselWidth - parseGutter * 2 - 11 * parseGutter) / 12 +
              _gridOffset; // If passed minimum when in desktop, reverts to peek standard
          break;
        case 'standard':
        default:
          _peekNumber =
            (_carouselWidth - parseGutter * 2 - 11 * parseGutter) / 12 +
            _gridOffset; // Width of a column + 20px grid margin. Refer to _gridOffset calculation
          break;
      }
    }

    const _slotSize =
      peekProp === 'none' || isSpecialCase
        ? (_carouselWidth - (_isMobile ? 16 : 20)) / parseLayout // Minus either 16 or 20px to account for padding-left applied to carousel-container
        : Math.floor(
            (_carouselWidth - _peekNumber) / // Minus the peek to get the container width then divide by layout
              parseLayout
          );
    this.setState({
      slotSize: _slotSize,
      peekNumber: _peekNumber,
    });
  };

  _onMoveForward = e => {
    const layoutProp = this.decidingValue('layout');
    const { carouselWidth, selectedGroupIndex } = this.state;
    const { onChange } = this.props;

    const keyList = ['Enter', ' ', 'ArrowUp', 'ArrowRight']; // Space key is literally an empty space
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;
    const validKeyCode = keyList.includes(eventKey);
    const rightArrow = document.getElementById(this.paginationControlRightId);

    // Prevent page jump
    if (eventKey === ' ') e.preventDefault();

    // Have to set it here so it moves on mobile
    if (
      selectedGroupIndex + 1 !==
      Math.ceil(this.props.data.length / parseInt(layoutProp))
    ) {
      if (this.isTouchDevice) {
        this.setState({ selectedGroupIndex: selectedGroupIndex + 1 });
        if (onChange) onChange(e, selectedGroupIndex + 1);
      }
    }

    // When tabbing, have to timeout so focusedSlot is updated then scroll carousel
    // Otherwise, if a click event, don't time out
    // ON SAFARI: scroll first then set next focused slot
    if (validKeyCode || !isHovered(rightArrow)) {
      if (this._browser === 'safari') {
        this.carousel.scrollLeft += Math.ceil(carouselWidth / 2);
        this.isTouchDevice && this.setState({ mobileFocus: true });
        // setTimeout(() => {
        //   selectedGroupIndex + 1 !=
        //     Math.ceil(this.props.data.length / parseInt(layoutProp)) &&
        //     this.setState({ selectedGroupIndex: selectedGroupIndex + 1 });
        // });
      } else {
        // For android mobile accessibility navigating with arrows
        this.isTouchDevice && this.setState({ mobileFocus: true });
        setTimeout(
          () => (this.carousel.scrollLeft += Math.ceil(carouselWidth / 2))
        );
      }
    } else if (e.type !== 'keydown' && isHovered(rightArrow)) {
      if (getOS() === 'android') {
        setTimeout(
          () => (this.carousel.scrollLeft += Math.ceil(carouselWidth / 2))
        );
      } else {
        this.carousel.scrollLeft += Math.ceil(carouselWidth / 2);
      }

      // FOr iOS mobile accessibility navigating with arrows
      this.isTouchDevice && this.setState({ mobileFocus: true }); // When peek is none and is on a touch device.
    }
  };

  _rightArrowKeyDown = e => {
    const keyList = ['Enter', ' ', 'ArrowRight'];
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;
    const validKeyCode = keyList.includes(eventKey);
    const rightArrow = document.getElementById(this.paginationControlRightId);

    if (eventKey === 'ArrowRight') {
      // need to create a function that finds the next focusable target outside of the current active element
      e.preventDefault();
      return this.setState({ prevVisibleTile: undefined }); // Reset prevVisibleTile so can re-focus on the first tile in current set
    }

    if (e.target.id === this.paginationControlRightId && eventKey === 'Tab') {
      return (
        !e.shiftKey &&
        setTimeout(() => this.setState({ prevVisibleTile: undefined }), 2) // Reset prevVisibleTile so can re-focus on the first tile in current set
      );
    }

    if (e.target.id === this.paginationControlRightId && !validKeyCode) return;
    e.preventDefault();
    this._onMoveForward(e);
  };

  _onMoveBackward = e => {
    const { carouselWidth, selectedGroupIndex } = this.state;
    const { onChange } = this.props;
    const keyList = ['Enter', ' ', 'ArrowDown', 'ArrowLeft'];
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;
    const validKeyCode = keyList.includes(eventKey);
    const leftArrow = document.getElementById(this.paginationControlLeftId);

    if (eventKey === ' ') e.preventDefault();

    // Have to set it here so it moves on mobile
    if (selectedGroupIndex !== 0 && this.isTouchDevice) {
      this.setState({ selectedGroupIndex: selectedGroupIndex - 1 });
      if (onChange) onChange(e, selectedGroupIndex - 1);
    }

    // When tabbing, have to timeout so focusedSlot is updated then scroll carousel
    // Otherwise, if a click event, don't time out
    if (validKeyCode || !isHovered(leftArrow)) {
      // For Android mobile accessibility navigating with arrows
      this.isTouchDevice && this.setState({ mobileFocus: true });
      this.carousel.scrollLeft -= Math.ceil(carouselWidth / 2);
    } else if (e.type !== 'keydown' && isHovered(leftArrow)) {
      if (getOS() === 'android') {
        setTimeout(
          () => (this.carousel.scrollLeft -= Math.ceil(carouselWidth / 2))
        );
      } else {
        this.carousel.scrollLeft -= Math.ceil(carouselWidth / 2);
      }

      // For iOS mobile accessibility navigating with arrows
      this.isTouchDevice && this.setState({ mobileFocus: true });
    }
  };

  _leftArrowKeyDown = e => {
    const keyList = ['Enter', ' ', 'ArrowLeft'];
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;
    const validKeyCode = keyList.includes(eventKey);
    const leftArrow = document.getElementById(this.paginationControlLeftId);

    if (
      ((e.shiftKey && eventKey === 'Tab') || eventKey === 'ArrowLeft') &&
      e.target.id === this.paginationControlLeftId
    ) {
      //e.preventDefault();
      return this.setState({ prevVisibleTile: false });
    } else if (e.target.id === this.paginationControlLeftId && !validKeyCode) {
      return;
    } else {
      e.preventDefault();
      this._onMoveBackward(e);
    }
  };

  _handleOnKeyDown = e => {
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;
    const { data } = this.props;
    // Remove focus when leaving the carousel with shift+tab or tab keys
    if (
      e.target.closest('.slot').id.includes(this.carouselSlotId) &&
      (eventKey === 'ArrowRight' || eventKey === 'ArrowLeft')
    ) {
      return eventKey === 'ArrowRight'
        ? this._onMoveForward(e)
        : this._onMoveBackward(e);
    }
  };

  _onCarouselScroll = e => {
    const lastScrollWidth =
      e.currentTarget.scrollWidth - e.currentTarget.offsetWidth;

    const progressPercentage = e.currentTarget.scrollLeft / lastScrollWidth;
    this.setState({ scrubberProgressPercentage: progressPercentage });

    /**
     * To determine selectedGroupIndex when scrolling
     */
    const leftScroll = e.currentTarget.scrollLeft / e.currentTarget.scrollWidth;

    const slideIndex = Math.ceil(leftScroll * this.props.data.length);

    // Calculate group index based on the position of current tile/group
    const calcGroupIndex = Math.ceil(
      slideIndex / parseInt(this.decidingValue('layout'))
    );

    // Last tile/group index
    const lastGroupIndex =
      Math.ceil(
        this.props.data.length / parseInt(this.decidingValue('layout'))
      ) - 1;

    // FINAL groupIndex used to update carousel
    let groupIndex;

    if (this.showLeftArrowTimer) {
      clearTimeout(this.showLeftArrowTimer);
    }

    if (this.showRighttArrowTimer) {
      clearTimeout(this.showRighttArrowTimer);
    }

    /**
     * NOTE: special check for edge cases where:
     * scrolling to last group with odd number of tiles not updating calcGroupIndex correctly based on position
     */
    if (
      e.currentTarget.scrollLeft === lastScrollWidth &&
      calcGroupIndex !== lastGroupIndex
    ) {
      groupIndex = lastGroupIndex;
    } else {
      groupIndex = calcGroupIndex;
      if (calcGroupIndex < lastGroupIndex && !this.state.showRightArrow) {
        this.setState({ showRightArrow: true }); // Reset
      }
    }

    if (e.currentTarget.scrollLeft === 0) {
      // setTimeout needed to prevent the focus jump out from container
      this.showLeftArrowTimer = setTimeout(() => {
        this.showLeftArrowTimer = null;
        this.setState({ showLeftArrow: false });
      }, 300);
    } else if (
      Math.ceil(e.currentTarget.scrollLeft) >= lastScrollWidth ||
      groupIndex >= lastGroupIndex
    ) {
      // setTimeout needed to prevent the focus jump out from container
      this.showRighttArrowTimer = setTimeout(() => {
        this.showRighttArrowTimer = null;
        this.setState({ showRightArrow: false });
      }, 300);
      /**
       * To account for initial scroll to last index resulting in this else if block -> leftarrow not rendered
       *  */

      if (!this.state.showLeftArrow) this.setState({ showLeftArrow: true });
    } else {
      this.setState({
        showRightArrow: true,
        showLeftArrow: true,
      });
    }

    // to set focus on 1st tile of selected group
    // this.setState({ canFocus: true });

    // SET TIMER HERE TO DETECT GROUP INDEX WHEN SCROLLING via touch and update group index after it ends scrolling.
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {
      this.scrollTimer = null;
      if (this.state.selectedGroupIndex !== groupIndex) {
        if (this.props.onChange) this.props.onChange(e, groupIndex);
        this.setState({
          selectedGroupIndex: groupIndex,
          canFocus: this.state.isKeyboardInteraction,
        });
      }
    }, 100);
  };

  _onScrubberDrag = dragPercentage => {
    const scrollableWidth =
      this.carousel.scrollWidth - this.carousel.offsetWidth;
    this.carousel.scrollLeft = scrollableWidth * dragPercentage;
  };

  _shouldRenderArrows = arrowPosition => {
    const { showLeftArrow, showRightArrow } = this.state;
    const { viewport } = this.props;
    const layoutProp = this.decidingValue('layout');
    const parseLayout = parseInt(layoutProp);
    const peekPropValue = this.decidingValue('peek');
    const peekProp =
      parseLayout !== 1 &&
      (viewport === 'mobile' || viewport === 'mobileLarge') &&
      peekPropValue === 'standard'
        ? 'minimum'
        : peekPropValue;
    const paginationDisplayProp = this.decidingValue('paginationDisplay');

    // Arrows stay persistent when peek is none for both mobile and desktop
    if (peekProp === 'none') {
      return arrowPosition === 'left' ? showLeftArrow : showRightArrow;
    } else {
      switch (paginationDisplayProp) {
        case 'none':
          return false;
        case 'onHover': // onHover behavior doens't exist on mobile devices so will not render arrows unless persistent
          return this.isTouchDevice
            ? false
            : arrowPosition === 'left'
            ? showLeftArrow
            : showRightArrow;
        case 'persistent':
          return arrowPosition === 'left' ? showLeftArrow : showRightArrow;
      }
    }
  };

  _getScrubberWrapperPadding = showDropShadow => {
    const { viewport } = this.props;

    switch (viewport) {
      case 'mobile':
      case 'mobileLarge':
        return LayoutTokens.space['6X'].value;

      case 'desktop':
      case 'tabletLarge':
      case 'tablet':
      default:
        // add custom padding to fit box shadow and remove extra amount of space added from container
        return showDropShadow ? '42px' : LayoutTokens.space['8X'].value;
    }
  };

  _getContainerPaddingLeft = () => {
    const { viewport } = this.props;
    return this.isTouchDevice ||
      viewport === 'mobile' ||
      viewport === 'mobileLarge'
      ? LayoutTokens.space['4X'].value
      : LayoutTokens.space['5X'].value;
  };

  _onThumbMouseDown = () => this.setState({ scrollSnapType: 'none' });
  _onThumbMouseUp = () => this.setState({ scrollSnapType: 'x mandatory' });
  _onThumbTouchStart = () => this.setState({ scrollSnapType: 'none' });
  _onThumbTouchEnd = () => this.setState({ scrollSnapType: 'x mandatory' });

  render() {
    const {
      data,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
      viewport,
    } = this.props;

    const {
      slotSize,
      carouselWidth,
      isCarouselMounted,
      scrubberProgressPercentage,
      selectedGroupIndex,
    } = this.state;

    if (data) {
      this.isTouchDevice = checkIfMobileDevice();
    }

    const peekPropValue = this.decidingValue('peek');
    const layoutProp = this.decidingValue('layout');
    const tilesVisible = parseInt(layoutProp);
    const parseLayout = parseInt(layoutProp);
    const peekProp =
      parseLayout !== 1 &&
      (viewport === 'mobile' || viewport === 'mobileLarge') &&
      peekPropValue === 'standard'
        ? 'minimum'
        : peekPropValue;

    const isSpecialCase = data.length <= tilesVisible;
    const totalGroups = Math.ceil(data.length / parseInt(layoutProp));
    const showDropShadow = data && data.some(obj => obj.showDropShadow);

    return (
      <ComponentWrapper id={this.componentWrapperId}>
        <Wrapper
          iconVisible={this.isTouchDevice}
          paginationDisplay={this.decidingValue('paginationDisplay')}
          peek={peekProp}
          isKeyboardInteraction={this.state.isKeyboardInteraction}
          role="group"
          aria-label={`Carousel with ${this.tilesCount} slides`}
        >
          {!isSpecialCase &&
            this._shouldRenderArrows('left') &&
            this._renderButtonIconLeft()}
          <CarouselContainer
            onlyOneChild={tilesVisible === 1 && this.tilesCount === 1}
            paddingLeft={this._getContainerPaddingLeft()}
            paddingBottom={this._getScrubberWrapperPadding(showDropShadow)}
            scrollSnapType={this.state.scrollSnapType}
            id={this.carouselContainerId}
            peek={isSpecialCase ? 'none' : peekProp}
            width={slotSize}
            gutter={this.decidingValue('gutter')}
            onScroll={this._onCarouselScroll}
            isCarouselMounted={isCarouselMounted}
            leftOffset={carouselWidth >= 1272 ? (carouselWidth - 1272) / 2 : 0}
            isTouchDevice={
              this.isTouchDevice ||
              viewport === 'mobile' ||
              viewport === 'mobileLarge'
            }
            tabIndex={this.isTouchDevice ? undefined : -1} // Prevent Firefox from focusing the carousel container. Set to undefined on mobile, otherwise android will focus on this before first tile
            // carouselWidth={carouselWidth >= 1272 ? '100vw' : '100%'}
            carouselWidth={
              peekProp === 'none'
                ? '100%'
                : carouselWidth >= 1272
                ? '100vw'
                : '100%'
            }
            layout={tilesVisible}
          >
            {this._renderTiles()}
          </CarouselContainer>
          {!isSpecialCase &&
            this._shouldRenderArrows('right') &&
            this._renderButtonIconRight()}
        </Wrapper>
        {!isSpecialCase && (
          <ScrollbarWrapper showDropShadow={showDropShadow}>
            <CarouselScrollbar
              scrubberId={this.scrubberId}
              onThumbMouseDown={this._onThumbMouseDown}
              onThumbMouseUp={this._onThumbMouseUp}
              onThumbTouchStart={this._onThumbTouchStart}
              onThumbTouchEnd={this._onThumbTouchEnd}
              numberOfSlides={data.length}
              layout={layoutProp}
              totalGroups={totalGroups}
              onMoveForward={this._onMoveForward}
              onMoveBackward={this._onMoveBackward}
              onScrubberDrag={this._onScrubberDrag}
              surface={this.decidingValue('surface')}
              position={scrubberProgressPercentage}
              selectedGroupIndex={selectedGroupIndex}
              data-track={track}
              data-track-ignore={trackIgnore}
              data-analyticstrack={analyticsTrack}
              data-clickstream={clickStream}
            />
          </ScrollbarWrapper>
        )}
      </ComponentWrapper>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default withVDSManager(Carousel, true);
