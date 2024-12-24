import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionDetail,
  AccordionTitle,
  AccordionSubTitle,
} from '.';

const Header = styled.div``;
const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface, disabled }) =>
    surface === 'dark' ? 'black' : 'white'};
`;

const viewportOptions = ['mobile', 'desktop', 'tablet'];
const surfaceOptions = ['light', 'dark'];
const detailText = `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque
              sodales ut etiam sit amet nisl purus in. Sit amet nisl suscipit
              adipiscing bibendum est. Nec sagittis aliquam malesuada bibendum
              arcu vitae elementum. Ac ut consequat semper viverra nam libero
              justo laoreet. Justo eget magna fermentum iaculis eu non diam
              phasellus. Lacus viverra vitae congue eu consequat ac felis donec.
              Erat velit scelerisque in dictum. Purus ut faucibus pulvinar
              elementum. Adipiscing vitae proin sagittis nisl. Cum sociis
              natoque penatibus et magnis dis parturient montes. Feugiat nibh
              sed pulvinar proin. Pretium lectus quam id leo in vitae turpis.
              Nunc lobortis mattis aliquam faucibus purus. Nibh praesent
              tristique magna sit. In iaculis nunc sed augue lacus. Platea
              dictumst quisque sagittis purus sit amet volutpat consequat.
              Facilisis leo vel fringilla est. Elementum integer enim neque
              volutpat ac tincidunt vitae semper quis. In nibh mauris cursus
              mattis molestie. Tristique senectus et netus et malesuada fames.
              Laoreet sit amet cursus sit amet dictum sit. Sed ullamcorper morbi
              tincidunt ornare massa. Sed cras ornare arcu dui vivamus. Nisl
              purus in mollis nunc sed id semper risus. Sit amet dictum sit amet
              justo donec enim diam. Posuere morbi leo urna molestie at. Urna
              molestie at elementum eu facilisis sed. Adipiscing elit duis
              tristique sollicitudin nibh sit amet. Cras semper auctor neque
              vitae tempus quam pellentesque nec nam. Massa tempor nec feugiat
              nisl pretium. Pretium lectus quam id leo in. Nulla porttitor massa
              id neque aliquam vestibulum morbi blandit. Amet cursus sit amet
              dictum sit amet. Enim sed faucibus turpis in eu mi bibendum.
              Tempus iaculis urna id volutpat lacus. Massa sapien faucibus et
              molestie ac feugiat sed lectus vestibulum. Eget mi proin sed
              libero. Ut morbi tincidunt augue interdum velit euismod in. Sociis
              natoque penatibus et magnis dis parturient montes nascetur
              ridiculus. Porttitor massa id neque aliquam vestibulum morbi
              blandit cursus. Turpis massa sed elementum tempus egestas sed sed.
              Pellentesque dignissim enim sit amet. Auctor augue mauris augue
              neque gravida in fermentum. Consectetur a erat nam at lectus urna
              duis. Bibendum ut tristique et egestas quis ipsum suspendisse
              ultrices gravida. Nibh mauris cursus mattis molestie a. Lectus
              magna fringilla urna porttitor rhoncus dolor purus. Tincidunt
              augue interdum velit euismod. Commodo ullamcorper a lacus
              vestibulum sed arcu non odio euismod. Praesent tristique magna sit
              amet purus gravida quis. Velit laoreet id donec ultrices tincidunt
              arcu non sodales neque. Suspendisse in est ante in nibh mauris
              cursus mattis molestie. Vitae auctor eu augue ut lectus. Habitant
              morbi tristique senectus et netus et malesuada fames ac. Diam quis
              enim lobortis scelerisque fermentum. Tempus egestas sed sed risus
              pretium quam. Diam maecenas ultricies mi eget mauris pharetra et.
              Velit sed ullamcorper morbi tincidunt ornare massa. Urna porttitor
              rhoncus dolor purus non enim praesent elementum facilisis. Lacinia
              at quis risus sed vulputate. Eget velit aliquet sagittis id
              consectetur purus ut faucibus pulvinar. Sed enim ut sem viverra
              aliquet eget sit. Egestas diam in arcu cursus euismod. Sagittis
              purus sit amet volutpat consequat mauris. Tincidunt arcu non
              sodales neque sodales ut etiam sit amet. Praesent semper feugiat
              nibh sed pulvinar. Purus in mollis nunc sed id semper risus in
              hendrerit. Urna et pharetra pharetra massa massa ultricies. Id eu
              nisl nunc mi ipsum faucibus vitae aliquet nec. Elit ut aliquam
              purus sit amet. Nunc congue nisi vitae suscipit tellus mauris a
              diam. Odio tempor orci dapibus ultrices in iaculis nunc sed augue.
              Leo duis ut diam quam nulla porttitor massa id neque. Sit amet
              dictum sit amet justo donec. Mi in nulla posuere sollicitudin
              aliquam. Diam in arcu cursus euismod quis viverra nibh.`;

storiesOf('Brand3.0/Accordions', module)
  .addDecorator(withKnobs)

  .add('Accordion', () => {
    const viewportKnob = select('viewport', viewportOptions, 'desktop');
    const triggerTypeKnob = select('triggerType', ['icon', 'link'], 'icon');
    const typeOptions = select('type', ['multi', 'single'], 'multi');
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const topLineKnob = boolean('topLine', true);
    const bottomLineKnob = boolean('bottomLine', true);
    const openTriggerLabel = text('openAccordionTriggerLabel', '');
    const closeTriggerLabel = text('closeAccordionTriggerLabel', '');
    const longHeader =
      'This is a very long header to see if overflow state is done correctly. Duis feugiat elit in enim dapibus fermentum eu ac dui. Vestibulum mollis elit libero, sed imperdiet augue suscipit ut. ';
    const longLink =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat nunc est, eget fringilla sapien pulvinar nec. Morbi justo nulla, pulvinar in porttitor et, faucibus sit amet leo. Curabitur vehicula tortor id viverra eleifend. Fusce faucibus molestie fermentum. Nunc fermentum commodo eros eget convallis.';

    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <Accordion
          surface={surfaceKnob}
          viewport={viewportKnob}
          topLine={topLineKnob}
          bottomLine={bottomLineKnob}
          type={typeOptions}
        >
          <AccordionItem
            alwaysOpen={boolean('alwaysOpen - Accordion Item One', false)}
          >
            <AccordionHeader
              triggerType={triggerTypeKnob}
              openAccordionTriggerLabel={openTriggerLabel}
              closeAccordionTriggerLabel={closeTriggerLabel}
              bold
            >
              <AccordionTitle bold>Screen</AccordionTitle>
              <AccordionSubTitle> Sub Header for Screen </AccordionSubTitle>
            </AccordionHeader>
            <AccordionDetail>{detailText}</AccordionDetail>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader
              triggerType="link"
              openAccordionTriggerLabel={longLink}
            >
              {longHeader}
            </AccordionHeader>
            <AccordionDetail>{detailText}</AccordionDetail>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader triggerType="icon"> {longHeader}</AccordionHeader>
            <AccordionDetail>{detailText}</AccordionDetail>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader
              bold
              triggerType="link"
              openAccordionTriggerLabel={longLink}
              closeAccordionTriggerLabel={longLink}
            >
              <AccordionTitle>{longHeader}</AccordionTitle>
              <AccordionSubTitle>This is a subtitle</AccordionSubTitle>
            </AccordionHeader>
            <AccordionDetail>
              This is to test for when alwaysOpen is true and title should reach
              the end This is to test for when alwaysOpen is true and title
              should reach the end This is to test for when alwaysOpen is true
              and title should reach the end
            </AccordionDetail>
          </AccordionItem>
        </Accordion>
      </React.Fragment>
    );
  });
