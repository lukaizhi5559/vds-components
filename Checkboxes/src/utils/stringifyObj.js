import ReactDOMServer from 'react-dom/server';
const stringifyObj = obj => {
  let objectString = '';
  obj.forEach(element => {
    Object.entries(element).forEach(entry => {
      const [key, value] = entry;
      if (typeof value['$$typeof'] === 'symbol') {
        objectString =
          objectString +
          key +
          "'" +
          ReactDOMServer.renderToStaticMarkup(value) +
          "'";
      } else if (typeof value === 'object') {
        objectString = objectString + key + JSON.stringify(value);
      } else {
        objectString = objectString + key + value;
      }
    });
  });
  return objectString;
};

export default stringifyObj;
