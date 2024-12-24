import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';

const propTypes = {
  /**
   * If provided, width of Checkbox components will be rendered based on this value
   */
  width: PropTypes.string,
  /**
   * @ignore
   * If provided a new Checkbox element will render
   */
  Checkbox: PropTypes.func,
};

const GAP = LayoutTokens.space['6X'].value;

const defaultProps = {
  width: '100%',
};

const CheckboxWrapper = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  flex: 0 0 1;
  padding: 0 0 ${calculateRem(GAP)} 0;
  width: 100%;

  > * {
    margin-bottom: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const CheckboxGroupItem = props => {
  function _onClick(e) {
    if (e.type === 'click' && e.detail !== 0) {
      // This is a real click. Do something here
      e.currentTarget.blur();
    }
  }
  const { Checkbox } = props;

  return (
    <CheckboxWrapper data-testid="test-group-item" onClick={_onClick}>
      <Checkbox {...props} />
    </CheckboxWrapper>
  );
};

CheckboxGroupItem.propTypes = propTypes;
CheckboxGroupItem.defaultProps = defaultProps;

export default CheckboxGroupItem;
