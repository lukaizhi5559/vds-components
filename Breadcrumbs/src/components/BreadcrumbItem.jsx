import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import BreadcrumbAnchor from './BreadcrumbAnchor';
import BreadcrumbSpan from './BreadcrumbSpan';

const SlashWrapper = styled.div`
  padding-right: ${calculateRem(LayoutTokens.space['1X'].value)};
  padding-left: ${calculateRem(LayoutTokens.space['1X'].value)};
  display: flex;
  align-items: center;
  outline: none;
`;

const StyledSlash = styled.span`
  color: ${({ color }) => color};
`;

function _renderSeparator(surface) {
  const color =
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value;

  return (
    <SlashWrapper aria-hidden={true} tabIndex={-1}>
      <StyledSlash aria-hidden={true} tabIndex={-1} color={color}>
        /
      </StyledSlash>
    </SlashWrapper>
  );
}

const propTypes = {
  /**
   * Value to be set on the target Attribute of the a tag.
   */
  target: PropTypes.string,
  /**
   * @ignore
   * If selected = false on last breadcrumb it will not render with selected styles
   */
  selected: PropTypes.bool,
  /**
   * If provided, the Breadcrumb will be rendered as a span that is not clickable.
   */
  disabled: PropTypes.bool,
  /**
   * Contents to be displayed in the a tag.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * href to be set as the value of the href Attribute in the a tag.
   */
  href: PropTypes.string,
  /**
   * This function will be called when the TextLink is clicked. It will return an event.
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   * this is the amount of spacing on bottom of breadcrumbs
   */
  margin: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
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
   * @ignore
   */
  renderSeparator: PropTypes.func,
  /**
   * @ignore
   */
  hoverState: PropTypes.bool,
};

const defaultProps = {
  selected: null,
  disabled: null,
  target: '_self',
  surface: 'light',
  hoverState: true,
  renderSeparator: _renderSeparator,
  onClick: undefined,
};

const StyledBreadcrumb = styled.li`
  align-items: center;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.secondary.onlight.value};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: ${parseInt(LayoutTokens.space['1X'].value, 10) / 2}px;
  margin-top: ${parseInt(LayoutTokens.space['1X'].value, 10) / 2}px;
`;

// const BreadcrumbItem = props => {
export class BreadcrumbItem extends Component {
  /*
   * If the BreadCrumb is selected or disabled, it should be a <span>, otherwise it should be an <a>
   * <a> tags cannot truly be "disabled", so using a <span> increases accessibility
   */

  render() {
    const {
      selected,
      children,
      ariaLabel,
      lastChild,
      surface,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      renderSeparator,
      color,
      hoverState,
      focusRingBorderRadius,
    } = this.props;

    const BreadcrumbComponent =
      (selected && lastChild) || this.props.disabled
        ? BreadcrumbSpan
        : BreadcrumbAnchor;

    return (
      <StyledBreadcrumb surface={surface}>
        <BreadcrumbComponent
          {...this.props}
          ariaLabel={ariaLabel}
          tabIndex={1}
          color={color}
          data-analyticstrack={analyticsTrack}
          data-track={track}
          data-track-ignore={trackIgnore}
          data-clickstream={clickStream}
          surface={surface}
          hoverState={hoverState}
          focusRingBorderRadius={focusRingBorderRadius}
        >
          {children}
        </BreadcrumbComponent>
        {!selected &&
          !lastChild &&
          !!renderSeparator &&
          renderSeparator(surface)}
      </StyledBreadcrumb>
    );
  }
}

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
