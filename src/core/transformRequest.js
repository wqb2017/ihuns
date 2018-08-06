import sign from './sign';
import md5 from 'md5';
import * as Utils from './utils';
/**
 * request data format
 *
 * @export
 * @param {any} instansConfig
 */
export default function transformRequest(instansConfig) {
  //sign value
  if (instansConfig.requestKey) {
    instansConfig.data['sign'] = md5(sign(instansConfig));
  }
  return Utils.jsonParseString(instansConfig.data, '&');
}
