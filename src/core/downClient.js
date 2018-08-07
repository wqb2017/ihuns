import buildURL from './buildURL';
import renderSendFns from './send';
/**
 * file downClient
 *
 * @export
 * @param {any} instansConfig
 */
export default function downClientFile(instansConfig) {
  const baseURL = buildURL(instansConfig);
  const sendData = renderSendFns(instansConfig);
  window.open(`${baseURL}${sendData}`);
}
