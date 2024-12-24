import React from 'react';
import { TextLink } from '@vds-core/buttons';
import { UnorderedList, ListItem } from '@vds-core/lists';
import parse, { domToReact, attributesToProps } from 'html-react-parser';

const options = {
  replace: node => {
    if (node.type === 'tag') {
      const props = attributesToProps(node.attribs);
      switch (node.name) {
        case 'a':
          return (
            <TextLink {...props}>{domToReact(node.children, options)}</TextLink>
          );
        case 'ul':
          return (
            <UnorderedList {...props}>
              {domToReact(node.children, options)}
            </UnorderedList>
          );
        case 'li':
          return (
            <ListItem {...props}>{domToReact(node.children, options)}</ListItem>
          );
        default:
          return;
      }
    } else if (node.type === 'text' && node.data.includes('\n')) {
      // if the text node contains \n, replace it with a <br> element
      const textNodes = node.data.split('\n').map((text, index, array) => {
        if (index === array.length - 1) {
          return text; //Don't add <br> after the last line
        } else {
          return (
            <React.Fragment key={index}>
              {text}
              <br />
            </React.Fragment>
          );
        }
      });
      return textNodes;
    } else {
      return node.data;
    }
  },
};

const convertStringToElements = htmlString => {
  return parse(htmlString, options);
};

export default convertStringToElements;
