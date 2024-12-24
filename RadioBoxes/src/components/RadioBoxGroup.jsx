import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DefaultRadioBox from './RadioBox';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';

const propTypes = {
  /**
   * If provided, RadioBox components will be rendered based on this data
   * @typeName radioBoxData
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      subtext: PropTypes.string,
      subtextRight: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
      onChange: PropTypes.func,
      selected: PropTypes.bool,
      ariaLabel: PropTypes.string,
      outOfStock: PropTypes.bool,
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    })
  ),
  /**
   * Contols the orientation of all group items
   */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * @ignore Used for 3.x only
   * Sets the minimum height of the RadioBox components in a vertical orientation.
   */
  childHeight: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * Allows for an aria-label to be passed to the RadioBoxGroup component
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   * If provided a new Radio Box element will render
   */
  RadioBox: PropTypes.func,
  /**
   * @ignore
   * If provided, Radio Box Group will render with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   * @ignore
   * inverted
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * If provided, the RadioBox with the corresponding value will be selected when the RadioBoxGroup is rendered.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If provided, the RadioBox with the corresponding value will be selected and the selection of the RadioBoxGroup will be controlled.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Optional function that is called when a RadioBox is selected. If provided, it will be called with a DOM form event object from selected RadioBox.
   */
  onChange: PropTypes.func,
};

const defaultProps = {
  RadioBox: DefaultRadioBox,
  transparentBackground: false,
};

const radioBoxSpacing = calculateRem(LayoutTokens.space['3X'].value);

const RadioBoxGroupWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};

  > * {
    flex-shrink: 1;
    height: auto;
    margin: ${({ orientation }) =>
      orientation === 'vertical'
        ? `0 0 ${radioBoxSpacing}`
        : `0 ${radioBoxSpacing} 0 0`};
  }
`;

class RadioBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }

  componentDidMount() {
    this.getSelectedState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ selected: this.props.value });
    }
  }

  getSelectedState() {
    if (this.props.value || this.props.defaultValue) {
      this.setState({ selected: this.props.value || this.props.defaultValue });
    }
    {
      this.props.data.map(child => {
        if (child.selected || child.active) {
          this.setState({ selected: child.value });
        }
      });
    }
  }

  _onChange = e => {
    this.props.onChange && this.props.onChange(e);
    this.setState({ selected: e.target.value });
  };

  render() {
    const {
      data,
      orientation,
      className,
      id,
      ariaLabel,
      RadioBox,
      transparentBackground,
      surface,
      childHeight,
    } = this.props;

    return (
      <RadioBoxGroupWrapper
        id={id}
        className={className}
        orientation={orientation}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {data.map((child, index) => {
          let selectedState;
          if (this.state.selected === undefined) {
            selectedState = index === 0;
          } else {
            selectedState = this.state.selected === child.value;
          }
          return (
            <Fragment key={index}>
              <RadioBox
                {...child}
                {...(child.active !== undefined
                  ? { active: selectedState }
                  : { selected: selectedState })}
                index={index}
                onChange={this._onChange}
                orientation={orientation}
                transparentBackground={transparentBackground}
                surface={surface}
                height={childHeight}
              />
            </Fragment>
          );
        })}
      </RadioBoxGroupWrapper>
    );
  }
}

RadioBoxGroup.propTypes = propTypes;
RadioBoxGroup.defaultProps = defaultProps;

export default withVDSManager(RadioBoxGroup);
