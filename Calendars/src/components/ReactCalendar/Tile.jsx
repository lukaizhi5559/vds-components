import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { tileProps } from './shared/propTypes';
import { Indicator, IndicatorWrapper } from '../Indicators';

function getValue(nextProps, prop) {
  const { activeStartDate, date, view } = nextProps;

  return typeof prop === 'function'
    ? prop({ activeStartDate, date, view })
    : prop;
}

export default class Tile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { tileClassName, tileContent } = nextProps;

    const nextState = {};

    if (tileClassName !== prevState.tileClassNameProps) {
      nextState.tileClassName = getValue(nextProps, tileClassName);
      nextState.tileClassNameProps = tileClassName;
    }

    if (tileContent !== prevState.tileContentProps) {
      nextState.tileContent = getValue(nextProps, tileContent);
      nextState.tileContentProps = tileContent;
    }

    return nextState;
  }

  state = {};

  render() {
    const {
      activeStartDate,
      children,
      classes,
      date,
      formatAbbr,
      locale,
      maxDate,
      maxDateTransform,
      minDate,
      minDateTransform,
      onClick,
      onMouseOver,
      style,
      tileDisabled,
      view,
      tabIndex,
      value,
      isNeighboringMonth,
      indicators,
      surface,
    } = this.props;
    const { tileClassName, tileContent } = this.state;
    const isSelected =
      date && value && date.toDateString() === value.toDateString();
    const isDisabled =
      (minDate && minDateTransform(minDate) > date) ||
      (maxDate && maxDateTransform(maxDate) < date) ||
      (tileDisabled && tileDisabled({ activeStartDate, date, view }));

    const ariaLabel = formatAbbr
      ? isSelected
        ? `${formatAbbr(locale, date)} selected`
        : formatAbbr(locale, date)
      : undefined;

    const isDateInArray = () => {
      return (
        indicators &&
        !!indicators.find(item => {
          return item.date && item.date.getTime() == date.getTime();
        })
      );
    };

    const filteredIndicators =
      indicators &&
      indicators.filter(
        data => data.date && data.date.getTime() === date.getTime()
      );

    const getAriaLabel = () => {
      if (formatAbbr) {
        let ariaLabel = formatAbbr(locale, date);
        if (isSelected) {
          ariaLabel = `${ariaLabel} selected`;
        }
        if (filteredIndicators && filteredIndicators.length >= 1) {
          filteredIndicators.forEach(data => {
            ariaLabel = `${ariaLabel} ${data.label}`;
          });
        }
        return ariaLabel;
      }
      return undefined;
    };

    return (
      <button
        className={mergeClassNames(classes, tileClassName)}
        disabled={isDisabled}
        onClick={onClick && (event => onClick(date, event))}
        onFocus={onMouseOver && (() => onMouseOver(date))}
        onMouseOver={onMouseOver && (() => onMouseOver(date))}
        style={style}
        type="button"
        tabIndex={tabIndex}
        aria-label={getAriaLabel()}
        aria-hidden={isDisabled || isNeighboringMonth}
      >
        {formatAbbr ? (
          <abbr aria-label={getAriaLabel()}>{children}</abbr>
        ) : (
          children
        )}
        {tileContent}
        {formatAbbr && filteredIndicators && filteredIndicators.length >= 1 && (
          <IndicatorWrapper>
            {indicators.map((data, index) => {
              return (
                data.date &&
                data.date.getTime() === date.getTime() && (
                  <Indicator
                    key={index}
                    type={index + 1}
                    surface={surface || (isSelected && !isDisabled)}
                    isSelected={isSelected}
                  />
                )
              );
            })}
          </IndicatorWrapper>
        )}
      </button>
    );
  }
}

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  formatAbbr: PropTypes.func,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};
