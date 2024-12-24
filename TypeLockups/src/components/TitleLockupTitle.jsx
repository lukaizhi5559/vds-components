import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Title, Feature, Body } from '@vds-core/typography';
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
    'title2XLarge',
    'featureXSmall',
    'featureSmall',
    'featureMedium',
  ]),
  /**
   *  @deprecated
   *  Determines the number of lines  of text allowed.
   */
  numberOfLines: PropTypes.number,
  /**
   * Determines primitive of component.
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),
  /**
   * Accepts a string, array or node value to render as text.
   */
  children: PropTypes.node.isRequired,
  /**
   * Makes text to bold.
   */
  bold: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * When there's no subtitle, disable margin-bottom of title
   */
  isStandAlone: PropTypes.bool,
  /**
   * Config object for tooltip option
   */
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
};

const defaultProps = {
  size: 'titleLarge',
  primitive: 'h1',
  bold: true, // MUST BE TRUE
  surface: 'light',
  isStandAlone: false,
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: inherit;
  margin-bottom: ${({ paddingBottom }) => paddingBottom};
`;

const TitleLockupTitle = props => {
  const {
    size,
    primitive,
    children,
    bold,
    viewport,
    surface,
    isStandAlone,
    tooltip,
  } = props;

  const calculateTitleSize = size => {
    switch (size) {
      case 'featureXSmall':
        return 'XSmall';
      case 'titleSmall':
      case 'featureSmall':
      case 'bodySmall':
        return 'small';
      case 'titleMedium':
      case 'featureMedium':
      case 'bodyMedium':
        return 'medium';
      case 'titleLarge':
      case 'bodyLarge':
        return 'large';
      case 'titleXLarge':
        return 'XLarge';
      case 'title2XLarge':
        return '2XLarge';
    }
  };

  const calculateDesktopPadding = size => {
    switch (size) {
      case 'bodySmall':
      case 'bodyMedium':
      case 'bodyLarge':
        return '4px';
      case 'titleSmall':
      case 'titleMedium':
        return '8px';
      case 'titleLarge':
        return '12px';
      case 'titleXLarge':
        return '16px';
      case 'title2XLarge':
      case 'featureXSmall':
      case 'featureSmall':
      case 'featureMedium':
        return '24px';
    }
  };

  const calculateMobilePadding = size => {
    switch (size) {
      case 'bodySmall':
      case 'bodyMedium':
      case 'bodyLarge':
        return '4px';
      case 'titleSmall':
      case 'titleMedium':
      case 'titleLarge':
        return '8px';
      case 'titleXLarge':
        return '12px';
      case 'title2XLarge':
      case 'featureXSmall':
      case 'featureSmall':
        return '16px';
      case 'featureMedium':
        return '24px';
    }
  };

  let finalPadding =
    viewport === 'mobile'
      ? calculateMobilePadding(size)
      : calculateDesktopPadding(size);

  let TitleComponent =
    size === 'featureXSmall' ||
    size === 'featureSmall' ||
    size === 'featureMedium'
      ? Feature
      : ['bodySmall', 'bodyMedium', 'bodyLarge'].indexOf(size) > -1
      ? Body
      : Title;

  let typographyType =
    size === 'featureXSmall' ||
    size === 'featureSmall' ||
    size === 'featureMedium'
      ? 'feature'
      : ['bodySmall', 'bodyMedium', 'bodyLarge'].indexOf(size) > -1
      ? 'body'
      : 'title';

  return (
    <TitleWrapper size={size} paddingBottom={isStandAlone ? 0 : finalPadding}>
      {tooltip ? (
        <TrailingTooltip
          typographySize={calculateTitleSize(size)}
          typographyType={typographyType}
          typographyPrimitive={primitive}
          bold={bold}
          surface={surface}
          iconFillColor={tooltip.iconFillColor}
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
        <TitleComponent
          bold={bold}
          size={calculateTitleSize(size)}
          primitive={primitive}
          children={children}
          color={
            surface === 'dark'
              ? ColorTokens.elements.primary.ondark.value
              : ColorTokens.elements.primary.onlight.value
          }
          viewport={viewport}
        />
      )}
    </TitleWrapper>
  );
};

export default TitleLockupTitle;

TitleLockupTitle.displayName = 'TitleLockupTitle';
TitleLockupTitle.propTypes = propTypes;
TitleLockupTitle.defaultProps = defaultProps;
