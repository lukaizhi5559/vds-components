const getOS = () => {
  const userAgent = typeof window !== 'undefined' && window.navigator.userAgent,
    platform =
      typeof window !== 'undefined' &&
      ((window.navigator.userAgentData &&
        window.navigator.userAgentData.platform) ??
        window.navigator.platform),
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'macOS'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'osx';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'linux';
  }
  return os;
};

export default getOS;
