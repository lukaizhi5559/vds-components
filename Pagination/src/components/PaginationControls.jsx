import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { sharedDefaultProps, sharedPropTypes } from '../utilities';
import { PaginationStepControl, PaginationListItem } from '../Controls';

const propTypes = {
  ...sharedPropTypes,
  children: PropTypes.node,
};

const defaultProps = {
  ...sharedDefaultProps,
  children: null,
};

/**
 * @ignore
 */
const PaginationControls = props => {
  const {
    baseUrl,
    children,
    selectedPage,
    selectPage,
    total,
    dataTrack,
    level,
    position,
    cta,
    surface,
    focusBorderRadius,
  } = props;

  function _selected(page) {
    selectPage(page);
  }
  let isNxtActive = selectedPage === total;
  let isPreActive = selectedPage === 1;
  return (
    <Fragment>
      <PaginationListItem marginSide={'right'} aria-hidden={isPreActive}>
        <PaginationStepControl
          direction="previous"
          baseUrl={baseUrl}
          selectedPage={selectedPage}
          total={total}
          onClick={_selected}
          tabIndex={0}
          cta={cta}
          position={position}
          level={level}
          dataTrack={dataTrack}
          surface={surface}
          focusBorderRadius={focusBorderRadius}
        />
      </PaginationListItem>
      {children}
      <PaginationListItem marginSide={'left'} aria-hidden={isNxtActive}>
        <PaginationStepControl
          direction="next"
          baseUrl={baseUrl}
          selectedPage={selectedPage}
          total={total}
          onClick={_selected}
          tabIndex={0}
          cta={cta}
          position={position}
          level={level}
          dataTrack={dataTrack}
          surface={surface}
          focusBorderRadius={focusBorderRadius}
        />
      </PaginationListItem>
    </Fragment>
  );
};

PaginationControls.propTypes = propTypes;
PaginationControls.defaultProps = defaultProps;

export default PaginationControls;
