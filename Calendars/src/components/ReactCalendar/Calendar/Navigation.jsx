import React from 'react';
import PropTypes from 'prop-types';
import { getUserLocale } from 'get-user-locale';

import {
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext,
  getBeginPrevious,
  getEndPrevious,
} from '../shared/dates';
import {
  formatMonthYear as defaultFormatMonthYear,
  formatYear as defaultFormatYear,
} from '../shared/dateFormatter';
import { isView, isViews } from '../shared/propTypes';

const className = 'react-calendar__navigation';

export default function Navigation({
  activeStartDate,
  drillUp,
  formatMonthYear = defaultFormatMonthYear,
  formatYear = defaultFormatYear,
  locale,
  maxDate,
  minDate,
  navigationAriaLabel = '',
  navigationLabel,
  nextAriaLabel = '',
  nextLabel = () => '›',
  prevAriaLabel = '',
  prevLabel = () => '‹',
  setActiveStartDate,
  showDoubleView,
  view,
  views,
  onNextMouseEnter,
  onNextMouseLeave,
  onPrevMouseEnter,
  onPrevMouseLeave,
}) {
  const drillUpAvailable = views.indexOf(view) > 0;

  const previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  const nextActiveStartDate = getBeginNext(view, activeStartDate);

  const prevButtonDisabled = (() => {
    /* istanbul ignore if */
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  })();

  const nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;

  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate);
  }

  function onClickNext() {
    setActiveStartDate(nextActiveStartDate);
  }

  function renderLabel(date) {
    const label = (() => {
      switch (view) {
        case 'century':
          return getCenturyLabel(locale, formatYear, date);
        case 'decade':
          return getDecadeLabel(locale, formatYear, date);
        case 'year':
          return formatYear(locale, date);
        case 'month':
          return formatMonthYear(locale, date);
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return navigationLabel
      ? navigationLabel({
          date,
          label,
          locale: locale || getUserLocale(),
          view,
        })
      : label;
  }

  function renderButton() {
    const labelClassName = `${className}__label`;
    return (
      <button
        aria-label={navigationAriaLabel}
        className={labelClassName}
        disabled={!drillUpAvailable}
        onClick={drillUp}
        style={{ flexGrow: 1 }}
        type="button"
        aria-live="polite"
      >
        <span
          className={`${labelClassName}__labelText ${labelClassName}__labelText--from`}
        >
          {renderLabel(activeStartDate)}
        </span>
        {showDoubleView && (
          <>
            <span className={`${labelClassName}__divider`}> – </span>
            <span
              className={`${labelClassName}__labelText ${labelClassName}__labelText--to`}
            >
              {renderLabel(nextActiveStartDate)}
            </span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className={className} style={{ display: 'flex' }}>
      {prevLabel() !== null &&
        (prevLabel()?.props?.children?.type?.displayName ===
        'IconSVGWrapper' ? (
          <button
            aria-label={prevAriaLabel}
            className={`${className}__arrow ${className}__prev-button`}
            disabled={prevButtonDisabled}
            onClick={onClickPrevious}
            onMouseLeave={onPrevMouseLeave}
            onMouseEnter={onPrevMouseEnter}
            type="button"
          >
            {prevLabel()}
          </button>
        ) : (
          <div
            aria-label={prevAriaLabel}
            className={`${className}__arrow ${className}__prev-button`}
          >
            {prevLabel(onClickPrevious, prevButtonDisabled)}
          </div>
        ))}

      {renderButton()}

      {nextLabel() !== null &&
        (nextLabel()?.props?.children?.type?.displayName ===
        'IconSVGWrapper' ? (
          <button
            aria-label={nextAriaLabel}
            className={`${className}__arrow ${className}__next-button`}
            disabled={nextButtonDisabled}
            onClick={onClickNext}
            onMouseEnter={onNextMouseEnter}
            onMouseLeave={onNextMouseLeave}
            type="button"
          >
            {nextLabel()}
          </button>
        ) : (
          <div
            aria-label={nextAriaLabel}
            className={`${className}__arrow ${className}__next-button`}
          >
            {nextLabel(onClickNext, nextButtonDisabled)}
          </div>
        ))}
    </div>
  );
}

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  formatMonthYear: PropTypes.func,
  formatYear: PropTypes.func,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  navigationAriaLabel: PropTypes.string,
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.func,
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.node,
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.func,
  setActiveStartDate: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool,
  view: isView.isRequired,
  views: isViews.isRequired,
  onNextMouseEnter: PropTypes.func,
  onNextMouseLeave: PropTypes.func,
  onPrevMouseEnter: PropTypes.func,
  onPrevMouseLeave: PropTypes.func,
};
