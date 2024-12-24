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
   * @deprecated
   * Determines the number of lines allowed.
   */
  numberOfLines: PropTypes.number,
  /**
   * Determines primitive of TitleLockupSubtitle.
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
   * Color of the subtitle.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
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
};

const defaultProps = {
  primitive: 'h2',
  color: 'primary',
  surface: 'light',
};

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: inherit;
`;

const TitleLockupSubtitle = props => {
  const {
    size,
    primitive,
    children,
    surface,
    color,
    viewport,
    tooltip,
  } = props;

  const calculateSubtitleSize = size => {
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

  let SubtitleComponent =
    size && size.substring(0, 4) === 'body' ? Body : Title;

  let typographyType =
    size && size.substring(0, 4) === 'body' ? 'body' : 'title';

  return (
    <SubtitleWrapper>
      {tooltip ? (
        <TrailingTooltip
          typographySize={calculateSubtitleSize(size)}
          typographyPrimitive={primitive}
          typographyColor={
            surface === 'dark'
              ? ColorTokens.elements[color].ondark.value
              : ColorTokens.elements[color].onlight.value
          }
          typographyType={typographyType}
          surface={surface}
          iconFillColor={tooltip.iconFillColor ? tooltip.iconFillColor : color}
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
        <SubtitleComponent
          size={calculateSubtitleSize(size)}
          primitive={primitive}
          children={children}
          bold={false}
          color={
            surface === 'dark'
              ? ColorTokens.elements[color].ondark.value
              : ColorTokens.elements[color].onlight.value
          }
          viewport={viewport}
        />
      )}
    </SubtitleWrapper>
  );
};

export default TitleLockupSubtitle;

TitleLockupSubtitle.displayName = 'TitleLockupSubtitle';
TitleLockupSubtitle.propTypes = propTypes;
TitleLockupSubtitle.defaultProps = defaultProps;
