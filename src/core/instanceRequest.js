import createHttpRequest from './createHttpRequest';

/**
 * instanceRequestMixin fn
 *
 * @export
 * @param {any} ihuns
 */
export default function instanceRequestMixin(ihuns) {
  ihuns.prototype.instanceRequest = function instanceRequest(params) {
    if (this.$options.isFormData) {
      this.$options.method = 'post';
      this.$options.headers = {
        'Content-type': 'multipart/form-data'
      };
    }
    createHttpRequest(this.$options);
  };
}
