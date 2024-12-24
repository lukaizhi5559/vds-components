//****** To-do, test loading in the families first asynchronously from check whether to load the url if necessary ******//

let FontConfig = {
  loaded: false,
};

//Turn on or off the font loader
function setFontLoaded(loaded) {
  FontConfig.loaded = loaded ? true : false;
}

function checkFontLoaded() {
  return FontConfig.loaded;
}

// Define and Load the fonts
let customConfig = {
  families: ['Verizon-NHG-eTX', 'Verizon-NHG-eDS'],
};

let fontUri1 = 'https://respframework.verizon.com/verizon-nhg.css';

async function finishLoading() {
  try {
    const WebFont = await import('webfontloader');
    const WebFontConfig = {
      custom: customConfig,
      active: () => setFontLoaded(true),
      inactive: () => console.warn('fonts could not be loaded.'),
    };

    WebFont.load && WebFont.load(WebFontConfig);
  } catch (error) {
    typeof window !== 'undefined' && console.error(error);
  }
}

function checkIfLoaded() {
  if (typeof document === 'undefined') return false;
  const links = Array.from(document.head.getElementsByTagName('link'));
  if (!links || !links.length) return false;

  return links.find(link => {
    return link.getAttribute('href') === fontUri1;
  });
}

function loadFonts() {
  let loaded = checkIfLoaded();

  if (!loaded) {
    customConfig.urls = [fontUri1];
    finishLoading(customConfig);
  } else setFontLoaded(true);
}

if (checkIfLoaded()) setFontLoaded(true);
if (!checkFontLoaded()) loadFonts();

export const Fonts = {
  VerizonNHGeDS: 'Verizon-NHG-eDS', // Display
  VerizonNHGeTX: 'Verizon-NHG-eTX', // Text
  checkFontLoaded: checkFontLoaded,
  setFontLoaded: setFontLoaded,
  loadFonts: loadFonts,
};
