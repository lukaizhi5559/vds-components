import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import { ButtonIcon } from './index';
import { Icon } from '../../Icons/src/index';
import { ColorTokens } from '@vds-tokens/color';

const icons = [
  '3d-ad',
  'accessibility',
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
  'air-conditioner',
  'airport',
  'alert-notification',
  'allow-block-list',
  'alternate-checkmark',
  'american-sign-language',
  'analytics',
  'announcement',
  'app-dialer',
  'app-level-protection',
  'ar',
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
  'bot',
  'box-open',
  'braille',
  'brightness',
  'bring-your-own-device',
  'business-continuity',
  'buy-plans',
  'calendar',
  'calibrate',
  'call-disconnected',
  'caller-id',
  'camera',
  'cards-on-reserve',
  'carryover-data',
  'cell-phone',
  'cell-tower',
  'chat',
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
  'electric-power',
  'electric-utility',
  'email',
  'embedded-sound',
  'emergency-contact',
  'emoji',
  'energy-science',
  'energy-utilities',
  'enterprise',
  'error',
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
  'folder-locked',
  'forwarded-call',
  'fridge',
  'fullscreen',
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
  'lmr',
  'loader',
  'location',
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
  'office-phone-system',
  'oil-industry',
  'on-demand',
  'on-go-car',
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
  'pause-alternate',
  'pause-internet',
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
  'play-alternate',
  'play-with',
  'plus',
  'police-fleet',
  'portrait',
  'pressure',
  'previous',
  'print',
  'professional-services-case',
  'professional-services-chart',
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
  'research',
  'reservations',
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
  'router',
  'rss',
  'safe-browsing',
  'satellite',
  'satellite-off',
  'save',
  'scale',
  'scale-alt',
  'school-notebook',
  'screen-orientation-unlocked',
  'search',
  'security-alert',
  'security-check',
  'security-keyhole',
  'security-wireless',
  'send-message',
  'server-search',
  'server-stack',
  'service-end-date',
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
  'solar-panel',
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
  'star-off',
  'steps',
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
  'thumbs-up',
  'ticket',
  'tiles',
  'tilt',
  'timer',
  'tools',
  'top-box',
  'total-mobile-protection',
  'trading-deck',
  'traffic',
  'traffic-light',
  'transportation',
  'trash',
  'travel-keys',
  'travel-pass',
  'trip-planner',
  'trumpet',
  'turn-on-off',
  'tv',
  'tv-content',
  'twitter',
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
  'wifi-scan',
  'wifi-wireless',
  'wireless-vending',
  'wireless-video-surveillance',
  'yield',
  'youtube',
  'zoom-in',
  'zoom-out',
];

const badgeIndicatorFillColorOptions = [
  'red',
  'yellow',
  'green',
  'orange',
  'blue',
  'grayHighContrast',
  'grayLowContrast',
  'black',
  'white',
];

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) => (surface === 'dark' ? 'black' : 'white')};
`;

const SurfaceMediaBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-image: ${({ surfaceType }) =>
    surfaceType === 'media' &&
    'url(https://ss7.vzw.com/is/image/VerizonWireless/white-test-2)'};
  background-position: center;
`;

const onClickButton = e => {
  alert('You pressed a icon button!');
  if (e.type === 'click' && e.detail !== 0) {
    e.currentTarget.blur();
  }
};

storiesOf('Brand3.0/ButtonIcons', module)
  .addDecorator(withKnobs)

  .add(
    'ButtonIcon',
    withState({ selected: false })(({ store }) => {
      const kindOptions = ['ghost', 'lowContrast', 'highContrast'];
      const sizeOptions = ['small', 'large'];
      const surfaceOptions = ['light', 'dark'];
      const surfaceTypeOptions = ['colorFill', 'media'];
      const floatingPosOptions = ['inside', 'outside'];
      const kindKnob = select('kind', kindOptions, 'ghost');
      const surfaceKnob = select('surface', surfaceOptions, 'light');
      const surfaceTypeKnob = select(
        'surfaceType',
        surfaceTypeOptions,
        'colorFill'
      );
      const focusBorderPositionKnob = select(
        'focusBorderPosition',
        floatingPosOptions,
        'outside'
      );
      const nameKnob = select('name', icons, 'add-to-favorite');
      const selectedNameKnob = select(
        'selected name',
        icons,
        'added-to-favorite'
      );
      const xOffsetKnob = text('x-offset', '');
      const yOffsetKnob = text('y-offset', '');

      const _onChange = (e, obj) => {
        store.set({ selected: obj.selected });
      };

      const badgeIndicatorKindKnob = select(
        'badge indicator kind',
        ['simple', 'numbered'],
        'simple'
      );
      const badgeIndicatorFillColorKnob = select(
        'fillColor',
        badgeIndicatorFillColorOptions,
        'red'
      );
      const biBorderColorOnLightKnob = text(
        'badge indicator borderColor onlight',
        ColorTokens.palette.white.value
      );
      const biBorderColorOnDarkKnob = text(
        'badge indicator borderColor ondark',
        ColorTokens.palette.black.value
      );
      const badgeIndicatiorChildrenKnob = text(
        'badge indicator children',
        '99'
      );
      const badgeIndicatiorContainerSizeKnob = text(
        'badge indicator container size',
        '16'
      );
      const badgeIndicatiorDotSizeKnob = text('badge indicator dot size', '4');
      const badgeIndicatiorSizeKnob = select(
        'badge indicator size',
        ['small', 'medium', 'large', 'XLarge', '2XLarge'],
        'small'
      );
      const badgeIndicatiorHideBorder = boolean(
        'badge indicator hideBorder',
        false
      );
      const badgeIndicatiorHideDot = boolean('badge indicator hideDot', false);
      const badgeIndicatorMaximumDigits = select(
        'badge indicator maximumDigits',
        ['one', 'two', 'three', 'four', 'five', 'six', 'none'],
        'two'
      );
      const badgeIndicatorLeadingCharacterKnob = text('leadingCharacter', '');
      const badgeIndicatorTrailingTextKnob = text('trailingTextKnob', '');
      const badgeXoffsetKnob = text('badge indicator x-offset', '');
      const badgeYoffsetKnob = text('badge indicator y-offset', '');
      const badgeExpandDirectionKnob = select(
        'badge indicator expand direction',
        ['right', 'center', 'left'],
        'right'
      );

      return (
        <Container>
          <InvertedBackground surface={surfaceKnob} />
          <SurfaceMediaBackground
            surface={surfaceKnob}
            surfaceType={surfaceTypeKnob}
          />
          <ButtonIcon
            kind={select('kind', kindKnob, 'ghost')}
            size={select('size', sizeOptions, 'large')}
            surface={surfaceKnob}
            surfaceType={surfaceTypeKnob}
            hideBorder={boolean('hideBorder', true)}
            floating={boolean('floating', false)}
            focusBorderPosition={focusBorderPositionKnob}
            iconOffset={{ x: xOffsetKnob, y: yOffsetKnob }}
            fitToIcon={boolean('fitToIcon', false)}
            renderIcon={props => <Icon name={nameKnob} {...props} />}
            renderSelectedIcon={props => (
              <Icon name={selectedNameKnob} {...props} />
            )}
            disabled={boolean('disabled', false)}
            selectable={boolean('selectable', false)}
            showBadgeIndicator={boolean('show badge indicator', false)}
            badgeIndicator={{
              kind: badgeIndicatorKindKnob,
              fillColor: badgeIndicatorFillColorKnob,
              borderColor: {
                onlight: biBorderColorOnLightKnob,
                ondark: biBorderColorOnDarkKnob,
              },
              containerSize: badgeIndicatiorContainerSizeKnob,
              dotSize: badgeIndicatiorDotSizeKnob,
              children: badgeIndicatiorChildrenKnob,
              size: badgeIndicatiorSizeKnob,
              hideBorder: badgeIndicatiorHideBorder,
              hideDot: badgeIndicatiorHideDot,
              maximumDigits: badgeIndicatorMaximumDigits,
              leadingCharacter: badgeIndicatorLeadingCharacterKnob,
              trailingText: badgeIndicatorTrailingTextKnob,
              offset: { x: badgeXoffsetKnob, y: badgeYoffsetKnob },
              expandDirection: badgeExpandDirectionKnob,
            }}
            //selected={boolean('selected', false)}
            //selected={store.state.selected}
            //onClick={onClickButton}
            //onChange={(e, obj) => _onChange(e, obj)}
          />
        </Container>
      );
    })
  );
