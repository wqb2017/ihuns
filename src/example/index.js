/**
 * createIhuns
 *
 * @param {string} [url='']
 * @param {any} [data={}]
 * @returns
 */
function createIhuns(url = '', data = {}, config = {}) {
  const dataJson = Object.assign(
    {},
    data
  );
  const ihunsJson = Object.assign({},config,{url:url,data:Object.assign({},dataJson,data)})
  return new Promise(function(resolve, reject) {
    new Ihuns({
      url: ihunsJson.url, //请求服务器url
      baseURL: ihunsJson.baseURL || 'http://192.168.9.86:8006', //服务器路径
      data: ihunsJson.data,
      isFormData: ihunsJson.isFormData || false,
      method: ihunsJson.methos || 'get',
      withCredentials: ihunsJson.withCredentials || false,
      success: function success(res) {
        resolve(res);
      },
      error: function error(err) {
        reject(err);
      },
      ontimeout:function ontimeout(msg,xhr){
        console.log(msg);
      }
    });
  });
}
/**
 * getMaInfoList
 *
 * @param {any} params
 */
function getMaInfoList() {
  createIhuns(
    '/partner/data',
    {
      module: 'portal',
      service: 'Portal',
      method: 'access',
      status: '',
      name: '',
      action: 'marketing.MaInfo.getMaInfoList'
    },
    { methos: 'post' }
  ).then(res => {
    document.getElementById('data').innerHTML = JSON.stringify(res);
  });
}
getMaInfoList();
/**
 * getConsumeBillList
 *
 * @param {any} params
 */
function getConsumeBillList() {
  createIhuns(
    '/partner/data',
    {
      module: 'portal',
      service: 'Portal',
      method: 'access',
      channel_id: '',
      start_date: '',
      end_date: '',
      status: '',
      action: 'finance.Bill.getConsumeBillList'
    }
  ).then(res => {
    console.log(res);
  });
}
// getConsumeBillList();
//文件上传
function uploadFormData(params) {
  createIhuns('/common/uploadFormData', params, {
    methos: 'post',
    baseURL: 'http://120.78.128.52:81/cleaning',
    isFormData: true,
    withCredentials: true
  }).then(res => {
    // console.log(res);
  });
}
document.getElementById('file').addEventListener('change', function clickFns(e) {
  let files = e.target.files[0];
  // console.log(files);
  uploadFormData({
    file: files
  });
});
