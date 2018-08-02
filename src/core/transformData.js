import sign from './sign';
import md5 from 'md5';
import * as Utils from './utils';
/**
 * request data format
 *
 * @export
 * @param {any} instansConfig
 */
export default function transformData(instansConfig) {
  //sign value
  if (instansConfig.requestKey) {
    instansConfig.data['sign'] = md5(sign(instansConfig));
  }
  //Is formatted as a string and linked with &
  let requestData = [];
  const instansConfigData = instansConfig.data;
  for (var variable in instansConfigData) {
    if (instansConfigData.hasOwnProperty(variable)) {
      //encodeURIComponent
      requestData.push(`${Utils.encodeValue(variable)}=${Utils.encodeValue(instansConfigData[variable])}`);
    }
  }
  return requestData.join('&');
}
