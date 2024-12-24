import React from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { Title } from '@vds-core/typography';
import { TrailingTooltip } from '@vds-core/tooltips';

const propTypes = {
  /**
   * If true, title will be bold
   */
  bold: PropTypes.bool,
  /**
   * Passes a new primitive to the ListGroupItemTitle Component
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),
  /**
   * If provided, will render the ListGroupItemTitle when surface is light or dark.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Determines whether mobile, or desktop fontstacks are used.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * Content for title
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
  bold: false,
  primitive: 'p',
  surface: 'light',
  viewport: 'desktop',
};

const ListGroupItemTitle = props => {
  const {
    bold,
    surface,
    viewport,
    children,
    tooltip,
    primitive,
    tabIndex,
  } = props;

  const hasTooltip = tooltip && (tooltip.title || tooltip.children);

  const titleColor = ColorTokens.elements.primary[`on${surface}`].value;

  const _renderTrailingTooltip = () => {
    return (
      <span
        onClick={e => {
          // e.stopPropagation();
          // e.stopImmediatePropagation();
        }}
      >
        <TrailingTooltip
          onClick={e => {
            e.stopPropagation();
            // e.stopImmediatePropagation();
          }}
          {...tooltip}
          tabIndex={0}
          bold={bold}
          typographyType="title"
          typographySize="small"
          viewport={viewport}
          surface={surface}
          typographyColor={titleColor}
          iconFillColor="primary"
          tooltipTitle={!!tooltip.title ? tooltip.title : undefined}
          tooltipContent={!!tooltip.children ? tooltip.children : undefined}
          tooltipCloseButtonText={
            !!tooltip.closeButtonText ? tooltip.closeButtonText : undefined
          }
          tooltipSize="medium"
          typographyPrimitive={primitive}
        >
          {children}
        </TrailingTooltip>
      </span>
    );
  };

  const _renderTitleAlone = () => {
    return (
      <Title
        bold={bold}
        color={titleColor}
        viewport={viewport}
        primitive={primitive}
      >
        {children}
      </Title>
    );
  };

  return hasTooltip ? _renderTrailingTooltip() : _renderTitleAlone();
};

ListGroupItemTitle.propTypes = propTypes;
ListGroupItemTitle.defaultProps = defaultProps;
ListGroupItemTitle.displayName = 'ListGroupItemTitle';

export default ListGroupItemTitle;
