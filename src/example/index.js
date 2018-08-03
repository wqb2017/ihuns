/**
 * createIhuns
 *
 * @param {string} [url='']
 * @param {any} [data={}]
 * @returns
 */
function createIhuns(url = '', data = {}, config = {}) {
  return new Promise(function(resolve, reject) {
    new Ihuns({
      url: url, //请求服务器url
      baseURL: config.baseURL || 'http://192.168.9.86:8006', //服务器路径
      data: data,
      isFormData: config.isFormData || false,
      method: config.methos || 'get',
      withCredentials:config.withCredentials || false,
      success: function success(res) {
        resolve(res);
      },
      error: function error(err) {
        reject(err);
      }
    });
  });
}
createIhuns('/partner/data', {
  module: 'portal',
  service: 'Portal',
  method: 'access',
  status: '',
  name: '',
  action: 'marketing.MaInfo.getMaInfoList'
},{ methos: 'post' }).then(res => {
  document.getElementById('data').innerHTML = JSON.stringify(res);
});
createIhuns('/partner/data', {
    module: 'portal',
    service: 'Portal',
    method: 'access',
    channel_id: '',
    start_date: '',
    end_date: '',
    status: '',
    action: 'finance.Bill.getConsumeBillList'
  },
  // { methos: 'post' }
).then(res => {
  console.log(res);
});
//文件上传
function uploadFormData(params) {
  createIhuns('/common/uploadFormData', params, { methos: 'post', baseURL: 'http://120.78.128.52:81/cleaning',isFormData:true,withCredentials:true }).then(res => {
  // console.log(res);
});
}
document.getElementById("file").addEventListener('change',function clickFns(e) {
  let files = e.target.files[0];
  // console.log(files);
  uploadFormData({
    file:files
  })
})
