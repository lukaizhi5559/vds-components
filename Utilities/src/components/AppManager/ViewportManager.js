let breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1024px',
  xxl: '1601px',
  xxxl: '1921px',
};

let desktopXLarge = {
  min: _parsePxStringToInt(breakpoints.xxxl),
  max: null,
};
let desktopLarge = {
  min: _parsePxStringToInt(breakpoints.xxl),
  max: _parsePxStringToInt('1920px'),
};
let desktop = {
  min: _parsePxStringToInt(breakpoints.xl),
  max: _parsePxStringToInt('1600px'),
};
let tabletLarge = {
  min: _parsePxStringToInt(breakpoints.lg),
  max: _parsePxStringToInt('1023px'),
};
let tablet = {
  min: _parsePxStringToInt(breakpoints.md),
  max: _parsePxStringToInt('991px'),
};
let mobileLarge = {
  min: _parsePxStringToInt(breakpoints.sm),
  max: _parsePxStringToInt('767px'),
};

class ViewportManager {
  constructor(config) {
    this.viewport = this._calculateInitialViewport();
    if (typeof global !== 'undefined' && !global.callbacks)
      global.callbacks = {};
  }

  register({
    maxMobile,
    maxMobileLarge,
    maxTablet,
    maxTabletLarge,
    minDesktop,
  }) {
    const self = this;

    let desktopXLargeQuery = `screen and (min-width: 1921px)`; // 1921 - any
    let desktopLargeQuery = `screen and (min-width: 1601px) and (max-width: 1920px)`; // 1601 - 1920
    let desktopQuery = `screen and (min-width: ${minDesktop}) and (max-width: 1600px)`; // 1024 - 1600
    let tabletLargeQuery = `screen and (min-width: 992px) and (max-width:${maxTabletLarge})`; // 992 - 1023
    let tabletQuery = `screen and (min-width: 768px) and (max-width:${maxTablet})`; // 768 - 991
    let mobileLargeQuery = `screen and (min-width: 480px) and (max-width:${maxMobileLarge})`; // 480 - 767
    let mobileQuery = `screen and (max-width:${maxMobile})`; // any - 479

    if (this.registered) return;
    if (typeof window !== 'undefined') {
      (async () => {
        let enquire = await import('enquire.js');
        if (enquire.register) {
          //If it goes from Desktop to DesktopXLarge
          enquire.register(desktopXLargeQuery, {
            match: function() {
              self._changeViewport('desktop', 'desktopXLarge');
            },
          });

          //If it goes from Desktop to DesktopLarge
          enquire.register(desktopLargeQuery, {
            match: function() {
              self._changeViewport('desktop', 'desktopLarge');
            },
          });

          //If it goes from TabletLarge to Desktop
          enquire.register(desktopQuery, {
            match: function() {
              self._changeViewport('desktop', 'desktop');
            },
          });

          // If it goes from tablet to tabletLarge
          enquire.register(tabletLargeQuery, {
            match: function() {
              self._changeViewport('desktop', 'tabletLarge');
            },
          });

          //If it goes from Desktop to Tablet
          enquire.register(tabletQuery, {
            match: function() {
              self._changeViewport('tablet', 'tablet');
            },
          });

          //If it goes from mobile to mobileLarge
          enquire.register(mobileLargeQuery, {
            match: function() {
              self._changeViewport('mobile', 'mobileLarge');
            },
          });

          //If it goes from Tablet to Mobile
          enquire.register(mobileQuery, {
            match: function() {
              self._changeViewport('mobile', 'mobile');
            },
          });
          this.registered = true;
        }
      })();
    }
  }

  unregister({
    maxMobile,
    maxMobileLarge,
    maxTablet,
    maxTabletLarge,
    minDesktop,
  }) {
    let desktopXLargeQuery = `screen and (min-width: 1921px)`; // 1921 - any
    let desktopLargeQuery = `screen and (min-width: 1601px) and (max-width: 1920px)`; // 1601 - 1920
    let desktopQuery = `screen and (min-width: ${minDesktop}) and (max-width: 1600px)`; // 1024 - 1600
    let tabletLargeQuery = `screen and (min-width: 992px) and (max-width:${maxTabletLarge})`; // 992 - 1023
    let tabletQuery = `screen and (min-width: 768px) and (max-width:${maxTablet})`; // 768 - 991
    let mobileLargeQuery = `screen and (min-width: 480px) and (max-width:${maxMobileLarge})`; // 480 - 767
    let mobileQuery = `screen and (max-width:${maxMobile})`; // any - 479
    if (!this.registered) return;

    (async () => {
      let enquire = await import('enquire.js');
      enquire.unregister(desktopXLargeQuery);
      enquire.unregister(desktopLargeQuery);
      enquire.unregister(desktopQuery);
      enquire.unregister(tabletLargeQuery);
      enquire.unregister(tabletQuery);
      enquire.unregister(mobileLargeQuery);
      enquire.unregister(mobileQuery);
    })();
  }

  // Grab expanded variable from HOC component
  subscribe(id, expanded, cb) {
    if (typeof global !== 'undefined')
      global.callbacks[id] = { callbackFn: cb, expanded };
  }

  unsubscribe(id) {
    if (typeof global !== 'undefined') delete global.callbacks[id];
  }

  _calculateInitialViewport() {
    if (typeof window === 'undefined') return;
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let viewport;
    let expandedViewport;

    if (width >= desktopXLarge.min) {
      // >= 1921
      viewport = 'desktop';
      expandedViewport = 'desktopXLarge';
    } else if (width >= desktopLarge.min && width < desktopXLarge.min) {
      // 1601 <= x < 1921
      viewport = 'desktop';
      expandedViewport = 'desktopLarge';
    } else if (width >= desktop.min && width < desktopLarge.min) {
      // 1024 <= x < 1601
      viewport = 'desktop';
      expandedViewport = 'desktop';
    } else if (width >= tabletLarge.min && width < desktop.min) {
      // 992 <= x < 1024
      viewport = 'tablet';
      expandedViewport = 'tabletLarge';
    } else if (width >= tablet.min && width < tabletLarge.min) {
      // 768 <= x < 992
      viewport = 'tablet';
      expandedViewport = 'tablet';
    } else if (width >= mobileLarge.min && width < tablet.min) {
      // 480 <= x < 768
      viewport = 'mobile';
      expandedViewport = 'mobileLarge';
    } else if (width >= 0 && width < mobileLarge.min) {
      // 0 <= x < 480
      viewport = 'mobile';
      expandedViewport = 'mobile';
    }

    return { normalViewport: viewport, expandedViewport };
  }

  _changeViewport(normalViewport, expandedViewport) {
    this.viewport = { normalViewport, expandedViewport }; // Will fire when component first mounted
    let callbackKeys =
      typeof global !== 'undefined' && Object.keys(global.callbacks);
    if (callbackKeys.length > 0) {
      callbackKeys.forEach(key => {
        if (
          typeof global !== 'undefined' &&
          global.callbacks &&
          global.callbacks[key] &&
          global.callbacks[key].callbackFn
        ) {
          // If the callback object has expanded variable true,
          // send expandedViewport
          global.callbacks[key].expanded
            ? global.callbacks[key].callbackFn(expandedViewport)
            : global.callbacks[key].callbackFn(normalViewport);
        }
      });
    }
  }
}

export default new ViewportManager();

//Helpers
function _parsePxStringToInt(string) {
  if (typeof string == 'number') return string;
  if (!string.indexOf('px')) return parseInt(string);
  return parseInt(string.split('px')[0]);
}
