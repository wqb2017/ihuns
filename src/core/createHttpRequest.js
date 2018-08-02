import buildURL from './buildURL';
import transformData from './transformData';
import transformResponse from './transformResponse';
/**
 * request
 * 1. create http
 * 2. open http
 * 3. set headers
 * 4. send http data
 * 5. watch http
 */
export default function createHttpRequest(instansConfig) {
  const xhr = new XMLHttpRequest();

  //Add withCredentials to request if needed
  if (instansConfig.withCredentials) {
    xhr.withCredentials = true;
  }
  xhr.open(instansConfig.method.toUpperCase(), buildURL(instansConfig), instansConfig.async);

  // Set the request timeout in MS
  if (instansConfig.timeout) {
    xhr.timeout = instansConfig.timeout;
  }

  // Listen for ready state
  xhr.onreadystatechange = function onreadystatechangeFns() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      instansConfig.success(transformResponse(xhr, instansConfig));
    }
  };

  // Handle low level network errors
  xhr.onerror = function onerrorFns() {
    instansConfig.error('Network Error', transformResponse(xhr, instansConfig));
  };

  // Handle timeout
  xhr.ontimeout = function ontimeoutFns() {
    instansConfig.error('timeout Error', transformResponse(xhr, instansConfig));
  };
  // Send the request
  let sendData = null;
  if (instansConfig.method.toUpperCase() !== 'GET') {
    sendData = transformData(instansConfig);
    xhr.setRequestHeader(Object.keys(instansConfig.headers).join(''), Object.values(instansConfig.headers).join(''));
  }
  xhr.send(sendData);
}
