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
      baseURL: 'http://192.168.9.86:8006', //服务器路径
      data: data,
      success: function success(res) {
        resolve(res);
      },
      error: function error(err) {
        reject(err);
      }
    });
  });
}
/**
 * getMaInfoList
 */
createIhuns('/partner/data', {
  module: 'portal',
  service: 'Portal',
  method: 'access',
  status: '',
  name: '',
  action: 'marketing.MaInfo.getMaInfoList'
}).then(res => {
  document.getElementById('api').innerHTML = JSON.stringify(res);
  console.log(res);
});
/**
 * getConsumeBillList
 */
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
