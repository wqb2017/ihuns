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
  success: function() {}, //Handle success
  error: function() {}, //Handle error
  ontimeout: function() {}, //Handle timeout
  onprogress: function() {}, //Handle onprogress
  requestKey: '',
  isFormData: false, //file unload
  isDownClient: false //file downClient
};
