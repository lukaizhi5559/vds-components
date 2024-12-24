import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  text,
  boolean,
  object,
} from '@storybook/addon-knobs/react';
import {
  ListItem,
  UnorderedList,
  ListGroupItem,
  ListGroupItemTitle,
  ListGroup,
  ListGroupItemSubtitle,
  ListGroupItemImage,
} from '.';
import { ColorTokens } from '@vds-tokens/color';
const _statusText = on => {
  if (on) return 'Some long text to show that the toggle is on';
  else return 'Some long text to show that the toggle is Off';
};
const sizeOptions = ['micro', 'bodySmall', 'bodyLarge'];
const viewportOptions = ['desktop', 'tablet', 'mobile'];
const actionElementOptions = ['none', 'icon', 'checkbox', 'textLink', 'toggle'];
const iconOptions = ['gift', 'left-arrow', 'none'];
const testUrl =
  'https://images.unsplash.com/photo-1644211891657-6e33dac9429a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

let ListText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit.';

const tooltipExample = {
  title: 'Test tooltip title',
  children: 'Hello, this is the tooltip body',
};

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ inverted }) =>
    inverted
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
`;

const ListGroupItemWrapper = styled.div``;

const FullHeightInvertedBackground = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  background: ${({ inverted }) =>
    inverted
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
`;

const ListGroupWrapper = styled.div`
  padding: 24px;
`;

const stories = storiesOf('Brand3.0/Lists', module);
stories
  .addDecorator(withKnobs)

  .add('ListItem', () => {
    const sizeSelect = select('size', sizeOptions, 'bodyLarge');
    const viewportSelect = select('viewport', viewportOptions, 'desktop');
    return (
      <ListItem
        size={sizeSelect}
        viewport={viewportSelect}
        children={text('List Text', ListText)}
      />
    );
  })

  .add('ListGroupItem', () => {
    const viewportSelect = select('viewport', viewportOptions, 'desktop');
    const actionElementSelect = select(
      'actionElement',
      actionElementOptions,
      'icon'
    );
    const customKnob = boolean('custom', false);
    const boldKnob = boolean('bold', false);
    const disabledKnob = boolean('disabled', false);
    const topLineOption = boolean('topLine', true);
    const bottomLineOption = boolean('bottomLine', true);
    const surfaceOption = select('surface', ['light', 'dark'], 'light');
    const titleText = text('title', 'This is my title');
    const primitiveOption = select(
      'primitive',
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'],
      'p'
    );
    const subtitleText = text('subtitle', 'This is my subtitle');
    const subtitleRightText = text('subtitleRight', 'hi');
    const textLinkText = text('textLink', 'This is a text link');
    const descriptiveIconNameSelect = select(
      'descriptiveIconName',
      iconOptions,
      'none'
    );
    const imageSrc = text('imageSource', testUrl);
    const imageSize = select('image size', ['72', '116'], '72');
    const titleTooltip = boolean('titleTooltip', false);
    const subtitleTooltip = boolean('subtitleTooltip', false);
    const textHierarchyOption = select(
      'text hierarchy',
      ['titleProminent', 'subtitleProminent'],
      'titleProminent'
    );

    return (
      <ListGroupItemWrapper>
        <InvertedBackground inverted={surfaceOption === 'dark'} />
        <ListGroupItem
          custom={customKnob}
          disabled={disabledKnob}
          surface={surfaceOption}
          topLine={topLineOption}
          bottomLine={bottomLineOption}
          actionElement={actionElementSelect}
          subtitleRight={subtitleRightText}
          viewport={viewportSelect}
          textHierarchy={textHierarchyOption}
          onClick={(e, a) => console.log('CLICK EVENT', e, a)}
          textLink={
            actionElementSelect === 'textLink'
              ? { text: textLinkText }
              : undefined
          }
          descriptiveIcon={{
            name:
              descriptiveIconNameSelect === 'none'
                ? undefined
                : descriptiveIconNameSelect,
          }}
        >
          {titleText && (
            <ListGroupItemTitle
              bold={boldKnob}
              primitive={primitiveOption}
              tooltip={titleTooltip ? tooltipExample : null}
            >
              {titleText}
            </ListGroupItemTitle>
          )}
          {subtitleText && (
            <ListGroupItemSubtitle
              tooltip={subtitleTooltip ? tooltipExample : null}
            >
              {subtitleText}
            </ListGroupItemSubtitle>
          )}
          {imageSrc && (
            <ListGroupItemImage
              src={imageSrc}
              alt="listItem-image"
              size={imageSize}
            />
          )}
          {customKnob && <div>I am a custom child</div>}
        </ListGroupItem>
      </ListGroupItemWrapper>
    );
  })

  .add('ListGroup', () => {
    const viewportSelect = select('viewport', viewportOptions, 'desktop');
    const bottomLineOption = boolean('bottomLine', false);
    const topLineOption = boolean('topLine', false);
    const surfaceOption = select('surface', ['light', 'dark'], 'light');
    const data = object('data', {});

    const newData = !Object.keys(data).length ? null : [{ ...data }];
    return (
      <FullHeightInvertedBackground inverted={surfaceOption === 'dark'}>
        <ListGroupWrapper>
          <ListGroup
            viewport={viewportSelect}
            surface={surfaceOption}
            bottomLine={bottomLineOption}
            topLine={topLineOption}
            data={newData}
          >
            <ListGroupItem
              actionElement="icon"
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemTitle>This is first item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              textHierarchy="subtitleProminent"
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemTitle>This is second item title</ListGroupItemTitle>
              <ListGroupItemSubtitle>
                This is second item subtitle
              </ListGroupItemSubtitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              onClick={() => alert('You clicked third item')}
            >
              <ListGroupItemTitle bold>
                This is third item bold title
              </ListGroupItemTitle>
              <ListGroupItemSubtitle>
                This is third item subtitle
              </ListGroupItemSubtitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              custom
              onClick={() => alert('You clicked custom child item')}
            >
              <div>I am a custom child passed into ListGroupItem</div>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              subtitleRight="Subtitle right"
              onClick={() => alert('You clicked fifth item')}
            >
              <ListGroupItemSubtitle>
                This is fifth item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is fifth item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="none"
              subtitleRight="Subtitle right without icon"
              onClick={() => alert('You clicked sixth item')}
            >
              <ListGroupItemSubtitle>
                This is sixth item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is sixth item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              subtitleRight="Subtitle right with icon in overflow mode lorem ipsum hi ipsum lorigj"
              onClick={() => alert('You clicked 7th item')}
            >
              <ListGroupItemSubtitle>
                This is the 7th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 7th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="none"
              subtitleRight="Subtitle right without icon in overflow mode lorem ipsum hi ipsum lorigj"
              onClick={() => alert('You clicked 8th item')}
            >
              <ListGroupItemSubtitle>
                This is the 8th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 8th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              subtitleRight="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed hendrerit lectus, quis convallis lorem. Etiam eget egestas eros, at dapibus nisl. "
              onClick={() => alert('You clicked 9th item')}
            >
              <ListGroupItemSubtitle>
                This is the ninth item subtitle in overflow mode. Change the
                viewport to see
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 9th item title in overflow mode. Change the viewport to
                see the changes in width
              </ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="textLink"
              textLink={{ text: 'Text Link' }}
              onClick={() => alert('You clicked 10th item')}
            >
              <ListGroupItemSubtitle>
                This is 10th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 10th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="textLink"
              textLink={{
                text:
                  'This is an example of a very long text link to see if it overflows into ellipsis or not',
              }}
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is 11th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 11th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
              actionElement="toggle"
              toggle={{
                showText: true,
                //statusText: _statusText,
              }}
            >
              <ListGroupItemSubtitle>
                This is 12th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 12th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              descriptiveIcon={{
                name: 'gift',
              }}
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is 13th item subtitle
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>This is 13th item title</ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="icon"
              descriptiveIcon={{
                name: 'gift',
                size: 'small',
                color: ColorTokens.palette.red.value,
              }}
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is the 14th item title
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 14th item title with custom descriptiveIcon props
              </ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="checkbox"
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is the 15th item title
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 15th item title with custom descriptiveIcon props
              </ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="checkbox"
              descriptiveIcon={{
                name: 'gift',
              }}
              // onClick={(e,x) => { console.log(e, x, "e,x")}}
            >
              <ListGroupItemSubtitle>
                This is the 16th item title
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 16th item title with custom descriptiveIcon props
              </ListGroupItemTitle>
            </ListGroupItem>
            <ListGroupItem
              actionElement="checkbox"
              descriptiveIcon={{
                name: 'gift',
              }}
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is the 17th item title
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 17th item title with custom descriptiveIcon props
              </ListGroupItemTitle>
              <ListGroupItemImage
                src={testUrl}
                alt="list-item-image-72"
                size="72"
              />
            </ListGroupItem>
            <ListGroupItem
              actionElement="checkbox"
              descriptiveIcon={{
                name: 'gift',
              }}
              onClick={(e, x) => {
                console.log(e, x, 'e,x');
              }}
            >
              <ListGroupItemSubtitle>
                This is the 18th item title
              </ListGroupItemSubtitle>
              <ListGroupItemTitle>
                This is 18th item title with custom descriptiveIcon props
              </ListGroupItemTitle>
              <ListGroupItemImage
                src={testUrl}
                alt="list-item-image-116"
                size="116"
              />
            </ListGroupItem>
          </ListGroup>
        </ListGroupWrapper>
      </FullHeightInvertedBackground>
    );
  })

  .add('UnorderedList', () => {
    const sizeSelect = select(
      'size',
      ['micro', 'bodySmall', 'bodyMedium', 'bodyLarge'],
      'bodyLarge'
    );
    const viewportSelect = select('viewport', viewportOptions, 'desktop');
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const spacingKnob = select('spacing', ['standard', 'compact'], 'standard');

    return (
      <React.Fragment>
        <InvertedBackground inverted={surfaceKnob === 'dark'} />
        <UnorderedList>
          <ListItem
            size={sizeSelect}
            viewport={viewportSelect}
            surface={surfaceKnob}
            children={text('List Item 1 Text ', ListText)}
            spacing={spacingKnob}
          />
          <ListItem
            size={sizeSelect}
            viewport={viewportSelect}
            surface={surfaceKnob}
            children={text('List Item 2 Text', ListText)}
            spacing={spacingKnob}
          />
          <ListItem
            size={sizeSelect}
            viewport={viewportSelect}
            surface={surfaceKnob}
            children={text('List Item 3 Text', ListText)}
            spacing={spacingKnob}
          />
          <ListItem
            size={sizeSelect}
            viewport={viewportSelect}
            surface={surfaceKnob}
            spacing={spacingKnob}
          >
            Item with sublist
            <UnorderedList>
              <ListItem
                size={sizeSelect}
                viewport={viewportSelect}
                surface={surfaceKnob}
                spacing={spacingKnob}
              >
                Nested item 1
              </ListItem>
              <ListItem
                size={sizeSelect}
                viewport={viewportSelect}
                surface={surfaceKnob}
                spacing={spacingKnob}
              >
                Nested item 2 Nested item 2 Nested item 2 Nested item 2 Nested
                item 2 Nested item 2 Nested item 2 Nested item 2 Nested item 2
                Nested item 2 Nested item 2 Nested item 2 Nested item 2 Nested
                item 2 Nested item 2 Nested item 2 Nested item 2
              </ListItem>
              <ListItem
                size={sizeSelect}
                viewport={viewportSelect}
                surface={surfaceKnob}
                spacing={spacingKnob}
              >
                Nested item 3
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </React.Fragment>
    );
  });
