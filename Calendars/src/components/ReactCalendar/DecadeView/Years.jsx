import TileGroup from '../TileGroup';
import Year from './Year';
import React from 'react';
import { getBeginOfDecadeYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default function Years(props) {
  const { activeStartDate } = props;
  const start = getBeginOfDecadeYear(activeStartDate);
  const end = start + 9;

  return (
    <TileGroup
      {...props}
      className="react-calendar__decade-view__years"
      dateTransform={year => {
        const date = new Date();
        date.setFullYear(year, 0, 1);
        date.setHours(0, 0, 0, 0);
        return date;
      }}
      dateType="year"
      end={end}
      start={start}
      tile={Year}
    />
  );
}

Years.propTypes = {
  ...tileGroupProps,
};
