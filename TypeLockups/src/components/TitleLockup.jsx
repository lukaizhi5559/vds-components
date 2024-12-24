import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitleLockupTitle from './TitleLockupTitle';
import TitleLockupSubtitle from './TitleLockupSubtitle';
import TitleLockupEyebrow from './TitleLockupEyebrow';
import { withVDSManager } from '@vds-core/utilities';
import { _findTooltipSize } from '../utils/TooltipSizeCalc';
const propTypes = {
  /**
   * If data is not provided, TitleLockup subcomponents will be rendered based on it's children.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * If provided, TitleLockup subcomponents will be rendered based on this data.
   * @typeName TitleLockupData
   */
  data: PropTypes.shape({
    eyebrow: PropTypes.shape({
      size: PropTypes.oneOf([
        'bodySmall',
        'bodyMedium',
        'bodyLarge',
        'titleSmall',
        'titleMedium',
        'titleLarge',
        'titleXLarge',
      ]),
      bold: PropTypes.bool,
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
    title: PropTypes.shape({
      size: PropTypes.oneOf([
        'bodySmall',
        'bodyMedium',
        'bodyLarge',
        'titleSmall',
        'titleMedium',
        'titleLarge',
        'titleXLarge',
        'title2XLarge',
        'featureXSmall',
        'featureSmall',
        'featureMedium',
      ]),
      surface: PropTypes.oneOf(['light', 'dark']),
      bold: PropTypes.bool,
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
        'titleLarge',
        'titleXLarge',
      ]),
      color: PropTypes.string,
      surface: PropTypes.oneOf(['light', 'dark']),
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
  }),
  /**
   * Aligns TitleLockup'S subcomponent's text.
   */
  textAlignment: PropTypes.oneOf(['center', 'left']),
  /**
   * ID of component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  textAlignment: 'left',
  surface: 'light',
};

const TitleLockupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: ${({ textAlignment }) => textAlignment};
  width: 100%;
`;

const TitleLockup = props => {
  const { children, data, textAlignment, viewport, id, surface } = props;

  const _findNode = dispName => {
    const element = React.Children.map(children, child => {
      const childType =
        child && child.type && child.type.displayName
          ? child.type.displayName
          : '';
      if (childType === dispName) {
        return child;
      }
    });
    return element && element[0] ? element[0] : null;
  };

  const _findTitleProps = () => {
    let title = _findNode('TitleLockupTitle');
    if (title) {
      return { titleSize: title.props.size, titleBold: title.props.bold };
    }
    return {};
  };

  const _findSubtitleSize = () => {
    let subTitle = _findNode('TitleLockupSubtitle');
    return subTitle ? subTitle.props.size : null;
  };

  const _findEyebrowSize = () => {
    let eyeBrow = _findNode('TitleLockupEyebrow');
    return eyeBrow ? eyeBrow.props.size : null;
  };

  const _findControllingSize = () => {
    let eyebrowSize = _findEyebrowSize();
    let subtitleSize = _findSubtitleSize();
    let realSubtitleSize =
      data && data.subtitle && data.subtitle.size
        ? data.subtitle.size
        : subtitleSize
        ? subtitleSize
        : undefined;
    let realEyebrowSize =
      data && data.eyebrow && data.eyebrow.size
        ? data.eyebrow.size
        : eyebrowSize
        ? eyebrowSize
        : undefined;
    if (realSubtitleSize !== undefined && realEyebrowSize === undefined) {
      return realSubtitleSize;
    } else if (
      realEyebrowSize !== undefined &&
      realSubtitleSize === undefined
    ) {
      return realEyebrowSize;
    } else if (
      realEyebrowSize !== undefined &&
      realSubtitleSize !== undefined
    ) {
      return realSubtitleSize;
    }
  };

  const _findTextSize = () => {
    const { titleSize } = _findTitleProps();
    let realTitleSize =
      data && data.title && data.title.size
        ? data.title.size
        : titleSize
        ? titleSize
        : 'titleLarge';
    let controlingSize = _findControllingSize();

    const desktopMap = {
      bodySmall: ['bodySmall'],
      bodyMedium: ['bodyMedium'],
      bodyLarge: ['bodyLarge'],
      titleSmall: ['bodySmall', 'bodyMedium', 'bodyLarge', 'titleSmall'],
      titleMedium: ['bodySmall', 'bodyMedium', 'bodyLarge'],
      titleLarge: ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleSmall'],
      titleXLarge: ['titleMedium', 'bodyLarge'],
      title2XLarge: ['bodyLarge', 'titleMedium', 'titleLarge'],
      featureXSmall: ['bodyLarge', 'titleMedium', 'titleLarge'],
      featureSmall: ['titleLarge', 'titleMedium', 'bodyLarge'],
      featureMedium: ['titleLarge', 'titleMedium', 'bodyLarge'],
    };

    const mobileMap = {
      bodySmall: ['bodySmall'],
      bodyMedium: ['bodyMedium'],
      bodyLarge: ['bodyLarge'],
      titleSmall: ['bodySmall', 'bodyMedium'],
      titleMedium: ['bodySmall', 'bodyMedium', 'bodyLarge'],
      titleLarge: ['bodySmall', 'bodyMedium', 'bodyLarge'],
      titleXLarge: ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleMedium'],
      title2XLarge: ['bodyLarge', 'bodyMedium', 'titleMedium'],
      featureXSmall: ['bodyLarge', 'bodyMedium', 'titleMedium'],
      featureSmall: ['titleLarge', 'bodyLarge'],
      featureMedium: ['titleLarge', 'titleXLarge', 'bodyLarge'],
    };

    let canIUseMySubtitleDesktop = !!desktopMap[realTitleSize].includes(
      controlingSize
    );
    let canIUseMySubtitleMobile = !!mobileMap[realTitleSize].includes(
      controlingSize
    );

    if (!canIUseMySubtitleMobile && viewport === 'mobile') {
      const titleGroup = mobileMap[realTitleSize];
      const defaultSubtitle = titleGroup[0];
      controlingSize = defaultSubtitle;
    }
    if (!canIUseMySubtitleDesktop && viewport !== 'mobile') {
      const titleGroup = desktopMap[realTitleSize];
      const defaultSubtitle = titleGroup[0];
      controlingSize = defaultSubtitle;
    } else {
      controlingSize = controlingSize;
    }
    return controlingSize;
  };

  const _findEyebrowPadding = () => {
    const { titleSize } = _findTitleProps();
    let realTitleSize =
      data && data.title && data.title.size
        ? data.title.size
        : titleSize
        ? titleSize
        : 'titleLarge';
    let otherSize = _findTextSize();
    const sizeList = [
      'bodySmall',
      'bodyMedium',
      'bodyLarge',
      'titleSmall',
      'titleMedium',
      'titleLarge',
      'titleXLarge',
      'title2XLarge',
      'featureXSmall',
      'featureSmall',
      'featureMedium',
    ];
    let padding;

    if (viewport == 'mobile') {
      if (sizeList.indexOf(realTitleSize) < 3) {
        padding = '4px';
      } else if (sizeList.indexOf(realTitleSize) < 6) {
        padding = '8px';
      } else if (sizeList.indexOf(realTitleSize) > 9) {
        padding = otherSize === 'bodyLarge' ? '12px' : '16px';
      } else {
        padding = '12px';
      }
      return padding;
    } else {
      if (sizeList.indexOf(realTitleSize) < 3) {
        padding = '4px';
      } else if (sizeList.indexOf(realTitleSize) < 5) {
        padding = '8px';
      } else if (sizeList.indexOf(realTitleSize) > 6) {
        padding = otherSize === 'bodyLarge' ? '12px' : '16px';
      } else {
        padding = '12px';
      }
      return padding;
    }
  };

  // Check to see if a subcomponent of TitleLockup is passed to render paddingBottom of either titleLockupEyebrow or TitleLockupTitle
  const _doesChildExist = (data, childName) => {
    if (!data) return null;

    if (Array.isArray(data)) {
      return (
        data
          .map(child =>
            child && child.type && child.type.displayName
              ? child.type.displayName
              : ''
          )
          .indexOf(childName) !== -1
      );
    }

    if (typeof data === 'object') {
      return (
        data.type &&
        data.type.displayName &&
        data.type.displayName === childName
      );
    }
  };

  const _renderChildren = () => {
    const { titleSize, titleBold } = _findTitleProps();
    let newFontSize = _findTextSize();

    let eyeBrowPadding = _findEyebrowPadding();
    const hasUniformSize = titleSize === newFontSize;
    if (titleSize === undefined || !titleSize) return props.children;
    return React.Children.map(children, (child, index) => {
      const childType =
        child && child.type && child.type.displayName
          ? child.type.displayName
          : '';
      if (childType === 'TitleLockupSubtitle') {
        return React.cloneElement(child, {
          ...child.props,
          size: newFontSize,
          viewport: viewport,
          surface: surface || child.props.surface,
          color: hasUniformSize && !titleBold ? 'secondary' : child.props.color,
        });
      } else if (childType === 'TitleLockupTitle') {
        return React.cloneElement(child, {
          ...child.props,
          viewport: viewport,
          surface: surface || child.props.surface,
          isStandAlone: !_doesChildExist(children, 'TitleLockupSubtitle'), // Negate result of function so titleLockupTitle doesn't render paddingBottom when no subtitle is passed
        });
      } else if (childType === 'TitleLockupEyebrow') {
        return React.cloneElement(child, {
          ...child.props,
          size: newFontSize,
          bold: !titleBold || child.props.bold,
          viewport: viewport,
          paddingBottom: eyeBrowPadding,
          surface: surface || child.props.surface,
          isStandAlone: !(
            _doesChildExist(children, 'TitleLockupTitle') ||
            _doesChildExist(children, 'TitleLockupSubtitle')
          ),
          uniformSize: hasUniformSize,
          isTitleBold: titleBold,
        });
      } else return child;
    });
  };

  const _renderItemData = () => {
    let newFontSize = _findTextSize();
    let eyeBrowPadding = _findEyebrowPadding();
    const titleBold =
      data && data.title && data.title.bold === undefined
        ? true
        : data.title.bold;
    const eyeBrowBold = data && data.eyebrow && data.eyebrow.bold;
    const hasUniformSize =
      data && data.title && data.title.size === newFontSize;
    return (
      <>
        {!!data.eyebrow && (
          <TitleLockupEyebrow
            {...data.eyebrow}
            isStandAlone={!data.title && !data.subtitle}
            paddingBottom={eyeBrowPadding}
            size={newFontSize}
            bold={!titleBold || eyeBrowBold}
            {...(data.eyebrow.tooltip && {
              tooltip: {
                ...data.eyebrow.tooltip,
                size: _findTooltipSize(
                  data.eyebrow.tooltip.size
                    ? data.eyebrow.tooltip.size
                    : undefined,
                  newFontSize,
                  viewport
                ),
              },
            })}
            viewport={viewport}
            surface={(data && data.eyebrow && data.eyebrow.surface) || surface}
            uniformSize={hasUniformSize}
            isTitleBold={titleBold}
          />
        )}
        {!!data.title && (
          <TitleLockupTitle
            {...data.title}
            {...(data.title.tooltip && {
              tooltip: {
                ...data.title.tooltip,
                size: _findTooltipSize(
                  data.title.tooltip.size ? data.title.tooltip.size : undefined,
                  data.title.size,
                  viewport
                ),
              },
            })}
            isStandAlone={!data.subtitle}
            size={data.title.size}
            viewport={viewport}
            surface={(data && data.title && data.title.surface) || surface}
          />
        )}
        {!!data.subtitle && (
          <TitleLockupSubtitle
            {...data.subtitle}
            size={newFontSize}
            color={
              hasUniformSize && !titleBold ? 'secondary' : data.subtitle.color
            }
            {...(data.subtitle.tooltip && {
              tooltip: {
                ...data.subtitle.tooltip,
                size: _findTooltipSize(
                  data.subtitle.tooltip.size
                    ? data.subtitle.tooltip.size
                    : undefined,
                  newFontSize,
                  viewport
                ),
              },
            })}
            viewport={viewport}
            surface={
              (data && data.subtitle && data.subtitle.surface) || surface
            }
          />
        )}
      </>
    );
  };

  return (
    <TitleLockupWrapper textAlignment={textAlignment} id={id} surface={surface}>
      {!data && _renderChildren()}
      {data && _renderItemData()}
    </TitleLockupWrapper>
  );
};

export default withVDSManager(TitleLockup);

TitleLockup.propTypes = propTypes;
TitleLockup.defaultProps = defaultProps;
