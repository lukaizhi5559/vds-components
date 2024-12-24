import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager, generateUUID } from '@vds-core/utilities';
import CheckboxGroupItem from './CheckboxGroupItem';
import DefaultCheckbox from './Checkbox';
import { stringifyObj } from '../utils';

const propTypes = {
  /**
   * When true, will add the required attribute to the all checkbox elements
   */
  required: PropTypes.bool,
  /**
   * If provided, Checkbox components will be rendered based on this data
   * @typeName checkboxData
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.node,
      ]),
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      disabled: PropTypes.bool,
      errorText: PropTypes.string,
      onChange: PropTypes.func,
      selected: PropTypes.bool,
      id: PropTypes.string,
      width: PropTypes.string,
      label: PropTypes.string,
      ariaLabel: PropTypes.string,
      errorEvent: PropTypes.oneOf(['blur', 'change']),
      inputId: PropTypes.string,
      required: PropTypes.bool,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-analyticstrack': PropTypes.string,
      'data-clickstream': PropTypes.string,
    })
  ),
  /**
   * If provided, width of Checkbox components will be rendered based on this value
   */
  childWidth: PropTypes.string,
  /**
   * Viewport the Buttons will be rendered in
   */
  viewport: PropTypes.oneOf(['desktop', 'tablet', 'mobile']),
  /**
   * @ignore
   * If provided a new Checkbox element will render
   */
  Checkbox: PropTypes.func,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * This callback is fired when a value of a checkbox within the group has changed.
   */
  onChange: PropTypes.func,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
};

const defaultProps = {
  childWidth: '100%',
  Checkbox: DefaultCheckbox,
  viewport: 'desktop',
  onChange: undefined,
  surface: 'light',
  required: undefined,
};

const CheckboxGroupWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

class CheckboxGroup extends Component {
  id = generateUUID();

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      keySelected: false,
    };
  }

  componentDidUpdate = prevProps => {
    this.state.id &&
      this.state.keyboardSelected &&
      typeof document !== 'undefined' &&
      document.getElementById(this.state.id).focus(); //refocus element
    if (stringifyObj(prevProps.data) !== stringifyObj(this.props.data)) {
      this.setState({ data: this.props.data.map(obj => ({ ...obj })) });
    }
  };

  _onChange = (e, obj) => {
    const { selected, index } = obj;
    let newData = this.state.data;
    newData[index].selected = selected;
    this.setState({ data: newData, id: e.target.id }); //track id due to loss of focus on state change
    this.props.onChange && this.props.onChange(e, newData);
  };

  _keySelected = value => {
    if (value !== this.state.keyboardSelected) {
      this.setState({ keyboardSelected: value });
    }
  };

  render() {
    const {
      required,
      data,
      childWidth,
      viewport,
      Checkbox,
      surface,
      className,
      id,
    } = this.props;

    return (
      <Fragment>
        <CheckboxGroupWrapper viewport={viewport} id={id} className={className}>
          {data.map((child, index) => {
            const { inputId } = child;
            const btnWidth = childWidth ? childWidth : child.width || '100%';

            return (
              <CheckboxGroupItem
                keyboardSelected={this._keySelected}
                inputId={inputId ? inputId : this.id + index}
                Checkbox={Checkbox}
                surface={surface}
                width={btnWidth}
                key={index}
                onChange={this._onChange}
                index={index}
                selected={
                  this.state.data[index].selected
                    ? this.state.data[index].selected
                    : false
                }
                required={required}
                {...child}
              />
            );
          })}
        </CheckboxGroupWrapper>
      </Fragment>
    );
  }
}

CheckboxGroup.propTypes = propTypes;
CheckboxGroup.defaultProps = defaultProps;

export default withVDSManager(CheckboxGroup);
