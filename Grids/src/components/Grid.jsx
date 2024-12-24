/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid as FlexboxGrid } from 'react-styled-flexboxgrid';
import { withVDSManager, calculateRem, breakpoints } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';

// ---------------------------------------------
// Props
// ---------------------------------------------

const propTypes = {
  /**
   * Children for the grid. This should be the VDS Row components,
   * containing the VDS Col components. The page content should be inside the Col components.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set a fixed height for the grid container
   */
  height: PropTypes.string,
  /**
   * @ignore
   */
  align: PropTypes.oneOf([
    'flex-start',
    'space-between',
    'space-around',
    'flex-end',
    'center',
    'space-evenly',
  ]),
  /**
   * When provided, will set global sizes for all Col components for each viewport [mobile, tablet, desktop]
   */
  colSizes: PropTypes.object,
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop.
   * Desktop and tablet are the same size.
   * @note In order to pass in 'tabletLarge', 'mobileLarge', 'desktopLarge' and 'desktopXLarge', must enable expanded prop
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
   * @Ignore
   */
  colGutter: PropTypes.bool,
  /**
   * @Ignore
   */
  gutterWidth: PropTypes.oneOf(['40px', '24px']),
  /**
   * When passed, will set the global spacing between all Row components inside the grid
   */
  rowGutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * This is the max width for the Grid container, defaults to 1440 for brand3.
   */
  bleed: PropTypes.oneOf(['1920', '1600', '1440', 'full', '1272']),
  /**
   * Option to use expanded viewports
   */
  expanded: PropTypes.bool,
  /**
   * @ignore
   */
  minDesktop: PropTypes.string,
  /**
   * @ignore
   */
  mobileGutter: PropTypes.string,
  /**
   * @ignore
   */
  mobileRowInset: PropTypes.string,
};

const defaultProps = {
  className: null,
  expanded: false,
  colGutter: true,
  gutterWidth: '40px',
  height: '100%',
  colSizes: {
    mobile: 1,
    mobileLarge: 1,
    tablet: 1,
    tabletLarge: 1,
    desktop: 1,
    desktopLarge: 1,
    desktopXLarge: 1,
  },
  viewport: undefined,
  rowGutter: undefined,
  align: 'flex-start',
  bleed: '1440',
  minDesktop: '1024px',
  mobileRowInset: '10px',
  mobileGutter: LayoutTokens.space['3X'].value,
};

const baseEm = 16;

function _emNumberFromBreakPoint(breakpoint) {
  let parsedBreak = Number(breakpoint.split('px', 1)),
    number = parsedBreak / baseEm;
  return number;
}

const StyledGridContainer = styled.div`
  width: 100%;
  max-width: ${({ bleed }) =>
    bleed === 'full'
      ? '100%'
      : bleed === '1920'
      ? '1920px'
      : bleed === '1600'
      ? '1600px'
      : bleed === '1440'
      ? '1440px'
      : '1272px'};
  margin: 0 auto;
  ${({ height }) =>
    height &&
    `
    height: ${height};
  `};
`;

function getColumnSizes(child, parentSizes, viewport, expanded) {
  const childSizes =
    (child.props.colSizes &&
      _mapColSizes(child.props.colSizes, viewport, expanded)) ||
    {};
  // remove undefined sizes
  Object.keys(childSizes).forEach(
    key => childSizes[key] === undefined && delete childSizes[key]
  );

  if (Object.keys(childSizes).length === 4) return childSizes;
  else return { ...parentSizes, ...childSizes };
}

function _mapColSizes(colSizes, viewport, expanded) {
  let filteredViewport;
  if (expanded) {
    filteredViewport = viewport;
  } else {
    if (viewport === 'mobileLarge') {
      filteredViewport = 'mobile';
    } else if (viewport === 'tabletLarge') {
      filteredViewport = 'tablet';
    } else if (viewport === 'desktopLarge' || viewport == 'desktopXLarge') {
      filteredViewport = 'desktop';
    } else {
      filteredViewport = viewport;
    }
  }

  let xs = viewport ? colSizes[filteredViewport] : colSizes.mobile,
    sm = viewport
      ? colSizes[filteredViewport]
      : expanded
      ? colSizes.mobileLarge
      : colSizes.mobile,
    md = viewport
      ? colSizes[filteredViewport]
      : expanded
      ? colSizes.tabletLarge
      : colSizes.tablet,
    lg = viewport
      ? colSizes[filteredViewport]
      : expanded
      ? typeof window !== 'undefined' && window.innerWidth >= 1921
        ? colSizes.desktopXLarge
        : colSizes.desktopLarge
      : colSizes.desktop;
  return {
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
  };
}

const Grid = props => {
  const {
    children,
    colGutter,
    gutterWidth: gutterWidthProp,
    rowGutter,
    viewport,
    colSizes,
    align,
    className,
    bleed,
    minDesktop,
    mobileGutter,
    mobileRowInset,
    expanded,
    ...rest
  } = props;

  const innerWidth = typeof window !== 'undefined' && window.innerWidth;
  const gutterWidth =
    viewport === 'mobile' ||
    viewport === 'mobileLarge' ||
    (innerWidth && innerWidth < 768)
      ? mobileGutter
      : gutterWidthProp === '24px'
      ? 24
      : 40;
  const gutterWidthRem = calculateRem(gutterWidth);

  let mappedColSizes = _mapColSizes(colSizes, viewport, expanded);

  let BREAKPOINTS = { ...breakpoints, lg: minDesktop };

  // sm: '544px',
  // md: '768px',
  // lg: '991px',
  // xl: '1272px',
  // tablet is sm -> md
  // desktop is md+
  const theme = {
    flexboxgrid: {
      gridSize: viewport === 'mobile' || viewport === 'mobileLarge' ? 4 : 12,
      gutterWidth: colGutter ? gutterWidthRem.replace('rem', '') : 0,
      mediaQuery: 'only screen',
      breakpoints: {
        xs: _emNumberFromBreakPoint('0px'), //0
        sm: _emNumberFromBreakPoint(BREAKPOINTS.md), //0 -> 767px mobile
        md: _emNumberFromBreakPoint(BREAKPOINTS.lg), //768 px -> 1023px tablet
        lg: _emNumberFromBreakPoint(BREAKPOINTS.xl), //1024+ desktop
      },
    },
  };

  return (
    <FlexboxGrid
      theme={theme}
      fluid={true}
      style={{
        paddingRight: 0,
        paddingLeft: 0,
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%',
        fontSize: '16px',
        flex: 1,
      }}
    >
      <StyledGridContainer
        {...rest}
        bleed={bleed}
        theme={theme}
        gutterWidth={gutterWidth}
      >
        {React.Children.map(children, (child, index) => {
          const styles = {
            flexDirection: 'row',
            justifyContent: align,
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingRight:
              viewport === 'mobile' || viewport === 'mobileLarge'
                ? mobileRowInset
                : gutterWidth === 24
                ? LayoutTokens.space['2X'].value
                : 0,
            paddingLeft:
              viewport === 'mobile' || viewport === 'mobileLarge'
                ? mobileRowInset
                : gutterWidth === 24
                ? LayoutTokens.space['2X'].value
                : 0,
          };

          const gutteredChildren =
            child && child.props && child.props.children
              ? React.Children.map(
                  child.props.children,
                  (child, childIndex) => {
                    const sizes = getColumnSizes(
                      child,
                      mappedColSizes,
                      viewport,
                      expanded
                    );
                    const gutter = {
                      marginBottom: rowGutter ? rowGutter : 0,
                    };
                    return React.cloneElement(child, {
                      key: childIndex + 1,
                      style: gutter,
                      theme: theme,
                      ...sizes,
                    });
                  }
                )
              : [];

          return React.cloneElement(
            child,
            { key: index + 1, style: styles, theme: theme },
            gutteredChildren
          );
        })}
      </StyledGridContainer>
    </FlexboxGrid>
  );
};

Grid.defaultProps = defaultProps;
Grid.propTypes = propTypes;

export default withVDSManager(Grid, true);
