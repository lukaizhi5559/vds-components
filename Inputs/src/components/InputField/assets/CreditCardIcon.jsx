/* istanbul ignore file */

import React from 'react';
import PropTypes from 'prop-types';
import CardData from './data.json';

const propTypes = {
  data: PropTypes.object,
};

const defaultProps = {
  data: CardData,
};

function mapChildren(children) {
  return (
    children.length > 0 &&
    children.map((child, index) => {
      let attr = child.attributes;
      if (child.name === 'g') {
        return (
          <g fill={attr.fill} key={`${child.name}${index}`}>
            {child.children.length > 0 && mapChildren(child.children)}
          </g>
        );
      }
      if (child.name === 'path') {
        return (
          <path
            stroke={attr.stroke}
            fill={attr.fill}
            key={`${child.name}${index}`}
            d={attr.d}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </path>
        );
      }
      if (child.name === 'circle') {
        return (
          <circle
            fill={attr.fill}
            id={attr.id}
            key={`${child.name}${index}`}
            cx={attr.cx}
            cy={attr.cy}
            r={attr.r}
            opacity={attr.opacity}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </circle>
        );
      }
      if (child.name === 'rect') {
        return (
          <rect
            fill={attr.fill}
            key={`${child.name}${index}`}
            x={attr.x}
            y={attr.y}
            ry={attr.ry}
            rx={attr.rx}
            transform={attr.transform}
            width={attr.width}
            height={attr.height}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </rect>
        );
      }
      if (child.name === 'polyline') {
        return (
          <polyline
            fill={attr.fill}
            key={`${child.name}${index}`}
            points={attr.points}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </polyline>
        );
      }
      if (child.name === 'line') {
        return (
          <line
            fill={attr.fill}
            key={`${child.name}${index}`}
            x1={attr.x1}
            x2={attr.x2}
            y1={attr.y1}
            y2={attr.y2}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </line>
        );
      }
      if (child.name === 'polygon') {
        return (
          <polygon
            fill={attr.fill}
            key={`${child.name}${index}`}
            points={attr.points}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </polygon>
        );
      }
      if (child.name === 'linearGradient') {
        return (
          <linearGradient
            key={`${child.name}${index}`}
            id={attr.id}
            gradientUnits={attr.gradientUnits}
            x1={attr.x1}
            y1={attr.y1}
            x2={attr.x2}
            y2={attr.y2}
            gradientTransform={attr.gradientTransform}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </linearGradient>
        );
      }
      if (child.name === 'stop') {
        return (
          <stop
            offset={attr.offset}
            stopColor={attr['stop-color']}
            key={`${child.name}${index}`}
          >
            {child.children.length > 0 && mapChildren(child.children)}
          </stop>
        );
      }
      if (child.name === 'defs') {
        return (
          <defs key={`${child.name}${index}`}>
            {child.children.length > 0 && mapChildren(child.children)}
          </defs>
        );
      }
    })
  );
}

const CreditCardIcon = props => {
  const { data, name, surface } = props;
  let icon;
  const invertedCards = [
    'dinersClub',
    'generic',
    'placeholder',
    'visa',
    'securityCode',
    'securityCodeAmex',
    'unionPay',
  ];

  if (surface === 'dark' && invertedCards.includes(name))
    icon = data[`${name}-inverted`];
  else icon = data[name];

  return (
    <svg
      data={data}
      viewBox={icon.attributes.viewBox}
      width="100%"
      style={{
        backgroundColor: name === 'discover' && surface === 'dark' && '#FFFFFF',
      }}
    >
      {mapChildren(icon.children)}
    </svg>
  );
};

CreditCardIcon.propTypes = propTypes;
CreditCardIcon.defaultProps = defaultProps;

export default CreditCardIcon;
