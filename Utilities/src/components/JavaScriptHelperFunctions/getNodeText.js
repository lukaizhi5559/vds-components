const getNodeText = node => {
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) {
    return node.type &&
      node.type.displayName &&
      node.type.displayName.includes('Tooltip')
      ? ''
      : !node.props.children && typeof node.type === 'function'
      ? getNodeText(
          //to check whether it is class or functional component
          node.type.prototype && node.type.prototype.render
            ? node.type.name !== 'StyledComponent'
              ? renderClassComponent(node)
              : ''
            : node.type(node.props).props.children
        )
      : getNodeText(node.props.children);
  }
};

const renderClassComponent = node => {
  const classComp = new node.type(node.props);
  return classComp.render();
};

export default getNodeText;
