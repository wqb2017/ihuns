/**
 * Is it an array
 *
 * @export
 * @param {any} val
 * @returns
 */
export function isArray(val) {
  return {}.toString.call(val) === '[object Array]';
}
/**
 * Don't bother if no value provided
 *
 * @export
 * @param {any} value
 * @returns
 */
export function isNullOrUndefined(value) {
  if (value === null || typeof value === 'undefined') {
    return true;
  } else {
    return false;
  }
}
/**
 * forEach
 *
 * @export
 * @param {any} obj
 * @param {any} fn
 * @returns
 */
export function forEach(obj, fn) {
  // Don't bother if no value provided
  if (isNullOrUndefined(obj)) {
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
 * merge object
 *
 * @export
 * @returns
 */
export function merge(/* obj1, obj2, obj3, ... */) {
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
export function logError(msg) {
  console.error(`${msg}`);
}
/**
 * log warn
 *
 * @export
 * @param {any} msg
 */
export function logWarn(msg) {
  console.warn(`${msg}`);
}
/**
 * encodeURIComponent
 *
 * @export
 * @param {any} val
 * @returns
 */
export function encodeValue(val) {
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
export function jsonParseString(jsonData = {}, format = '&') {
  let arrData = [];
  for (var variable in jsonData) {
    if (jsonData.hasOwnProperty(variable)) {
      //encodeURIComponent
      arrData.push(`${encodeValue(variable)}=${encodeValue(jsonData[variable])}`);
    }
  }
  return arrData.join(format);
}
