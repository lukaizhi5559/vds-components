import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DefaultRadioButton from './RadioButton';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { showError } from '../utils';
import { LayoutTokens } from '@vds-tokens/layout';

const layoutSpaceRadioStack = calculateRem(LayoutTokens.space['6X'].value);
const layoutSpaceRadioGroup = calculateRem(LayoutTokens.space['5X'].value);

const defaultProps = {
  defaultValue: null,
  className: null,
  error: false,
  RadioButton: DefaultRadioButton,
  onChange: () => {},
  ariaLabel: '',
  surface: 'light',
};

const propTypes = {
  /**
   * If provided, Radio Button components will be rendered based on this data.
   * @typeName radioButtonData
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
      disabled: PropTypes.bool,
      error: PropTypes.bool,
      errorEvent: PropTypes.oneOf(['blur', 'change']),
      label: PropTypes.string,
      ariaLabel: PropTypes.string,
      onChange: PropTypes.func,
      id: PropTypes.string,
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    })
  ),
  /**
   * If provided, takes RadioButton component and can be used to make a composable RadioButtonGroup
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * If provided, the Radio component with a corresponding value will be selected when the RadioGroup is rendered.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If provided, the Radio component with a corresponding value will be selected and the selection of the RadioButtonGroup will be controlled.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Optional function that is called when Radio component is selected. If provided, it will be called with a DOM form event object from selected Radio.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Boolean or a Function that returns a boolean value that determines if component should show the error state/error message. Function receives the 'event' object  on input change.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * @ignore
   * If provided, a new RadioButton component will render within the group.
   */
  RadioButton: PropTypes.func,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * Allows for an aria-label to be passed to the RadioButtonGroup component
   */
  ariaLabel: PropTypes.string,
};

const RadioButtonGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${layoutSpaceRadioGroup};

  > .radioWrapper {
    margin-top: ${layoutSpaceRadioStack};

    &:first-child {
      margin-top: 0;
    }
  }
`;

class RadioButtonGroup extends Component {
  state = {
    selectedRadio: this.props.defaultValue || this.props.value,
    error: this.props.error === true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ selectedRadio: this.props.value });
    }
  }

  handleRadioSelect = e => {
    this.props.onChange && this.props.onChange(e);
    if (!this.props.hasOwnProperty('value')) {
      this.setState({ selectedRadio: e.target.value });
    }
    // check for error on select
    const _this = this;
    showError(e, _this);
  };

  // Maintain backwards compatibility
  renderRadios() {
    const { children, error, surface } = this.props;
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        key: index + 1,
        checked: this.state.selectedRadio
          ? this.state.selectedRadio === child.props.value
          : index === 0,
        selected: this.state.selectedRadio
          ? this.state.selectedRadio === child.props.value
          : index === 0,
        onChange: this.handleRadioSelect,
        error: error,
        surface: surface,
      })
    );
  }

  render() {
    const {
      className,
      children,
      data,
      error: errorProp,
      RadioButton,
      id,
      ariaLabel,
      surface,
    } = this.props;

    // Error state has preference
    // Necessary to handle error change on storybook
    const error =
      this.state.error || (typeof errorProp === 'boolean' && errorProp);

    return (
      <Fragment>
        <RadioButtonGroupWrapper
          id={id}
          className={this.props.className}
          role="radiogroup"
          aria-label={ariaLabel}
        >
          {children && this.renderRadios()}

          {data &&
            data.map((child, index) => {
              const { inputId } = child;
              return (
                <RadioButton
                  {...child}
                  id={child.id}
                  inputId={inputId}
                  key={index + 1}
                  name={child.name}
                  disabled={child.disabled}
                  error={this.state.selectedRadio ? undefined : error}
                  value={child.value}
                  children={child.children}
                  checked={
                    this.state.selectedRadio
                      ? this.state.selectedRadio === child.value
                      : index === 0
                  }
                  selected={
                    this.state.selectedRadio
                      ? this.state.selectedRadio === child.value
                      : index === 0
                  }
                  onChange={this.handleRadioSelect}
                  tabIndex={this.state.selectedRadio ? 0 : index === 0 ? 0 : -1}
                  surface={surface}
                  label={child.label}
                />
              );
            })}
        </RadioButtonGroupWrapper>
      </Fragment>
    );
  }
}

RadioButtonGroup.defaultProps = defaultProps;
RadioButtonGroup.propTypes = propTypes;

export default withVDSManager(RadioButtonGroup);
