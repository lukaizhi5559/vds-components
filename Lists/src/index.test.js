import { render, fireEvent, cleanup, getByText } from '@testing-library/react';
import React from 'react';
import {
  ListItem,
  UnorderedList,
  ListGroupItemTitle,
  ListGroupItemSubtitle,
  ListGroupItemImage,
  ListGroupItem,
  ListGroup,
} from '.';
import { ColorTokens } from '@vds-tokens/color';

function rgbToHex(rgb) {
  rgb = rgb
    .substr(4)
    .split(')')[0]
    .split(', ');

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
}

const testImageUrl =
  'https://www.verizon.com/business/content/dam/img/campaigns/gateway.jpg';
const webpUrl =
  'https://www.verizon.com/business/content/dam/img/campaigns/gateway.webp';
const testUrl =
  'https://images.unsplash.com/photo-1644211891657-6e33dac9429a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
const testImageSourcesArray = [
  {
    type: 'image/webp',
    srcset: webpUrl,
  },
];
const size = ['micro', 'bodySmall', 'bodyMedium', 'bodyLarge'];

afterEach(cleanup);

jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'test'),
  };
});
jest.mock('@vds-core/toggles', () => {
  return {
    Toggle: () => {
      return (
        <input data-testid="test-toggle" type="checkbox" value="Hi" id="1" />
      );
    },
  };
});

test('ListGroup default styles', () => {
  const { container } = render(
    <ListGroup bottomLine topLine>
      <ListGroupItem actionElement="icon">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="checkbox">
        <ListGroupItemTitle>This is the second item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the second item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem
        actionElement="icon"
        descriptiveIcon={{
          name: 'gift',
        }}
      >
        <ListGroupItemTitle>This is the third item subtitle</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the third item title
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem>
        <ListGroupItemImage src={testUrl} alt="list-item-image-72" size="72" />
        <ListGroupItemTitle>This is the fourth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the fourth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="textLink" textLink={{ text: 'Text Link' }}>
        <ListGroupItemTitle>This is fifth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is fifth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="toggle">
        <ListGroupItemTitle>This is sixth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is sixth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="icon" subtitleRight="Subtitle right">
        <ListGroupItemTitle>This is seventh item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is seventh item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  const lgTitle = container.querySelector('[class^="StyledTitle"]');
  // Title styles
  expect(lgTitle).toHaveStyleRule('font-size', '1.25rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1.5rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#000000');
  const lgSubtitle = container.querySelector('[class^="StyledBody"]');
  // Subtitle styles
  expect(lgSubtitle).toHaveStyleRule('font-size', '1rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#6f7171');
  // Action Icon size
  const icon = container.querySelector('[class^="IconContainer-VDS"]');
  expect(
    icon.querySelector(
      'path[d="M10.71933,19.8l-.817-.80985,7.683-7.61765H1.8v-1.145H17.58533l-7.683-7.61765.817-.80985L19.8,10.8Z"]'
    )
  ).toBeTruthy();
  //Action Icon color
  expect(icon.querySelector('path[fill="#000000"]')).toBeTruthy();
  // Spacings
  const rSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(rSpace).toHaveStyleRule('padding-left', '1rem');
  const lSpaceIcon = container.querySelector(
    '[class^="DescriptiveIconContainer"]'
  );
  expect(lSpaceIcon).toHaveStyleRule('margin-right', '1.5rem');
  const lSpaceImage = container.querySelectorAll('[class^="TextContainer"]')[3];
  expect(lSpaceImage).toHaveStyleRule('margin-left', '1.5rem');
  const subTRSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(subTRSpace).toHaveStyleRule('padding-left', '1rem');
  const tlSpace = container.querySelector('[class^="TextLinkContainer"]');
  expect(tlSpace).toHaveStyleRule('padding-left', '1rem');
  const checkSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(checkSpace).toHaveStyleRule('margin-right', '1.5rem');
  const toggleSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(toggleSpace).toHaveStyleRule('margin-right', '1.5rem');
  //Textlink color
  const tlColor = container.querySelector('[class^="StyledAnchor"]');
  expect(tlColor).toHaveStyleRule('color', '#000000');
  //Checkbox color
  const chColor = container.querySelector('[class^="styledInner"]');
  expect(chColor).toHaveStyleRule('border-color', '#6f7171');
  //Image radius
  const imgRadius = container.querySelector('[class^="ImageWrapper"]');
  expect(imgRadius).toHaveStyleRule('border-radius', '0.25rem');
});

test('ListGroup default styles Inverted', () => {
  const { container } = render(
    <ListGroup bottomLine topLine surface="dark">
      <ListGroupItem actionElement="icon">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="checkbox">
        <ListGroupItemTitle>This is the second item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the second item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem
        actionElement="icon"
        descriptiveIcon={{
          name: 'gift',
        }}
      >
        <ListGroupItemTitle>This is the third item subtitle</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the third item title
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem>
        <ListGroupItemImage src={testUrl} alt="list-item-image-72" size="72" />
        <ListGroupItemTitle>This is the fourth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the fourth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="textLink" textLink={{ text: 'Text Link' }}>
        <ListGroupItemTitle>This is fifth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is fifth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="toggle">
        <ListGroupItemTitle>This is sixth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is sixth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="icon" subtitleRight="Subtitle right">
        <ListGroupItemTitle>This is seventh item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is seventh item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  const lgTitle = container.querySelector('[class^="StyledTitle"]');
  // Title styles
  expect(lgTitle).toHaveStyleRule('font-size', '1.25rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1.5rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#ffffff');
  const lgSubtitle = container.querySelector('[class^="StyledBody"]');
  // Subtitle styles
  expect(lgSubtitle).toHaveStyleRule('font-size', '1rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#a7a7a7');
  // Action Icon size
  const icon = container.querySelector('[class^="IconContainer-VDS"]');
  expect(
    icon.querySelector(
      'path[d="M10.71933,19.8l-.817-.80985,7.683-7.61765H1.8v-1.145H17.58533l-7.683-7.61765.817-.80985L19.8,10.8Z"]'
    )
  ).toBeTruthy();
  //Action Icon color
  expect(icon.querySelector('path[fill="#ffffff"]')).toBeTruthy();
  // Spacings
  const rSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(rSpace).toHaveStyleRule('padding-left', '1rem');
  const lSpaceIcon = container.querySelector(
    '[class^="DescriptiveIconContainer"]'
  );
  expect(lSpaceIcon).toHaveStyleRule('margin-right', '1.5rem');
  const lSpaceImage = container.querySelectorAll('[class^="TextContainer"]')[3];
  expect(lSpaceImage).toHaveStyleRule('margin-left', '1.5rem');
  const subTRSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(subTRSpace).toHaveStyleRule('padding-left', '1rem');
  const tlSpace = container.querySelector('[class^="TextLinkContainer"]');
  expect(tlSpace).toHaveStyleRule('padding-left', '1rem');
  const checkSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(checkSpace).toHaveStyleRule('margin-right', '1.5rem');
  const toggleSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(toggleSpace).toHaveStyleRule('margin-right', '1.5rem');
  //Textlink color
  const tlColor = container.querySelector('[class^="StyledAnchor"]');
  expect(tlColor).toHaveStyleRule('color', '#ffffff');
  //Checkbox color
  const chColor = container.querySelector('[class^="styledInner"]');
  expect(chColor).toHaveStyleRule('border-color', '#a7a7a7');
  //Image radius
  const imgRadius = container.querySelector('[class^="ImageWrapper"]');
  expect(imgRadius).toHaveStyleRule('border-radius', '0.25rem');
});

test('ListGroup default styles in mobile', () => {
  const { container } = render(
    <ListGroup bottomLine topLine viewport="mobile">
      <ListGroupItem actionElement="icon">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="checkbox">
        <ListGroupItemTitle>This is the second item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the second item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem
        actionElement="icon"
        descriptiveIcon={{
          name: 'gift',
        }}
      >
        <ListGroupItemTitle>This is the third item subtitle</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the third item title
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem>
        <ListGroupItemImage src={testUrl} alt="list-item-image-72" size="72" />
        <ListGroupItemTitle>This is the fourth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the fourth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="textLink" textLink={{ text: 'Text Link' }}>
        <ListGroupItemTitle>This is fifth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is fifth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="toggle">
        <ListGroupItemTitle>This is sixth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is sixth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="icon" subtitleRight="Subtitle right">
        <ListGroupItemTitle>This is seventh item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is seventh item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  const lgTitle = container.querySelector('[class^="StyledTitle"]');
  // Title styles
  expect(lgTitle).toHaveStyleRule('font-size', '1rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#000000');
  const lgSubtitle = container.querySelector('[class^="StyledBody"]');
  // Subtitle styles
  expect(lgSubtitle).toHaveStyleRule('font-size', '0.75rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#6f7171');
  // Action Icon size
  const icon = container.querySelector('[class^="IconContainer-VDS"]');
  expect(
    icon.querySelector(
      'path[d="M10.71933,19.8l-.817-.80985,7.683-7.61765H1.8v-1.145H17.58533l-7.683-7.61765.817-.80985L19.8,10.8Z"]'
    )
  ).toBeTruthy();
  //Action Icon color
  expect(icon.querySelector('path[fill="#000000"]')).toBeTruthy();
  // Spacings
  const rSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(rSpace).toHaveStyleRule('padding-left', '0.75rem');
  const lSpaceIcon = container.querySelector(
    '[class^="DescriptiveIconContainer"]'
  );
  expect(lSpaceIcon).toHaveStyleRule('margin-right', '1rem');
  const lSpaceImage = container.querySelectorAll('[class^="TextContainer"]')[3];
  expect(lSpaceImage).toHaveStyleRule('margin-left', '1rem');
  const subTRSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(subTRSpace).toHaveStyleRule('padding-left', '0.75rem');
  const tlSpace = container.querySelector('[class^="TextLinkContainer"]');
  expect(tlSpace).toHaveStyleRule('padding-left', '0.75rem');
  const checkSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(checkSpace).toHaveStyleRule('margin-right', '1rem');
  const toggleSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(toggleSpace).toHaveStyleRule('margin-right', '1rem');
  //Textlink color
  const tlColor = container.querySelector('[class^="StyledAnchor"]');
  expect(tlColor).toHaveStyleRule('color', '#000000');
  //Checkbox color
  const chColor = container.querySelector('[class^="styledInner"]');
  expect(chColor).toHaveStyleRule('border-color', '#6f7171');
  //Image radius
  const imgRadius = container.querySelector('[class^="ImageWrapper"]');
  expect(imgRadius).toHaveStyleRule('border-radius', '0.25rem');
});

test('ListGroup default styles Inverted in mobile', () => {
  const { container } = render(
    <ListGroup bottomLine topLine surface="dark" viewport="mobile">
      <ListGroupItem actionElement="icon">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="checkbox">
        <ListGroupItemTitle>This is the second item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the second item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem
        actionElement="icon"
        descriptiveIcon={{
          name: 'gift',
        }}
      >
        <ListGroupItemTitle>This is the third item subtitle</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the third item title
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem>
        <ListGroupItemImage src={testUrl} alt="list-item-image-72" size="72" />
        <ListGroupItemTitle>This is the fourth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is the fourth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="textLink" textLink={{ text: 'Text Link' }}>
        <ListGroupItemTitle>This is fifth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is fifth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="toggle">
        <ListGroupItemTitle>This is sixth item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is sixth item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>

      <ListGroupItem actionElement="icon" subtitleRight="Subtitle right">
        <ListGroupItemTitle>This is seventh item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is seventh item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  const lgTitle = container.querySelector('[class^="StyledTitle"]');
  // Title styles
  expect(lgTitle).toHaveStyleRule('font-size', '1rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#ffffff');
  const lgSubtitle = container.querySelector('[class^="StyledBody"]');
  // Subtitle styles
  expect(lgSubtitle).toHaveStyleRule('font-size', '0.75rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#a7a7a7');
  // Action Icon size
  const icon = container.querySelector('[class^="IconContainer-VDS"]');
  expect(
    icon.querySelector(
      'path[d="M10.71933,19.8l-.817-.80985,7.683-7.61765H1.8v-1.145H17.58533l-7.683-7.61765.817-.80985L19.8,10.8Z"]'
    )
  ).toBeTruthy();
  //Action Icon color
  expect(icon.querySelector('path[fill="#ffffff"]')).toBeTruthy();
  // Spacings
  const rSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(rSpace).toHaveStyleRule('padding-left', '0.75rem');
  const lSpaceIcon = container.querySelector(
    '[class^="DescriptiveIconContainer"]'
  );
  expect(lSpaceIcon).toHaveStyleRule('margin-right', '1rem');
  const lSpaceImage = container.querySelectorAll('[class^="TextContainer"]')[3];
  expect(lSpaceImage).toHaveStyleRule('margin-left', '1rem');
  const subTRSpace = container.querySelector(
    '[class^="SubtitleRightWithIconContainer"]'
  );
  expect(subTRSpace).toHaveStyleRule('padding-left', '0.75rem');
  const tlSpace = container.querySelector('[class^="TextLinkContainer"]');
  expect(tlSpace).toHaveStyleRule('padding-left', '0.75rem');
  const checkSpace = container.querySelector('[class^="CheckboxWrapper"]');
  expect(checkSpace).toHaveStyleRule('margin-right', '1rem');
  //Textlink color
  const tlColor = container.querySelector('[class^="StyledAnchor"]');
  expect(tlColor).toHaveStyleRule('color', '#ffffff');
  //Checkbox color
  const chColor = container.querySelector('[class^="styledInner"]');
  expect(chColor).toHaveStyleRule('border-color', '#a7a7a7');
  //Image radius
  const imgRadius = container.querySelector('[class^="ImageWrapper"]');
  expect(imgRadius).toHaveStyleRule('border-radius', '0.25rem');
});

test('ListGroup styles - textHierarchy="subtitleProminent"', () => {
  const { container } = render(
    <ListGroup bottomLine topLine>
      <ListGroupItem actionElement="icon" textHierarchy="subtitleProminent">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  // Title styles
  const lgTitle = container.querySelector('[class^="StyledBody"]');
  expect(lgTitle).toHaveStyleRule('font-size', '1rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#6f7171');
  // Subtitle styles
  const lgSubtitle = container.querySelector('[class^="StyledTitle"]');
  expect(lgSubtitle).toHaveStyleRule('font-size', '1.25rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1.5rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#000000');
});

test('ListGroup styles - textHierarchy="subtitleProminent" in mobile', () => {
  const { container } = render(
    <ListGroup viewport="mobile">
      <ListGroupItem actionElement="icon" textHierarchy="subtitleProminent">
        <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
        <ListGroupItemSubtitle>
          This is first item subtitle
        </ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );
  // Title styles
  const lgTitle = container.querySelector('[class^="StyledBody"]');
  expect(lgTitle).toHaveStyleRule('font-size', '0.75rem');
  expect(lgTitle).toHaveStyleRule('line-height', '1rem');
  expect(lgTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  expect(lgTitle).toHaveStyleRule('font-weight', '400');
  expect(lgTitle).toHaveStyleRule('color', '#6f7171');
  // Subtitle styles
  const lgSubtitle = container.querySelector('[class^="StyledTitle"]');
  expect(lgSubtitle).toHaveStyleRule('font-size', '1rem');
  expect(lgSubtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(lgSubtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(lgSubtitle).toHaveStyleRule('font-weight', '400');
  expect(lgSubtitle).toHaveStyleRule('color', '#000000');
});

test('UnorderedList default styles - spacing="standard"', () => {
  const { container } = render(
    <UnorderedList>
      <ListItem spacing="standard">List Item 1 Text</ListItem>
      <ListItem spacing="standard">List Item 2 Text</ListItem>
      <ListItem spacing="standard">
        Item with sublist
        <UnorderedList>
          <ListItem spacing="standard">Nested item 1</ListItem>
          <ListItem spacing="standard">Nested item 2</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  );
  const listItem = container.querySelectorAll('[class^="StyledLi"]')[2];
  // Text size - Large(Default)
  expect(listItem).toHaveStyleRule('font-size', '1rem');
  expect(listItem).toHaveStyleRule('line-height', '1.25rem');
  expect(listItem).toHaveStyleRule('font-weight', '400');
  expect(listItem).toHaveStyleRule('color', '#000000');
  //Spacing: Standard
  expect(listItem).toHaveStyleRule('padding-top', '1rem');
  //Glyph level 1 - disc, bold
  expect(listItem).toHaveStyleRule('content', "'•'", {
    modifier: '> span:first-child:before',
  });

  expect(listItem).toHaveStyleRule('font-weight', '700', {
    modifier: '> span:first-child:before',
  });
  //Spacing: Standard
  expect(listItem).toHaveStyleRule('padding-right', '0.75rem', {
    modifier: '> span:first-child:before',
  });
  //Glyph level 2 - en dash
  const nestedItem = listItem.querySelectorAll('[class^="StyledLi"]')[0];
  expect(nestedItem).toHaveStyleRule('content', "'–'", {
    modifier: 'ul li > span:first-child::before',
  });
  expect(nestedItem).toHaveStyleRule('font-weight', '400', {
    modifier: 'ul li > span:first-child::before',
  });
  //Spacing: Standard
  expect(nestedItem).toHaveStyleRule('padding-top', '1rem');
});

test('UnorderedList default styles - spacing="compact"', () => {
  const { container } = render(
    <UnorderedList>
      <ListItem spacing="compact">List Item 1 Text</ListItem>
      <ListItem spacing="compact">List Item 2 Text</ListItem>
      <ListItem spacing="compact">
        Item with sublist
        <UnorderedList>
          <ListItem spacing="compact">Nested item 1</ListItem>
          <ListItem spacing="compact">Nested item 2</ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  );
  const listItem = container.querySelectorAll('[class^="StyledLi"]')[2];
  // Text size - Large(Default)
  expect(listItem).toHaveStyleRule('font-size', '1rem');
  expect(listItem).toHaveStyleRule('line-height', '1.25rem');
  expect(listItem).toHaveStyleRule('font-weight', '400');
  expect(listItem).toHaveStyleRule('color', '#000000');
  //Spacing: Standard
  expect(listItem).toHaveStyleRule('padding-top', '0.5rem');
  //Glyph level 1 - disc, bold
  expect(listItem).toHaveStyleRule('content', "'•'", {
    modifier: '> span:first-child:before',
  });
  expect(listItem).toHaveStyleRule('font-weight', '700', {
    modifier: '> span:first-child:before',
  });
  //Spacing: Standard
  expect(listItem).toHaveStyleRule('padding-right', '0.75rem', {
    modifier: '> span:first-child:before',
  });
  //Glyph level 2 - en dash
  const nestedItem = listItem.querySelectorAll('[class^="StyledLi"]')[1];
  expect(nestedItem).toHaveStyleRule('content', "'–'", {
    modifier: 'ul li > span:first-child::before',
  });
  expect(nestedItem).toHaveStyleRule('font-weight', '400', {
    modifier: 'ul li > span:first-child::before',
  });
  //Spacing: Standard
  expect(nestedItem).toHaveStyleRule('padding-top', '0.5rem');
});

test('UnorderedList styles - spacing="standard" - Surface dark', () => {
  const { container } = render(
    <UnorderedList>
      <ListItem spacing="standard" surface="dark">
        List Item 1 Text
      </ListItem>
      <ListItem spacing="standard" surface="dark">
        List Item 2 Text
      </ListItem>
    </UnorderedList>
  );
  const listItem = container.querySelector('[class^="StyledLi"]');
  // Text color
  expect(listItem).toHaveStyleRule('color', '#ffffff');
});

test(`UnorderedList size: ['micro', 'bodySmall', 'bodyMedium', 'bodyLarge'] - spacing="standard"`, () => {
  size.forEach(size => {
    const { container } = render(
      <UnorderedList>
        <ListItem spacing="standard" size={size}>
          List Item 1 Text
        </ListItem>
        <ListItem spacing="standard" size={size}>
          List Item 2 Text
        </ListItem>
        <ListItem spacing="standard" size={size}>
          Item with sublist
          <UnorderedList>
            <ListItem spacing="standard" size={size}>
              Nested item 1
            </ListItem>
            <ListItem spacing="standard" size={size}>
              Nested item 2
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    );
    const listItem = container.querySelectorAll('[class^="StyledLi"]')[2];
    // Text size
    const styles = window.getComputedStyle(listItem)._values;
    expect(styles['font-size']).toBe(
      `${
        size === 'bodyLarge'
          ? '1rem'
          : size === 'bodyMedium'
          ? '0.875rem'
          : size === 'bodySmall'
          ? '0.75rem'
          : size === 'micro'
          ? '0.6875rem'
          : '1rem'
      }`
    );
    expect(styles['line-height']).toBe(
      `${
        size === 'bodyLarge'
          ? '1.25rem'
          : size === 'bodyMedium'
          ? '1.125rem'
          : size === 'bodySmall' || size === 'micro'
          ? '1rem'
          : '1.25rem'
      }`
    );
    expect(styles['font-weight']).toBe(
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '400'
          : '400'
      }`
    );
    expect(styles['color']).toBe(
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? 'rgb(0, 0, 0)'
          : 'rgb(0, 0, 0)'
      }`
    );
    //Spacing: Standard
    expect(styles['padding-top']).toBe(
      `${
        size === 'bodyLarge'
          ? '1rem'
          : size === 'bodyMedium' || size === 'bodySmall' || size === 'micro'
          ? '0.75rem'
          : '1rem'
      }`
    );
    //Glyph level 1 - disc, bold
    expect(listItem).toHaveStyleRule(
      'content',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? "'•'"
          : "'•'"
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    expect(listItem).toHaveStyleRule(
      'font-weight',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '700'
          : '700'
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    // Spacing: Standard
    expect(listItem).toHaveStyleRule(
      'padding-right',
      `${
        size === 'bodyLarge'
          ? '0.75rem'
          : size === 'bodyMedium' || size === 'bodySmall' || size === 'micro'
          ? '0.5rem'
          : '0.75rem'
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    //Glyph level 2 - en dash  - Nested
    const nestedItem = listItem.querySelectorAll('[class^="StyledLi"]')[1];
    expect(nestedItem).toHaveStyleRule('content', "'–'", {
      modifier: 'ul li > span:first-child::before',
    });
    expect(nestedItem).toHaveStyleRule(
      'font-weight',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '400'
          : '700'
      }`,
      {
        modifier: 'ul li > span:first-child::before',
      }
    );
  });
});

test(`UnorderedList size: ['micro', 'bodySmall', 'bodyMedium', 'bodyLarge'] - spacing="compact"`, () => {
  size.forEach(size => {
    const { container } = render(
      <UnorderedList>
        <ListItem spacing="compact" size={size}>
          List Item 1 Text
        </ListItem>
        <ListItem spacing="compact" size={size}>
          List Item 2 Text
        </ListItem>
        <ListItem spacing="compact" size={size}>
          Item with sublist
          <UnorderedList>
            <ListItem spacing="compact" size={size}>
              Nested item 1
            </ListItem>
            <ListItem spacing="compact" size={size}>
              Nested item 2
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    );
    const listItem = container.querySelectorAll('[class^="StyledLi"]')[2];
    // Text size
    const styles = window.getComputedStyle(listItem)._values;
    expect(styles['font-size']).toBe(
      `${
        size === 'bodyLarge'
          ? '1rem'
          : size === 'bodyMedium'
          ? '0.875rem'
          : size === 'bodySmall'
          ? '0.75rem'
          : size === 'micro'
          ? '0.6875rem'
          : '1rem'
      }`
    );
    expect(styles['line-height']).toBe(
      `${
        size === 'bodyLarge'
          ? '1.25rem'
          : size === 'bodyMedium'
          ? '1.125rem'
          : size === 'bodySmall' || size === 'micro'
          ? '1rem'
          : '1.25rem'
      }`
    );
    expect(styles['font-weight']).toBe(
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '400'
          : '400'
      }`
    );
    expect(styles['color']).toBe(
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? 'rgb(0, 0, 0)'
          : 'rgb(0, 0, 0)'
      }`
    );
    //Spacing: Standard
    expect(styles['padding-top']).toBe(
      `${
        size === 'bodyLarge'
          ? '0.5rem'
          : size === 'bodyMedium' || size === 'bodySmall' || size === 'micro'
          ? '0.25rem'
          : '0.5rem'
      }`
    );
    //Glyph level 1 - disc, bold
    expect(listItem).toHaveStyleRule(
      'content',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? "'•'"
          : "'•'"
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    expect(listItem).toHaveStyleRule(
      'font-weight',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '700'
          : '700'
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    //Spacing: Standard
    expect(listItem).toHaveStyleRule(
      'padding-right',
      `${
        size === 'bodyLarge'
          ? '0.75rem'
          : size === 'bodyMedium' || size === 'bodySmall' || size === 'micro'
          ? '0.5rem'
          : '0.75rem'
      }`,
      {
        modifier: '> span:first-child:before',
      }
    );
    //Glyph level 2 - en dash  - Nested
    const nestedItem = listItem.querySelectorAll('[class^="StyledLi"]')[1];
    expect(nestedItem).toHaveStyleRule('content', "'–'", {
      modifier: 'ul li > span:first-child::before',
    });
    expect(nestedItem).toHaveStyleRule(
      'font-weight',
      `${
        size === 'bodyLarge' ||
        size === 'bodyMedium' ||
        size === 'bodySmall' ||
        size === 'micro'
          ? '400'
          : '700'
      }`,
      {
        modifier: 'ul li > span:first-child::before',
      }
    );
  });
});

test('should render ListItem correctly', () => {
  const { getByText, container } = render(<ListItem />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem correctly', () => {
  const { getByText, container } = render(<ListItem size="micro" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem correctly', () => {
  const { getByText, container } = render(<ListItem size="bodySmall" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem correctly', () => {
  const { getByText, container } = render(
    <ListItem size="bodySmall" viewport="mobile">
      List A
    </ListItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem correctly', () => {
  const { getByText, container } = render(
    <ListItem size="bodyLarge" viewport="desktop">
      List A
    </ListItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem for mobile correctly', () => {
  const { getByText, container } = render(
    <ListItem size="bodyLarge" viewport="mobile">
      List A
    </ListItem>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles.color)).toBe(
    ColorTokens.elements.primary.onlight.value
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('should render ListItem inverted correctly', () => {
  const { container } = render(
    <ListItem surface="dark" inverted>
      List A
    </ListItem>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles.color)).toBe(
    ColorTokens.elements.primary.ondark.value
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('should render UnorderedList correctly', () => {
  const { container } = render(
    <UnorderedList>
      <ListItem>List A</ListItem>
      <ListItem size="bodySmall">List B</ListItem>
    </UnorderedList>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItemTitle renders', () => {
  const { container } = render(<ListGroupItemTitle>Hi</ListGroupItemTitle>);

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem renders', () => {
  const { container } = render(
    <ListGroupItem>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem invertedrenders', () => {
  const { container } = render(
    <ListGroupItem inverted>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem topLine bottomLine', () => {
  const { container } = render(
    <ListGroupItem topLine bottomLine>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement textLink', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="textLink"
      textLink={{ text: 'textlink' }}
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem click', () => {
  jest.mock('@vds-core/utilities', () => {
    const originalModule = jest.requireActual('@vds-core/utilities');
    return {
      __esModule: true, // Use it when dealing with esModules
      ...originalModule,
      generateUUID: jest.fn(() => 'test'),
    };
  });
  const onClick = jest.fn();
  const { container, getByTestId } = render(
    <ListGroupItem topLine bottomLine actionElement="toggle" onClick={onClick}>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  const toggle = getByTestId('test-toggle');

  container.firstChild.focus();

  fireEvent.click(toggle);
  fireEvent.keyDown(container.firstChild, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
    code: 'Tab',
  });
  fireEvent.keyDown(toggle, {
    key: 'Space',
    keyCode: 32,
    charCode: 32,
  });
});

test('ListGroupItem keydown toggle', () => {
  jest.mock('@vds-core/utilities', () => {
    const originalModule = jest.requireActual('@vds-core/utilities');
    return {
      __esModule: true, // Use it when dealing with esModules
      ...originalModule,
      generateUUID: jest.fn(() => 'test'),
    };
  });
  const onClick = jest.fn();
  const { container, getByTestId } = render(
    <ListGroupItem topLine bottomLine actionElement="toggle" onClick={onClick}>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  const toggle = getByTestId('test-toggle');

  container.firstChild.focus();

  // fireEvent.click(toggle);
  fireEvent.keyDown(container.firstChild, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
    code: 'Tab',
  });
  fireEvent.keyDown(toggle, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
    type: ' ',
  });
});

test('ListGroupItem actionElement none', () => {
  const { container } = render(
    <ListGroupItem topLine bottomLine actionElement="none">
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement toggle', () => {
  const { container } = render(
    <ListGroupItem topLine bottomLine actionElement="toggle">
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement subtitleRight', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="icon"
      subtitleRight="subtitle-right"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement none with subtitleRight', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="none"
      subtitleRight="subtitle-right"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem inverted actionElement icon with subtitle right', () => {
  const { container } = render(
    <ListGroupItem
      inverted
      actionElement="icon"
      subtitleRight="subtitle-right-inverted"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem textHierarchy subtitleProminent', () => {
  const { container } = render(
    <ListGroupItem actionElement="icon" textHierarchy="subtitleProminent">
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem with image with standalone url and size 72', () => {
  const { container } = render(
    <ListGroupItem actionElement="icon" subtitleRight="subtitle-right">
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      <ListGroupItemImage
        src={testImageUrl}
        alt="test-img-standalone"
        size="72"
      />
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem with image with source array and size 116', () => {
  const { container } = render(
    <ListGroupItem
      actionElement="checkbox"
      subtitleRight="subtitle-right"
      viewport="mobile"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      <ListGroupItemImage
        src={testImageSourcesArray}
        alt="test-img-srcArray"
        size="116"
      />
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem inverted actionElement checkbox with subtitle right, descriptive icon, and image', () => {
  const { container } = render(
    <ListGroupItem
      inverted
      actionElement="checkbox"
      subtitleRight="subtitle-right"
      descriptiveIcon={{ name: 'gift' }}
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      <ListGroupItemImage
        src={testImageSourcesArray}
        alt="test-img-srcArray"
        size="116"
      />
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement textLink with subtitle and ariaLabel', () => {
  const { container } = render(
    <ListGroupItem actionElement="textLink" ariaLabel="test-ariaLabel">
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Subtitle</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem actionElement textLink with subtitle and no ariaLabel', () => {
  const { container } = render(
    <ListGroupItem actionElement="textLink" textLink={{ text: 'test' }}>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Subtitle</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem inverted actionElement checkbox with subtitle right, descriptive icon, and image in mobile viewport', () => {
  const { container } = render(
    <ListGroupItem
      inverted
      actionElement="checkbox"
      descriptiveIcon={{ name: 'gift' }}
      viewport="mobile"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      <ListGroupItemImage
        src={testImageSourcesArray}
        alt="test-img-srcArray"
        size="72"
      />
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem inverted actionElement checkbox with subtitle right, descriptive icon, and image in mobile viewport', () => {
  const { container } = render(
    <ListGroupItem
      inverted
      actionElement="checkbox"
      subtitleRight="subtitle-right"
      descriptiveIcon={{ name: 'gift', size: 'small' }}
      viewport="mobile"
    >
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      <ListGroupItemImage
        src={testImageSourcesArray}
        alt="test-img-srcArray"
        size="116"
      />
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem disabled', () => {
  const { container } = render(
    <ListGroupItem disabled>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
      <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem custom child', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="none"
      subtitleRight="subtitle-right"
      custom
    >
      <div>Hi</div>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem custom child viewport mobile', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="none"
      subtitleRight="subtitle-right"
      viewport="mobile"
      custom
    >
      <div>Hi</div>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroupItem should not render custom child when there is a subcomponent passed in', () => {
  const { container } = render(
    <ListGroupItem
      topLine
      bottomLine
      actionElement="none"
      subtitleRight="subtitle-right"
      custom
    >
      <div>Hi</div>
      <ListGroupItemTitle>Hi</ListGroupItemTitle>
    </ListGroupItem>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroup renders', () => {
  const { container } = render(
    <ListGroup topLine bottomLine>
      <ListGroupItem actionElement="none" subtitleRight="subtitle-right">
        <ListGroupItemTitle>Hi</ListGroupItemTitle>
        <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroup renders with props', () => {
  const { container } = render(
    <ListGroup topLine bottomLine viewport="mobile">
      <ListGroupItem actionElement="icon" subtitleRight="subtitle-right">
        <ListGroupItemTitle>Hi</ListGroupItemTitle>
        <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      </ListGroupItem>
      <ListGroupItem actionElement="toggle">
        <ListGroupItemTitle>Hi</ListGroupItemTitle>
        <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      </ListGroupItem>
      <ListGroupItem
        actionElement="textLink"
        textLink={{ text: 'test textlink' }}
      >
        <ListGroupItemTitle>Hi</ListGroupItemTitle>
        <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      </ListGroupItem>
      <ListGroupItem actionElement="textLink" textLink={{ text: '' }}>
        <ListGroupItemTitle>Hi</ListGroupItemTitle>
        <ListGroupItemSubtitle>Hi</ListGroupItemSubtitle>
      </ListGroupItem>
    </ListGroup>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroup renders with top and bottom line', () => {
  const { container } = render(
    <ListGroup topLine>
      <div>Custom child</div>
    </ListGroup>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('ListGroup renders with data prop', () => {
  const { container } = render(
    <ListGroup
      topLine
      bottomLine
      data={[
        {
          title: { text: 'Test title', bold: true },
          subtitle: { text: 'Test subtitle ' },
          actionElement: 'icon',
        },
        {},
        { children: 'Hi' },
      ]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
test('ListGroup renders with  toggle status text - desktop', () => {
  const { container } = render(
    <ListGroup
      topLine
      bottomLine
      data={[
        {
          title: { text: 'Test title', bold: true },
          subtitle: { text: 'Test subtitle ' },
          actionElement: 'toggle',
        },
      ]}
    />
  );
  const toggleContainer = container.querySelector(
    '[class^="ToggleContainer-VDS"]'
  );
  expect(toggleContainer).toBeInTheDocument();
  expect(toggleContainer).toHaveStyle({ 'max-width': 'calc(25% - 16px)' });
  expect(container.firstChild).toMatchSnapshot();
});
test('ListGroup renders with  toggle status text - mobile', () => {
  const { container } = render(
    <ListGroup
      topLine
      bottomLine
      viewport="mobile"
      data={[
        {
          title: { text: 'Test title', bold: true },
          subtitle: { text: 'Test subtitle ' },
          actionElement: 'toggle',
        },
      ]}
    />
  );
  const toggleContainer = container.querySelector(
    '[class^="ToggleContainer-VDS"]'
  );
  expect(toggleContainer).toBeInTheDocument();
  expect(toggleContainer).toHaveStyle({ 'max-width': 'calc(50% - 12px)' });
  expect(container.firstChild).toMatchSnapshot();
});
