import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';
import {
  spacingForButton,
  spacingForTextLink,
  spacingForTextLinkCaret,
} from '../util/spacingUtil';
import ButtonGroupItem from './ButtonGroupItem';

const _calculateButtonSpacing = (size, use, nextButtonType) => {
  const isButton = use === 'primary' || use === 'secondary';

  let spacings = isButton
    ? spacingForButton(nextButtonType, size)
    : use === 'textLink'
    ? spacingForTextLink(nextButtonType, size)
    : spacingForTextLinkCaret(nextButtonType);

  return spacings;
};

const _calculateRowSpacing = (rowData, nextRowData) => {
  let spacing;
  const rowHas = (data, type) => data && data.find(obj => obj.use === type);
  const getSize = data => data && data.size;
  const rowButtonObj =
    rowHas(rowData, 'primary') || rowHas(rowData, 'secondary');
  const nextRowButtonObj =
    rowHas(nextRowData, 'primary') || rowHas(nextRowData, 'secondary');
  const rowTextLinkCaretObj = rowHas(rowData, 'textLinkCaret');
  const nextRowTextLinkCaretObj = rowHas(nextRowData, 'textLinkCaret');
  const rowTextLinkObj = rowHas(rowData, 'textLink');

  if (rowButtonObj) {
    if (getSize(rowButtonObj) === 'small') {
      spacing = nextRowButtonObj ? '3X' : '6X';
    } else {
      spacing = nextRowButtonObj ? '3X' : nextRowTextLinkCaretObj ? '6X' : '4X';
    }
  } else if (rowTextLinkCaretObj) {
    spacing = '6X';
  } else if (rowTextLinkObj) {
    if (getSize(rowTextLinkObj) === 'small') {
      spacing = nextRowButtonObj ? '6X' : '8X';
    } else {
      spacing = nextRowButtonObj ? '4X' : '6X';
    }
  }

  return spacing;
};

const _getButtonWrapperWidth = (size, width) => {
  return width;
};

const propTypes = {
  /**
   * @ignore
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOf(['small', 'large']),
      use: PropTypes.oneOf([
        'primary',
        'secondary',
        'textLink',
        'textLinkCaret',
      ]),
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      surface: PropTypes.oneOf(['light', 'dark']),
      href: PropTypes.string,
      ariaLabel: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    })
  ),
  /**
   * If provided, width of Button components will be rendered based on this value. If omitted, default button widths are rendered.
   */
  childWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If provided, aligns TextLinks alignment when rowQuantity is set one.
   */
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
  /**
   * @ignore extended viewports for 3.x only
   * An object containing number of Button components per row, in each viewport
   */
  rowQuantity: PropTypes.shape({
    mobile: PropTypes.number,
    mobileLarge: PropTypes.number,
    tablet: PropTypes.number,
    tabletLarge: PropTypes.number,
    desktop: PropTypes.number,
    desktopLarge: PropTypes.number,
    desktopXLarge: PropTypes.number,
  }),
  /**
   * @ignore extended viewports for 3.x only
   * Viewport the Buttons will be rendered in
   */
  viewport: PropTypes.oneOf([
    'desktopXLarge',
    'desktopLarge',
    'desktop',
    'tabletLarge',
    'tablet',
    'mobileLarge',
    'mobile',
  ]),
  /**
   * @ignore
   * No vertical padding
   */
  noVerticalPadding: PropTypes.bool,
  /**
  * @ignore 
   If provided, the provided function will determine the spacing between buttons
  */
  calculateButtonSpacing: PropTypes.func,
  /**
  * @ignore
   If provided a max width of the provided string will be rendered.
  */
  maxWidth: PropTypes.string,
  /**
  * @ignore
   If provided a new Button component will render
  */
  renderButton: PropTypes.func,
  /**
   * @ignore
   */
  dataLoc: PropTypes.string,
  /**
   * @ignore
   */
  width: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  getButtonWrapperWidth: PropTypes.func,
};

const defaultProps = {
  viewport: 'desktop',
  noVerticalPadding: false,
  maxWidth: undefined,
  calculateButtonSpacing: _calculateButtonSpacing,
  getButtonWrapperWidth: _getButtonWrapperWidth,
  calculateRowSpacing: _calculateRowSpacing,
  surface: 'light',
  childWidth: 'auto',
  alignment: 'center',
};

const ButtonGroupWrapper = styled.div`
  max-width: ${({ maxWidth, rowQuantity }) => rowQuantity !== 1 && maxWidth};
  width: ${({ width }) => (width ? width : '100%')};
`;

const ButtonGroupRow = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: ${({ spacing, totalGroupItems }) =>
    totalGroupItems > 1 && spacing
      ? calculateRem(LayoutTokens.space[spacing].value)
      : 0};
  justify-content: ${({ alignment }) => alignment};
  &:last-child {
    padding-bottom: 0;
  }
`;

class ButtonGroup extends Component {
  _onClick = (e, childClick) => {
    childClick && childClick(e);
    this.props.onClick && this.props.onClick(e);
  };

  _calculateWidth = (childWidth, maxWidth, rowQuantityVal) => {
    let width;
    const maximum = parseInt(maxWidth);

    if (this.props.width) return this.props.width;
    if (childWidth && rowQuantityVal) {
      if (childWidth[childWidth.length - 1] === '%') {
        width = parseInt(childWidth) / 100;
        width = 596 * width;
      } else {
        width = parseInt(childWidth) * rowQuantityVal;
      }
      width = width < maximum ? calculateRem(width) : calculateRem(maximum);
    } else {
      width = calculateRem(maximum);
    }

    return width;
  };

  _getRowQuantityValue = rowQuantityObj => {
    const { viewport } = this.props;

    if (viewport === 'mobileLarge' && !rowQuantityObj[viewport]) {
      return rowQuantityObj['mobile'];
    } else if (viewport === 'tabletLarge' && !rowQuantityObj[viewport]) {
      return rowQuantityObj['tablet'];
    } else if (
      (viewport === 'desktopLarge' || viewport === 'desktopXLarge') &&
      !rowQuantityObj[viewport]
    ) {
      return rowQuantityObj['desktop'];
    } else {
      return rowQuantityObj[viewport];
    }
  };

  renderButtonGroupRows = rowQuantityVal => {
    const { data, calculateRowSpacing, alignment } = this.props;
    if (!data) return null;
    const groupedData = [];
    for (var i = 0; i < data.length; i += rowQuantityVal) {
      var chunk = data.slice(i, i + rowQuantityVal);
      groupedData.push(chunk);
    }

    return (
      <Fragment>
        {groupedData.map((rowData, index) => {
          const nextRowData =
            index < groupedData.length - 1 && groupedData[index + 1];

          return (
            <ButtonGroupRow
              key={index}
              alignment={alignment}
              totalGroupItems={data.length}
              spacing={calculateRowSpacing(rowData, nextRowData)}
            >
              {this.renderButtonGroupItems(rowData, rowQuantityVal)}
            </ButtonGroupRow>
          );
        })}
      </Fragment>
    );
  };

  renderButtonGroupItems = (buttonData, rowQuantityVal) => {
    const {
      childWidth,
      calculateButtonSpacing,
      renderButton,
      dataLoc,
      surface,
      getButtonWrapperWidth,
    } = this.props;

    return (
      <Fragment>
        {buttonData.map((child, index) => {
          const {
            children,
            size,
            use,
            width,
            noVerticalPadding,
            ariaLabel,
          } = child;
          let btnWidth = width ? width : childWidth;
          const groupWidth = getButtonWrapperWidth(size, btnWidth);
          let nextButtonType =
            index < buttonData.length - 1
              ? buttonData[index + 1].use
              : undefined;

          return (
            <Fragment key={index}>
              <ButtonGroupItem
                {...child}
                ariaLabel={ariaLabel}
                children={children}
                rowQuantity={rowQuantityVal}
                size={size}
                use={use}
                width={btnWidth}
                onClick={e => this._onClick(e, child.onClick)}
                index={index}
                noVerticalPadding={noVerticalPadding}
                calculateButtonSpacing={calculateButtonSpacing}
                nextButtonType={nextButtonType}
                renderButton={renderButton}
                dataLoc={dataLoc}
                groupWidth={groupWidth}
                surface={surface}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  render() {
    const {
      data,
      childWidth,
      rowQuantity: rowQuantityProp,
      maxWidth,
      className,
      width,
    } = this.props;

    const rowQuantityVal =
      rowQuantityProp && this._getRowQuantityValue(rowQuantityProp);

    return (
      <ButtonGroupWrapper
        maxWidth={this._calculateWidth(childWidth, maxWidth, rowQuantityVal)}
        rowQuantity={rowQuantityVal}
        className={className}
        width={width}
      >
        {rowQuantityVal
          ? this.renderButtonGroupRows(rowQuantityVal)
          : this.renderButtonGroupItems(data, rowQuantityVal)}
      </ButtonGroupWrapper>
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

/** @component */
export default withVDSManager(ButtonGroup, true);
