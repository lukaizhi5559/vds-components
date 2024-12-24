import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';
import Button from './Button';
import TextLink from './TextLink';
import TextLinkCaret from './TextLinkCaret';

function _onClick(e, onClick) {
  /* istanbul ignore if */
  if (e && e.detail !== 0) {
    onClick && onClick(e);
    e.target.blur();
  } else if (e.type === 'click') {
    onClick && onClick(e);
  }
}

function _renderButton(props) {
  const {
    use,
    children,
    size,
    width,
    onClick,
    dataLoc,
    surface,
    ariaLabel,
  } = props;
  /* istanbul ignore else  */
  if (use === 'primary') {
    return (
      <Button
        {...props}
        style={{ maxWidth: '100%' }}
        ariaLabel={ariaLabel}
        children={children}
        size={size}
        width={'100%'}
        // onClick={e => _onClick(e, onClick)}
        dataLoc={dataLoc}
        surface={surface}
      />
    );
  } else if (use === 'secondary') {
    return (
      <Button
        {...props}
        use="secondary"
        style={{ maxWidth: '100%' }}
        ariaLabel={ariaLabel}
        children={children}
        size={size}
        width={'100%'}
        // onClick={e => _onClick(e, onClick)}
        dataLoc={dataLoc}
        surface={surface}
      />
    );
  }
}

const propTypes = {
  children: PropTypes.string,
  rowQuantity: PropTypes.number,
  size: PropTypes.oneOf(['small', 'large']),
  use: PropTypes.oneOf(['primary', 'secondary', 'textLink', 'textLinkCaret']),
  nextButtonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'textLink',
    'textLinkCaret',
  ]),
  width: PropTypes.string,
  index: PropTypes.number,
  noVerticalPadding: PropTypes.bool,
  calculateButtonSpacing: PropTypes.func,
  renderButton: PropTypes.func,
  surface: PropTypes.oneOf(['light', 'dark']),
  'data-analyticstrack': PropTypes.string,
  'data-track': PropTypes.string,
  'data-track-ignore': PropTypes.string,
  'data-clickstream': PropTypes.string,
};

const defaultProps = {
  size: 'large',
  use: 'primary',
  noVerticalPadding: false,
  renderButton: _renderButton,
};

const getSpacingValue = unit => {
  return LayoutTokens.space[unit].value;
};

const createStyles = props => {
  const {
    size,
    use,
    nextButtonType,
    rowQuantity,
    calculateButtonSpacing,
    isButton,
    groupWidth,
  } = props;
  const { topSpacing, rightSpacing, bottomSpacing } = calculateButtonSpacing(
    size,
    use,
    nextButtonType
  );
  let paddingTop = topSpacing ? getSpacingValue(topSpacing) : '0';
  let paddingBottom = getSpacingValue(bottomSpacing);
  let paddingRight = rightSpacing === 0 ? '0px' : getSpacingValue(rightSpacing);
  let minWidth;

  if (size === 'small') {
    minWidth = 54;
  } else {
    minWidth = 76;
  }

  if (rowQuantity === 1 && size !== 'small') {
    paddingRight = '0px';
  }

  let styles;
  if (rowQuantity) {
    styles = `
      display: flex;
      align-items: center;
      padding-right: ${calculateRem(paddingRight)};
      flex-shrink: 1;
      flex-grow: ${isButton && groupWidth === '100%' ? 1 : 0};
      flex-basis: ${
        isButton ? `calc(${groupWidth} + ${paddingRight})` : 'auto'
      };
      min-width: ${isButton && calculateRem(minWidth + parseInt(paddingRight))};
    `;
  } else {
    styles = `
      display: inline-block;
      padding-top: ${calculateRem(paddingTop)};
      padding-bottom: ${calculateRem(paddingBottom)};
      padding-right: ${calculateRem(paddingRight)};
      min-width: ${isButton && calculateRem(minWidth + parseInt(paddingRight))};
      width: ${
        isButton && groupWidth === 'auto'
          ? 'auto'
          : `calc(${groupWidth} + ${paddingRight})`
      };
    `;
  }

  return styles;
};

const ButtonWrapper = styled.div`
  ${props => createStyles(props)};
  box-sizing: border-box;
  outline: none;
  ${({ noVerticalPadding }) =>
    noVerticalPadding &&
    `
    padding-bottom: 0px;
  `};
`;

const ButtonGroupItem = props => {
  const {
    rowQuantity: rowQuantityProp,
    size,
    use,
    nextButtonType,
    width,
    index,
    noVerticalPadding,
    calculateButtonSpacing,
    renderButton,
    groupWidth,
    surface,
    ariaLabel,
  } = props;
  var buttonsPerRow = rowQuantityProp;
  const isButton = use === 'primary' || use === 'secondary';
  return (
    <ButtonWrapper
      index={index}
      rowQuantity={buttonsPerRow}
      size={size}
      use={use}
      nextButtonType={nextButtonType}
      width={width}
      noVerticalPadding={noVerticalPadding}
      calculateButtonSpacing={calculateButtonSpacing}
      groupWidth={groupWidth}
      isButton={isButton}
    >
      {renderButton(props)}
      {use === 'textLink' && (
        <TextLink
          {...props}
          style={{ maxWidth: '100%' }}
          ariaLabel={ariaLabel}
          size={size}
          type="standAlone"
          width={width}
          surface={surface}
        />
      )}
      {use === 'textLinkCaret' && (
        <TextLinkCaret
          {...props}
          style={{ maxWidth: '100%' }}
          ariaLabel={ariaLabel}
          iconPosition="right"
          size={size}
          width={width}
          surface={surface}
        />
      )}
    </ButtonWrapper>
  );
};

ButtonGroupItem.propTypes = propTypes;
ButtonGroupItem.defaultProps = defaultProps;

export default ButtonGroupItem;
