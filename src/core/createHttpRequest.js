import buildURL from './buildURL';
import renderXhr from './xhr';
import renderSendFns from './send';
import renderSuccessFns from './success';
import renderErrorFns from './error';
/**
 * request
 * 1. create http
 * 2. open http
 * 3. set headers
 * 4. send http data
 * 5. watch http
 */
export default function createHttpRequest(instansConfig) {
  //create http
  const xhr = renderXhr();

  //Add withCredentials to request if needed
  if (instansConfig.withCredentials) {
    xhr.withCredentials = true;
  }

  //start send request
  xhr.open(instansConfig.method.toUpperCase(), buildURL(instansConfig), instansConfig.async);

  //Set the request timeout in MS
  if (instansConfig.timeout) {
    xhr.timeout = instansConfig.timeout;
  }

  //Listen for ready state
  xhr.onreadystatechange = function onreadystatechangeFns() {
    renderSuccessFns(xhr, instansConfig);
  };

  //Handle low level network errors
  xhr.onerror = function onerrorFns() {
    renderErrorFns('Network Error', xhr, instansConfig);
  };

  //Handle timeout
  xhr.ontimeout = function ontimeoutFns() {
    renderErrorFns('timeout Error', xhr, instansConfig);
  };

  //set header
  xhr.setRequestHeader(Object.keys(instansConfig.headers).join(''), Object.values(instansConfig.headers).join(''));

  //send data
  xhr.send(renderSendFns(instansConfig));
}
