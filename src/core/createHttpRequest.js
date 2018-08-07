import buildURL from './buildURL';
import renderXhr from './xhr';
import renderSendFns from './send';
import renderSuccessFns from './success';
import renderErrorFns from './error';
import renderHeadersFns from './headers';
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

  //handle onprogress
  xhr.onprogress = function onprogressFns(event) {
    instansConfig.onprogress(event);
  };

  //Listen for ready state
  xhr.onreadystatechange = function onreadystatechangeFns() {
    renderSuccessFns(xhr, instansConfig);
  };

  //Handle low level network errors
  xhr.onerror = function onerrorFns() {
    renderErrorFns(`Network Error,status is${xhr.status}`, xhr, instansConfig);
  };

  //Handle timeout
  if (instansConfig.timeout) {
    xhr.timeout = instansConfig.timeout;
  }
  xhr.ontimeout = function ontimeoutFns() {
    renderErrorFns(`timeout Error,status is ${xhr.status}`, xhr, instansConfig);
  };

  //set header
  renderHeadersFns(xhr, instansConfig.headers);

  //send data
  xhr.send(renderSendFns(instansConfig));
}
