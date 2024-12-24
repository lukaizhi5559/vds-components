import React from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { Body } from '@vds-core/typography';
import { TrailingTooltip } from '@vds-core/tooltips';

const propTypes = {
  /**
   * If provided, will render the ListGroupItemSubtitle when surface is light or dark.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Passes a new primitive to the ListGroupItemSubtitle Component
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),
  /**
   * Determines whether mobile, or desktop fontstacks are used.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * Content for subtitle
   */
  children: PropTypes.node,
  /**
   * Config object for tooltip option
   * @note Can be used with all actionElement options specified in ListGroupItem
   */
  tooltip: PropTypes.shape({
    renderAnchorElement: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    containerId: PropTypes.string,
    ariaLabel: PropTypes.string,
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
  surface: 'light',
  primitive: 'p',
  viewport: 'desktop',
};

const ListGroupItemSubtitle = props => {
  const { surface, viewport, children, tooltip, primitive, tabIndex } = props;

  const hasTooltip = tooltip && (tooltip.title || tooltip.children);

  const subtitleColor = ColorTokens.elements.secondary[`on${surface}`].value;

  const isMobile = viewport === 'mobile';

  const _renderSubtitleAlone = () => {
    return (
      <Body
        color={subtitleColor}
        size={isMobile ? 'small' : 'large'}
        viewport={viewport}
        primitive={primitive}
      >
        {children}
      </Body>
    );
  };

  const _renderTrailingTooltip = () => {
    return (
      <span
        onClick={e => {
          if (e) {
            e.stopPropagation();
          }
        }}
      >
        <TrailingTooltip
          tabIndex={0}
          {...tooltip}
          typographyType="body"
          typographySize={isMobile ? 'small' : 'large'}
          typographyColor={subtitleColor}
          viewport={viewport}
          iconFillColor="secondary"
          surface={surface}
          tooltipTitle={!!tooltip.title ? tooltip.title : undefined}
          tooltipContent={!!tooltip.children ? tooltip.children : undefined}
          tooltipCloseButtonText={
            !!tooltip.closeButtonText ? tooltip.closeButtonText : undefined
          }
          tooltipSize={isMobile ? 'small' : 'medium'}
          typographyPrimitive={primitive}
        >
          {children}
        </TrailingTooltip>
      </span>
    );
  };

  return hasTooltip ? _renderTrailingTooltip() : _renderSubtitleAlone();
};

ListGroupItemSubtitle.propTypes = propTypes;
ListGroupItemSubtitle.defaultProps = defaultProps;
ListGroupItemSubtitle.displayName = 'ListGroupItemSubtitle';

export default ListGroupItemSubtitle;
