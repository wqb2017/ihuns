import transformResponse from './transformResponse';
import * as Utils from './utils';
/**
 * error fns
 *
 * @export
 * @param {any} msg
 * @param {any} xhr
 * @param {any} instansConfig
 */
export default function renderErrorFns(msg, xhr, instansConfig) {
  Utils.logError(`request was unsuccessful:${xhr.status}`);
  instansConfig.error(msg, transformResponse(xhr, instansConfig));
}
