/**
 * Returns a secured URL (https://...)
 * and updates the subdomain //s7 to //ss7 if it's present.
 *
 * @param {String} url
 *
 */
export default function urlParser(url) {
  if (!url) return url;

  let _url = url;
  const protocolRegex = /^http(s)?:\/\//i;
  const s7Regex = /\/\/s7/i;
  const httpRegex = /^http:\/\//i;
  const securedHttp = 'https://';
  const ss7 = '//ss7';

  // check if url has a protocol,
  // if not, treat it as relative url
  if (!protocolRegex.test(_url)) return _url;

  // replace //s7 with //ss7 if exists
  if (s7Regex.test(_url)) {
    _url = _url.replace(s7Regex, ss7);
  }

  // make url secure, http:// to https://
  return _url.replace(httpRegex, securedHttp);
}
