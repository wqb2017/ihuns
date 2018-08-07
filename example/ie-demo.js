new Ihuns({
  url: '/partner/data', //请求服务器url
  baseURL: 'http://192.168.9.86:8006', //服务器路径
  data: {
    module: 'portal',
    service: 'Portal',
    method: 'access',
    status: '',
    name: '',
    action: 'marketing.MaInfo.getMaInfoList'
  },
  // timeout:5000,
  success: function success(res) {
    document.getElementById('data').innerHTML = JSON.stringify(res);
  },
});
