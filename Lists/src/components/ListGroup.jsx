import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager } from '@vds-core/utilities';
import ListGroupItem from './ListGroupItem';
import ListGroupItemTitle from './ListGroupItemTitle';
import ListGroupItemSubtitle from './ListGroupItemSubtitle';
import ListGroupItemImage from './ListGroupItemImage';

const propTypes = {
  /**
   * If provided, will render the ListGroup when surface is light or dark.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * If true, will render top line for first item in the list
   */
  topLine: PropTypes.bool,
  /**
   * If true, will render bottom line for last item in the list
   */
  bottomLine: PropTypes.bool,
  /**
   * @typeName ListGroupData
   * Data array to render list items. If provided, will render the content in the array
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      disableContainerHitArea: PropTypes.bool,
      textHierarchy: PropTypes.oneOf(['titleProminent', 'subtitleProminent']),
      checkbox: PropTypes.shape({
        selected: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        id: PropTypes.string,
        inputId: PropTypes.string,
        onChange: PropTypes.func,
        'data-analyticstrack': PropTypes.string,
        'data-clickstream': PropTypes.string,
        'data-track': PropTypes.string,
        'data-track-ignore': PropTypes.string,
        'data-testid': PropTypes.string,
      }),
      toggle: PropTypes.shape({
        on: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        id: PropTypes.string,
        inputId: PropTypes.string,
        onChange: PropTypes.func,
        showText: PropTypes.bool,
        statusText: PropTypes.func,
        'data-analyticstrack': PropTypes.string,
        'data-clickstream': PropTypes.string,
        'data-track': PropTypes.string,
        'data-track-ignore': PropTypes.string,
        'data-testid': PropTypes.string,
      }),
      title: PropTypes.shape({
        text: PropTypes.string,
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
        tooltip: PropTypes.shape({
          renderAnchorElement: PropTypes.func,
          id: PropTypes.string,
          disabled: PropTypes.bool,
          containerId: PropTypes.string,
          ariaLabel: PropTypes.string,
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
          'data-track': PropTypes.string,
          'data-track-ignore': PropTypes.string,
          'data-analyticstrack': PropTypes.string,
          'data-clickstream': PropTypes.string,
        }),
      }),
      subtitle: PropTypes.shape({
        text: PropTypes.string,
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
        tooltip: PropTypes.shape({
          renderAnchorElement: PropTypes.func,
          id: PropTypes.string,
          disabled: PropTypes.bool,
          containerId: PropTypes.string,
          ariaLabel: PropTypes.string,
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
          'data-track': PropTypes.string,
          'data-track-ignore': PropTypes.string,
          'data-analyticstrack': PropTypes.string,
          'data-clickstream': PropTypes.string,
        }),
      }),
      subtitleRight: PropTypes.string,
      descriptiveIcon: PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['XSmall', 'small', 'medium', 'large', 'XLarge']),
          PropTypes.string,
        ]),
        color: PropTypes.string,
      }),
      ariaLabel: PropTypes.string,
      actionElement: PropTypes.oneOf([
        'none',
        'icon',
        'checkbox',
        'textLink',
        'toggle',
      ]),
      textLink: PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func,
        'data-analyticstrack': PropTypes.string,
        'data-clickstream': PropTypes.string,
        'data-sitecat-cta': PropTypes.string,
        'data-sitecat-datatrack': PropTypes.string,
        'data-sitecat-level': PropTypes.string,
        'data-sitecat-position': PropTypes.string,
        'data-track': PropTypes.string,
        'data-track-ignore': PropTypes.string,
        'data-testid': PropTypes.string,
      }),
      icon: PropTypes.shape({
        onClick: PropTypes.func,
        'data-analyticstrack': PropTypes.string,
        'data-clickstream': PropTypes.string,
        'data-sitecat-cta': PropTypes.string,
        'data-sitecat-datatrack': PropTypes.string,
        'data-sitecat-level': PropTypes.string,
        'data-sitecat-position': PropTypes.string,
        'data-track': PropTypes.string,
        'data-track-ignore': PropTypes.string,
        'data-testid': PropTypes.string,
      }),
      image: PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        size: PropTypes.oneOf(['72', '116']),
      }),
      onClick: PropTypes.func,
      children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.node,
      ]),
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    })
  ),
  /**
   * Determines whether mobile, or desktop fontstacks are used.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * String, React Component, or HTML to render content of ListItem
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * Allows a unique id to be passed to the component and applied to the outermost wrapper of list group.
   */
  id: PropTypes.string,
};

const defaultProps = {
  surface: 'light',
  topLine: false,
  bottomLine: true, // DEFAULT
};

const StyledUnorderedList = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
`;

class ListGroup extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderChildren = () => {
    const { children, viewport, surface, topLine, bottomLine } = this.props;
    /** Use Children.toArray to prevent counting conditional rendering of child */
    const CHILDREN_COUNT = React.Children.toArray(children).length;

    return React.Children.map(children, (child, index) => {
      let childElement =
        child && child.type === React.Fragment ? child.props.children : child;

      childElement =
        childElement instanceof Array ? childElement[0] : childElement;

      const childType = childElement.type.componentType
        ? childElement.type.componentType
        : '';

      if (childType === 'ListGroupItem') {
        return React.cloneElement(childElement, {
          ...childElement.props,
          viewport: viewport,
          surface: surface,
          topLine: topLine && index === 0,
          bottomLine: !bottomLine ? index !== CHILDREN_COUNT - 1 : bottomLine,
        });
      } else {
        return child;
      }
    });
  };

  _renderItemData = () => {
    const { data, topLine, bottomLine, viewport, surface } = this.props;
    return (
      data.length &&
      data.map((child, index) => {
        if (!child || !Object.keys(child).length) return null;
        const {
          'data-analyticstrack': analyticsTrack,
          'data-track': track,
          'data-track-ignore': ignoreTrack,
          'data-clickstream': clickStream,
        } = child;

        return (
          <ListGroupItem
            key={`ListGroupItem-${index + 1}`}
            disableContainerHitArea={child.disableContainerHitArea}
            surface={surface}
            topLine={topLine && index === 0}
            bottomLine={!bottomLine ? index !== data.length - 1 : bottomLine}
            viewport={viewport}
            custom={!!child.children}
            actionElement={child.actionElement}
            subtitleRight={child.subtitleRight}
            descriptiveIcon={child.descriptiveIcon}
            icon={child.icon}
            toggle={child.toggle}
            checkbox={child.checkbox}
            textLink={child.textLink}
            disabled={child.disabled}
            ariaLabel={child.ariaLabel}
            ariaRole={child.ariaRole}
            onClick={child.onClick}
            id={child.id}
            textHierarchy={child.textHierarchy}
            data-analyticstrack={analyticsTrack}
            data-track={track}
            data-track-ignore={ignoreTrack}
            data-clickstream={clickStream}
          >
            {!child.children && child.image && child.image.src && (
              <ListGroupItemImage
                src={child.image.src}
                alt={child.image.alt}
                size={child.image.size}
              />
            )}
            {!child.children && child.title && child.title.text && (
              <ListGroupItemTitle
                bold={child.title && child.title.bold}
                tooltip={
                  child.title.tooltip &&
                  (child.title.tooltip.title || child.title.tooltip.children)
                    ? child.title.tooltip
                    : null
                }
              >
                {child.title.text}
              </ListGroupItemTitle>
            )}
            {!child.children && child.subtitle && child.subtitle.text && (
              <ListGroupItemSubtitle
                tooltip={
                  child.subtitle.tooltip &&
                  (child.subtitle.tooltip.title ||
                    child.subtitle.tooltip.children)
                    ? child.subtitle.tooltip
                    : null
                }
              >
                {child.subtitle.text}
              </ListGroupItemSubtitle>
            )}
            {!!child.children && child.children}
          </ListGroupItem>
        );
      })
    );
  };

  render() {
    const { data, ariaLabel, id } = this.props;

    return (
      <StyledUnorderedList aria-label={ariaLabel} id={id}>
        {!data && this._renderChildren()}
        {data && this._renderItemData()}
      </StyledUnorderedList>
    );
  }
}

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

export default withVDSManager(ListGroup);
