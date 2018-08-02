import transformData from './transformData';
/**
 * request url
 *
 * @export
 * @param {any} instansConfig
 * @returns
 */
export default function buildURL(instansConfig) {
  let url = `${instansConfig.baseURL}${instansConfig.url}`;
  url += url.indexOf('?') === -1 ? '?' : '&';
  //get request
  if (instansConfig.method.toUpperCase() === 'GET') {
    url += transformData(instansConfig);
  }
  return url;
}
