import React from 'react';
import PropTypes from 'prop-types';
import IconData from './data.json';
import { withVDSManager } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import {IconBase} from '../Icon/IconBase';

const propTypes = {
  /**
   * If provided, will render bold icons
   */
  bold: PropTypes.bool,
  /**
   *
   * Name of the icon
   */
  name: PropTypes.oneOf([
    'checkmark',
    'checkmark-alt',
    'close',
    'down-caret',
    'down-caret-bold',
    'error',
    'info',
    'left-caret',
    'pagination-left-arrow',
    'pagination-right-arrow',
    'right-caret',
    'warning',
  ]),
  /**
   * @ignore
   */
  ariaLabel: PropTypes.string,
  /**
   * Size of the icon.
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'XLarge']),
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Color of the icon.
   */
  color: PropTypes.oneOf([
    '#000000',
    '#FFFFFF',
    '#ffffff',
    '#EE0000',
    '#ee0000',
    '#F6F6F6',
    '#f6f6f6',
    '#D8DADA',
    '#d8dada',
    '#A7A7A7',
    '#a7a7a7',
    '#6F7171',
    '#6f7171',
    '#333333',
    '#1B1D1F',
    '#1b1d1f',
    '#ffece0',
    '#FFECE0',
    '#ffcaaa',
    '#FFCAAA',
    '#ffa46d',
    '#FFA46D',
    '#ff8027',
    '#FF8027',
    '#b95319',
    '#B95319',
    '#732706',
    '#561701',
    '#fff9de',
    '#FFF9DE',
    '#fff4bc',
    '#FFF4BC',
    '#ffe97a',
    '#FFE97A',
    '#fed60e',
    '#FED60E',
    '#bc9f0a',
    '#BC9f0A',
    '#635305',
    '#4b3f04',
    '#4B3F04',
    '#e3f2fd',
    '#E3F2FD',
    '#aad8f9',
    '#AAD8F9',
    '#4aabf2',
    '#4AABF2',
    '#0089ec',
    '#0089EC',
    '#006fc1',
    '#006FC1',
    '#003e6c',
    '#003E6C',
    '#002c4d',
    '#002C4D',
    '#dcf5e6',
    '#DCF5E6',
    '#a4e6bd',
    '#A4E6BD',
    '#63d48e',
    '#63D48E',
    '#00b845',
    '#00B845',
    '#008331',
    '#004b1c',
    '#004B1C',
    '#003514',
    '#febfe8',
    '#FEBFE8',
    '#fc89d5',
    '#FC89D5',
    '#fb42bc',
    '#FB42BC',
    '#b9318b',
    '#B9318B',
    '#671b4e',
    '#671B4E',
    '#edb9fb',
    '#EDB9FB',
    '#e084f9',
    '#E084F9',
    '#ce3df5',
    '#CE3DF5',
    '#84279e',
    '#84279E',
    '#461553',
    '#FBE4D7', // EOL
    '#fbe4d7', // EOL
    '#ED7000', // EOL
    '#ed7000', // EOL
    '#C44904', // EOL
    '#c44904', // EOL
    '#4A1C02', // EOL
    '#4a1c02', // EOL
    '#FFF4E0', // EOL
    '#fff4e0', // EOL
    '#FFBC3D', // EOL
    '#ffbc3d', // EOL
    '#523C14', // EOL
    '#523c14', // EOL
    '#D6EEFB', // EOL
    '#d6eefb', // EOL
    '#0096E4', // EOL
    '#0096e4', // EOL
    '#0077B4', // EOL
    '#0077b4', // EOL
    '#002B42', // EOL
    '#002b42', // EOL
    '#D6F2E0', // EOL
    '#d6f2e0', // EOL
    '#00AC3E', // EOL
    '#00ac3e', // EOL
    '#008330', // EOL
    '#003614', // EOL
  ]),
  /**
   * The tabIndex of the icon.
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   * passes through icon data object
   */
  data: PropTypes.object,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * Hides content from assistive technology when set to true
   */
  ariaHidden: PropTypes.bool,
};

const defaultProps = {
  size: 'medium',
  color: ColorTokens.elements.primary.onlight.value,
  tabIndex: 0,
  surface: 'light',
  bold: true,
  // props created for 1.0
  data: IconData,
  ariaHidden: false,
};

function mapChildren(children, iconColor) {
  return (
    children.length > 0 &&
    children.map((child, index) => {
      let attr = child.attributes;
      if (child.name === 'g') {
        return (
          <g key={`${child.name}${index}`}>
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </g>
        );
      }
      if (child.name === 'path') {
        let fill;
        if (attr.style) {
          fill = attr.style.split('fill:')[1];
        }

        return (
          <path
            key={`${child.name}${index}`}
            d={attr.d}
            stroke="none"
            fill={!!fill ? fill : attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </path>
        );
      }
      if (child.name === 'circle') {
        return (
          <circle
            id={attr.id}
            key={`${child.name}${index}`}
            cx={attr.cx}
            cy={attr.cy}
            r={attr.r}
            opacity={attr.opacity}
            stroke="none"
            fill={attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </circle>
        );
      }
      if (child.name === 'rect') {
        return (
          <rect
            key={`${child.name}${index}`}
            x={attr.x}
            y={attr.y}
            ry={attr.ry}
            rx={attr.rx}
            transform={attr.transform}
            width={attr.width}
            height={attr.height}
            stroke="none"
            fill={attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </rect>
        );
      }
      if (child.name === 'polyline') {
        return (
          <polyline
            key={`${child.name}${index}`}
            points={attr.points}
            stroke="none"
            fill={attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </polyline>
        );
      }
      if (child.name === 'line') {
        return (
          <line
            key={`${child.name}${index}`}
            x1={attr.x1}
            x2={attr.x2}
            y1={attr.y1}
            y2={attr.y2}
            stroke="none"
            fill={attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </line>
        );
      }
      if (child.name === 'polygon') {
        return (
          <polygon
            key={`${child.name}${index}`}
            points={attr.points}
            stroke="none"
            fill={attr.fill ? attr.fill : iconColor}
          >
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
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
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
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
            {child.children.length > 0 &&
              mapChildren(child.children, iconColor)}
          </stop>
        );
      }
    })
  );
}

/**
 * @ignore
 */
const RESTRICTED_Icon = props => {
  const {
    ariaHidden,
    ariaLabel,
    name,
    size,
    lineColor,
    color,
    surface,
    data,
    id,
    tabIndex,
    bold,
  } = props;

  const iconMap = {
    'pagination-right-arrow': 'right-arrow',
    'pagination-left-arrow': 'left-arrow',
  };

  const calculateIcon = () => {
    const originalIcons = Object.keys(iconMap);
    if (originalIcons.includes(name)) {
      let newName = bold ? name : iconMap[name];
      return data[newName];
    }
    return bold ? data[`${name}-bold`] : data[name];
  };

  let icon = calculateIcon();

  let iconColor = lineColor || color;

  //If inverted and no color specified
  if (surface === 'dark' && !color && !lineColor) {
    iconColor = ColorTokens.elements.primary.ondark.value;
    //If inverted and color black
  } else if (
    surface === 'dark' &&
    (color === 'black' ||
      color === ColorTokens.elements.primary.onlight.value ||
      color === 'Black')
  ) {
    iconColor = ColorTokens.elements.primary.ondark.value;
  }
  if (!icon) return null;

  return (
    <IconBase
      id={id}
      role="img"
      ariaLabel={ariaLabel}
      ariaHidden={ariaHidden}
      tabIndex={tabIndex}
      iconName={name}
      size={size}
      viewBox={icon.attributes.viewBox}
      surface={surface}
      svgContent={mapChildren(icon.children, iconColor)}
    ></IconBase>
  );
};

RESTRICTED_Icon.propTypes = propTypes;
RESTRICTED_Icon.defaultProps = defaultProps;

export default withVDSManager(RESTRICTED_Icon);
