import Months from './YearView/Months';
import React from 'react';

export default function YearView(props) {
  function renderMonths() {
    return <Months {...props} />;
  }

  return <div className="react-calendar__year-view">{renderMonths()}</div>;
}
