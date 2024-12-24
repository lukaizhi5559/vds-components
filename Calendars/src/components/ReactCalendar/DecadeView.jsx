import Years from './DecadeView/Years';
import React from 'react';

export default function DecadeView(props) {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
}
