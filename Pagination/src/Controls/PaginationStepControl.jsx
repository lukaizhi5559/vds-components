import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';
import PaginationLink from './PaginationLink';

// Use pagination-left-arrow icon
const PaginationLeftArrowIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M19.8,11.7h-15l7.1,7.1L10.7,20l-9.3-9.2l9.3-9.2l1.3,1.3L4.8,9.9h15L19.8,11.7z" />
  </svg>
);

// Use pagination-right-arrow icon
const PaginationRightArrowIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M20.26723,10.80317,10.94378,20.044,9.6764,18.7643l7.12223-7.05674H1.8014v-1.8H16.808L9.68256,2.84378l1.26738-1.278Z" />
  </svg>
);

const propTypes = {
  /**
   * @ignore
   */
  baseUrl: PropTypes.func,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  selectedPage: PropTypes.number,
  /**
   * @ignore
   */
  total: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  direction: PropTypes.oneOf(['previous', 'next']),
  /**
   * Border radius for focus ring
   */
  focusBorderRadius: PropTypes.string,
};

const defaultProps = {
  className: null,
  surface: 'light',
  total: null,
};

const sizeHitArea = '44px';
const sizeIcon = 12;
const fontWeight = TypographyTokens.fontweight.bold.value;
const colorControl = ColorTokens.elements.primary.onlight.value;
const colorControlInverted = ColorTokens.elements.primary.ondark.value;
const spaceIconInline = LayoutTokens.space['2X'].value;

const controlConfig = {
  previous: {
    ariaLabel: 'Go to previous page.',
    icon: PaginationLeftArrowIcon,
    text: 'Previous',
    pageNumber: selectedPage => {
      return Math.max(1, selectedPage - 1);
    },
    visibility: selectedPage => {
      return selectedPage === 1 ? 'hidden' : 'visible';
    },
  },
  next: {
    ariaLabel: 'Go to next page.',
    icon: PaginationRightArrowIcon,
    text: 'Next',
    pageNumber: (selectedPage, total) => {
      return Math.min(total, selectedPage + 1);
    },
    visibility: (selectedPage, total) => {
      return selectedPage === total ? 'hidden' : 'visible';
    },
  },
};

const StepControlSpan = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  svg {
    margin-top: -1px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ direction }) =>
    direction === 'previous'
      ? `padding-right: ${calculateRem(spaceIconInline)}`
      : `padding-left: ${calculateRem(spaceIconInline)}`}
`;

const IconSVGWrapper = styled.div`
  display: flex;
  height: ${({ iconSize }) => calculateRem(iconSize)};
  width: ${({ iconSize }) => calculateRem(iconSize)};
  min-height: ${({ iconSize }) => calculateRem(iconSize)};
  min-width: ${({ iconSize }) => calculateRem(iconSize)};
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
  svg {
    height: ${({ iconSize }) => calculateRem(iconSize)};
    width: ${({ iconSize }) => calculateRem(iconSize)};
    path {
      fill: ${({ iconColor }) => iconColor};
    }
  }
`;

/**
 * @ignore
 */
const PaginationStepControl = props => {
  const {
    baseUrl,
    className,
    selectedPage,
    onClick,
    cta,
    position,
    level,
    dataTrack,
    surface,
    direction,
    total,
    focusBorderRadius,
  } = props;

  const linkStyles = {
    display: 'flex',
    justifyContent: direction === 'previous' ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    fontWeight: fontWeight,
    height: calculateRem(sizeHitArea),
    minWidth: calculateRem(sizeHitArea),
    visibility: controlConfig[direction].visibility(selectedPage, total),
  };

  const pageNumber = controlConfig[direction].pageNumber(selectedPage, total);

  const _renderIcon = () => {
    return (
      <IconWrapper direction={direction}>
        <IconSVGWrapper
          tabIndex={-1}
          iconSize={sizeIcon}
          iconColor={surface === 'dark' ? colorControlInverted : colorControl}
          aria-label={`pagination-${
            direction === 'previous' ? 'left' : 'right'
          }-arrow icon`}
        >
          {controlConfig[direction].icon}
        </IconSVGWrapper>
      </IconWrapper>
    );
  };

  return (
    <PaginationLink
      aria-label={controlConfig[direction].ariaLabel}
      role="link"
      tabIndex={0}
      baseUrl={baseUrl}
      className={className}
      selectedPage={selectedPage}
      pageNumber={pageNumber}
      linkStyles={linkStyles}
      onClick={e => {
        onClick(pageNumber);
      }}
      cta={cta}
      position={position}
      level={level}
      dataTrack={dataTrack}
      surface={surface}
      focusBorderRadius={focusBorderRadius}
    >
      <StepControlSpan>
        {direction === 'next' && controlConfig[direction].text}
        {_renderIcon()}
        {direction === 'previous' && controlConfig[direction].text}
      </StepControlSpan>
    </PaginationLink>
  );
};

PaginationStepControl.propTypes = propTypes;
PaginationStepControl.defaultProps = defaultProps;

export default PaginationStepControl;
