import createHttpRequest from './createHttpRequest';
import downClientFile from './downClient';

/**
 * instanceRequestMixin fn
 *
 * @export
 * @param {any} ihuns
 */
export default function instanceRequestMixin(ihuns) {
  ihuns.prototype.instanceRequest = function instanceRequest() {
    //formdata
    if (this.$options.isFormData) {
      this.$options.method = 'post';
      this.$options.headers = {
        'Content-type': 'multipart/form-data'
      };
    }
    //file downClient
    if (this.$options.isDownClient) {
      downClientFile(this.$options);
      return;
    }
    //data request
    createHttpRequest(this.$options);
  };
}
