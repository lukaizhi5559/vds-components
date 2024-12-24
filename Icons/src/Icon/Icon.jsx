import { ColorTokens } from '@vds-tokens/color';
import { IconBase } from './IconBase';
import IconData from './data.json';
import PropTypes from 'prop-types';
import React from 'react';
import { getIconColor } from './utils';

const propTypes = {
  /**
   *
   * This will be used to render the icon with corresponding name. Any VDS icon names can be used.
   * Please see our [icon explorer](/components/fundamentals/icon/explorer)
   */
  name: PropTypes.oneOf([
    '3d-ad',
    '4k',
    'accessibility',
    'accessories',
    'ad-tech-stack',
    'adaptive-speaker',
    'add-folder',
    'add-to-favorite',
    'add-user',
    'added-to-favorite',
    'advanced-settings',
    'agent-chat',
    'agriculture-leaves',
    'agriculture-tractor',
    'agriculture-vineyard',
    'ai-dashcam',
    'air-conditioner',
    'airport',
    'alert-notification',
    'allow-block-list',
    'alternate-checkmark',
    'ambulance',
    'american-sign-language',
    'analytics',
    'anchor',
    'announcement',
    'app-dialer',
    'app-level-protection',
    'ar',
    'ar-lens',
    'archive',
    'artboard',
    'asset-tracking',
    'assisted-listening-systems',
    'at',
    'attach',
    'audience-targeted-search',
    'audio-description',
    'available-lines',
    'award',
    'awareness',
    'baby-monitor',
    'barcode',
    'battery',
    'best-practices',
    'bid',
    'bill-down',
    'bill-up',
    'blind',
    'bluetooth',
    'bonus-data',
    'bookmark',
    'bookmark-filled',
    'bot',
    'box-open',
    'braille',
    'brightness',
    'bring-your-own-device',
    'bucket-truck',
    'bucket-truck-boom',
    'bug',
    'business-continuity',
    'buy-plans',
    'calendar',
    'calibrate',
    'call-disconnected',
    'caller-id',
    'camera',
    'camera-effects',
    'camera-modes',
    'car-battery',
    'cards-on-reserve',
    'carryover-data',
    'cell-phone',
    'cell-signal',
    'cell-signal-alt',
    'cell-tower',
    'chat',
    'chat-disabled',
    'checkmark',
    'checkmark-alt',
    'clean-surface',
    'clock',
    'close',
    'close-alt',
    'close-alternate',
    'closed-captioning',
    'closed-captioning-fill',
    'closed-captioning-filled',
    'cloud',
    'cloud-alt',
    'cloud-alternative',
    'cloud-document',
    'coax',
    'coffee',
    'cognitive-disability',
    'coin',
    'comparison',
    'compass',
    'compliance-document',
    'compose',
    'condition-based-maintenance',
    'condition-based-wrench',
    'connect',
    'connect-parts',
    'construction-hammer',
    'construction-truck',
    'consultative-transfer',
    'convergence',
    'conversion',
    'count-down',
    'crash',
    'credit-card',
    'crop',
    'cross-device',
    'cross-device-targeting',
    'cta',
    'ctr',
    'custom-audience',
    'customize',
    'data',
    'data-boost',
    'deaf',
    'decrease',
    'device-activity',
    'device-protection',
    'devices-addons',
    'dfc-video-side-by-side',
    'diagnostic',
    'digital-content',
    'digital-signage',
    'digital-signage-car',
    'dining',
    'direct-carrier-billing',
    'directory',
    'display',
    'display-utilities',
    'distribution',
    'domain-targeting',
    'doorbell',
    'down-arrow',
    'down-caret',
    'download',
    'drag-and-drop',
    'driver',
    'drivers-license',
    'drone-camera',
    'drop-shipment',
    'duplicate',
    'edit',
    'education',
    'education-curriculum',
    'electric-car',
    'electric-power',
    'electric-utility',
    'electric-van',
    'email',
    'email-signature',
    'embedded-sound',
    'emergency-contact',
    'emoji',
    'employee-termination',
    'energy-science',
    'energy-utilities',
    'enterprise',
    'error',
    'ethernet',
    'euro',
    'even-more-flexibility',
    'expense',
    'external-link',
    'face-covering',
    'facebook',
    'fall-detected',
    'favorite',
    'fax',
    'federal-defense',
    'feedback',
    'filter',
    'filter-off',
    'financial',
    'find-my-remote',
    'fine-art',
    'fingerprint-sensor',
    'fire',
    'fit-to-zone',
    'flag',
    'fleet',
    'fleet-tracking',
    'flexibility',
    'flexibility-rectangles',
    'flexible-four-arrows',
    'flexible-three-arrows',
    'flip-camera',
    'flurry',
    'folder',
    'folder-locked',
    'forwarded-call',
    'fridge',
    'fullscreen',
    'fullscreen-minimize',
    'gaming',
    'gas',
    'gateway',
    'geofence',
    'get-help',
    'gift',
    'gifted-data',
    'government',
    'grid-view',
    'group',
    'group-family',
    'growth',
    'growth-opportunities',
    'hackers',
    'handshake',
    'hard-brake',
    'hd',
    'headphones',
    'healthcare-corporate',
    'healthcare-general',
    'healthcare-worker',
    'history',
    'home',
    'home-internet',
    'humidity',
    'ideas-solutions',
    'identity-graph',
    'identity-restoration',
    'impression-video',
    'in-store-pickup',
    'inclusivity',
    'incoming-call',
    'increase',
    'industry',
    'inferred-identity',
    'info',
    'instagram',
    'insurance',
    'intelligent-tracking',
    'international',
    'international-long-distance',
    'international-symbol-of-access',
    'internet-devices',
    'internet-of-things',
    'inventory',
    'invitation-accepted',
    'invitation-expired',
    'invitation-rejected',
    'irobot',
    'ironing-board',
    'join-call',
    'k12-education',
    'kids-stroller',
    'landscape',
    'laptop-antivirus',
    'laptop-controls',
    'laptop-gps-tracking',
    'laptop-settings',
    'laptop-trends',
    'laptop-wireless',
    'large-plan',
    'law',
    'left-arrow',
    'left-caret',
    'levers',
    'light',
    'link',
    'list',
    'live-caption',
    'lmr',
    'loader',
    'loaner-equipment',
    'location',
    'location-only-device',
    'location-pin',
    'lock-closed',
    'lock-open',
    'locker',
    'logout',
    'loyalty-retention',
    'manufacturing',
    'map-view',
    'masonry-view',
    'maximize',
    'medal',
    'media-entertainment',
    'medium-business',
    'medium-plan',
    'menu',
    'merge-calls',
    'microphone',
    'microphone-alt',
    'microphone-alternate',
    'minus',
    'missed-call',
    'mobile-apps',
    'mobile-command-center',
    'mobile-hotspot',
    'mobile-kiosk-info',
    'mobile-kiosk-wireless',
    'mobile-plus-tv',
    'mobile-retail',
    'mobile-retargeting',
    'mobile-search',
    'mobile-workforce-management',
    'more-flexibility',
    'more-horizontal',
    'motion-detector',
    'move-to',
    'multicast',
    'multiple-device-protection',
    'multiple-devices',
    'multiple-documents',
    'music',
    'mute',
    'my-account',
    'my-plans',
    'my-plans-details',
    'nation-wide',
    'nationwide',
    'native',
    'native-video',
    'network',
    'network-attached-storage',
    'network-connection',
    'new',
    'news',
    'next',
    'nfc-tag',
    'night',
    'no',
    'no-fee',
    'no-location',
    'no-off',
    'no-smoking',
    'no-video',
    'notification',
    'notifications-off',
    'notify-me',
    'notify-someone',
    'office-phone-system',
    'oil-industry',
    'on-demand',
    'on-go-car',
    'on-screen-text',
    'one-year',
    'open-captioning',
    'operational-transformation',
    'orders',
    'out-of-stock',
    'outgoing-call',
    'pack-backpack',
    'pack-luggage',
    'pack-purse',
    'paper-free-billing',
    'passenger',
    'pause',
    'pause-alt-filled',
    'pause-alternate',
    'pause-internet',
    'payment-received',
    'peel-sticker',
    'pets-collar',
    'pharmaceutical',
    'phone',
    'phone-all-good',
    'phone-alt',
    'phone-data',
    'phone-favorite',
    'phone-medical',
    'phone-number',
    'phone-public-safety',
    'phone-volume',
    'photo',
    'place-address',
    'platform',
    'play',
    'play-alt',
    'play-alt-filled',
    'play-alternate',
    'play-with',
    'plus',
    'plus-tier-plan',
    'police-fleet',
    'portrait',
    'pressure',
    'previous',
    'print',
    'professional-services-case',
    'professional-services-chart',
    'promo-badge',
    'protection-score',
    'public-safety',
    'public-transportation',
    'purchase-data',
    'push-notification',
    'push-to-talk',
    'question',
    'real-time',
    'real-time-tracking',
    'recycle',
    'remind-me',
    'reminder',
    'remove-item',
    'reoccurring-payment',
    'replace-a-photo',
    'reply',
    'reports-and-alerts',
    'research',
    'resend-email',
    'reservations',
    'responsible-business',
    'retail-store',
    'retail-store-alt',
    'retargeting',
    'returns',
    'rewards',
    'rewind-and-fast-forward',
    'right-arrow',
    'right-caret',
    'ring',
    'ringing',
    'ringtone',
    'risk-monitor',
    'risky-connection',
    'router',
    'rss',
    'safe-browsing',
    'satellite',
    'satellite-off',
    'save',
    'scale',
    'scale-alt',
    'school-notebook',
    'screen-orientation-locked',
    'screen-orientation-unlocked',
    'search',
    'security-alert',
    'security-check',
    'security-keyhole',
    'security-wireless',
    'send-message',
    'server-clock',
    'server-search',
    'server-stack',
    'service-end-date',
    'services',
    'set-fallback-image',
    'set-gallery-image',
    'settings',
    'share',
    'shipping',
    'shock',
    'shopping',
    'shopping-bag',
    'signal-broadcast',
    'sim-card',
    'single-document',
    'skip-back',
    'skip-forward',
    'small-business',
    'small-plan',
    'smart-assistant',
    'smart-boiler',
    'smart-communities',
    'smart-family-child-address-book',
    'smart-lighting',
    'smart-meter',
    'smart-scooter',
    'smart-socket',
    'smart-switch',
    'smoke-detector',
    'snooze',
    'social-distancing',
    'social-security',
    'solar-panel',
    'sort',
    'sos',
    'sound',
    'speaker-mute',
    'speaker-phone',
    'speed',
    'speed-monitoring',
    'sports-bike',
    'sports-skis',
    'sports-soccer',
    'sports-tennis',
    'stadium',
    'stadium-alt',
    'stadium-flag',
    'stakeholder',
    'star',
    'star-off',
    'start-trip',
    'steps',
    'stethoscope',
    'stock-together',
    'stop',
    'stop-alt',
    'stop-alternate',
    'support',
    'support-drawer',
    'survey',
    'swipe',
    'swipe-left',
    'swipe-right',
    'switch',
    'sync',
    'tablet',
    'tablet-data',
    'tablet-wireless',
    'tag',
    'talking',
    'target-goal',
    'taxes',
    'team-leader',
    'tech-laptop',
    'tech-phone',
    'technology',
    'telematics-car',
    'teletype',
    'temperature',
    'template',
    'text-to-speech',
    'theme',
    'thermostat-tech',
    'thumbs-down',
    'thumbs-down-filled',
    'thumbs-up',
    'thumbs-up-filled',
    'ticket',
    'tiles',
    'tilt',
    'timer',
    'tire-blowout',
    'tools',
    'top-box',
    'total-mobile-protection',
    'tow-truck',
    'trading-deck',
    'traffic',
    'traffic-light',
    'trailers',
    'training',
    'transportation',
    'trash',
    'travel-keys',
    'travel-pass',
    'trip-planner',
    'trumpet',
    'trusted-browser',
    'turn-on-off',
    'turnon-off',
    'tv',
    'tv-content',
    'twitter',
    'ultimate-plan',
    'umbrella',
    'undo',
    'unification',
    'unified-comms',
    'unified-communications',
    'unlimited-plan',
    'unmanaged-devices',
    'up-arrow',
    'up-caret',
    'uplink',
    'upload',
    'url-transparency',
    'user',
    'user-guides-1',
    'user-guides-2',
    'user-registration',
    'user-settings',
    'utility-grid-management',
    'vibration',
    'video',
    'video-on-tablet',
    'virtual-reality',
    'visibility',
    'visibility-off',
    'voice-hd',
    'voice-mail',
    'volume',
    'volunteer',
    'vpn',
    'wallet',
    'warning',
    'water-resistant',
    'water-utility',
    'wearable',
    'weather',
    'webinar',
    'weights',
    'white-black-list',
    'whiteboard',
    'wifi',
    'wifi-scan',
    'wifi-wireless',
    'winch-service',
    'wireless-vending',
    'wireless-video-surveillance',
    'xcorp',
    'yield',
    'youtube',
    'zoom-in',
    'zoom-out',
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
  surface: 'light',
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

const Icon = props => {
  const { ariaHidden, name, size, lineColor, color, surface, data, id } = props;

  const iconMap = {
    'closed-captioning-fill': 'closed-captioning-filled',
    'tech-phone': 'headphones',
    'play-alt': 'play-alternate',
    'checkmark-alt': 'alternate-checkmark',
    'microphone-alt': 'microphone-alternate',
    'stadium-alt': 'stadium',
    'more-flexibility': 'flexible-three-arrows',
    'even-more-flexibility': 'flexible-four-arrows',
    'cloud-alt': 'cloud-alternative',
    wifi: 'wifi-wireless',
    'white-black-list': 'allow-block-list',
    group: 'group-family',
    'unified-comms': 'unified-communications',
    'close-alt': 'close-alternate',
    'nation-wide': 'nationwide',
    'turnon-off': 'turn-on-off',
    'stop-alt': 'stop-alternate',
    'phone-alt': 'cell-phone',
    'healthcare-worker': 'add-user',
    'star-off': 'star',
  };

  const calculateIcon = () => {
    const deprecatedIcons = Object.keys(iconMap);
    if (deprecatedIcons.includes(name)) {
      let newName = iconMap[name];
      return data[newName];
    }
    return data[name];
  };

  let icon = calculateIcon();
  let iconColor = getIconColor(props);

  if (!icon) return null;

  return (
    <IconBase
      id={id}
      ariaHidden={ariaHidden}
      iconName={name}
      size={size}
      viewBox={icon.attributes.viewBox}
      surface={surface}
      svgContent={mapChildren(icon.children, iconColor)}
      color={iconColor}
    ></IconBase>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.displayName = 'VDS_Icon';

export default Icon;
