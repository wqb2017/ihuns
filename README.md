# ihuns
ihuns is http request libs

## Browser support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 9+ ✔ |

## install

npm install ihuns --save

or

```html
<script src="ihuns.js"></script>
```

## import

import ihuns from 'sendjs';

## Example

```js
new Ihuns({
  url: '/api', //请求服务器url
  baseURL: 'http://192.168.9.86:8006', //服务器路径
  data: {},
  success: function success(res) {
    resolve(res);
  },
  error: function error(err) {
    reject(err);
  }
});
```

## use promise
```js
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
createIhuns('/partner/data', {
  module: 'portal',
  service: 'Portal',
  method: 'access',
  status: '',
  name: '',
  action: 'marketing.MaInfo.getMaInfoList'
}).then(res => {
  console.log(res);
});
```

## Config

```js
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
```

## License

MIT
