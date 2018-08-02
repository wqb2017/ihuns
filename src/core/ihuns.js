import * as Utils from './utils';
import defaultConfig from './config';
import createHttpRequest from './createHttpRequest';
/**
 * ihuns
 *
 * @export
 * @param {any} options
 */
export default function Ihuns(options) {
  if (!(this instanceof Ihuns)) {
    Utils.logError('Ihuns is a constructor and should be called with the `new` keyword');
    return;
  }
  createHttpRequest(Utils.merge(defaultConfig, options));
}
