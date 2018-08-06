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
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        instansConfig.success(transformResponse(xhr, instansConfig));
      } else {
        if (!instansConfig.timeout) {
          renderErrorFns(`request was unsuccessful,status is ${xhr.status}`, xhr, instansConfig);
        }
      }
    } catch (error) {
      renderErrorFns(error, xhr, instansConfig);
    }
  }
}
