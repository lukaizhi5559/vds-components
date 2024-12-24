import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';
import { ColorTokens } from '@vds-tokens/color';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

const propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']),
  ariaHidden: PropTypes.bool,
  tabIndex: PropTypes.number,
  viewport: PropTypes.oneOf([
    'mobile',
    'mobileLarge',
    'tablet',
    'tabletLarge',
    'desktop',
  ]),
  hidePaginationBorder: PropTypes.bool,
  paginationFill: PropTypes.oneOf(['light', 'dark']),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  getPaginationInset: PropTypes.func,
  'data-analyticstrack': PropTypes.string,
  'data-track': PropTypes.string,
  'data-track-ignore': PropTypes.string,
  'data-clickstream': PropTypes.string,
};

const defaultProps = {};

const IconButton = styled.span`
  -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
  z-index: 2;
  position: absolute;
  width: ${({ isMobile }) => (isMobile ? calculateRem(28) : calculateRem(40))};
  height: ${({ isMobile }) => (isMobile ? calculateRem(28) : calculateRem(40))};
  top: ${({ isMobile }) =>
    isMobile
      ? css`calc(50% - ${LayoutTokens.space['6X'].value}); // Account for paddingBottom 24px of carousel
      `
      : css`calc(50% - ${LayoutTokens.space['8X'].value}); // Account for paddingBottom 32px of carousel
      `};
  ${({ left, margin }) =>
    left
      ? `left: 0; margin-left: ${margin}px;`
      : `right: 0; margin-right: ${margin}px;`}
  display: flex;
  cursor: pointer;
  background-color: ${({ paginationFill }) =>
    ColorTokens.background.primary[paginationFill].value};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
  ${({ hidePaginationBorder, paginationFill }) =>
    !hidePaginationBorder &&
    css`
      border: 1px solid
        ${paginationFill === 'light'
          ? ColorTokens.elements.lowcontrast.onlight.value
          : ColorTokens.elements.lowcontrast.ondark.value};
    `}
  &:active {
    svg {
      polygon {
        fill: ${({ paginationFill }) =>
          ColorTokens.interactive.active[`on${paginationFill}`].value};
      }
    }
  }
  &:hover {
    transform: scale(1.1) translate(0, 0) perspective(1px);
  }
  &::before {
    width: 44px;
    height: 44px;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:focus:not(:hover) {
    &::after {
      border: 1px dashed
        ${({ paginationFill }) =>
          AccessibilityTokens.color.focusring[`on${paginationFill}`].value};
      border-radius: 50%;
      content: '';
      position: absolute;
      pointer-events: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 4px);
      height: calc(100% - 4px);
    }
  }
`;

const SVGWrapper = styled.div`
  display: flex;
  position: absolute;
  height: ${({ isMobile }) =>
    isMobile
      ? calculateRem(LayoutTokens.space['3X'].value)
      : calculateRem(LayoutTokens.space['4X'].value)};
  width: ${({ isMobile }) =>
    isMobile
      ? calculateRem(LayoutTokens.space['3X'].value)
      : calculateRem(LayoutTokens.space['4X'].value)};
  ${({ isMobile, left, hidePaginationBorder }) =>
    left
      ? css`
          left: ${isMobile
            ? hidePaginationBorder
              ? 7
              : 6
            : hidePaginationBorder
            ? 11
            : 10}px;
          right: ${isMobile
            ? hidePaginationBorder
              ? 9
              : 8
            : hidePaginationBorder
            ? 13
            : 12}px;
        `
      : css`
          left: ${isMobile
            ? hidePaginationBorder
              ? 9
              : 8
            : hidePaginationBorder
            ? 13
            : 12}px;
          right: ${isMobile
            ? hidePaginationBorder
              ? 7
              : 6
            : hidePaginationBorder
            ? 11
            : 10}px;
        `}
  &:active,
  &:focus {
    outline: none;
  }
  > svg {
    polygon {
      fill: ${({ paginationFill }) =>
        ColorTokens.elements.primary[`on${paginationFill}`].value};
    }
  }
`;

/**
 * @ignore
 */
const PaginationControlsButton = props => {
  const {
    position,
    ariaHidden,
    tabIndex,
    viewport,
    hidePaginationBorder,
    paginationFill,
    onClick,
    onKeyDown,
    getPaginationInset,
    id,
    className,
    'data-track': track,
    'data-track-ignore': trackIgnore,
    'data-analyticstrack': analyticsTrack,
    'data-clickstream': clickStream,
  } = props;

  const isMobile = viewport === 'mobile' || viewport === 'mobileLarge';

  return (
    <IconButton
      id={id ? id : `${position}-pagination-control`}
      className={className ? className : `${position}-pagination-control`}
      left={position === 'left'}
      onClick={onClick}
      onKeyDown={onKeyDown}
      isMobile={isMobile}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-label={position === 'left' ? 'Previous slide' : 'Next slide'}
      role="button"
      margin={getPaginationInset()}
      paginationFill={paginationFill}
      hidePaginationBorder={hidePaginationBorder}
      data-track={track}
      data-track-ignore={trackIgnore}
      data-analyticstrack={analyticsTrack}
      data-clickstream={clickStream}
    >
      <SVGWrapper
        left={position === 'left'}
        paginationFill={paginationFill}
        isMobile={isMobile}
        hidePaginationBorder={hidePaginationBorder}
      >
        <svg
          id="Layer_39"
          data-name="Layer 39"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21.6 21.6"
        >
          {position === 'left' ? (
            <polygon points="14.74336 20.10078 5.44258 10.8 14.74336 1.49922 16.15742 2.91328 8.2707 10.8 16.15742 18.68672 14.74336 20.10078" />
          ) : (
            <polygon points="6.85664 20.10127 5.44258 18.68721 13.3293 10.79951 5.44258 2.91279 6.85664 1.49873 16.15742 10.79951 6.85664 20.10127" />
          )}
        </svg>
      </SVGWrapper>
    </IconButton>
  );
};

PaginationControlsButton.propTypes = propTypes;
PaginationControlsButton.defaultProps = defaultProps;

export default PaginationControlsButton;
