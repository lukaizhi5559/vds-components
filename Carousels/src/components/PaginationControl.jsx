import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';
import { ButtonIcon } from '@vds-core/button-icons';

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
    'desktopLarge',
    'desktopXLarge',
  ]),
  hidePaginationBorder: PropTypes.bool,
  paginationFill: PropTypes.oneOf(['light', 'dark']),
  pagination: PropTypes.shape({
    kind: PropTypes.oneOf(['ghost', 'lowContrast', 'highContrast']),
    hideBorder: PropTypes.bool,
    floating: PropTypes.bool,
  }),
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
  z-index: 3;
  position: absolute;
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
  align-items: center;
  justify-content: center;
`;

/**
 * @ignore
 */
const PaginationControlsButton = props => {
  const {
    position,
    ariaHidden,
    surface,
    tabIndex,
    viewport,
    hidePaginationBorder,
    paginationFill,
    pagination,
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
      className={className ? className : `${position}-pagination-control`}
      left={position === 'left'}
      isMobile={isMobile}
      margin={getPaginationInset()}
    >
      <ButtonIcon
        id={id ? id : `${position}-pagination-control`}
        kind={pagination && pagination.kind ? pagination.kind : 'lowContrast'}
        size={isMobile ? '28' : '40'}
        surface={paginationFill ? paginationFill : surface}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        fitToIcon={true}
        floating={pagination && pagination.floating}
        hideBorder={pagination && pagination.hideBorder}
        ariaLabel={
          position === 'left' ? 'previous page of tiles' : 'next page of tiles'
        }
        ariaHidden={ariaHidden}
        iconOffset={{
          x: isMobile
            ? position === 'left'
              ? -1
              : 1
            : position === 'left'
            ? -2
            : 2,
          y: 0,
        }}
        role={'button'}
        renderIcon={props => (
          <svg
            id="Layer_39"
            data-name="Layer 39"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21.6 21.6"
            height={isMobile ? '12' : '16'}
          >
            {position === 'left' ? (
              <polygon
                fill={props.color}
                points="14.74336 20.10078 5.44258 10.8 14.74336 1.49922 16.15742 2.91328 8.2707 10.8 16.15742 18.68672 14.74336 20.10078"
              />
            ) : (
              <polygon
                fill={props.color}
                points="6.85664 20.10127 5.44258 18.68721 13.3293 10.79951 5.44258 2.91279 6.85664 1.49873 16.15742 10.79951 6.85664 20.10127"
              />
            )}
          </svg>
        )}
        data-track={track}
        data-track-ignore={trackIgnore}
        data-analyticstrack={analyticsTrack}
        data-clickstream={clickStream}
      />
    </IconButton>
  );
};

PaginationControlsButton.propTypes = propTypes;
PaginationControlsButton.defaultProps = defaultProps;

export default PaginationControlsButton;
