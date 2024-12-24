import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import Icon from './Icon/Icon';
import RESTRICTED_Icon from './RESTRICTED_Icon/RESTRICTED_Icon';
import { ColorTokens } from '@vds-tokens/color';
import { Body } from '@vds-core/typography';
import { Line } from '@vds-core/lines';

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

const FullHeightInvertedBackground = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

const AllIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const IconSizeLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`;

const IconSizeMapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const TextWrapper = styled.span`
  text-align: left;
`;

const iconSizes = ['small', 'medium', 'large', 'XLarge'];

const restrictedIconSizes = ['small', 'medium', 'large', 'XLarge'];

const surfaceOptions = ['light', 'dark'];

const icons = [
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
  'clean-surface',
  'clock',
  'close',
  'close-alternate',
  'closed-captioning',
  'closed-captioning-filled',
  'cloud',
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
  'paused',
  'payment-received',
  'peel-sticker',
  'pets-collar',
  'pharmaceutical',
  'phone',
  'phone-all-good',
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
  'remove-user',
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
  'stadium-flag',
  'stakeholder',
  'star',
  'start-trip',
  'steps',
  'stethoscope',
  'stock-together',
  'stop',
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
  'tv',
  'tv-content',
  'twitter',
  'ultimate-plan',
  'umbrella',
  'undo',
  'unification',
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
  'whiteboard',
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
];

const restricted_icons = [
  'checkmark',
  'checkmark-alt',
  'close',
  'down-caret',
  'error',
  'info',
  'left-caret',
  'pagination-left-arrow',
  'pagination-right-arrow',
  'right-caret',
  'warning',
];

const colorChoices = {
  '#000000': 'black',
  '#FFFFFF': 'white',
  '#EE0000': 'red',
  '#F6F6F6': 'gray95',
  '#D8DADA': 'gray85',
  '#A7A7A7': 'gray65',
  '#6F7171': 'gray44',
  '#333333': 'gray20',
  '#1B1D1F': 'gray11',
  '#FFECE0': 'orange94',
  '#FFCAAA': 'orange83',
  '#FFA46D': 'orange71',
  '#FF8027': 'orange58',
  '#B95319': 'orange41',
  '#732706': 'orange24',
  '#561701': 'orange17',
  '#FFF9DE': 'yellow94',
  '#FFF4BC': 'yellow87',
  '#FFE97A': 'yellow74',
  '#FED60E': 'yellow53',
  '#BC9f0A': 'yellow39',
  '#635305': 'yellow20',
  '#4B3F04': 'yellow15',
  '#E3F2FD': 'blue94',
  '#AAD8F9': 'blue82',
  '#4AABF2': 'blue62',
  '#0089EC': 'blue46',
  '#006FC1': 'blue38',
  '#003E6C': 'blue21',
  '#002C4D': 'blue15',
  '#DCF5E6': 'green91',
  '#A4E6BD': 'green77',
  '#63D48E': 'green61',
  '#00B845': 'green36',
  '#008331': 'green26',
  '#004B1C': 'green15',
  '#003514': 'green10',
  '#FEBFE8': 'pink87',
  '#FC89D5': 'pink76',
  '#FB42BC': 'pink62',
  '#B9318B': 'pink46',
  '#671B4E': 'pink25',
  '#EDB9FB': 'purple85',
  '#E084F9': 'purple75',
  '#CE3DF5': 'purple60',
  '#84279E': 'purple39',
  '#461553': 'purple20',
};

storiesOf('Brand3.0/Icons', module)
  .addDecorator(withKnobs)
  .add('Icon', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const nameKnob = select('name', icons, 'left-caret');
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <Icon
          hasStroke
          surface={surfaceKnob}
          name={nameKnob}
          size={select('size', iconSizes, 'XLarge')}
          color={select('color', colorChoices, ColorTokens.palette.black.value)}
        />
      </React.Fragment>
    );
  })

  .add('All Icons', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const textColor =
      surfaceKnob === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value;

    const getAllIcons = () => {
      return icons.map((iconName, index) => {
        return (
          <IconSizeLineWrapper key={`${iconName}-map-${index}`}>
            <Body size="large" bold color={textColor}>
              {iconName}
            </Body>
            <IconSizeMapper>
              {iconSizes.map((size, index) => {
                return (
                  <IconWrapper key={`${iconName}-${size}-${index}`}>
                    <Icon
                      size={size}
                      surface={surfaceKnob}
                      name={iconName || 'alt'}
                    />
                    <TextWrapper>
                      <Body size="small" color={textColor}>
                        {size}
                      </Body>
                    </TextWrapper>
                  </IconWrapper>
                );
              })}
            </IconSizeMapper>
            <Line type="secondary" surface={surfaceKnob} />
          </IconSizeLineWrapper>
        );
      });
    };

    return (
      <React.Fragment>
        <FullHeightInvertedBackground surface={surfaceKnob}>
          <AllIconsWrapper>{getAllIcons()}</AllIconsWrapper>
        </FullHeightInvertedBackground>
      </React.Fragment>
    );
  })

  .add('RESTRICTED_Icon', () => {
    const boldKnob = boolean('bold', false);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const nameKnob = select('name', restricted_icons, 'checkmark');
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <RESTRICTED_Icon
          bold={boldKnob}
          surface={surfaceKnob}
          name={nameKnob}
          size={select('size', restrictedIconSizes, 'medium')}
          color={select('color', colorChoices, ColorTokens.palette.black.value)}
        />
      </React.Fragment>
    );
  });
