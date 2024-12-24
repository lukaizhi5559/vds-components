import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   *  Individual Breadcrumbs, in the order they need to be displayed. The Breadcrumb component is typically used for this implementation
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   *  If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
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
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  surface: 'light',
  ariaLabel: 'Breadcrumb',
};

const StyledNav = styled.nav`
  display: block;
  font-weight: 400;
  font-style: normal;
  color: ${ColorTokens.elements.primary.onlight.value};
  line-height: 1.25;
`;

const StyledBreadcrumbList = styled.ol`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 0;
  list-style-type: decimal;
  margin: 0;
`;

export class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render Breadcrumb List children
  renderBreadcrumbs() {
    const { children, surface } = this.props;
    const childCount = React.Children.count(children);

    return React.Children.map(children, (child, index) => {
      if (index === 0) {
        return React.cloneElement(child, {
          surface: surface,
          firstChild: true,
        });
      } else if (index === childCount - 1) {
        return React.cloneElement(child, {
          surface: surface,
          selected:
            child.props.selected === false ? child.props.selected : true,
          lastChild: true,
        });
      } else {
        return React.cloneElement(child, {
          surface: surface,
        });
      }
    });
  }

  render() {
    const {
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
    } = this.props;
    return (
      <StyledNav
        id={this.props.id}
        data-analyticstrack={analyticsTrack}
        data-track={track}
        data-track-ignore={trackIgnore}
        data-clickstream={clickStream}
        aria-label={this.props.ariaLabel}
      >
        <StyledBreadcrumbList>{this.renderBreadcrumbs()}</StyledBreadcrumbList>
      </StyledNav>
    );
  }
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default withVDSManager(Breadcrumbs);
