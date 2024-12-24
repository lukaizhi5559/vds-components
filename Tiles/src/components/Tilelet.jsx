import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TitleLockup,
  TitleLockupSubtitle,
  TitleLockupTitle,
  TitleLockupEyebrow,
} from '@vds-core/type-lockups';
import { Badge } from '@vds-core/badges';
import { Icon } from '@vds-core/icons';
import { withVDSManager, getNodeText } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import TileContainer from './TileContainer';

const propTypes = {
  /**
   * Sets the background color for the component.
   */
  backgroundColor: PropTypes.oneOf(['white', 'black', 'gray']),
  /**
   * This takes an image source url and applies it as a background image.
   */
  backgroundImage: PropTypes.string,
  /**
   * Allows to specify the background for the component.
   */
  background: PropTypes.string,
  /**
   * Sets the height of the component.
   * @note Can not be used in conjunction with aspect ratio.
   */
  height: PropTypes.string,
  /**
   * Sets the width for the component. Accepts a pixel value.
   */
  width: PropTypes.string,
  /**
   * This controls the aspect ratio for the component.
   * @note If a height is defined, this property is ignored.
   */
  aspectRatio: PropTypes.string,
  /**
   * If true, a border is rendered around the container.
   */
  showBorder: PropTypes.bool,
  /**
   * Determines if there is a drop shadow or not.
   */
  showDropShadow: PropTypes.bool,
  /**
   * Callback function executed when TileContainer is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Tells the component the tone of the surface on which it lives.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Applies a background color if backgroundImage prop fails or has trouble loading.
   */
  imageFallbackColor: PropTypes.oneOf(['light', 'dark']),
  /**
   * Aligns TitleLockup's subcomponent's text.
   */
  textAlignment: PropTypes.oneOf(['center', 'left']),
  /**
   * Determines where the text aligns vertically.
   */
  textPosition: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /**
   * @ignore
   * Determines where the text aligns vertically.
   */
  textPosition: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /**
   * Determines the width of the texts.
   */
  textWidth: PropTypes.string,
  /**
   * Viewport the Tilelet will be rendered in
   */
  viewport: PropTypes.oneOf(['desktop', 'tablet', 'mobile']),
  /**
   * Sets the inside padding for the component.
   */
  innerPadding: PropTypes.oneOf(['12px', '16px', '24px', '32px']),
  /**
   * ID of component.
   */
  id: PropTypes.string,
  /**
   * Link to redirect to when the tilelet is clicked on.
   */
  href: PropTypes.string,
  /**
   * If provided, will specify where to open the link
   * @note href must be provided in order to use this prop
   */
  target: PropTypes.string,
  /**
   * If provided, used as string that labels the element for accessibility.
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

  role: PropTypes.oneOf(['button', 'link']),
  /**
   * @ignore
   */
  grouped: PropTypes.bool,
};

const defaultProps = {
  textPosition: 'top',
  textAlignment: 'left',
  textWidth: '100%',
  surface: 'light',
  href: null,
  target: '_self',
};

const InsideContainerScaleWrapper = styled.div`
  width: ${({ width }) => width};
  ${({ height }) => (height === '100%' ? 'height: 100%' : '')};
  border-radius: 8px;
`;

const TileletContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleLockupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;

  width: ${({ textWidth }) => textWidth};
  padding-bottom: ${({ titleLockupBottomPadding }) => titleLockupBottomPadding};
`;

const TitleLockupInsideWrapper = styled.div`
  height: 100%;
  max-height: 100%;
  text-overflow: ellipsis;
  display: flex;
  align-items: ${({ textPosition }) =>
    textPosition === 'bottom'
      ? 'flex-end'
      : textPosition === 'middle'
      ? 'center'
      : 'flex-start'};
`;

const IconContainer = styled.div`
  display: ${({ textPosition }) =>
    textPosition === 'bottom' ? 'none' : 'flex'};
  flex-direction: row;
  justify-content: ${({ iconPosition }) => iconPosition};
  align-items: flex-end;
`;

const BadgeContainer = styled.div`
  max-width: ${({ badgeWidth }) => badgeWidth};
  padding-bottom: 4px;
`;
class Tilelet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      hovered: false,
    };
  }

  setHover = () => {
    this.setState({ hovered: !this.state.hovered });
  };

  _onKeyDown = e => {
    const { onClick } = this.props;
    if (onClick) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick();
      }
    }
  };

  render() {
    const {
      eyebrow,
      title,
      subtitle,
      descriptiveIcon,
      directionalIcon,
      aspectRatio,
      showBorder,
      showDropShadow,
      backgroundColor,
      backgroundImage,
      background,
      height,
      width,
      onClick,
      imageFallbackColor,
      surface,
      id,
      textPosition,
      viewport,
      innerPadding,
      badge,
      tabIndex,
      textAlignment,
      textWidth,
      href,
      target,
      ariaLabel,
      role,
      grouped,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
    } = this.props;

    const _titleSizeRestriction = () => {
      const sizeList = [
        'bodySmall',
        'bodyMedium',
        'bodyLarge',
        'titleSmall',
        'titleMedium',
        'titleLarge',
        'titleXLarge',
      ];
      let titleSize = title && title.size;
      let newTitleSize;

      if (sizeList.includes(titleSize)) {
        newTitleSize = titleSize;
      } else {
        newTitleSize = 'titleSmall';
      }
      return newTitleSize;
    };

    const _subTitleSizeRestriction = size => {
      let titleSize = title && title.size;
      return titleSize === 'titleSmall' && size === 'titleSmall'
        ? 'bodySmall'
        : size;
    };

    const IconPositioning = () => {
      if (descriptiveIcon && !directionalIcon) {
        return 'flex-start';
      } else if (directionalIcon && !descriptiveIcon) {
        return 'flex-end';
      } else {
        return 'space-between';
      }
    };

    const _calculateBackgroundColor = () => {
      switch (backgroundColor) {
        case 'black':
        case 'white':
        case 'gray':
          return backgroundColor;
        default:
          return surface === 'light' ? 'black' : 'white';
      }
    };

    const _calculateInnerPadding = () => {
      switch (viewport) {
        case 'mobile':
          return innerPadding === '12px' ? '12px' : '16px';
        case 'tablet':
          return innerPadding === '16px' ? '16px' : '24px';
        case 'desktop':
          return innerPadding === '32px' ? '32px' : '24px';
      }
    };

    const _calculateBottomPadding = () => {
      switch (innerPadding) {
        case '12px':
          return '16px';
        case '16px':
          return '24px';
        case '24px':
          return '32px';
        case '32px':
          return '48px';
      }
    };

    const _calculateDirectionalIconSize = () => {
      let iconSize = directionalIcon.size;
      switch (viewport) {
        case 'mobile':
          return iconSize === 'medium' ? 'medium' : 'small';
        case 'desktop':
        case 'tablet':
          return iconSize === 'large' ? 'large' : 'medium';
      }
      return iconSize;
    };

    const EyeBrowText = eyebrow && eyebrow.children && eyebrow.children;

    const TitleText =
      title && title.children ? title.children : title && title.text;

    const SubtitleText =
      subtitle && subtitle.children
        ? subtitle.children
        : subtitle && subtitle.text;

    const SubtitleColor =
      subtitle && subtitle.color ? subtitle.color : 'primary';

    const EyeBrowNode = getNodeText(EyeBrowText);
    const TitleNode = getNodeText(TitleText);
    const SubtitleNode = getNodeText(SubtitleText);

    const bgColor = _calculateBackgroundColor();
    const invertTrigger =
      (surface === 'light' && bgColor === 'black') ||
      (surface === 'dark' && bgColor !== 'white');
    return (
      <InsideContainerScaleWrapper
        width={width}
        backgroundColor={bgColor}
        height={height}
      >
        <TileContainer
          onMouseEnter={this.setHover}
          onMouseLeave={this.setHover}
          backgroundImage={backgroundImage}
          backgroundColor={bgColor}
          aspectRatio={aspectRatio}
          showBorder={showBorder}
          showDropShadow={showDropShadow}
          height={height}
          width="100%"
          onClick={onClick}
          imageFallbackColor={imageFallbackColor}
          surface={surface}
          padding={_calculateInnerPadding()}
          id={id}
          tabIndex={tabIndex}
          href={href}
          target={target}
          data-track={track}
          data-track-ignore={trackIgnore}
          data-analyticstrack={analyticsTrack}
          data-clickstream={clickStream}
          background={background}
          role={role}
          ariaLabel={
            ariaLabel
              ? ariaLabel
              : !EyeBrowText && !TitleText && !SubtitleText
              ? 'Tilelet'
              : `${!!badge && !!badge.children ? badge.children : ''}
              ${!!EyeBrowText ? EyeBrowNode : ''}
              ${!!TitleText ? TitleNode : ''} ${
                  !!SubtitleText ? SubtitleNode : ''
                } `
          }
          grouped={grouped}
        >
          <TileletContainer>
            {badge && (
              <BadgeContainer badgeWidth={badge.maxWidth}>
                <Badge {...badge} />
              </BadgeContainer>
            )}
            <TitleLockupContainer
              textWidth={textWidth}
              titleLockupBottomPadding={
                textPosition !== 'top' ? '0px' : _calculateBottomPadding()
              }
            >
              <TitleLockupInsideWrapper textPosition={textPosition}>
                <TitleLockup
                  viewport={viewport}
                  surface={invertTrigger ? 'dark' : 'light'}
                  textAlignment={textAlignment}
                >
                  {EyeBrowText !== undefined && (
                    <TitleLockupEyebrow
                      bold={eyebrow && eyebrow.bold}
                      size={eyebrow && _subTitleSizeRestriction(eyebrow.size)}
                      primitive={eyebrow && eyebrow.primitive}
                      children={EyeBrowText}
                      surface={
                        (eyebrow && eyebrow.surface === 'dark') || invertTrigger
                          ? 'dark'
                          : 'light'
                      }
                      tooltip={eyebrow && eyebrow.tooltip}
                    />
                  )}
                  {TitleText !== undefined && (
                    <TitleLockupTitle
                      bold={title && title.bold}
                      size={_titleSizeRestriction()}
                      primitive={
                        title && title.primitive ? title.primitive : 'p'
                      }
                      children={TitleText}
                      surface={
                        (title &&
                          !!title.surface &&
                          title.surface === 'dark') ||
                        invertTrigger
                          ? 'dark'
                          : 'light'
                      }
                      tooltip={title && title.tooltip}
                    />
                  )}
                  {SubtitleText !== undefined && (
                    <TitleLockupSubtitle
                      size={subtitle && _subTitleSizeRestriction(subtitle.size)}
                      primitive={subtitle && subtitle.primitive}
                      children={SubtitleText}
                      color={SubtitleColor}
                      surface={
                        (subtitle && subtitle.surface === 'dark') ||
                        invertTrigger
                          ? 'dark'
                          : 'light'
                      }
                      tooltip={subtitle && subtitle.tooltip}
                    />
                  )}
                </TitleLockup>
              </TitleLockupInsideWrapper>
            </TitleLockupContainer>
            {(descriptiveIcon || directionalIcon) && (
              <IconContainer
                iconPosition={IconPositioning()}
                aria-hidden="true"
              >
                {descriptiveIcon &&
                  !directionalIcon &&
                  !badge &&
                  textPosition !== 'bottom' && (
                    <Icon
                      tabIndex={-1}
                      size={
                        descriptiveIcon && descriptiveIcon.size
                          ? descriptiveIcon.size
                          : 'medium'
                      }
                      color={
                        invertTrigger ||
                        (descriptiveIcon && descriptiveIcon.surface === 'dark')
                          ? ColorTokens.elements.primary.ondark.value
                          : ColorTokens.elements.primary.onlight.value
                      }
                      name={
                        descriptiveIcon && descriptiveIcon.name
                          ? descriptiveIcon.name
                          : 'multiple-documents'
                      }
                    />
                  )}
                {directionalIcon &&
                  !descriptiveIcon &&
                  !badge &&
                  textPosition !== 'bottom' && (
                    <Icon
                      tabIndex={-1}
                      name="right-arrow"
                      size={_calculateDirectionalIconSize()}
                      color={
                        invertTrigger ||
                        (directionalIcon && directionalIcon.surface === 'dark')
                          ? ColorTokens.elements.primary.ondark.value
                          : ColorTokens.elements.primary.onlight.value
                      }
                      ariaHidden={true}
                    />
                  )}
              </IconContainer>
            )}
          </TileletContainer>
        </TileContainer>
      </InsideContainerScaleWrapper>
    );
  }
}

Tilelet.propTypes = propTypes;
Tilelet.defaultProps = defaultProps;

export default withVDSManager(Tilelet);
