import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager } from '@vds-core/utilities';
import PaginationControls from './PaginationControls';
import PaginationNumbers from './PaginationNumbers';

const propTypes = {
  /**
   * If provided, this callback function will fire when selecting a PaginationLink and accepts the page number as an argument.
   */
  selectPage: PropTypes.func,
  /**
   * This callback function should accept an argument for the page value and returns an href for the anchor elements.
   */
  baseUrl: PropTypes.func,
  /**
   * Selected active page number.
   */
  selectedPage: PropTypes.number,
  /**
   * @ignore
   * Border radius for focus ring
   */
  focusBorderRadius: PropTypes.string,
  /**
   * Total number of pages.
   */
  total: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * A function that receives the currently selectedPage and the total number of pages and returns an object containing the startRange and endRange values to be displayed
   */
  calculateRange: PropTypes.func,
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
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-level': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-position': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-datatrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-cta': PropTypes.string,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
};

const widthPagination = '288px';

const defaultProps = {
  selectPage: null,
  showArrow: undefined,
  total: 20,
  selectedPage: 10,
  children: null,
  className: null,
  ariaLabel: 'Pagination',
  surface: 'light',
  focusBorderRadius: '2px',
  calculateRange: (selectedPage, total) => {
    let additionalPagesToShow = selectedPage < 98 ? 3 : 2;
    let startRange = Math.min(selectedPage - 1, total - additionalPagesToShow);

    if (selectedPage === 1) {
      startRange = 1;
    }

    let endRange = startRange + additionalPagesToShow;

    return {
      startRange,
      endRange,
    };
  },
};

const StyledNav = styled.nav`
  width: ${widthPagination};
  &:hover {
    outline: none;
  }
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  list-style-type: none;
`;

const Pagination = props => {
  const {
    'data-analyticstrack': analyticsTrack,
    'data-track': track,
    'data-track-ignore': trackIgnore,
    'data-clickstream': clickStream,
    'data-sitecat-cta': cta,
    'data-sitecat-datatrack': dataTrack,
    'data-sitecat-position': position,
    'data-sitecat-level': level,
    calculateRange,
    total,
    focusBorderRadius,
  } = props;
  function _onClick(e) {
    /* istanbul ignore else */
    if (e.type === 'click') {
      e.currentTarget.blur();
    }
  }
  const paginationComponentProps = { ...props, className: '' };
  return (
    <StyledNav
      id={props.id}
      tabIndex={-1}
      aria-label={props.ariaLabel}
      className={props.className}
      onClick={_onClick}
      data-analyticstrack={analyticsTrack}
      data-track={track}
      data-track-ignore={trackIgnore}
      data-clickstream={clickStream}
    >
      <StyledList>
        <PaginationControls
          total={props.total}
          dataTrack={dataTrack}
          position={position}
          level={level}
          cta={cta}
          focusBorderRadius={focusBorderRadius}
          {...paginationComponentProps}
        >
          <PaginationNumbers
            selectPage={props.selectPage}
            selectedPage={props.selectedPage}
            calculateRange={calculateRange}
            total={total}
            focusBorderRadius={focusBorderRadius}
            {...paginationComponentProps}
          />
        </PaginationControls>
      </StyledList>
    </StyledNav>
  );
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default withVDSManager(Pagination);
