import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { withVDSManager } from '@vds-core/utilities';
import { ratios } from '../util/ratios';
import { breakpoints } from '../util/breakpoints';

const propTypes = {
  /**
   * URL for the image. Will fallback to this if no sources or none allowed in browser.
   */
  url: PropTypes.string,
  /**
   * Specifies aspect ratio of the Image.
   */
  ratio: PropTypes.oneOf([
    '16:9',
    '9:4',
    '9:2',
    '8:3',
    '5:7',
    '5:6',
    '5:4',
    '4:3',
    '4:1',
    '3:1',
    '3:2',
    '2:1',
    '2:3',
    '9:16',
    '4:7',
    '4:9',
    '1:2',
    '1:1',
  ]),
  /**
   * Alternative text for the image.
   */
  alt: PropTypes.string,
  /**
   * ARIA role of the Image.
   */
  role: PropTypes.string,
  /**
   * ARIA label of the Image Wrapper - To be used in the case of an onClick() to inidicate the action.
   */
  ariaLabel: PropTypes.string,
  /**
   * onClick event listener of the Image.
   */
  onClick: PropTypes.func,
  /**
   * An array of image data.
   */
  // sources: PropTypes.arrayOf(PropTypes.object({
  //   srcset: PropTypes.string,
  //   type: PropTypes.string, // MIME type for image
  //   maxViewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop'])
  // })),
  source: PropTypes.array,
  /**
   * Horizontal focus of the image.
   */
  focusX: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * Vertical focus of the image.
   */
  focusY: PropTypes.oneOf(['center', 'top', 'bottom']),
  /**
   * Horizontal position of the image when not using aspect ratios.
   */
  positionX: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * Vertical position of the image when not using aspect ratios.
   */
  positionY: PropTypes.oneOf(['center', 'top', 'bottom']),
  /**
   * Set the image dimensions relative to the width.
   */
  constrainToWidth: PropTypes.bool,
  /**
   * Set the image dimensions relative to the height.
   */
  constrainToHeight: PropTypes.bool,
  /**
   * Use a preset aspect ratio specified in VDS themes.
   */
  hasAspectRatio: PropTypes.bool,
  /**
   * Percentage height the image should be in its container when not using aspect ratios.
   */
  size: PropTypes.string,
  /**
   * Enable Lazy Loading.
   */
  lazy: PropTypes.bool,
};

const defaultProps = {
  ratio: '16:9',
  role: 'img',
  focusX: 'center',
  focusY: 'center',
  size: '100%',
  positionY: 'center',
  positionX: 'center',
  lazy: false,
};

function _getImageRatio(ratio) {
  return ratios[ratio];
}

const ImageWrapper = styled.div`
  position: relative;
  height: auto;
  overflow: hidden;
  padding-top: ${({ ratio }) => ratio}%;
  width: 100%;
  text-align: center;
`;

//When there's no aspect ratio
const ImageElement = styled.img`
  display: flex;
  max-width: 100%;
  margin-top: ${({ positionY }) =>
    ('bottom' === positionY || 'center' === positionY) && 'auto'};
  margin-bottom: ${({ positionY }) =>
    ('top' === positionY || 'center' === positionY) && 'auto'};
  margin-left: ${({ hasAspectRatio, positionX }) =>
    !hasAspectRatio &&
    ('right' === positionX || 'center' === positionX) &&
    'auto'};
  margin-right: ${({ hasAspectRatio, positionX }) =>
    !hasAspectRatio &&
    ('left' === positionX || 'center' === positionX) &&
    'auto'};
  height: ${({ size }) => size};
  ${({ onClick }) =>
    onClick &&
    `
    &:hover {
      cursor: pointer;
    }
  `}
`;

//When theres sources
const Picture = styled.picture`
  display: ${({ hasAspectRatio }) => !hasAspectRatio && 'flex'};
  width: ${({ hasAspectRatio }) => !hasAspectRatio && '100%'};
  margin-left: ${({ hasAspectRatio, positionX }) =>
    !hasAspectRatio &&
    ('right' === positionX || 'center' === positionX) &&
    'auto'};
  margin-right: ${({ hasAspectRatio, positionX }) =>
    !hasAspectRatio &&
    ('left' === positionX || 'center' === positionX) &&
    'auto'};
`;

//When there IS an aspect ratio
const BackgroundImage = styled.img`
  position: absolute;
  background-position: center center;
  object-fit: cover;
  background-size: cover;
  ${({ onClick }) =>
    onClick &&
    `
    &:hover {
      cursor: pointer;
    }
  `}

  ${({ focusX, focusY, constrainToWidth, constrainToHeight }) => {
    if (constrainToWidth) {
      return `
        width:100%;
        left: 0;
        right: 0;
        top: 0;
        ${getVerticalTransform(focusY)}`;
    } else if (constrainToHeight) {
      return `height:100%;
              top:0;
              bottom:0;
              ${getHorizontalTransform(focusX)}`;
    } else {
      return `height: 100%;
              width: 100%;
              top: 0;
              left: 0;`;
    }
  }}
`;

const getHorizontalTransform = focusX => {
  switch (focusX) {
    case 'left':
      return `left:0;transform: translateX(0)`;
    case 'right':
      return `right:0;transform:translateX(0)`;
    case 'center':
    default:
      return `left:50%;transform:translateX(-50%);`;
  }
};

const getVerticalTransform = focusY => {
  switch (focusY) {
    case 'top':
      return `top:0;transform: translateY(0)`;
    case 'bottom':
      return `bottom:0;transform:translateY(0)`;
    case 'center':
    default:
      return `top:50%;transform:translateY(-50%);`;
  }
};

// ImageElement.defaultProps = {
//   role: "img"
// };

const renderSourceElement = ({ srcset, type, maxViewport }, index) => {
  if (!srcset) return '';
  let media = undefined;
  if (maxViewport && breakpoints[maxViewport]) {
    if (maxViewport === 'desktop') {
      media = `(min-width: ${breakpoints[maxViewport]}px)`;
    } else {
      media = `(max-width: ${breakpoints[maxViewport]}px)`;
    }
  }
  return (
    <source key={`imgSrc-${index}`} srcSet={srcset} type={type} media={media} />
  );
};

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      constrainToHeight: undefined,
      constrainToWidth: undefined,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  onImgLoad({ target: img }) {
    const { autosize } = this.props;
    // If it's not ie, don't do anything, our CSS will take care of things
    if (!this.state.isIe && !autosize) return;

    if (img.naturalWidth >= img.naturalHeight) {
      this.setState({ constrainToHeight: true, constrainToWidth: undefined });
    } else {
      this.setState({ constrainToHeight: undefined, constrainToWidth: true });
    }
  }

  render() {
    const {
      url,
      size,
      positionY,
      positionX,
      ratio,
      alt,
      ariaLabel,
      onClick,
      sources,
      focusX,
      focusY,
      lazy,
      constrainToWidth,
      constrainToHeight,
      hasAspectRatio,
      ariaHidden,
    } = this.props;

    const imageRatio = _getImageRatio(ratio);
    const ImageType = hasAspectRatio ? BackgroundImage : ImageElement;

    const ImageComponent = (
      <ImageType
        hasAspectRatio={hasAspectRatio}
        size={size}
        positionY={positionY}
        positionX={positionX}
        ratio={imageRatio}
        src={url}
        alt={alt}
        loading={lazy ? 'lazy' : 'auto'} //https://web.dev/native-lazy-loading/
        focusX={focusX}
        focusY={focusY}
        constrainToWidth={this.state.constrainToWidth || constrainToWidth}
        constrainToHeight={this.state.constrainToHeight || constrainToHeight}
        draggable={'false'}
        onLoad={this.onImgLoad}
        onClick={onClick}
        aria-hidden={ariaHidden}
      />
    );

    const _renderSources = () => {
      //https://scottjehl.github.io/picturefill/examples/demo-02.html
      return (
        <React.Fragment>
          {sources && sources.length ? sources.map(renderSourceElement) : ''}
        </React.Fragment>
      );
    };

    const wrapImage = children => {
      if (!hasAspectRatio) return children;
      return (
        <ImageWrapper aria-label={ariaLabel} ratio={imageRatio}>
          {children}
        </ImageWrapper>
      );
    };

    // Reason for separate renders:
    // If one viewport contains sources and one does not, and you scale the component, the DOM will break.
    // Cannot remove children of HTML primitive picture element, need to replace the picture element entirely
    const _returnWithSources = () => {
      return wrapImage(
        <Picture
          constrainToHeight={constrainToHeight}
          constrainToWidth={constrainToWidth}
          positionX={positionX}
          key="sources"
        >
          {_renderSources()}
          {ImageComponent}
        </Picture>
      );
    };
    const _returnWithout = () => {
      return wrapImage(
        <Picture
          constrainToHeight={constrainToHeight}
          constrainToWidth={constrainToWidth}
          positionX={positionX}
          key="no-sources"
        >
          {ImageComponent}
        </Picture>
      );
    };

    return sources && sources.length ? _returnWithSources() : _returnWithout();
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default withVDSManager(Image);
