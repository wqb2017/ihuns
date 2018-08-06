export default {
  url: '', //request server url
  method: 'get', //request method
  baseURL: '', //server path
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }, //set headers
  data: {}, //request params
  timeout: null, //set timeout
  async: true, //async
  withCredentials: false, //Add withCredentials to request if needed
  success: function() {}, //success fn
  error: function() {}, //error fn
  ontimeout:function () {},//Handle timeout
  requestKey: '',
  isFormData: false //file unload
};
