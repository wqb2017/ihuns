/**
 * createIhuns
 *
 * @param {string} [url='']
 * @param {any} [data={}]
 * @returns
 */
function createIhuns(url = '', data = {}, config = {}) {
  const ihunsJson = Object.assign({}, config, { url: url, data: data });
  return new Promise(function(resolve, reject) {
    new Ihuns({
      url: ihunsJson.url, //请求服务器url
      baseURL: ihunsJson.baseURL || 'http://192.168.9.86:8006', //服务器路径
      data: ihunsJson.data,
      isFormData: ihunsJson.isFormData || false,
      isDownClient: ihunsJson.isDownClient || false,
      method: ihunsJson.methos || 'get',
      withCredentials: ihunsJson.withCredentials || false,
      // timeout:5000,
      success: function success(res) {
        resolve(res);
      },
      error: function error(msg, xhr, config) {
        reject(msg, xhr, config);
      },
      onprogress: function onprogress(event) {
        // console.log(event);
      },
      ontimeout: function ontimeout(msg, xhr, config) {
        reject(msg, xhr, config);
      }
    });
  });
}
/**
 * data request
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
  }).catch(err=>{
    console.log(err);
  })
}
getMaInfoList();
/**
 * data request
 *
 * @param {any} params
 */
function getConsumeBillList() {
  createIhuns('/partner/data', {
    module: 'portal',
    service: 'Portal',
    method: 'access',
    channel_id: '',
    start_date: '',
    end_date: '',
    status: '',
    action: 'finance.Bill.getConsumeBillList'
  }).then(res => {
    console.log(res);
  });
}
getConsumeBillList();
/**
 *file upload
 *
 * @param {any} params
 */
function uploadFormData(params) {
  createIhuns('/common/uploadFormData', params, {
    methos: 'post',
    baseURL: 'http://120.78.128.52:82/cleaning',
    isFormData: true,
    withCredentials: true
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}
document.getElementById('file').addEventListener('change', function clickFns(e) {
  let files = e.target.files[0];
  // console.log(files);
  uploadFormData({
    file: files
  });
});
/**
 * file downClient
 *
 */
function exportConsumeBillDtlList() {
  createIhuns(
    '/open/downClient',
    {
      module: 'export',
      service: 'Export',
      method: 'exportConsumeBillDtlList',
      ve: 2,
      clientType: 'html',
      ms: new Date().getTime(),
      id: '20180807010000943181138371718101',
      bill_date: '2018-08-06',
    },
    { isDownClient: true, methos: 'post', }
  ).then(res => {
    console.log(res);
  });
}
document.getElementById('exportFile').addEventListener('click', function exportFile(params) {
  exportConsumeBillDtlList();
});
