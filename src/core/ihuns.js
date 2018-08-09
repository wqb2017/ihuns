import * as Utils from './../shared/utils';
import defaultConfig from './../shared/config';
import instanceRequestMixin from './instanceRequest';
let id = 0;
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
  this.$id = id++;
  this.$options = Utils.merge(defaultConfig, options);
  this.instanceRequest();
}
instanceRequestMixin(Ihuns);
