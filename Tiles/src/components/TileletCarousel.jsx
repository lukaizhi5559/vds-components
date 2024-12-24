import React from 'react';
import PropTypes from 'prop-types';
import { withVDSManager } from '@vds-core/utilities';
import { Carousel as BaseCarousel } from '@vds-core/carousels';
import Tilelet from './Tilelet';

const propTypes = {
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
   * The amount of slides visible in the carousel container at one time. The default value will be 3UP in desktop/tablet and 1UP in mobile.
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
   * If provided, will apply margin to pagination arrows. Can be set to either positive or negative values. The default value will be 12px in desktop/tablet and 8px in mobile.
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
    }),
    desktop: PropTypes.shape({
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
    }),
  }),
  /**
   * Data used to render the tilelets in the carousel
   * @typeName TileletData
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
};

const defaultProps = {
  peek: 'standard',
  aspectRatio: '2:3',
  paginationDisplay: 'onHover',
  surface: 'light',
  hidePaginationBorder: false,
  pagination: {
    kind: 'lowContrast',
    hideBorder: true,
    floating: true,
  },
};

class TileletCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseCarousel
        {...this.props}
        renderItem={tile => (
          <Tilelet
            {...tile}
            width="100%"
            height={this.props.aspectRatio === 'none' ? '100%' : ''}
          />
        )}
      />
    );
  }
}

TileletCarousel.propTypes = propTypes;
TileletCarousel.defaultProps = defaultProps;

export default withVDSManager(TileletCarousel, true);
