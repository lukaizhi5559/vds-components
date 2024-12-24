import Decades from './CenturyView/Decades';
import React from 'react';

export default function CenturyView(props) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
}
