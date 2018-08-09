import * as Utils from './../shared/utils';
/**
 * new XMLHttpRequest()
 *
 * @export
 * @param {any} params
 * @returns
 */
export default function renderXhr(params) {
  //ie7+ firefox opera chrome
  if (!Utils.isNullOrUndefined(typeof XMLHttpRequest)) {
    return new XMLHttpRequest();
  } else {
    Utils.logError('no XHR object availabel!');
  }
}
