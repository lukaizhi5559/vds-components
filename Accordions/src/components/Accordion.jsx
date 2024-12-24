import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withVDSManager, generateUUID } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * String, React components or HTML elements that will be rendered in the Accordion. Using AccordionItem is highly recommended
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  /**
   * If set to 'single', the Accordion will open only one AccordionItem at a time. If a different AccordionItem is opened, any other AccordionItem that is open will automatically be closed. If set to 'multi', multiple AccordionItem can be open at a time.
   */
  type: PropTypes.oneOf(['single', 'multi']),
  /**
   * @ignore
   */
  testMode: PropTypes.bool,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * @ignore
   * Allows the top line of the Accordion to render with 'heavy' or 'light' thickness
   */
  topLineType: PropTypes.oneOf(['light', 'heavy']),
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * If enabled, will render the topLine of the first accordion item.
   */
  topLine: PropTypes.bool,
  /**
   * @ignore
   */
  bottomLine: PropTypes.bool,
  /**
   * @ignore
   * Set bottom line to type primary for 1.0
   */
  bottomLinePrimary: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  surface: 'light',
  type: 'multi',
  testMode: false,
  topLine: false, // BRAND3.0 DEFAULT
  bottomLine: true,
  bottomLinePrimary: false,
};

/* Necessary to make sure that accordion doens't shrink on a flex container */
const AccordionWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const AccordionList = styled.div`
  width: 100%; /* Necessary so component takes full width of parent component */
`;

class Accordion extends Component {
  accordionItemChildren = {};
  idPrefix = generateUUID();
  state = {
    activeID: null,
  };

  updateActiveAccordion = id => {
    this.setState({
      activeID: id,
    });

    typeof window !== 'undefined' && window.scrollBy(0, 1);
    typeof window !== 'undefined' && window.scrollBy(0, -1);
  };

  _getTopLine = index => {
    const { topLine, topLineType } = this.props;

    /**
     * If 3.0, render topLine prop
     * If 1.0, render every line except the top because the border-top is taken care
     * of in AccordionHeader
     */
    if (!topLineType) {
      return topLine ? true : index !== 0;
    }
    return index !== 0;
  };

  render() {
    const {
      children,
      surface,
      type,
      testMode,
      //1.0
      id,
      topLineType,
      viewport,
      bottomLine,
      bottomLinePrimary,
    } = this.props;

    let groupCount = 0; // Count and ID of AccordionItems
    return (
      <AccordionWrapper>
        <AccordionList id={id} surface={surface}>
          {React.Children.map(children, (child, index) => {
            if (!child || 'boolean' === typeof child) return null;

            const CHILDREN_COUNT = React.Children.toArray(children).length;

            let childElement =
              child.type === React.Fragment ? child.props.children : child;
            childElement =
              childElement instanceof Array ? childElement[0] : childElement;

            const childType =
              childElement.type && childElement.type.componentType
                ? childElement.type.componentType
                : '';

            // We only want to add our stuff to the AccordionItem
            if (childType === 'AccordionItem') {
              return React.cloneElement(childElement, {
                key: index + 1,
                activeID: this.state.activeID,
                onClick: this.updateActiveAccordion,
                groupIndex: groupCount,
                groupId: `${this.idPrefix}_${groupCount++}`, // <- Increment after assignment so we still get a zero
                surface,
                getAccordionItemRef: this.getAccordionItemRef,
                clickHandler: this.updateActiveAccordion,
                type,
                testMode,
                topLineType: topLineType,
                viewport: viewport,
                topLine: this._getTopLine(index),
                bottomLine: bottomLine && index === CHILDREN_COUNT - 1,
                bottomLinePrimary: bottomLinePrimary,
              });
            }

            // If not an AccordionItem, just return the child as is
            return child;
          })}
        </AccordionList>
      </AccordionWrapper>
    );
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default withVDSManager(Accordion);
