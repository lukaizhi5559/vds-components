import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';

const propTypes = {
  /**
   * Alternative text for the image.
   */
  alt: PropTypes.string,
  /**
   * ARIA label of the Image Wrapper
   */
  ariaLabel: PropTypes.string,
  /**
   * An array of image data
   * or a single string url
   */
  // src: PropTypes.arrayOf(PropTypes.object({
  //   srcset: PropTypes.string,
  //   type: PropTypes.string, // MIME type for image
  //   maxViewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop'])
  // })),
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Options for image wrapper dimension
   * Defaults to 72x72
   */
  size: PropTypes.oneOf(['72', '116']),
};

const defaultProps = {
  size: '72',
};

const StyledImg = styled.img`
  object-fit: contain;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth}px;
  height: ${({ maxHeight }) => maxHeight}px;
  width: 100%;
  overflow: hidden;
  border-radius: ${calculateRem(4)};
  display: flex;
`;

const ListGroupItemImage = props => {
  const { size, src, alt, ariaLabel } = props;

  // Used to determine to map src to url prop or sources prop
  const isSrcArray = Array.isArray(src);

  return (
    <ImageWrapper maxWidth={size} maxHeight={size}>
      <StyledImg src={src} alt={alt} aria-label={ariaLabel} />
    </ImageWrapper>
  );
};

ListGroupItemImage.propTypes = propTypes;
ListGroupItemImage.defaultProps = defaultProps;
ListGroupItemImage.displayName = 'ListGroupItemImage';

export default ListGroupItemImage;
