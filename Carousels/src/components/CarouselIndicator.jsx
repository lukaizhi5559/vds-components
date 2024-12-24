import React from 'react';
import PropTypes from 'prop-types';
import CarouselBars from './CarouselBars';
import CarouselScrubber from './CarouselScrollbar';

const propTypes = {
  type: PropTypes.oneOf(['bars', 'scrubber']),
};

const defaultProps = {
  type: 'bars',
};

const CarouselIndicator = props => {
  switch (props.type) {
    case 'scrubber':
      return <CarouselScrubber {...props} />;
    case 'bars':
    default:
      return <CarouselBars {...props} />;
  }
};
CarouselIndicator.propTypes = propTypes;
CarouselIndicator.defaultProps = defaultProps;

export default CarouselIndicator;
