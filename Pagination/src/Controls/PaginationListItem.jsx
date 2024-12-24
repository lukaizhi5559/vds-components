import styled from 'styled-components';
import { TypographyTokens } from '@vds-tokens/typography';
import { Fonts } from '@vds-core/typography';

const fontFamily = Fonts.VerizonNHGeTX;
const fontSizeDesktop = TypographyTokens.fontsize.body[12].value;
const lineHeightDesktop = TypographyTokens.lineheight.body[16].value;

const PaginationListItem = styled.li`
  font-family: ${fontFamily};
  font-size: ${fontSizeDesktop}; // TODO: Viewport awareness?
  line-height: ${lineHeightDesktop};
  margin-${({ marginSide }) => marginSide}: auto;
  text-align: center;
`;

export default PaginationListItem;
