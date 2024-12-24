import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tilelet from './Tilelet';
import { withVDSManager } from '@vds-core/utilities';

const propTypes = {
  /**
   * Sets the width for all of the tilelets. Accepts a pixel or percentage value.
   */
  width: PropTypes.string,
  /**
   * Sets the height for all of the tilelets. Accepts a pixel or percentage value.
   * @note Can not be used in conjunction with aspect ratio.
   */
  height: PropTypes.string,
  /**
   * This controls the aspect ratio for the tilelets.
   * @note If a height is defined, this property is ignored.
   */
  aspectRatio: PropTypes.string,
  /**
   * If true, a drop shadow is rendered on the tilelets.
   */
  showDropShadow: PropTypes.bool,
  /**
   * Tells the tilelets the tone of the surface on which it lives.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * If true, a border is rendered around the tilelets.
   */
  showBorder: PropTypes.bool,
  /**
   * Sets the inside padding for the tilelets.
   */
  innerPadding: PropTypes.string,
  /**
   * Aligns TitleLockup's subcomponent's text.
   */
  textAlignment: PropTypes.oneOf(['center', 'left']),
  /**
   * Determines where the text aligns vertically for the tilelets.
   */
  textPosition: PropTypes.string,
  /**
   * Sets the background color for the tilelets.
   */
  backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
  /**
   * Allows to specify the background for the component.
   */
  background: PropTypes.string,
  /**
   * Determines the width of the texts for the tilelets.
   */
  textWidth: PropTypes.string,
  /**
   * Viewport the TileletGroup will be rendered in.
   */
  viewport: PropTypes.oneOf([
    'desktopXLarge',
    'desktopLarge',
    'desktop',
    'tabletLarge',
    'tablet',
    'mobileLarge',
    'mobile',
  ]),
  /**
   * Allows props to be overridden at specific viewports.
   */
  viewportOverride: PropTypes.shape({
    mobile: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    mobileLarge: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    tablet: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    tabletLarge: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    desktop: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    desktopLarge: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
    desktopXLarge: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      aspectRatio: PropTypes.string,
      showDropShadow: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      showBorder: PropTypes.bool,
      textAlignment: PropTypes.oneOf(['center', 'left']),
      textPosition: PropTypes.string,
      backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
      background: PropTypes.string,
      textWidth: PropTypes.string,
    }),
  }),
  /**
   * Allows props to be overridden for specific tilelets within the group by using a dara object.
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
    })
  ),
  /**
   * Determines the number of tilelets per row.
   * @note Max of 3 for 'mobile' viewports, 6 for the other
   */
  rowQuantity: PropTypes.number,
  /**
   * Determines the gutter between the tilelets. Fixed to 12px for 'mobile' viewports.
   */
  gutterWidth: PropTypes.oneOf(['40px', '24px']),
  /**
   * ID of component.
   */
  id: PropTypes.string,
};

const defaultProps = {
  tileletWidth: '100%',
  showBorder: false,
  showDropShadow: PropTypes.bool,
  surface: 'light',
  gutterWidth: '40px',
};

const TileletGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  margin-right: ${({ negativeMargin }) => negativeMargin};
`;

const TileletWrapper = styled.div`
  width: ${({ width }) => width};
  padding-right: ${({ gutterPadding }) => gutterPadding};
  box-sizing: border-box;
  padding-bottom: 20px;
`;

class TileletGroup extends Component {
  render() {
    const {
      data,
      rowQuantity,
      viewport,
      gutterWidth,
      viewportOverride,
    } = this.props;

    const calculateGutterWidth = () => {
      if (viewport === 'mobile' || viewport === 'mobileLarge') {
        return '12px';
      } else {
        return gutterWidth === '24px' ? '24px' : '40px';
      }
    };

    const calculateNegativeMargin = () => {
      if (viewport === 'mobile' || viewport === 'mobileLarge') {
        return '-12px';
      } else {
        return gutterWidth === '-24px' ? '-24px' : '-40px';
      }
    };

    const calculateRowQuantity = () => {
      const noOfTiles = rowQuantity ? rowQuantity : !!data ? data.length : 0; // To maintain content-drive height for tiles when rowQuantity is not passed
      if (viewport === 'mobile' || viewport === 'mobileLarge') {
        return noOfTiles > 3 ? 3 : noOfTiles;
      } else {
        return noOfTiles > 6 ? 6 : noOfTiles;
      }
    };

    const _renderTilelets = () => {
      return (
        <>
          {data.map((tilelet, index) => {
            if (!tilelet || !Object.keys(tilelet).length) return null;

            const override = viewportOverride && viewportOverride[viewport];

            const decidingValue = value => {
              if (override && override[value] !== undefined) {
                return override[value];
              } else if (
                (!override || (override && !override[value])) &&
                tilelet &&
                tilelet[value]
              ) {
                return tilelet[value];
              } else {
                return this.props[value];
              }
            };

            const {
              'data-analyticstrack': analyticsTrack,
              'data-track': track,
              'data-track-ignore': ignoreTrack,
              'data-clickstream': clickStream,
            } = tilelet;

            return (
              <TileletWrapper
                key={index}
                gutterPadding={calculateGutterWidth}
                width={tilelet && tilelet.width ? 'auto' : rowWidth}
                rowQuantity={rowQuantity}
                viewport={viewport}
              >
                <Tilelet
                  {...tilelet}
                  width={decidingValue('width')}
                  height={decidingValue('height')}
                  aspectRatio={decidingValue('aspectRatio')}
                  showDropShadow={decidingValue('showDropShadow')}
                  surface={decidingValue('surface')}
                  showBorder={decidingValue('showBorder')}
                  innerPadding={decidingValue('innerPadding')}
                  textAlignment={decidingValue('textAlignment')}
                  textPosition={decidingValue('textPosition')}
                  backgroundColor={decidingValue('backgroundColor')}
                  background={decidingValue('background')}
                  textWidth={decidingValue('textWidth')}
                  data-analyticstrack={analyticsTrack}
                  data-track={track}
                  data-track-ignore={ignoreTrack}
                  data-clickstream={clickStream}
                />
              </TileletWrapper>
            );
          })}
        </>
      );
    };

    let rowWidth = 100 / parseInt(calculateRowQuantity()) + '%';

    return (
      <TileletGroupWrapper negativeMargin={calculateNegativeMargin}>
        {_renderTilelets()}
      </TileletGroupWrapper>
    );
  }
}

TileletGroup.propTypes = propTypes;
TileletGroup.defaultProps = defaultProps;

export default withVDSManager(TileletGroup, true);
