import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Title, Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { TrailingTooltip } from '@vds-core/tooltips';
import { _findTooltipSize } from '../utils/TooltipSizeCalc';

const propTypes = {
  /**
   * Determines the fontsize for this component.
   */
  size: PropTypes.oneOf([
    'bodySmall',
    'bodyMedium',
    'bodyLarge',
    'titleSmall',
    'titleMedium',
    'titleLarge',
    'titleXLarge',
  ]),
  /**
   * Determines primitive of TitleLockupEyebrow.
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),
  /**
   * Accepts a string, array or node value to render as text.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * Accepts a boolean to configure eyebrow font weight.
   */
  bold: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If true, will not render paddingBottom
   */
  isStandAlone: PropTypes.bool,
  /**
   * Config object for tooltip option
   */
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
  /**
   * @ignore
   * If true, Both title and subtitle/eyebrow type style and size are same
   */
  uniformSize: PropTypes.bool,
  /**
   * @ignore
   * If true, the title font weight is considered as bold
   */
  isTitleBold: PropTypes.bool,
};

const defaultProps = {
  primitive: 'h3',
  bold: false,
  surface: 'light',
  isStandAlone: false,
};

const EyebrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  text-align: inherit;
`;

const TitleLockupEyebrow = props => {
  const {
    size,
    primitive,
    children,
    paddingBottom,
    bold,
    surface,
    viewport,
    isStandAlone,
    tooltip,
    uniformSize,
    isTitleBold,
  } = props;

  const calculateEyebrowSize = size => {
    switch (size) {
      case 'bodySmall':
      case 'titleSmall':
        return 'small';
      case 'bodyMedium':
      case 'titleMedium':
        return 'medium';
      case 'titleLarge':
      case 'bodyLarge':
        return 'large';
      case 'titleXLarge':
        return 'XLarge';
    }
  };

  let EyebrowComponent = size && size.substring(0, 4) === 'body' ? Body : Title;

  let typographyType =
    size && size.substring(0, 4) === 'body' ? 'body' : 'title';

  return (
    <EyebrowWrapper paddingBottom={isStandAlone ? 0 : paddingBottom}>
      {tooltip ? (
        <TrailingTooltip
          typographySize={calculateEyebrowSize(size)}
          typographyType={typographyType}
          typographyPrimitive={primitive}
          bold={uniformSize ? (isTitleBold ? false : true) : bold}
          surface={surface}
          iconFillColor={
            uniformSize && isTitleBold ? 'secondary' : tooltip.iconFillColor
          }
          typographyColor={
            uniformSize && isTitleBold
              ? ColorTokens.elements.secondary[`on${surface}`].value
              : undefined
          }
          tooltip={{
            ariaLabel: tooltip.ariaLabel,
            closeButtonText: tooltip.closeButtonText,
            containerId: tooltip.containerId,
            disabled: tooltip.disabled,
            size: _findTooltipSize(
              tooltip.size ? tooltip.size : undefined,
              size,
              viewport
            ),
            title: tooltip.title,
            children: tooltip.children,
          }}
        >
          {children}
        </TrailingTooltip>
      ) : (
        <EyebrowComponent
          bold={uniformSize ? (isTitleBold ? false : true) : bold}
          size={calculateEyebrowSize(size)}
          primitive={primitive}
          children={children}
          color={
            uniformSize && isTitleBold
              ? ColorTokens.elements.secondary[`on${surface}`].value
              : ColorTokens.elements.primary[`on${surface}`].value
          }
          viewport={viewport}
        ></EyebrowComponent>
      )}
    </EyebrowWrapper>
  );
};

export default TitleLockupEyebrow;

TitleLockupEyebrow.displayName = 'TitleLockupEyebrow';
TitleLockupEyebrow.propTypes = propTypes;
TitleLockupEyebrow.defaultProps = defaultProps;
