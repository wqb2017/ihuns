import transformResponse from './transformResponse';
import renderErrorFns from './error';
/**
 * success fns
 *
 * @export
 * @param {any} xhr
 * @param {any} instansConfig
 */
export default function renderSuccessFns(xhr, instansConfig) {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      instansConfig.success(transformResponse(xhr, instansConfig));
    } else {
      renderErrorFns('request was unsuccessful!', xhr, instansConfig);
    }
  }
}
