import transformData from './transformData';
import transformRequest from './transformRequest';
/**
 * send data
 *
 * @export
 * @param {any} instansConfig
 */
export default function renderSendFns(instansConfig) {
  let sendData = null;
  if (instansConfig.method.toUpperCase() !== 'GET') {
    sendData = transformRequest(instansConfig);
    //send form-data
    if (instansConfig.isFormData) {
      sendData = transformData(instansConfig);
    }
  }
  return sendData;
}
