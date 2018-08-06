(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Ihuns = factory());
}(this, (function () { 'use strict';

  /**
   * 是否是数组
   *
   * @export
   * @param {any} val
   * @returns
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }
  /**
   * forEach
   *
   * @export
   * @param {any} obj
   * @param {any} fn
   * @returns
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  /**
   * 合并对象
   *
   * @export
   * @returns
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        if (val !== null || typeof val !== 'undefined') {
          result[key] = val;
        }
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  /**
   * log error
   *
   * @export
   * @param {any} msg
   */
  function logError(msg) {
    console.error(`${msg}`);
  }
  /**
   * encodeURIComponent
   *
   * @export
   * @param {any} val
   * @returns
   */
  function encodeValue(val) {
    return encodeURIComponent(val)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  /**
   * json parse string serialization formatted as a string and linked with &
   *
   * @export
   * @param {object} jsonData
   * @param {string} format default '&'
   * @returns
   */
  function jsonParseString(jsonData = {}, format = '&') {
    let arrData = [];
    for (var variable in jsonData) {
      if (jsonData.hasOwnProperty(variable)) {
        //encodeURIComponent
        arrData.push(`${encodeValue(variable)}=${encodeValue(jsonData[variable])}`);
      }
    }
    return arrData.join(format);
  }

  var defaultConfig = {
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
    requestKey: '',
    isFormData: false //file unload
  };

  /**
   * request param key sort
   *
   * @export
   * @param {object} instansConfigData
   * @returns a=>z
   */
  function keySort(data) {
    return Object.keys(data).sort(function(a, b) {
      return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
    });
  }
  /**
   * sign
   *
   * @export
   * @param {any} instansConfig
   * @returns {string}
   */
  function sign(instansConfig) {
    const data = instansConfig.data;
    let dataValues = keySort(data);
    let signArr = [];
    for (let i = 0; i < dataValues.length; i++) {
      signArr.push(dataValues[i] + '=' + data[dataValues[i]]);
    }
    return signArr.join('&') + '&=requestKey' + instansConfig.requestKey;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var crypt = createCommonjsModule(function (module) {
  (function() {
    var base64map
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

    crypt = {
      // Bit-wise rotation left
      rotl: function(n, b) {
        return (n << b) | (n >>> (32 - b));
      },

      // Bit-wise rotation right
      rotr: function(n, b) {
        return (n << (32 - b)) | (n >>> b);
      },

      // Swap big-endian to little-endian and vice versa
      endian: function(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++)
          n[i] = crypt.endian(n[i]);
        return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function(n) {
        for (var bytes = []; n > 0; n--)
          bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
          words[b >>> 5] |= bytes[i] << (24 - b % 32);
        return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
          bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
        return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
          for (var j = 0; j < 4; j++)
            if (i * 8 + j * 6 <= bytes.length * 8)
              base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
            else
              base64.push('=');
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
            imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push(((base64map.indexOf(base64.charAt(i - 1))
              & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
              | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
        }
        return bytes;
      }
    };

    module.exports = crypt;
  })();
  });

  var charenc = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },

    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        for (var bytes = [], i = 0; i < str.length; i++)
          bytes.push(str.charCodeAt(i) & 0xFF);
        return bytes;
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++)
          str.push(String.fromCharCode(bytes[i]));
        return str.join('');
      }
    }
  };

  var charenc_1 = charenc;

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  var isBuffer_1 = function (obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
  };

  function isBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
  }

  var md5 = createCommonjsModule(function (module) {
  (function(){
    var crypt$$1 = crypt,
        utf8 = charenc_1.utf8,
        isBuffer = isBuffer_1,
        bin = charenc_1.bin,

    // The core
    md5 = function (message, options) {
      // Convert to byte array
      if (message.constructor == String)
        if (options && options.encoding === 'binary')
          message = bin.stringToBytes(message);
        else
          message = utf8.stringToBytes(message);
      else if (isBuffer(message))
        message = Array.prototype.slice.call(message, 0);
      else if (!Array.isArray(message))
        message = message.toString();
      // else, assume byte array already

      var m = crypt$$1.bytesToWords(message),
          l = message.length * 8,
          a =  1732584193,
          b = -271733879,
          c = -1732584194,
          d =  271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
               ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << (l % 32);
      m[(((l + 64) >>> 9) << 4) + 14] = l;

      // Method shortcuts
      var FF = md5._ff,
          GG = md5._gg,
          HH = md5._hh,
          II = md5._ii;

      for (var i = 0; i < m.length; i += 16) {

        var aa = a,
            bb = b,
            cc = c,
            dd = d;

        a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
        d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
        c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
        b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
        d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
        c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
        a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
        d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i+10], 17, -42063);
        b = FF(b, c, d, a, m[i+11], 22, -1990404162);
        a = FF(a, b, c, d, m[i+12],  7,  1804603682);
        d = FF(d, a, b, c, m[i+13], 12, -40341101);
        c = FF(c, d, a, b, m[i+14], 17, -1502002290);
        b = FF(b, c, d, a, m[i+15], 22,  1236535329);

        a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
        d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
        c = GG(c, d, a, b, m[i+11], 14,  643717713);
        b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
        a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
        d = GG(d, a, b, c, m[i+10],  9,  38016083);
        c = GG(c, d, a, b, m[i+15], 14, -660478335);
        b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
        a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
        d = GG(d, a, b, c, m[i+14],  9, -1019803690);
        c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
        b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
        a = GG(a, b, c, d, m[i+13],  5, -1444681467);
        d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
        c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
        b = GG(b, c, d, a, m[i+12], 20, -1926607734);

        a = HH(a, b, c, d, m[i+ 5],  4, -378558);
        d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i+11], 16,  1839030562);
        b = HH(b, c, d, a, m[i+14], 23, -35309556);
        a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
        d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
        c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
        b = HH(b, c, d, a, m[i+10], 23, -1094730640);
        a = HH(a, b, c, d, m[i+13],  4,  681279174);
        d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
        c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
        b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
        a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
        d = HH(d, a, b, c, m[i+12], 11, -421815835);
        c = HH(c, d, a, b, m[i+15], 16,  530742520);
        b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

        a = II(a, b, c, d, m[i+ 0],  6, -198630844);
        d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
        c = II(c, d, a, b, m[i+14], 15, -1416354905);
        b = II(b, c, d, a, m[i+ 5], 21, -57434055);
        a = II(a, b, c, d, m[i+12],  6,  1700485571);
        d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
        c = II(c, d, a, b, m[i+10], 15, -1051523);
        b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
        a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
        d = II(d, a, b, c, m[i+15], 10, -30611744);
        c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
        b = II(b, c, d, a, m[i+13], 21,  1309151649);
        a = II(a, b, c, d, m[i+ 4],  6, -145523070);
        d = II(d, a, b, c, m[i+11], 10, -1120210379);
        c = II(c, d, a, b, m[i+ 2], 15,  718787259);
        b = II(b, c, d, a, m[i+ 9], 21, -343485551);

        a = (a + aa) >>> 0;
        b = (b + bb) >>> 0;
        c = (c + cc) >>> 0;
        d = (d + dd) >>> 0;
      }

      return crypt$$1.endian([a, b, c, d]);
    };

    // Auxiliary functions
    md5._ff  = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5._gg  = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5._hh  = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5._ii  = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };

    // Package private blocksize
    md5._blocksize = 16;
    md5._digestsize = 16;

    module.exports = function (message, options) {
      if (message === undefined || message === null)
        throw new Error('Illegal argument ' + message);

      var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes :
          options && options.asString ? bin.bytesToString(digestbytes) :
          crypt$$1.bytesToHex(digestbytes);
    };

  })();
  });

  /**
   * request data format
   *
   * @export
   * @param {any} instansConfig
   */
  function transformRequest(instansConfig) {
    //sign value
    if (instansConfig.requestKey) {
      instansConfig.data['sign'] = md5(sign(instansConfig));
    }
    return jsonParseString(instansConfig.data, '&');
  }

  /**
   * request url
   *
   * @export
   * @param {any} instansConfig
   * @returns
   */
  function buildURL(instansConfig) {
    let url = `${instansConfig.baseURL}${instansConfig.url}`;
    url += url.indexOf('?') === -1 ? '?' : '&';
    //get request
    if (instansConfig.method.toUpperCase() === 'GET') {
      url += transformRequest(instansConfig);
    }
    return url;
  }

  /**
   * request data format
   *
   * @export
   * @param {any} instansConfig
   */
  function transformData(instansConfig) {
    const instansConfigData = instansConfig.data;

    let formData = new FormData();
    for (var variable in instansConfigData) {
      if (instansConfigData.hasOwnProperty(variable)) {
        formData.append(variable, instansConfigData[variable]);
      }
    }
    return formData;
  }

  /**
   * response data format
   *
   * @export
   * @param {any} xhr
   * @returns
   */
  function transformResponse(responseData, instansConfig) {
    return {
      response: JSON.parse(responseData.response || responseData.responseText),
      status: responseData.status,
      readyState: responseData.readyState,
      config: instansConfig
    };
  }

  /**
   * request
   * 1. create http
   * 2. open http
   * 3. set headers
   * 4. send http data
   * 5. watch http
   */
  function createHttpRequest(instansConfig) {
    const xhr = new XMLHttpRequest();

    //Add withCredentials to request if needed
    if (instansConfig.withCredentials) {
      xhr.withCredentials = true;
    }
    xhr.open(instansConfig.method.toUpperCase(), buildURL(instansConfig), instansConfig.async);

    // Set the request timeout in MS
    if (instansConfig.timeout) {
      xhr.timeout = instansConfig.timeout;
    }

    // Listen for ready state
    xhr.onreadystatechange = function onreadystatechangeFns() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        instansConfig.success(transformResponse(xhr, instansConfig));
      }
    };

    // Handle low level network errors
    xhr.onerror = function onerrorFns() {
      instansConfig.error('Network Error', transformResponse(xhr, instansConfig));
    };

    // Handle timeout
    xhr.ontimeout = function ontimeoutFns() {
      instansConfig.error('timeout Error', transformResponse(xhr, instansConfig));
    };
    // Send the request
    let sendData = null;
    if (instansConfig.method.toUpperCase() !== 'GET') {
      sendData = transformRequest(instansConfig);
      //send form-data
      if (instansConfig.isFormData) {
        sendData = transformData(instansConfig);
      }
      xhr.setRequestHeader(Object.keys(instansConfig.headers).join(''), Object.values(instansConfig.headers).join(''));
    }
    xhr.send(sendData);
  }

  /**
   * instanceRequestMixin fn
   *
   * @export
   * @param {any} ihuns
   */
  function instanceRequestMixin(ihuns) {
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

  let id = 0;
  /**
   * ihuns
   *
   * @export
   * @param {any} options
   */
  function Ihuns(options) {
    if (!(this instanceof Ihuns)) {
      logError('Ihuns is a constructor and should be called with the `new` keyword');
      return;
    }
    this.$id = id++;
    this.$options = merge(defaultConfig, options);
    this.instanceRequest();
  }
  instanceRequestMixin(Ihuns);

  return Ihuns;

})));
//# sourceMappingURL=ihuns.js.map
