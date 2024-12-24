import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StickyContainer, Sticky } from 'react-sticky';
import { ColorTokens } from '@vds-tokens/color';
import { Line } from '@vds-core/lines';

const propTypes = {
  /**
   * String, React Component, or HTML to render content of AccordionItem
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  activeID: PropTypes.string,
  /**
   * @ignore
   */
  groupIndex: PropTypes.number,
  /**
   * @ignore
   */
  groupId: PropTypes.string,
  /**
   * Use prop to programmatically control if the AccordionItem is open or closed.
   */
  opened: PropTypes.bool,
  /**
   * @ignore
   */
  type: PropTypes.oneOf(['single', 'multi']),
  /**
   * Use prop to programmatically control if the AccordionItem is sticky when open and scrolled to the top of the page.
   */
  sticky: PropTypes.bool,
  /**
   * @ignore
   */
  testMode: PropTypes.bool,
  /**
   * When true, the drawer will remain open and not be able to close.
   */
  alwaysOpen: PropTypes.bool,
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * @ignore
   */
  bottomLine: PropTypes.bool,
  /**
   * @ignore
   */
  topLine: PropTypes.bool,
  /**
   * @ignore
   * Set bottom line to type primary for 1.0
   */
  bottomLinePrimary: PropTypes.bool,
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
};

const defaultProps = {
  onClick: () => {},
  activeID: null,
  groupIndex: 1,
  groupId: null,
  surface: 'light',
  opened: false,
  type: 'multi',
  sticky: false,
  testMode: false,
  alwaysOpen: false,
  bottomLine: true,
  topLine: true,
  bottomLinePrimary: false,
  //1.0
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StyledAccordionItem = styled.div`
  padding-bottom: 1px;
`;

class AccordionItem extends Component {
  static componentType = 'AccordionItem';
  accordionDetailElement = false;

  state = {
    openedState: this.props.alwaysOpen ? true : this.props.opened,
  };

  componentDidUpdate(prevProps, prevState) {
    const { activeID, type } = prevProps;

    let isOpened = this.props.alwaysOpen ? true : this.props.opened;

    if (
      type === 'single' &&
      this.props.activeID !== activeID &&
      prevState.openedState &&
      !this.props.alwaysOpen
    ) {
      this.deactivateGroup();
    }

    if (
      typeof isOpened !== 'undefined' &&
      this.props.opened !== prevProps.opened
    ) {
      this.setState({
        openedState: this.props.opened,
      });

      this.props.onClick && this.props.onClick(this.props.groupId);
    }
  }

  deactivateGroup = () => {
    this.setState(() => ({ openedState: false }));
  };

  toggleGroup = () => {
    this.setState(({ openedState }) => ({
      openedState: this.props.alwaysOpen ? true : !openedState,
    }));
  };

  _onClick = (e, childClick) => {
    childClick && childClick(e, !this.state.openedState);
    this.toggleGroup();
    if (this.props.onClick && this.props.groupId)
      this.props.onClick(this.props.groupId);
  };

  renderDetail = (childElement, index) => {
    const { groupId, surface, viewport } = this.props;

    return React.cloneElement(childElement, {
      key: index + 1,
      alwaysOpen: this.props.alwaysOpen,
      opened: this.props.alwaysOpen || this.state.openedState,
      groupId: groupId,
      viewport: viewport,
      surface,
    });
  };

  renderSummary = (childElement, index) => {
    const {
      groupIndex,
      groupId,
      surface,
      sticky,
      testMode,
      //1.0
      topLineType,
      viewport,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      'data-sitecat-cta': cta,
      'data-sitecat-datatrack': dataTrack,
      'data-sitecat-position': position,
      'data-sitecat-level': level,
    } = this.props;
    const { onClick } = childElement && childElement.props;

    // Check if we are Rendering a Sticky AccordionHeader
    if (sticky) {
      return (
        <Sticky topOffset={0}>
          {({ style }) => {
            return React.cloneElement(childElement, {
              key: index + 1,
              alwaysOpen: this.props.alwaysOpen,
              opened: this.state.openedState,
              onClick: (e, x) => {
                this._onClick(e, x, onClick);
              },
              groupIndex: groupIndex,
              groupId: groupId,
              surface,
              style: style,
              sticky: sticky,
              testMode: testMode,
              clickStream: clickStream,
              analyticsTrack: analyticsTrack,
              trackIgnore: trackIgnore,
              track: track,
              dataTrack: dataTrack,
              cta: cta,
              position: position,
              level: level,
              topLineType: topLineType,
              viewport: viewport,
            });
          }}
        </Sticky>
      );
    }

    // Render AccordionHeader without Sticky wrapper
    return React.cloneElement(childElement, {
      key: index + 1,
      alwaysOpen: this.props.alwaysOpen,
      opened: this.state.openedState,
      clickStream: clickStream,
      analyticsTrack: analyticsTrack,
      track: track,
      dataTrack: dataTrack,
      trackIgnore: trackIgnore,
      cta: cta,
      position: position,
      level: level,
      onClick: e => {
        this._onClick(e, onClick);
      },
      groupIndex: groupIndex,
      groupId: groupId,
      surface,
      topLineType: topLineType,
      viewport: viewport,
    });
  };

  renderGroup = () => {
    const {
      children,
      groupId,
      surface,
      topLine,
      bottomLine,
      topLineType, //1.0
      bottomLinePrimary,
      alwaysOpen,
      //1.0
    } = this.props;

    return (
      <ComponentWrapper>
        {topLine && (
          <Line
            type={!!topLineType ? 'primary' : 'secondary'}
            surface={surface}
          />
        )}
        <StyledAccordionItem
          // aria-expanded={this.state.opened}
          groupId={groupId}
          surface={surface}
        >
          {React.Children.map(children, (child, index) => {
            // Accordion Children can have a React.Fragment wrapper
            // If so, we need to strip it off
            let childElement =
              child.type === React.Fragment ? child.props.children : child;
            childElement =
              childElement instanceof Array ? childElement[0] : childElement;

            // We only want to save Refs to AccordionHeader and AccordionItem
            const childType = childElement.type.componentType
              ? childElement.type.componentType
              : '';

            if (childType === 'AccordionHeader') {
              return this.renderSummary(childElement, index);
            }

            if (childType === 'AccordionDetail') {
              return this.renderDetail(childElement, index);
            }

            // If not an Accordion Component, just return the childElement
            return childElement;
          })}
        </StyledAccordionItem>
        {bottomLine && (
          <Line
            type={bottomLinePrimary ? 'primary' : 'secondary'}
            surface={surface}
          />
        )}
      </ComponentWrapper>
    );
  };

  render() {
    const { groupId, sticky, testMode } = this.props;

    if (sticky) {
      return (
        <StickyContainer
          data-testid={testMode ? `stickycontainer_${groupId}` : undefined}
          sticky-div="stickyDiv"
        >
          {this.renderGroup()}
        </StickyContainer>
      );
    }

    return this.renderGroup();
  }
}

AccordionItem.propTypes = propTypes;
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
