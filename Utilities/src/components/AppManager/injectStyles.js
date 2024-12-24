const prefix = 'vds-';

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if(typeof window !== 'undefined') window.vdsHash = prefix + result;
  return result;
}

// Hashed css-reset class
const vdsHash = typeof window !== 'undefined' && window.vdsHash || prefix + makeid(6);

// Global Css StyleSheet
const globalCssClass = `.${vdsHash},
.${vdsHash} [class*=' VDS__'],
.${vdsHash} [class^='VDS__']{
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: inherit;
  border: 0;
}`;

// Checks if the script was already injected
function injectResetScript() {
  const head = document.head;
  const styleScripts = Array.from(document.getElementsByTagName('style'));
  const injectedScriptClass = styleScripts.find(
    script => script.id === 'VDS-reset'
  );

  if (!injectedScriptClass) {
    const globalStyle = (function() {
      let style = document.createElement('style');
      style.id = 'VDS-reset';
      style.innerText = globalCssClass;
      return style;
    })();

    const firstStyledComponent = styleScripts.find(
      style => style.attributes['data-styled-components']
    );
    head.insertBefore(globalStyle, firstStyledComponent);
  }
}

export default vdsHash;
